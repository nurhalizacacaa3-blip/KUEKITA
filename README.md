# KueKita — Web Katalog & Pemesanan Kue

**KueKita** adalah aplikasi web katalog produk kue profesional dengan konsep *Sweet Editorial Bakery*, dirancang khusus untuk bisnis bakery agar produk mudah dicari, informasi transparan, dan pemesanan instan melalui WhatsApp.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **Database & ORM:** Neon PostgreSQL + Drizzle ORM
- **Authentication:** Auth.js (NextAuth)
- **Icons:** Lucide React

---

## Features

### Public Website
1. **Homepage:** Editorial hero section, category showcase, best sellers, weekend promo banner, brand story, and trust badges.
2. **Catalog & Search:** Instant product search by name/description, category filtering (Cake, Brownies, Cookies, Dessert, Bread, Hampers), and sorting (Latest, Price, Popularity).
3. **Product Detail & Variants:** Interactive size/variant selection with real-time price updates and availability status (AVAILABLE, SOLD_OUT, PRE_ORDER).
4. **WhatsApp Ordering:** One-click order button that automatically generates pre-formatted messages with product name, selected variant, price, and pre-order notes.
5. **About & Contact:** Brand philosophy and store location details.

### Admin Portal
1. **Secure Authentication:** Admin login with hashed password protection.
2. **Dashboard:** Key metrics (total products, active products, pre-order, sold out) and catalog summary.
3. **Product CRUD:** Create, edit, and manage products, categories, images, and pricing.
4. **Store Settings:** Configure store name, tagline, WhatsApp number, operating hours, and address.

---

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL="postgres://user:password@host:port/dbname?sslmode=require"
AUTH_SECRET="your-super-secret-auth-key"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@kuekita.com"
ADMIN_PASSWORD="adminpassword123"
WHATSAPP_NUMBER="6281234567890"
```

---

## Database Setup & Migration

1. Configure your Neon PostgreSQL `DATABASE_URL` in `.env`.
2. Generate migrations:
   ```bash
   npx drizzle-kit generate
   ```
3. Push schema to Neon:
   ```bash
   npx drizzle-kit push
   ```

---

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build

```bash
npm run build
npm start
```
