import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getStoreSettings } from '@/server/catalog';
import { Phone, MapPin, Clock, Instagram, Sparkles, MessageSquare } from 'lucide-react';

export const revalidate = 0;

export default async function ContactPage() {
  const settings = await getStoreSettings();
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(`Halo ${settings.storeName}, saya ingin bertanya mengenai pemesanan kue.`)}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0] text-[#3E2723]">
      <Navbar storeName={settings.storeName} whatsappNumber={settings.whatsappNumber} />

      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#6B4226] font-semibold">Hubungi Kami</span>
            <h1 className="font-serif text-4xl font-bold text-[#3E2723]">Let&apos;s Bake Something Sweet Together</h1>
            <p className="text-sm text-[#3E2723]/70">
              Punya pertanyaan seputar produk, custom cake, atau pesanan hampers? Tim kami siap membantu Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* WhatsApp Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#6B4226]/10 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F3C6C0]/40 flex items-center justify-center text-[#6B4226]">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#3E2723]">WhatsApp Order</h3>
              <p className="text-xs text-[#3E2723]/70 leading-relaxed">
                Cara tercepat untuk memesan dan berkonsultasi langsung dengan baker kami.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#6B4226] hover:bg-[#3E2723] text-[#FFF8F0] py-3.5 rounded-xl font-medium shadow-md transition-all text-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat WhatsApp</span>
              </a>
            </div>

            {/* Address Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#6B4226]/10 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F3C6C0]/40 flex items-center justify-center text-[#6B4226]">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#3E2723]">Lokasi Toko</h3>
              <p className="text-xs text-[#3E2723]/70 leading-relaxed">
                {settings.address || 'Jl. Senopati Raya No. 45, Jakarta Selatan'}
              </p>
              <div className="pt-4 text-xs font-semibold text-[#6B4226]">
                Kunjungi store atau pick-up pesanan Anda
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#6B4226]/10 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F3C6C0]/40 flex items-center justify-center text-[#6B4226]">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#3E2723]">Jam Operasional</h3>
              <p className="text-xs text-[#3E2723]/70 leading-relaxed">
                {settings.operatingHours || 'Senin - Minggu: 08:00 - 20:00 WIB'}
              </p>
              <div className="pt-4 text-xs font-semibold text-[#6B4226]">
                Buka setiap hari
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
