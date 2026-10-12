'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, ArrowRight, Sparkles } from 'lucide-react';
import { MockProduct } from '@/lib/mock-data';

interface ProductCardProps {
  product: MockProduct;
  whatsappNumber?: string;
}

export function ProductCard({ product, whatsappNumber = '085348492242' }: ProductCardProps) {
  const defaultVariant = product.variants.find(v => v.isDefault) || product.variants[0];
  const priceFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(
    parseFloat(defaultVariant?.price || '0')
  );

  const handleQuickWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const isPreOrder = product.status === 'PRE_ORDER';
    const message = encodeURIComponent(
      `Halo KueKita,\n\nSaya ingin ${isPreOrder ? 'melakukan pre-order' : 'memesan'}:\n\nProduk: ${product.name}\nVarian: ${defaultVariant?.name || 'Standard'}\nHarga: ${priceFormatted}\n\nApakah produk ini tersedia? Terima kasih.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const getStatusBadge = () => {
    switch (product.status) {
      case 'SOLD_OUT':
        return <span className="bg-[#3E2723]/80 text-[#FFF8F0] text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wide">Habis</span>;
      case 'PRE_ORDER':
        return <span className="bg-[#F7D774] text-[#3E2723] text-[10px] px-2.5 py-1 rounded-full font-bold tracking-wide">Pre-Order</span>;
      default:
        if (product.isBestSeller) {
          return <span className="bg-[#F3C6C0] text-[#3E2723] text-[10px] px-2.5 py-1 rounded-full font-bold tracking-wide">Best Seller</span>;
        }
        return <span className="bg-[#FFF8F0]/90 text-[#6B4226] text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wide">Ready</span>;
    }
  };

  return (
    <Link href={`/catalog/${product.slug}`} className="group block h-full" aria-label={`Lihat produk ${product.name}`}>
      <div className="bg-white rounded-[28px] overflow-hidden shadow-[0_20px_40px_rgba(62,39,35,0.08)] hover:shadow-[0_26px_55px_rgba(62,39,35,0.14)] transition-all duration-300 border border-[#6B4226]/10 flex flex-col h-full transform group-hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden bg-[#FFF8F0]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/30 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {getStatusBadge()}
          </div>
          {product.categoryName && (
            <div className="absolute bottom-3 left-3 z-10">
              <span className="bg-[#FFF8F0]/90 backdrop-blur-sm text-[#3E2723] text-[10px] uppercase tracking-[0.2em] px-2.5 py-1.5 rounded-full font-bold">
                {product.categoryName}
              </span>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-grow justify-between bg-white">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#3E2723] group-hover:text-[#6B4226] transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-[#3E2723]/70 mt-2 line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-[#FFF1E7] flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#6B4226]/75 block font-semibold">Mulai dari</span>
              <span className="font-serif text-xl font-bold text-[#3E2723]">{priceFormatted}</span>
            </div>

            {product.status === 'SOLD_OUT' ? (
              <span className="text-xs text-stone-400 font-semibold px-3 py-2 rounded-full bg-stone-100">Sold Out</span>
            ) : (
              <button
                onClick={handleQuickWhatsApp}
                className="bg-[#FFF8F0] hover:bg-[#6B4226] text-[#6B4226] hover:text-[#FFF8F0] p-2.5 rounded-2xl transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 text-xs font-bold"
                title="Pesan via WhatsApp"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pesan</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
