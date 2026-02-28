'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('linkpixel_token');
        const storedUser = localStorage.getItem('linkpixel_user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('linkpixel_token', data.token);
                localStorage.setItem('linkpixel_user', JSON.stringify(data.user));
                setToken(data.token);
                setUser(data.user);
                router.push('/dashboard');
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (err) {
            return { success: false, message: 'Server connection failed' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
            const response = await fetch(`${apiUrl}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('linkpixel_token', data.token);
                localStorage.setItem('linkpixel_user', JSON.stringify(data.user));
                setToken(data.token);
                setUser(data.user);
                router.push('/dashboard');
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (err) {
            return { success: false, message: 'Server connection failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('linkpixel_token');
        localStorage.removeItem('linkpixel_user');
        setToken(null);
        setUser(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
