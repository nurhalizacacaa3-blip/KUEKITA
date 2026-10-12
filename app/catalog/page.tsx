import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { getStoreSettings, getCategories, getProducts } from '@/server/catalog';
import { Search } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; sort?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search || '';
  const category = resolvedSearchParams.category || 'all';
  const sort = resolvedSearchParams.sort || 'latest';

  const settings = await getStoreSettings();
  const categories = await getCategories();
  const products = await getProducts({ search, category, sort });

  const categoryList = [{ name: 'Semua Produk', slug: 'all' }, ...categories];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0] text-[#3E2723]">
      <Navbar storeName={settings.storeName} whatsappNumber={settings.whatsappNumber} />

      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#6B4226] font-semibold">Katalog Resmi</span>
            <h1 className="font-serif text-4xl font-bold text-[#3E2723]">Koleksi Kue Pilihan</h1>
            <p className="text-sm text-[#3E2723]/70">
              Temukan kue, brownies, cookies, dan dessert terbaik yang dipanggang segar setiap hari untuk momen spesialmu.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#6B4226]/10 mb-8 space-y-6">
            <form method="GET" action="/catalog" className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Input */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3E2723]/40" />
                <input
                  type="text"
                  name="search"
                  defaultValue={search}
                  placeholder="Cari kue favoritmu..."
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723]"
                />
                {category !== 'all' && <input type="hidden" name="category" value={category} />}
                {sort !== 'latest' && <input type="hidden" name="sort" value={sort} />}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <span className="text-xs text-[#3E2723]/70 font-medium whitespace-nowrap">Urutkan:</span>
                <div className="flex items-center gap-2">
                  <select
                    name="sort"
                    defaultValue={sort}
                    className="px-4 py-2.5 rounded-full bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723] font-medium"
                  >
                    <option value="latest">Terbaru</option>
                    <option value="lowest_price">Harga Terendah</option>
                    <option value="highest_price">Harga Tertinggi</option>
                    <option value="popular">Terpopuler</option>
                  </select>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-full bg-[#6B4226] text-[#FFF8F0] text-sm font-medium shadow-sm hover:bg-[#3E2723] transition-colors"
                  >
                    Terapkan
                  </button>
                </div>
              </div>
            </form>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categoryList.map((cat) => {
                const isActive = category === cat.slug;
                const href = `/catalog?${search ? `search=${encodeURIComponent(search)}&` : ''}category=${cat.slug}${sort !== 'latest' ? `&sort=${sort}` : ''}`;
                return (
                  <Link
                    key={cat.slug}
                    href={href}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#6B4226] text-[#FFF8F0] shadow-md'
                        : 'bg-[#FFF8F0] text-[#3E2723] hover:bg-[#F3C6C0]/30 border border-[#6B4226]/10'
                    }`}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Product Results */}
          <div className="mb-4 flex items-center justify-between text-xs text-[#3E2723]/70 px-2">
            <span>Menampilkan {products.length} produk kue</span>
            {(search || category !== 'all') && (
              <Link href="/catalog" className="text-[#6B4226] font-semibold hover:underline">
                Reset Filter
              </Link>
            )}
          </div>

          <ProductGrid products={products} whatsappNumber={settings.whatsappNumber} />
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
