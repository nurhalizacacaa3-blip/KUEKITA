'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag, Heart, Search, Phone, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  storeName?: string;
  whatsappNumber?: string;
}

export function Navbar({ storeName = 'KueKita', whatsappNumber = '085348492242' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/catalog' },
    { name: 'Kategori', href: '/category/cake' },
    { name: 'Tentang', href: '/about' },
    { name: 'Kontak', href: '/contact' },
  ];

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(`Halo ${storeName}, saya ingin bertanya mengenai pemesanan kue.`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#FFF8F0]/95 backdrop-blur-md shadow-sm py-3' : 'bg-[#FFF8F0] py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-[#6B4226] flex items-center justify-center text-[#FFF8F0] font-serif text-xl font-bold shadow-md group-hover:scale-105 transition-transform">
              K
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-[#3E2723] tracking-tight">{storeName}</span>
              <span className="text-[10px] uppercase tracking-widest text-[#6B4226] font-medium -mt-1">Artisan Bakery</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[#6B4226] relative py-1 ${
                    isActive ? 'text-[#6B4226] font-semibold' : 'text-[#3E2723]/80'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6B4226]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/catalog"
              className="p-2 text-[#3E2723] hover:text-[#6B4226] transition-colors rounded-full hover:bg-[#F3C6C0]/20"
              title="Cari Produk"
            >
              <Search className="w-5 h-5" />
            </Link>

            <button
              onClick={handleWhatsAppOrder}
              className="inline-flex items-center gap-2 bg-[#6B4226] hover:bg-[#3E2723] text-[#FFF8F0] px-5 py-2.5 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Pesan Sekarang</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={handleWhatsAppOrder}
              className="bg-[#6B4226] text-[#FFF8F0] p-2 rounded-full shadow-sm"
              title="WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#3E2723] rounded-lg hover:bg-[#F3C6C0]/20"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FFF8F0] border-b border-[#3E2723]/10 px-4 pt-2 pb-6 space-y-3 shadow-xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  pathname === link.href ? 'bg-[#6B4226] text-[#FFF8F0]' : 'text-[#3E2723] hover:bg-[#F3C6C0]/20'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleWhatsAppOrder();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#6B4226] text-[#FFF8F0] py-3 rounded-xl font-medium shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Pesan via WhatsApp</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
