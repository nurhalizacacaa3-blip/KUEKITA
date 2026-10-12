import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { getCategories } from '@/server/catalog';
import Link from 'next/link';
import { ArrowLeft, Save, Package } from 'lucide-react';

export const revalidate = 0;

export default async function AdminNewProductPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex">
      <AdminSidebar />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/products"
              className="p-2 rounded-full bg-white border border-[#6B4226]/20 text-[#3E2723] hover:bg-[#FFF8F0] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#6B4226] font-semibold">Tambah Produk</span>
              <h1 className="font-serif text-3xl font-bold text-[#3E2723]">Buat Produk Kue Baru</h1>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-[#6B4226]/10 p-8 space-y-6">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#3E2723] uppercase tracking-wider">Nama Produk</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Matcha Opera Cake"
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#3E2723] uppercase tracking-wider">Slug (URL)</label>
                  <input
                    type="text"
                    required
                    placeholder="matcha-opera-cake"
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#3E2723] uppercase tracking-wider">Kategori</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#3E2723] uppercase tracking-wider">Status Ketersediaan</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723]"
                  >
                    <option value="AVAILABLE">AVAILABLE (Tersedia)</option>
                    <option value="PRE_ORDER">PRE_ORDER (Pre-Order)</option>
                    <option value="SOLD_OUT">SOLD_OUT (Habis)</option>
                    <option value="INACTIVE">INACTIVE (Nonaktif)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#3E2723] uppercase tracking-wider">URL Gambar (Image URL)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=900&q=80"
                  className="w-full px-4 py-3 rounded-xl bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#3E2723] uppercase tracking-wider">Deskripsi Singkat</label>
                <input
                  type="text"
                  placeholder="Deskripsi singkat untuk card katalog..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#3E2723] uppercase tracking-wider">Deskripsi Lengkap</label>
                <textarea
                  rows={4}
                  placeholder="Deskripsi lengkap mengenai bahan, rasa, dan keunggulan kue..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#6B4226]/10">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#3E2723] uppercase tracking-wider">Nama Varian / Ukuran</label>
                  <input
                    type="text"
                    defaultValue="20 cm (Standard)"
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#3E2723] uppercase tracking-wider">Harga (Rupiah)</label>
                  <input
                    type="number"
                    defaultValue="275000"
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#6B4226]/10 flex justify-end gap-4">
                <Link
                  href="/admin/products"
                  className="px-6 py-3.5 rounded-xl border border-[#6B4226]/20 text-[#3E2723] text-sm font-medium hover:bg-[#FFF8F0]"
                >
                  Batal
                </Link>
                <button
                  type="button"
                  onClick={() => alert('Produk berhasil disimpan!')}
                  className="inline-flex items-center gap-2 bg-[#6B4226] hover:bg-[#3E2723] text-[#FFF8F0] px-8 py-3.5 rounded-xl font-medium shadow-md transition-all text-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Produk Baru</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
