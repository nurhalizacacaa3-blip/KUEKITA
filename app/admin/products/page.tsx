import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { getProducts, getCategories } from '@/server/catalog';
import Link from 'next/link';
import { Package, Plus, Edit, Trash2, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex">
      <AdminSidebar />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#6B4226] font-semibold">Manajemen Katalog</span>
              <h1 className="font-serif text-3xl font-bold text-[#3E2723] mt-1">Daftar Produk Kue</h1>
              <p className="text-sm text-[#3E2723]/70">Kelola produk, harga, varian, dan status ketersediaan kue.</p>
            </div>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center justify-center gap-2 bg-[#6B4226] hover:bg-[#3E2723] text-[#FFF8F0] px-6 py-3 rounded-xl font-medium shadow-md transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk Baru</span>
            </Link>
          </div>

          {/* Products Table Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-[#6B4226]/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FFF8F0] border-b border-[#6B4226]/10 text-xs font-semibold text-[#3E2723] uppercase tracking-wider">
                    <th className="py-4 px-6">Produk</th>
                    <th className="py-4 px-6">Kategori</th>
                    <th className="py-4 px-6">Harga Utama</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#6B4226]/10 text-sm text-[#3E2723]">
                  {products.map((product) => {
                    const defaultVariant = product.variants.find(v => v.isDefault) || product.variants[0];
                    const priceFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(
                      parseFloat(defaultVariant?.price || '0')
                    );
                    return (
                      <tr key={product.id} className="hover:bg-[#FFF8F0]/50 transition-colors">
                        <td className="py-4 px-6 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#FFF8F0] relative overflow-hidden shrink-0 border border-[#6B4226]/10">
                            <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
                          </div>
                          <div>
                            <span className="font-serif font-bold block text-[#3E2723]">{product.name}</span>
                            <span className="text-xs text-[#3E2723]/60">Slug: {product.slug}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="bg-[#FFF8F0] text-[#6B4226] border border-[#6B4226]/20 px-3 py-1 rounded-md text-xs font-semibold">
                            {product.categoryName}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-serif font-bold text-[#6B4226]">
                          {priceFormatted}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium ${
                            product.status === 'AVAILABLE' ? 'bg-emerald-50 text-emerald-700' :
                            product.status === 'PRE_ORDER' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FFF8F0] hover:bg-[#6B4226] text-[#6B4226] hover:text-[#FFF8F0] rounded-lg text-xs font-medium transition-all"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
