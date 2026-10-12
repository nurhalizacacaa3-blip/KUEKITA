import React from 'react';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductDetailView } from '@/components/catalog/ProductDetailView';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { getStoreSettings, getProductBySlug, getProducts } from '@/server/catalog';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export const revalidate = 0;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const settings = await getStoreSettings();
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0] text-[#3E2723]">
      <Navbar storeName={settings.storeName} whatsappNumber={settings.whatsappNumber} />

      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#3E2723]/70 font-medium">
            <Link href="/" className="hover:text-[#6B4226]">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#3E2723]/40" />
            <Link href="/catalog" className="hover:text-[#6B4226]">Catalog</Link>
            <ChevronRight className="w-3 h-3 text-[#3E2723]/40" />
            <Link href={`/catalog?category=${product.categorySlug}`} className="hover:text-[#6B4226]">{product.categoryName}</Link>
            <ChevronRight className="w-3 h-3 text-[#3E2723]/40" />
            <span className="text-[#3E2723] font-semibold truncate">{product.name}</span>
          </nav>

          {/* Product Detail Main View */}
          <ProductDetailView product={product} whatsappNumber={settings.whatsappNumber} storeName={settings.storeName} />

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="pt-12 space-y-6">
              <div className="border-t border-[#6B4226]/10 pt-10">
                <h3 className="font-serif text-2xl font-bold text-[#3E2723] mb-6">Kue Serupa Lainnya</h3>
                <ProductGrid products={relatedProducts} whatsappNumber={settings.whatsappNumber} />
              </div>
            </div>
          )}
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
