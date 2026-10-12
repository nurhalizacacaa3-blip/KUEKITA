import { db } from '@/db';
import { categories, products, productVariants, storeSettings, promotions } from '@/db/schema';
import { eq, ilike, or, and, desc, asc, isNull } from 'drizzle-orm';
import { MOCK_CATEGORIES, MOCK_PRODUCTS, DEFAULT_STORE_SETTINGS, MockProduct, MockCategory } from '@/lib/mock-data';

function hasDatabase(): boolean {
  return !!db;
}

export async function getStoreSettings() {
  if (!hasDatabase()) {
    return DEFAULT_STORE_SETTINGS;
  }

  const database = db!;

  try {
    const settings = await database.select().from(storeSettings).limit(1);
    if (settings && settings.length > 0) {
      return settings[0];
    }
  } catch (error) {
    console.warn('Database error or not migrated yet, using default store settings:', error);
  }
  return DEFAULT_STORE_SETTINGS;
}

export async function getCategories(): Promise<MockCategory[]> {
  if (!hasDatabase()) {
    return MOCK_CATEGORIES;
  }

  const database = db!;

  try {
    const cats = await database.select().from(categories).where(eq(categories.isActive, true)).orderBy(asc(categories.sortOrder));
    if (cats && cats.length > 0) {
      return cats.map(c => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description || '',
        imageUrl: c.imageUrl || 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=800&q=80',
        sortOrder: c.sortOrder,
        isActive: c.isActive,
      }));
    }
  } catch (error) {
    console.warn('Database error, using mock categories:', error);
  }
  return MOCK_CATEGORIES;
}

export async function getProducts(filters?: {
  search?: string;
  category?: string;
  sort?: string;
  featured?: boolean;
  bestSeller?: boolean;
}): Promise<MockProduct[]> {
  if (!hasDatabase()) {
    const results = [...MOCK_PRODUCTS];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      return results.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (filters?.category && filters.category !== 'all') {
      return results.filter(p => p.categorySlug === filters.category);
    }
    if (filters?.featured) {
      return results.filter(p => p.isFeatured);
    }
    if (filters?.bestSeller) {
      return results.filter(p => p.isBestSeller);
    }

    return results;
  }

  const database = db!;

  try {
    const dbCats = await database.select().from(categories);
    const catMap = new Map(dbCats.map(c => [c.id, { name: c.name, slug: c.slug }]));

    const dbProducts = await database.select().from(products).where(isNull(products.deletedAt));
    const dbVariants = await database.select().from(productVariants);

    const variantMap = new Map<number, any[]>();
    for (const v of dbVariants) {
      const list = variantMap.get(v.productId) || [];
      list.push({
        id: v.id,
        productId: v.productId,
        name: v.name,
        price: v.price.toString(),
        isDefault: v.isDefault,
      });
      variantMap.set(v.productId, list);
    }

    let formatted: MockProduct[] = dbProducts.map(p => {
      const cat = catMap.get(p.categoryId) || { name: 'Cake', slug: 'cake' };
      return {
        id: p.id,
        categoryId: p.categoryId,
        name: p.name,
        slug: p.slug,
        shortDescription: p.shortDescription || '',
        description: p.description || '',
        imageUrl: p.imageUrl || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
        status: p.status as any,
        isFeatured: p.isFeatured,
        isBestSeller: p.isBestSeller,
        categoryName: cat.name,
        categorySlug: cat.slug,
        variants: variantMap.get(p.id) || [{ id: p.id * 100, productId: p.id, name: 'Standard', price: '100000', isDefault: true }],
      };
    });

    if (formatted.length > 0) {
      if (filters?.search) {
        const q = filters.search.toLowerCase();
        formatted = formatted.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      }
      if (filters?.category && filters.category !== 'all') {
        formatted = formatted.filter(p => p.categorySlug === filters.category);
      }
      if (filters?.featured) {
        formatted = formatted.filter(p => p.isFeatured);
      }
      if (filters?.bestSeller) {
        formatted = formatted.filter(p => p.isBestSeller);
      }

      if (filters?.sort === 'lowest_price') {
        formatted.sort((a, b) => parseFloat(a.variants[0]?.price || '0') - parseFloat(b.variants[0]?.price || '0'));
      } else if (filters?.sort === 'highest_price') {
        formatted.sort((a, b) => parseFloat(b.variants[0]?.price || '0') - parseFloat(a.variants[0]?.price || '0'));
      } else if (filters?.sort === 'popular') {
        formatted.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
      } else {
        formatted.sort((a, b) => b.id - a.id);
      }

      return formatted;
    }
  } catch (error) {
    console.warn('Database error or empty products table, using mock products:', error);
  }

  let results = [...MOCK_PRODUCTS];
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  if (filters?.category && filters.category !== 'all') {
    results = results.filter(p => p.categorySlug === filters.category);
  }
  if (filters?.featured) {
    results = results.filter(p => p.isFeatured);
  }
  if (filters?.bestSeller) {
    results = results.filter(p => p.isBestSeller);
  }
  return results;
}

export async function getProductBySlug(slug: string): Promise<MockProduct | null> {
  const all = await getProducts();
  const found = all.find(p => p.slug === slug);
  return found || null;
}
