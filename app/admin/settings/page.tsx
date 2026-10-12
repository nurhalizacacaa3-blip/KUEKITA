import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { getStoreSettings } from '@/server/catalog';
import { Settings, Save, Store, Phone, MapPin, Clock } from 'lucide-react';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await getStoreSettings();

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex">
      <AdminSidebar />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#6B4226] font-semibold">Konfigurasi Toko</span>
            <h1 className="font-serif text-3xl font-bold text-[#3E2723] mt-1">Store Settings & WhatsApp</h1>
            <p className="text-sm text-[#3E2723]/70">Atur nomor WhatsApp pemesanan, nama toko, dan informasi operasional.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-[#6B4226]/10 p-8 space-y-6">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#3E2723] uppercase tracking-wider">Nama Toko</label>
                  <input
                    type="text"
                    defaultValue={settings.storeName}
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#3E2723] uppercase tracking-wider">Nomor WhatsApp (Format: 628xxx)</label>
                  <input
                    type="text"
                    defaultValue={settings.whatsappNumber}
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#3E2723] uppercase tracking-wider">Tagline</label>
                <input
                  type="text"
                  defaultValue={settings.tagline}
                  className="w-full px-4 py-3 rounded-xl bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#3E2723] uppercase tracking-wider">Deskripsi Toko</label>
                <textarea
                  rows={3}
                  defaultValue={settings.description || ''}
                  className="w-full px-4 py-3 rounded-xl bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#3E2723] uppercase tracking-wider">Alamat Toko</label>
                  <input
                    type="text"
                    defaultValue={settings.address || ''}
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#3E2723] uppercase tracking-wider">Jam Operasional</label>
                  <input
                    type="text"
                    defaultValue={settings.operatingHours || ''}
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF8F0] border border-[#6B4226]/20 focus:outline-none focus:border-[#6B4226] text-sm text-[#3E2723]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#6B4226]/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => alert('Pengaturan berhasil disimpan!')}
                  className="inline-flex items-center gap-2 bg-[#6B4226] hover:bg-[#3E2723] text-[#FFF8F0] px-8 py-3.5 rounded-xl font-medium shadow-md transition-all text-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
