import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getStoreSettings } from '@/server/catalog';
import Image from 'next/image';
import { Sparkles, Heart, Award, CheckCircle } from 'lucide-react';

export const revalidate = 0;

export default async function AboutPage() {
  const settings = await getStoreSettings();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0] text-[#3E2723]">
      <Navbar storeName={settings.storeName} whatsappNumber={settings.whatsappNumber} />

      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#6B4226] font-semibold">Cerita Kami</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#3E2723]">
              Artisan Baking With Love & Tradition
            </h1>
            <p className="text-base text-[#3E2723]/80 leading-relaxed">
              {settings.storeName} hadir untuk merayakan setiap momen berharga dalam hidup Anda melalui kelezatan kue buatan tangan berkualitas tinggi.
            </p>
          </div>

          {/* Story Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-serif text-3xl font-bold text-[#3E2723]">
                Dari Dapur Rumahan Menuju Perayaan Spesial Anda
              </h2>
              <p className="text-sm text-[#3E2723]/80 leading-relaxed">
                Berdiri dari hasrat besar untuk menyajikan kue rumahan yang lezat, bersih, dan menggunakan bahan-bahan premium tanpa kompromi. Kami percaya bahwa kue bukan sekadar makanan pencuci mulut, melainkan simbol kehangatan dan kebahagiaan.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#6B4226] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#3E2723]/90"><strong className="font-semibold">Bahan Berkualitas Tinggi:</strong> Menggunakan pure French butter, cokelat import pilihan, dan buah segar setiap hari.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#6B4226] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#3E2723]/90"><strong className="font-semibold">Freshly Baked:</strong> Setiap pesanan dipanggang sesuai jadwal untuk memastikan tekstur dan aroma terbaik saat diterima.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#6B4226] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#3E2723]/90"><strong className="font-semibold">Higienis & Aman:</strong> Diproduksi dengan standar kebersihan tinggi di dapur artisan profesional.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#F3C6C0]/20">
                <Image
                  src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80"
                  alt="KueKita Kitchen"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer
        storeName={settings.storeName}
        tagline={settings.tagline}
        description={settings.description || undefined}
        whatsappNumber={settings.whatsappNumber}
        instagramUrl={settings.instagramUrl || undefined}
        address={settings.address || undefined}
        operatingHours={settings.operatingHours || undefined}
      />
    </div>
  );
}
