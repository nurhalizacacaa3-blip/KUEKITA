export interface MockCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
}

export interface MockVariant {
  id: number;
  productId: number;
  name: string;
  price: string;
  isDefault: boolean;
}

export interface MockProduct {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  status: 'AVAILABLE' | 'SOLD_OUT' | 'PRE_ORDER' | 'INACTIVE';
  isFeatured: boolean;
  isBestSeller: boolean;
  variants: MockVariant[];
  categoryName?: string;
  categorySlug?: string;
}

export const MOCK_CATEGORIES: MockCategory[] = [
  { id: 1, name: 'Cake', slug: 'cake', description: 'Kue ulang tahun, anniversary, dan perayaan spesial.', imageUrl: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=800&q=80', sortOrder: 1, isActive: true },
  { id: 2, name: 'Brownies', slug: 'brownies', description: 'Brownies fudge lezat dengan topping premium.', imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80', sortOrder: 2, isActive: true },
  { id: 3, name: 'Cookies', slug: 'cookies', description: 'Kue kering renyah dan lumer di mulut.', imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80', sortOrder: 3, isActive: true },
  { id: 4, name: 'Dessert', slug: 'dessert', description: 'Dessert box dan slice cake yang menyegarkan.', imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80', sortOrder: 4, isActive: true },
  { id: 5, name: 'Bread', slug: 'bread', description: 'Roti empuk dan pastry buttery segar setiap hari.', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', sortOrder: 5, isActive: true },
  { id: 6, name: 'Hampers', slug: 'hampers', description: 'Paket hadiah spesial untuk orang terkasih.', imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80', sortOrder: 6, isActive: true },
];

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: 1,
    categoryId: 1,
    name: 'Chocolate Fudge Cake',
    slug: 'chocolate-fudge-cake',
    shortDescription: 'Rich chocolate sponge with silky chocolate ganache and fudge frosting.',
    description: 'Kue cokelat premium dengan lapisan fudge yang kaya rasa, menggunakan 70% dark chocolate pilihan import. Sangat cocok untuk pecinta cokelat sejati di setiap momen spesial.',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
    status: 'AVAILABLE',
    isFeatured: true,
    isBestSeller: true,
    categoryName: 'Cake',
    categorySlug: 'cake',
    variants: [
      { id: 1, productId: 1, name: '15 cm (Mini)', price: '185000', isDefault: false },
      { id: 2, productId: 1, name: '20 cm (Standard)', price: '295000', isDefault: true },
      { id: 3, productId: 1, name: '25 cm (Large)', price: '420000', isDefault: false },
    ]
  },
  {
    id: 2,
    categoryId: 1,
    name: 'Strawberry Shortcake',
    slug: 'strawberry-shortcake',
    shortDescription: 'Light vanilla sponge layered with fresh cream and sweet strawberries.',
    description: 'Kue spons vanila yang lembut dipadu dengan whipped cream segar dan potongan buah stroberi manis pilihan. Tampilan elegan dengan rasa yang ringan di mulut.',
    imageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=80',
    status: 'AVAILABLE',
    isFeatured: true,
    isBestSeller: true,
    categoryName: 'Cake',
    categorySlug: 'cake',
    variants: [
      { id: 4, productId: 2, name: '18 cm', price: '260000', isDefault: true },
      { id: 5, productId: 2, name: '22 cm', price: '380000', isDefault: false },
    ]
  },
  {
    id: 3,
    categoryId: 2,
    name: 'Classic Fudge Brownies',
    slug: 'classic-fudge-brownies',
    shortDescription: 'Shiny crust, super fudgy texture with rich chocolate taste.',
    description: 'Brownies panggang dengan tekstur fudgy di dalam dan permukaan shiny crust yang renyah. Dipanggang dengan mentega premium dan cokelat asli.',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
    status: 'AVAILABLE',
    isFeatured: false,
    isBestSeller: true,
    categoryName: 'Brownies',
    categorySlug: 'brownies',
    variants: [
      { id: 6, productId: 3, name: '20x10 cm (Original)', price: '95000', isDefault: true },
      { id: 7, productId: 3, name: '20x20 cm (Full Size)', price: '175000', isDefault: false },
    ]
  },
  {
    id: 4,
    categoryId: 3,
    name: 'Almond Crispy Cookies',
    slug: 'almond-crispy-cookies',
    shortDescription: 'Crispy thin cookies topped with sliced almonds and butter aroma.',
    description: 'Kue kering tipis renyah bertabur irisan almond panggang dengan aroma mentega yang harum menggugah selera.',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=80',
    status: 'AVAILABLE',
    isFeatured: false,
    isBestSeller: false,
    categoryName: 'Cookies',
    categorySlug: 'cookies',
    variants: [
      { id: 8, productId: 4, name: 'Toples 350gr', price: '85000', isDefault: true },
      { id: 9, productId: 4, name: 'Toples 600gr', price: '150000', isDefault: false },
    ]
  },
  {
    id: 5,
    categoryId: 4,
    name: 'Tiramisu Dessert Box',
    slug: 'tiramisu-dessert-box',
    shortDescription: 'Authentic Italian tiramisu layers with espresso and mascarpone cream.',
    description: 'Lapisan sponge lembut yang direndam espresso kaya rasa dipadu dengan krim mascarpone lembut dan taburan cocoa powder berkualitas.',
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80',
    status: 'PRE_ORDER',
    isFeatured: true,
    isBestSeller: false,
    categoryName: 'Dessert',
    categorySlug: 'dessert',
    variants: [
      { id: 10, productId: 5, name: 'Single Box', price: '55000', isDefault: true },
      { id: 11, productId: 5, name: 'Bundle of 3 Boxes', price: '150000', isDefault: false },
    ]
  },
  {
    id: 6,
    categoryId: 5,
    name: 'Butter Croissant',
    slug: 'butter-croissant',
    shortDescription: 'Flaky, buttery French pastry baked to golden perfection.',
    description: 'Pastry klasik Prancis dengan lapisan renyah di luar dan bagian dalam yang lembut berongga, dibuat menggunakan pure French butter.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
    status: 'SOLD_OUT',
    isFeatured: false,
    isBestSeller: false,
    categoryName: 'Bread',
    categorySlug: 'bread',
    variants: [
      { id: 12, productId: 6, name: 'Per Pcs', price: '28000', isDefault: true },
      { id: 13, productId: 6, name: 'Box of 4 Pcs', price: '100000', isDefault: false },
    ]
  },
  {
    id: 7,
    categoryId: 6,
    name: 'Sweet Celebration Hampers',
    slug: 'sweet-celebration-hampers',
    shortDescription: 'Luxurious gift box containing assortment of signature cookies and cakes.',
    description: 'Hampers eksklusif berisi pilihan kue kering favorit, artisan tea, dan kartu ucapan kustom, dikemas dalam keranjang rotan cantik.',
    imageUrl: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=900&q=80',
    status: 'AVAILABLE',
    isFeatured: true,
    isBestSeller: true,
    categoryName: 'Hampers',
    categorySlug: 'hampers',
    variants: [
      { id: 14, productId: 7, name: 'Paket Kasih (Medium)', price: '350000', isDefault: true },
      { id: 15, productId: 7, name: 'Paket Istimewa (Large)', price: '650000', isDefault: false },
    ]
  },
  {
    id: 8,
    categoryId: 1,
    name: 'Classic New York Cheese Cake',
    slug: 'classic-new-york-cheese-cake',
    shortDescription: 'Dense, smooth, and creamy cheese cake with graham cracker crust.',
    description: 'Cheesecake gaya New York yang padat, lembut, dan kaya rasa keju cream cheese asli dengan dasar biskuit renyah.',
    imageUrl: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=900&q=80',
    status: 'AVAILABLE',
    isFeatured: false,
    isBestSeller: false,
    categoryName: 'Cake',
    categorySlug: 'cake',
    variants: [
      { id: 16, productId: 8, name: 'Slice', price: '45000', isDefault: false },
      { id: 17, productId: 8, name: 'Whole Cake (20cm)', price: '320000', isDefault: true },
    ]
  }
];

export const DEFAULT_STORE_SETTINGS = {
  storeName: 'KueKita',
  tagline: 'Freshly Baked For Every Moment',
  description: 'KueKita adalah artisan bakery pilihan keluarga Indonesia yang menyajikan kue ulang tahun, brownies, cookies, dan hampers berkualitas premium dengan bahan-bahan pilihan.',
  whatsappNumber: '085348492242',
  instagramUrl: 'https://instagram.com/kuekita.official',
  address: 'Jl. Senopati Raya No. 45, Kebayoran Baru, Jakarta Selatan',
  operatingHours: 'Senin - Minggu: 08:00 - 20:00 WIB',
  logoUrl: '',
  heroImageUrl: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=1600&q=80',
};
