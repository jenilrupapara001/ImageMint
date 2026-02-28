'use client';

import Link from 'next/link';
import { Upload, Zap, Code, Shield, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-xl font-bold tracking-tight">LinkPixel</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <a href="#features" className="hover:text-black transition-all">Features</a>
          <a href="#pricing" className="hover:text-black transition-all">Pricing</a>
          <Link href="/login" className="hover:text-black transition-all">Sign In</Link>
          <Link href="/register" className="px-5 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-32 text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter mb-8 bg-gradient-to-b from-black to-gray-600 bg-clip-text text-transparent">
          Image hosting for <br /> modern developers.
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          LinkPixel is the fastest way to host images and generate public URLs.
          Instant setup, minimal UI, and zero friction.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-full text-lg font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
            Start Uploading <ArrowRight className="w-5 h-5" />
          </Link>
          <a href="#pricing" className="w-full sm:w-auto px-8 py-4 bg-gray-50 text-black rounded-full text-lg font-bold hover:bg-gray-100 transition-all">
            View Pricing
          </a>
        </div>
        <div className="mt-20 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-100 to-gray-50 rounded-3xl blur opacity-25"></div>
          <div className="relative bg-gray-50 border border-gray-100 rounded-3xl p-4 md:p-8">
            <div className="aspect-video bg-white rounded-2xl shadow-sm overflow-hidden flex items-center justify-center border border-gray-100">
              <div className="text-center">
                <Upload className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">Platform Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Built for speed.</h2>
            <p className="text-gray-500">Everything you need to manage your assets efficiently.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Instant Upload</h3>
              <p className="text-gray-500 leading-relaxed">
                Our optimized pipeline ensures your images are ready in milliseconds.
              </p>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Developer API</h3>
              <p className="text-gray-500 leading-relaxed">
                Integrate LinkPixel directly into your workflow with our simple REST API.
              </p>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Secure Hosting</h3>
              <p className="text-gray-500 leading-relaxed">
                Your images are protected by industry-standard security protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing.</h2>
            <p className="text-gray-500">Pick a plan that grows with you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="p-10 bg-white border border-gray-100 rounded-3xl flex flex-col">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <p className="text-gray-500 mb-6 text-sm">Great for side projects.</p>
              <div className="text-4xl font-extrabold mb-8">$0<span className="text-lg font-medium text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-10 flex-1 text-sm text-gray-600">
                <li className="flex items-center gap-2 leading-none"><div className="w-1.5 h-1.5 bg-black rounded-full" /> 500MB Storage</li>
                <li className="flex items-center gap-2 leading-none"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Public Links</li>
                <li className="flex items-center gap-2 leading-none text-gray-300"><div className="w-1.5 h-1.5 bg-gray-200 rounded-full" /> API Access</li>
              </ul>
              <Link href="/register" className="w-full py-3 text-center border border-black rounded-full font-bold hover:bg-gray-50 transition-all">
                Get Started
              </Link>
            </div>
            {/* Pro */}
            <div className="p-10 bg-white border-2 border-black rounded-3xl flex flex-col relative scale-105 shadow-xl shadow-gray-100">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Recommended</div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-gray-500 mb-6 text-sm">For professional creators.</p>
              <div className="text-4xl font-extrabold mb-8">$12<span className="text-lg font-medium text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-10 flex-1 text-sm text-gray-600">
                <li className="flex items-center gap-2 leading-none"><div className="w-1.5 h-1.5 bg-black rounded-full" /> 10GB Storage</li>
                <li className="flex items-center gap-2 leading-none"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Priority Public Links</li>
                <li className="flex items-center gap-2 leading-none"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Full API Access</li>
                <li className="flex items-center gap-2 leading-none"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Analytics Dashboard</li>
              </ul>
              <Link href="/register" className="w-full py-3 text-center bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all">
                Go Pro
              </Link>
            </div>
            {/* Business */}
            <div className="p-10 bg-white border border-gray-100 rounded-3xl flex flex-col">
              <h3 className="text-xl font-bold mb-2">Business</h3>
              <p className="text-gray-500 mb-6 text-sm">For teams and agencies.</p>
              <div className="text-4xl font-extrabold mb-8">$49<span className="text-lg font-medium text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-10 flex-1 text-sm text-gray-600">
                <li className="flex items-center gap-2 leading-none"><div className="w-1.5 h-1.5 bg-black rounded-full" /> 100GB Storage</li>
                <li className="flex items-center gap-2 leading-none"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Custom Subdomain</li>
                <li className="flex items-center gap-2 leading-none"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Priority Support</li>
                <li className="flex items-center gap-2 leading-none"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Team Accounts</li>
              </ul>
              <Link href="/register" className="w-full py-3 text-center border border-black rounded-full font-bold hover:bg-gray-50 transition-all">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:row-reversed justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <span className="font-bold tracking-tight">LinkPixel</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-400">
            <a href="#" className="hover:text-black transition-all">Terms</a>
            <a href="#" className="hover:text-black transition-all">Privacy</a>
            <a href="#" className="hover:text-black transition-all">Contact</a>
          </div>
          <p className="text-sm text-gray-400">© 2026 LinkPixel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
