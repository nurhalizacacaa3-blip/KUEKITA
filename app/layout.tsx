import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'KueKita — Freshly Baked For Every Moment',
  description: 'Temukan berbagai pilihan kue, brownies, cookies, dessert, dan hampers untuk setiap momen spesial.',
  openGraph: {
    title: 'KueKita — Freshly Baked For Every Moment',
    description: 'Temukan berbagai pilihan kue, brownies, cookies, dessert, dan hampers untuk setiap momen spesial.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KueKita — Freshly Baked For Every Moment',
    description: 'Temukan berbagai pilihan kue, brownies, cookies, dessert, dan hampers untuk setiap momen spesial.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
