'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, CheckCircle, Clock, ShieldCheck, ArrowLeft, Sparkles, Heart } from 'lucide-react';
import { MockProduct } from '@/lib/mock-data';

interface ProductDetailViewProps {
  product: MockProduct;
  whatsappNumber?: string;
  storeName?: string;
}

export function ProductDetailView({ product, whatsappNumber = '085348492242', storeName = 'KueKita' }: ProductDetailViewProps) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.find(v => v.isDefault) || product.variants[0]
  );

  const priceFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(
    parseFloat(selectedVariant?.price || '0')
  );

  const handleWhatsAppOrder = () => {
    const isPreOrder = product.status === 'PRE_ORDER';
    const message = encodeURIComponent(
      `Halo ${storeName},\n\nSaya ingin ${isPreOrder ? 'melakukan pre-order' : 'memesan'} produk berikut:\n\n*Produk:* ${product.name}\n*Varian:* ${selectedVariant?.name || 'Standard'}\n*Harga:* ${priceFormatted}\n\nApakah produk ini masih tersedia untuk pengiriman/pickup?\n\nTerima kasih.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-[0_25px_60px_rgba(62,39,35,0.08)] border border-[#6B4226]/10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <Link href="/catalog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B4226] hover:text-[#3E2723] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Katalog
        </Link>
        <div className="flex items-center gap-2 rounded-full bg-[#FFF8F0] border border-[#6B4226]/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B4226]">
          <Sparkles className="w-3.5 h-3.5" />
          {product.categoryName || 'Kue Spesial'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <div className="lg:col-span-6">
          <div className="relative aspect-square rounded-[28px] overflow-hidden bg-[#FFF8F0] shadow-inner border border-[#6B4226]/10">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              priority
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            {product.status === 'SOLD_OUT' && (
              <div className="absolute inset-0 bg-[#3E2723]/60 backdrop-blur-[2px] flex items-center justify-center">
                <span className="bg-white text-[#3E2723] font-serif font-bold text-lg px-6 py-3 rounded-2xl shadow-xl">
                  SOLD OUT / STOK HABIS
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <span className="bg-[#FFF8F0] text-[#6B4226] border border-[#6B4226]/20 text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-[0.2em]">
                {product.categoryName || 'Kue Spesial'}
              </span>
              {product.status === 'PRE_ORDER' && (
                <span className="bg-[#F7D774] text-[#3E2723] text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-[0.2em]">
                  Pre-Order
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3E2723] leading-tight">
              {product.name}
            </h1>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#6B4226]">{priceFormatted}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-[#3E2723]/80">
            <div className="flex items-center gap-2 bg-[#FFF8F0] rounded-2xl p-3 border border-[#6B4226]/10">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Bahan Premium</span>
            </div>
            <div className="flex items-center gap-2 bg-[#FFF8F0] rounded-2xl p-3 border border-[#6B4226]/10">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Fresh Daily</span>
            </div>
            <div className="flex items-center gap-2 bg-[#FFF8F0] rounded-2xl p-3 border border-[#6B4226]/10 col-span-2">
              <ShieldCheck className="w-4 h-4 text-[#6B4226]" />
              <span>Dipanggang dengan standar kebersihan dan cita rasa terbaik</span>
            </div>
          </div>

          <div className="border-t border-b border-[#6B4226]/10 py-6 space-y-4">
            <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3E2723]/60">Pilih Varian / Ukuran</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.variants.map((variant) => {
                const isSelected = selectedVariant.id === variant.id;
                const vPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(parseFloat(variant.price));
                return (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`flex flex-col p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#6B4226] bg-[#FFF8F0] shadow-sm ring-2 ring-[#6B4226]/15'
                        : 'border-[#6B4226]/15 hover:border-[#6B4226]/40 bg-white'
                    }`}
                  >
                    <span className="font-serif font-bold text-[#3E2723] text-lg">{variant.name}</span>
                    <span className="text-xs font-semibold text-[#6B4226] mt-1">{vPrice}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#3E2723]/60">Deskripsi Produk</h3>
            <p className="text-sm text-[#3E2723]/80 leading-relaxed">{product.description}</p>
          </div>

          <div className="pt-2 space-y-3">
            {product.status === 'SOLD_OUT' ? (
              <div className="p-4 bg-stone-100 text-stone-600 rounded-2xl text-center text-sm font-medium">
                Maaf, saat ini produk sedang habis. Silakan pilih produk lainnya atau hubungi admin untuk konfirmasi stok berikutnya.
              </div>
            ) : (
              <button
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-3 bg-[#6B4226] hover:bg-[#3E2723] text-[#FFF8F0] py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 text-base"
              >
                <Phone className="w-5 h-5" />
                <span>Pesan Sekarang via WhatsApp</span>
              </button>
            )}
            <p className="text-center text-[11px] text-[#3E2723]/60">
              Pemesanan akan langsung terhubung ke WhatsApp resmi {storeName}. Tanpa ribet, cepat & aman.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
