import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { getCategories } from '@/server/catalog';
import { FolderTree, Plus, Edit } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex">
      <AdminSidebar />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#6B4226] font-semibold">Manajemen Kategori</span>
              <h1 className="font-serif text-3xl font-bold text-[#3E2723] mt-1">Daftar Kategori Kue</h1>
              <p className="text-sm text-[#3E2723]/70">Atur kategori produk kue untuk memudahkan navigasi customer.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-[#6B4226]/10 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FFF8F0] border-b border-[#6B4226]/10 text-xs font-semibold text-[#3E2723] uppercase tracking-wider">
                  <th className="py-4 px-6">Kategori</th>
                  <th className="py-4 px-6">Slug</th>
                  <th className="py-4 px-6">Deskripsi</th>
                  <th className="py-4 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#6B4226]/10 text-sm text-[#3E2723]">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-[#FFF8F0]/50 transition-colors">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FFF8F0] relative overflow-hidden shrink-0 border border-[#6B4226]/10">
                        <img src={cat.imageUrl} alt={cat.name} className="object-cover w-full h-full" />
                      </div>
                      <span className="font-serif font-bold text-[#3E2723]">{cat.name}</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-[#3E2723]/70 font-mono">{cat.slug}</td>
                    <td className="py-4 px-6 text-xs text-[#3E2723]/80">{cat.description}</td>
                    <td className="py-4 px-6 text-right">
                      <span className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
