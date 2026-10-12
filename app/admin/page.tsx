import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { getProducts, getCategories } from '@/server/catalog';
import { Package, FolderTree, Tag, AlertCircle, Clock, CheckCircle2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const products = await getProducts();
  const categories = await getCategories();

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'AVAILABLE').length;
  const soldOutProducts = products.filter(p => p.status === 'SOLD_OUT').length;
  const preOrderProducts = products.filter(p => p.status === 'PRE_ORDER').length;
  const totalCategories = categories.length;

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex">
      <AdminSidebar />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#6B4226] font-semibold">Dashboard Overview</span>
              <h1 className="font-serif text-3xl font-bold text-[#3E2723] mt-1">Selamat Datang, Admin</h1>
              <p className="text-sm text-[#3E2723]/70">Ringkasan performa dan katalog KueKita hari ini.</p>
            </div>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center justify-center gap-2 bg-[#6B4226] hover:bg-[#3E2723] text-[#FFF8F0] px-6 py-3 rounded-xl font-medium shadow-md transition-all text-sm"
            >
              <span>+ Tambah Produk Baru</span>
            </Link>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#6B4226]/10 space-y-2">
              <div className="flex items-center justify-between text-[#6B4226]">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Produk</span>
                <Package className="w-5 h-5" />
              </div>
              <div className="font-serif text-3xl font-bold text-[#3E2723]">{totalProducts}</div>
              <p className="text-xs text-[#3E2723]/60">Semua produk dalam katalog</p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#6B4226]/10 space-y-2">
              <div className="flex items-center justify-between text-emerald-600">
                <span className="text-xs font-semibold uppercase tracking-wider">Produk Aktif</span>
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="font-serif text-3xl font-bold text-[#3E2723]">{activeProducts}</div>
              <p className="text-xs text-[#3E2723]/60">Siap dipesan customer</p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#6B4226]/10 space-y-2">
              <div className="flex items-center justify-between text-amber-600">
                <span className="text-xs font-semibold uppercase tracking-wider">Pre-Order</span>
                <Clock className="w-5 h-5" />
              </div>
              <div className="font-serif text-3xl font-bold text-[#3E2723]">{preOrderProducts}</div>
              <p className="text-xs text-[#3E2723]/60">Produk sistem pre-order</p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#6B4226]/10 space-y-2">
              <div className="flex items-center justify-between text-rose-600">
                <span className="text-xs font-semibold uppercase tracking-wider">Sold Out</span>
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="font-serif text-3xl font-bold text-[#3E2723]">{soldOutProducts}</div>
              <p className="text-xs text-[#3E2723]/60">Stok habis sementara</p>
            </div>
          </div>

          {/* Quick Actions / Recent Products */}
          <div className="bg-white rounded-3xl shadow-sm border border-[#6B4226]/10 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-[#3E2723]">Produk Terbaru di Katalog</h2>
              <Link href="/admin/products" className="text-xs font-semibold text-[#6B4226] hover:underline flex items-center gap-1">
                <span>Kelola Semua Produk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-[#6B4226]/10">
              {products.slice(0, 5).map((product) => {
                const defaultVariant = product.variants.find(v => v.isDefault) || product.variants[0];
                const priceFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(
                  parseFloat(defaultVariant?.price || '0')
                );
                return (
                  <div key={product.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FFF8F0] relative overflow-hidden shrink-0 border border-[#6B4226]/10">
                        <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#3E2723]">{product.name}</h4>
                        <span className="text-xs text-[#3E2723]/60">{product.categoryName} • {priceFormatted}</span>
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      product.status === 'AVAILABLE' ? 'bg-emerald-50 text-emerald-700' :
                      product.status === 'PRE_ORDER' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
