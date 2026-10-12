'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Email atau password salah. Silakan coba lagi.');
        setLoading(false);
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('Terjadi kesalahan sistem. Silakan coba lagi.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#6B4226]/10 space-y-8">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#6B4226] flex items-center justify-center text-[#FFF8F0] font-serif text-2xl font-bold shadow-md">
            K
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#3E2723]">Admin Portal</h1>
          <p className="text-xs text-[#3E2723]/70">Masuk untuk mengelola katalog dan informasi toko KueKita</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-4 rounded-2xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#3E2723] uppercase tracking-wider">Email Admin</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3E2723]/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kuekita.com"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#3E2723] uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3E2723]/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#6B4226] hover:bg-[#3E2723] text-[#FFF8F0] py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 text-sm"
          >
            <span>{loading ? 'Memproses...' : 'Masuk Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-[#6B4226]/10">
          <Link href="/" className="text-xs text-[#6B4226] font-semibold hover:underline">
            ← Kembali ke Website Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
