import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Tag, Plus } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminPromotionsPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] flex">
      <AdminSidebar />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#6B4226] font-semibold">Manajemen Promo</span>
              <h1 className="font-serif text-3xl font-bold text-[#3E2723] mt-1">Daftar Promo & Diskon</h1>
              <p className="text-sm text-[#3E2723]/70">Atur banner promosi spesial dan penawaran weekend.</p>
            </div>
            <button
              onClick={() => alert('Fitur tambah promo aktif')}
              className="inline-flex items-center justify-center gap-2 bg-[#6B4226] hover:bg-[#3E2723] text-[#FFF8F0] px-6 py-3 rounded-xl font-medium shadow-md transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Promo Baru</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-[#6B4226]/10 p-12 text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#FFF8F0] flex items-center justify-center text-[#6B4226] text-2xl">
              🏷️
            </div>
            <h3 className="font-serif text-xl font-bold text-[#3E2723]">Belum Ada Promo Aktif</h3>
            <p className="text-xs text-[#3E2723]/70 max-w-sm mx-auto">
              Buat promo spesial weekend atau diskon musiman untuk menarik lebih banyak pesanan WhatsApp.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
