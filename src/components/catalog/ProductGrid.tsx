import React from 'react';
import { ProductCard } from './ProductCard';
import { MockProduct } from '@/lib/mock-data';

interface ProductGridProps {
  products: MockProduct[];
  whatsappNumber?: string;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  whatsappNumber = '085348492242',
  emptyMessage = 'Belum ada produk yang tersedia dalam kategori ini.',
}: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-[#6B4226]/20 p-8 my-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFF8F0] flex items-center justify-center text-[#6B4226] text-2xl font-serif">
          🍰
        </div>
        <h3 className="font-serif text-xl font-bold text-[#3E2723] mb-2">Produk Tidak Ditemukan</h3>
        <p className="text-[#3E2723]/70 text-sm max-w-md mx-auto">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} whatsappNumber={whatsappNumber} />
      ))}
    </div>
  );
}
