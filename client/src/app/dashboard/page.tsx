'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Upload, AlertCircle, Copy, Trash2, Download } from 'lucide-react';

export default function Dashboard() {
    const { token, user, logout }: any = useAuth();
    const [dragActive, setDragActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState<any[]>([]);
    const [uploadError, setUploadError] = useState('');
    const [progress, setProgress] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (token) {
            fetchImages();
        }
    }, [token]);

    const fetchImages = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
            const response = await fetch(`${apiUrl}/images`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setImages(data);
            }
        } catch (err) {
            console.error('Failed to fetch images');
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    };

    const handleFiles = async (files: FileList) => {
        setUploading(true);
        setUploadError('');
        setProgress(10);

        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('images', file);
        });

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
            const response = await fetch(`${apiUrl}/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            setProgress(100);

            if (response.ok) {
                // data is now an array of saved images
                setImages((prev) => [...data, ...prev]);
                setTimeout(() => {
                    setUploading(false);
                    setProgress(0);
                }, 1000);
            } else {
                setUploadError(data.message || 'Upload failed');
                setUploading(false);
            }
        } catch (err) {
            setUploadError('Connection lost');
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
            const response = await fetch(`${apiUrl}/images/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setImages(prev => prev.filter((img) => img._id !== id));
            }
        } catch (err) {
            alert('Failed to delete image');
        }
    };

    const handleExport = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
            const response = await fetch(`${apiUrl}/images/export`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Export failed');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'LinkPixel_Export.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (err) {
            alert('Failed to export images');
        }
    };

    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = async (id: string, url: string) => {
        try {
            await navigator.clipboard.writeText(url);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setCopiedId(id);
                setTimeout(() => setCopiedId(null), 2000);
            } catch (copyErr) {
                alert('Failed to copy link');
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans">
            <nav className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-sm"></div>
                    </div>
                    <span className="text-xl font-bold tracking-tight">LinkPixel</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{user?.email}</span>
                    <button
                        onClick={logout}
                        className="text-sm font-medium hover:underline"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-2">Upload Images</h2>
                    <p className="text-gray-500">Drag and drop your images here to generate instant links.</p>
                </div>

                {/* Upload Zone */}
                <div
                    className={`relative border-2 border-dashed rounded-3xl p-12 transition-all flex flex-col items-center justify-center cursor-pointer ${dragActive ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleChange}
                    />

                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                        <Upload className="w-8 h-8 text-gray-400" />
                    </div>

                    <div className="text-center">
                        <p className="text-lg font-medium">Click or drag images to upload</p>
                        <p className="text-sm text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                    </div>

                    {uploading && (
                        <div className="absolute inset-0 bg-white bg-opacity-90 rounded-3xl flex flex-col items-center justify-center p-8 z-10">
                            <div className="w-full max-w-xs bg-gray-100 rounded-full h-2 mb-4">
                                <div
                                    className="bg-black h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <p className="text-sm font-medium">Uploading your pixel...</p>
                        </div>
                    )}

                    {uploadError && (
                        <div className="mt-4 flex items-center gap-2 text-red-500 text-sm font-medium">
                            <AlertCircle className="w-4 h-4" />
                            {uploadError}
                        </div>
                    )}
                </div>

                {/* Storage Info */}
                <div className="mt-8 bg-gray-50 rounded-2xl p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Storage Used</p>
                        <p className="text-lg font-bold">
                            {(user?.storageUsed / (1024 * 1024)).toFixed(2)} MB / 1 GB
                        </p>
                    </div>
                    <div className="flex-1 max-w-xs mx-12">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                                className="bg-black h-1.5 rounded-full"
                                style={{ width: `${Math.min(100, (user?.storageUsed / (500 * 1024 * 1024)) * 100)}%` }}
                            ></div>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-all">
                        Upgrade Plan
                    </button>
                </div>

                {/* Recent Uploads Header */}
                <div className="mt-16 flex justify-between items-end mb-8">
                    <h3 className="text-xl font-bold">Recent Uploads</h3>
                    {images.length > 0 && (
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-sm font-bold rounded-xl transition-all border border-gray-100"
                        >
                            <Download className="w-4 h-4" />
                            Export to Excel
                        </button>
                    )}
                </div>

                {images.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl text-gray-400 italic">
                        No images uploaded yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((img: any) => (
                            <div key={img._id} className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-gray-100 transition-all bg-white">
                                <div className="aspect-video bg-gray-50 relative overflow-hidden">
                                    <img
                                        src={img.url}
                                        alt={img.originalName}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-all duration-500"
                                    />
                                </div>
                                <div className="p-4">
                                    <p className="font-medium text-sm truncate mb-3">{img.originalName}</p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleCopy(img._id, img.url)}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${copiedId === img._id
                                                ? 'bg-green-50 text-green-600'
                                                : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                                                }`}
                                        >
                                            <Copy className="w-3.5 h-3.5" />
                                            {copiedId === img._id ? 'Copied!' : 'Copy Link'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(img._id)}
                                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
