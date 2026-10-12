'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, FolderTree, Tag, Settings, LogOut, ChevronRight, Store } from 'lucide-react';
import { signOut } from 'next-auth/react';

export function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Produk', href: '/admin/products', icon: Package },
    { name: 'Kategori', href: '/admin/categories', icon: FolderTree },
    { name: 'Promo & Diskon', href: '/admin/promotions', icon: Tag },
    { name: 'Pengaturan Toko', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#3E2723] text-[#FFF8F0] min-h-screen flex flex-col justify-between p-6 border-r border-[#6B4226]/30">
      <div className="space-y-8">
        {/* Brand */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-[#F3C6C0] text-[#3E2723] flex items-center justify-center font-serif text-xl font-bold">
            K
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold tracking-tight">KueKita Admin</h2>
            <span className="text-[10px] uppercase tracking-widest text-[#F7D774] font-medium">Management Portal</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#6B4226] text-[#FFF8F0] shadow-md font-semibold'
                    : 'text-[#FFF8F0]/70 hover:bg-[#6B4226]/40 hover:text-[#FFF8F0]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 opacity-70" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="pt-6 border-t border-[#6B4226]/40 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-[#FFF8F0]/80 hover:bg-[#6B4226]/40 hover:text-[#FFF8F0] transition-colors"
        >
          <Store className="w-4 h-4" />
          <span>Lihat Website Publik</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-red-300 hover:bg-red-950/40 hover:text-red-200 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar (Logout)</span>
        </button>
      </div>
    </aside>
  );
}
