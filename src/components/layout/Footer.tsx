import React from 'react';
import Link from 'next/link';
import { Phone, Instagram, MapPin, Clock, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  storeName?: string;
  tagline?: string;
  description?: string;
  whatsappNumber?: string;
  instagramUrl?: string;
  address?: string;
  operatingHours?: string;
}

export function Footer({
  storeName = 'KueKita',
  tagline = 'Freshly Baked For Every Moment',
  description = 'Artisan bakery pilihan keluarga untuk setiap momen spesial.',
  whatsappNumber = '085348492242',
  instagramUrl = 'https://instagram.com',
  address = 'Jl. Senopati Raya No. 45, Jakarta Selatan',
  operatingHours = 'Senin - Minggu: 08:00 - 20:00 WIB',
}: FooterProps) {
  return (
    <footer className="bg-[#3E2723] text-[#FFF8F0] pt-16 pb-12 border-t border-[#6B4226]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#F3C6C0] text-[#3E2723] flex items-center justify-center font-serif text-xl font-bold">
                K
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">{storeName}</span>
            </div>
            <p className="text-sm text-[#FFF8F0]/80 leading-relaxed">{description}</p>
            <p className="text-xs italic text-[#F7D774] font-medium">{tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-[#F7D774] border-b border-[#6B4226] pb-2">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#F7D774] transition-colors">Beranda</Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#F7D774] transition-colors">Katalog Kue</Link>
              </li>
              <li>
                <Link href="/category/cake" className="hover:text-[#F7D774] transition-colors">Kategori Cake & Brownies</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F7D774] transition-colors">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F7D774] transition-colors">Hubungi Kami</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-[#F7D774] border-b border-[#6B4226] pb-2">Kategori Favorit</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/catalog?category=cake" className="hover:text-[#F7D774] transition-colors">Birthday & Celebration Cake</Link></li>
              <li><Link href="/catalog?category=brownies" className="hover:text-[#F7D774] transition-colors">Fudge Brownies</Link></li>
              <li><Link href="/catalog?category=cookies" className="hover:text-[#F7D774] transition-colors">Artisan Cookies</Link></li>
              <li><Link href="/catalog?category=dessert" className="hover:text-[#F7D774] transition-colors">Dessert Box & Slice</Link></li>
              <li><Link href="/catalog?category=hampers" className="hover:text-[#F7D774] transition-colors">Exclusive Hampers</Link></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-[#F7D774] border-b border-[#6B4226] pb-2">Hubungi & Lokasi</h3>
            <ul className="space-y-3 text-sm text-[#FFF8F0]/90">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F3C6C0] shrink-0 mt-1" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F3C6C0] shrink-0" />
                <span>{operatingHours}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F3C6C0] shrink-0" />
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#F7D774]">
                  +{whatsappNumber} (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#F3C6C0] shrink-0" />
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#F7D774]">
                  Instagram KueKita
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#6B4226]/40 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFF8F0]/70 gap-4">
          <p>© {new Date().getFullYear()} {storeName}. All rights reserved. Freshly Baked For Every Moment.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#F3C6C0] fill-current" />
            <span>for sweet celebrations.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
