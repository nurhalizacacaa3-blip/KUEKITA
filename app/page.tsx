import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, Sparkles, Heart, ShieldCheck, Clock, Award } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { getStoreSettings, getCategories, getProducts } from '@/server/catalog';

export const revalidate = 0; // Dynamic data

export default async function HomePage() {
  const settings = await getStoreSettings();
  const categories = await getCategories();
  const products = await getProducts();

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const featured = products.filter(p => p.isFeatured).slice(0, 4);

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Halo KueKita, saya ingin memesan kue.')}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0] text-[#3E2723]">
      <Navbar storeName={settings.storeName} whatsappNumber={settings.whatsappNumber} />

      <main className="flex-grow">
        {/* HERO SECTION - Sweet Editorial Bakery */}
        <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text content */}
              <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
                <div className="inline-flex items-center gap-2 bg-[#F3C6C0]/30 border border-[#F3C6C0] px-4 py-2 rounded-full text-xs font-semibold text-[#6B4226] tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Artisan Bakery & Cake Shop</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#3E2723] leading-[1.1]">
                  Freshly Baked <br />
                  <span className="italic font-normal text-[#6B4226]">For Every Moment</span>
                </h1>

                <p className="text-base sm:text-lg text-[#3E2723]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {settings.description || 'Temukan kue pilihan untuk ulang tahun, perayaan, hadiah, atau sekadar membuat hari menjadi lebih manis.'}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <Link
                    href="/catalog"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#6B4226] hover:bg-[#3E2723] text-[#FFF8F0] px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all active:scale-95"
                  >
                    <span>Lihat Katalog</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FFF8F0] text-[#6B4226] border border-[#6B4226]/30 px-8 py-4 rounded-full font-medium transition-all shadow-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Pesan Sekarang</span>
                  </a>
                </div>

                {/* Trust badges */}
                <div className="pt-8 grid grid-cols-3 gap-4 border-t border-[#6B4226]/10">
                  <div className="flex flex-col items-center lg:items-start">
                    <span className="font-serif text-xl font-bold text-[#3E2723]">100%</span>
                    <span className="text-xs text-[#3E2723]/70">Premium Butter</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start">
                    <span className="font-serif text-xl font-bold text-[#3E2723]">Fresh</span>
                    <span className="text-xs text-[#3E2723]/70">Baked Daily</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start">
                    <span className="font-serif text-xl font-bold text-[#3E2723]">Custom</span>
                    <span className="text-xs text-[#3E2723]/70">Order Available</span>
                  </div>
                </div>
              </div>

              {/* Hero Image / Editorial Visual */}
              <div className="lg:col-span-6 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="absolute -inset-4 bg-[#F3C6C0]/40 rounded-3xl blur-2xl transform -rotate-2 -z-10" />
                  <div className="relative aspect-[4/3] lg:aspect-[1/1] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#F3C6C0]/20">
                    <Image
                      src={settings.heroImageUrl || "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=1200&q=80"}
                      alt="Artisan Celebration Cake"
                      fill
                      priority
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Floating card */}
                  <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#6B4226]/10 hidden sm:flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#F3C6C0] flex items-center justify-center text-[#6B4226]">
                      🎂
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#3E2723]">Freshly Baked Today</h4>
                      <p className="text-xs text-[#3E2723]/70">Dibuat dengan bahan premium</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY SHOWCASE */}
        <section className="py-16 bg-white border-y border-[#6B4226]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#6B4226] font-semibold">Kategori Pilihan</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2723]">Find Your Sweet Favorite</h2>
              <p className="text-sm text-[#3E2723]/70">Pilih dari berbagai kategori kue lezat dan segar untuk menemani setiap suasana.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/catalog?category=${cat.slug}`}
                  className="group flex flex-col items-center bg-[#FFF8F0] p-6 rounded-2xl border border-[#6B4226]/10 hover:border-[#6B4226] transition-all duration-300 hover:shadow-lg text-center"
                >
                  <div className="w-20 h-20 rounded-full relative overflow-hidden mb-4 shadow-md bg-white border-2 border-white group-hover:scale-105 transition-transform">
                    <Image
                      src={cat.imageUrl}
                      alt={cat.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="font-serif font-bold text-[#3E2723] group-hover:text-[#6B4226] transition-colors">{cat.name}</h3>
                  <span className="text-xs text-[#3E2723]/60 mt-1">Jelajahi →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* BEST SELLER PRODUCTS */}
        <section className="py-16 bg-[#FFF8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#6B4226] font-semibold">Paling Diminati</span>
                <h2 className="font-serif text-3xl font-bold text-[#3E2723] mt-1">Most Loved Cakes</h2>
              </div>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B4226] hover:text-[#3E2723] transition-colors"
              >
                <span>Lihat Semua Katalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <ProductGrid products={bestSellers} whatsappNumber={settings.whatsappNumber} />
          </div>
        </section>

        {/* PROMOTION BANNER */}
        <section className="py-12 bg-[#3E2723] text-[#FFF8F0] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F3C6C0_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-[#6B4226]/60 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-[#F3C6C0]/20 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl text-center lg:text-left">
                <span className="bg-[#F7D774] text-[#3E2723] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Weekend Special Offer
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold">Special Selection For Your Sweet Weekend</h2>
                <p className="text-sm sm:text-base text-[#FFF8F0]/80">
                  Nikmati potongan spesial atau free delivery untuk pemesanan kue perayaan weekend ini. Hubungi admin kami melalui WhatsApp.
                </p>
              </div>
              <div className="shrink-0">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FFF8F0] hover:bg-[#F3C6C0] text-[#3E2723] px-8 py-4 rounded-full font-bold shadow-lg transition-all"
                >
                  <Phone className="w-5 h-5 text-[#6B4226]" />
                  <span>Klaim Promo via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* BRAND STORY */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-[#FFF8F0]">
                  <Image
                    src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1000&q=80"
                    alt="Bakery Kitchen"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs uppercase tracking-widest text-[#6B4226] font-semibold">Tentang KueKita</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2723] leading-tight">
                  Made With Love, Baked With Passion.
                </h2>
                <p className="text-sm sm:text-base text-[#3E2723]/80 leading-relaxed">
                  {settings.storeName} berawal dari kecintaan mendalam pada seni pembuatan kue klasik. Setiap resep diracik menggunakan bahan-bahan pilihan tanpa pengawet buatan, dipanggang setiap hari untuk memastikan kesegaran dan cita rasa terbaik di setiap gigitan.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-lg text-[#6B4226]">Bahan Premium</h3>
                    <p className="text-xs text-[#3E2723]/70">Mentega pilihan, cokelat import, dan buah segar berkualitas.</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-lg text-[#6B4226]">Selalu Fresh</h3>
                    <p className="text-xs text-[#3E2723]/70">Dipanggang sesuai pesanan (made to order) untuk menjaga kualitas.</p>
                  </div>
                </div>
                <div className="pt-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B4226] hover:underline"
                  >
                    <span>Baca Cerita Selengkapnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-20 bg-[#FFF8F0] text-center border-t border-[#6B4226]/10">
          <div className="max-w-3xl mx-auto px-4 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2723]">
              Ready To Make Your Day Sweeter?
            </h2>
            <p className="text-sm sm:text-base text-[#3E2723]/80 max-w-xl mx-auto">
              Pesan kue impianmu sekarang atau konsultasikan kebutuhan acara spesialmu langsung dengan baker kami.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/catalog"
                className="w-full sm:w-auto bg-[#6B4226] hover:bg-[#3E2723] text-[#FFF8F0] px-8 py-4 rounded-full font-medium shadow-lg transition-all"
              >
                Lihat Katalog Lengkap
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white hover:bg-[#FFF8F0] text-[#6B4226] border border-[#6B4226]/30 px-8 py-4 rounded-full font-medium transition-all"
              >
                Chat WhatsApp Admin
              </a>
            </div>
          </div>
        </section>
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
