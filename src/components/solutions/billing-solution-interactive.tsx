"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/ui/icon";

type ModulePillar = {
  id: string;
  name: string;
  badge: string;
  icon: IconName;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  highlight: string;
  features: string[];
};

const BILLING_PILLARS: ModulePillar[] = [
  {
    id: "billing",
    name: "Tagihan Bulanan Idempotent",
    badge: "Siklus Keuangan • Zero Race-Condition",
    icon: "receipt",
    tagline: "Penagihan Otomatis Idempotent & Isolir MikroTik/RADIUS Real-Time",
    description: "Siklus invoice otomatis setiap awal bulan atau tanggal pasang. Proteksi idempotent token menjamin tagihan tidak pernah terbit ganda walau sistem terputus koneksi atau server di-refresh.",
    specs: [
      { label: "Idempotency Protection", value: "UUID Token Unik per Periode Tagihan" },
      { label: "Isolir Otomatis", value: "Address-List MikroTik & RADIUS CoA Drop" },
      { label: "Jalur Notifikasi", value: "WhatsApp Bot, Telegram, SMS Gateway, Email" },
      { label: "Restitusi & Diskon", value: "Prorata Hari Penggunaan & Voucher Diskon" },
    ],
    highlight: "Sistem isolir dan buka-isolir berjalan 100% otomatis saat pelanggan melunasi tagihan.",
    features: ["Idempotent Billing", "Auto-Isolir", "Reminder WhatsApp", "Restitusi Prorata", "Invoice PDF"],
  },
  {
    id: "kasir",
    name: "Kasir POS & Void Audit-Safe",
    badge: "Loket Kantor • Bebas Manipulasi",
    icon: "store",
    tagline: "Loket Pembayaran Kasir Multi-Shift dengan Otorisasi Void Berlapis",
    description: "Pencatatan kas masuk dan kas keluar harian dengan cetak struk thermal instan. Fitur Void Audit-Safe mewajibkan persetujuan supervisor dan mencatat jejak audit permanen, menutup celah fraud pembatalan sepihak kasir.",
    specs: [
      { label: "Void Protection", value: "Wajib Approval Supervisor & Rekam Log Permanen" },
      { label: "Cetak Struk", value: "Printer Bluetooth / USB Thermal 58mm & 80mm" },
      { label: "Manajemen Shift", value: "Rekonsiliasi Kas Laci (Drawer Balance) per Kasir" },
      { label: "Metode Kasir", value: "Tunai, Transfer Bank, QRIS Kasir, Saldo Deposit" },
    ],
    highlight: "Riwayat void tidak dapat dihapus dari database, menjamin audit kasir 100% aman dan transparan.",
    features: ["Void Audit-Safe", "Struk Thermal 58/80mm", "Multi-Shift Teller", "Rekonsiliasi Laci Kas", "Audit Log"],
  },
  {
    id: "voucher",
    name: "Pabrik Cetak Voucher Hotspot",
    badge: "Hotspot Engine • Batch Instan",
    icon: "bolt",
    tagline: "Generate Ratusan Kode Voucher Sekali Klik Siap Cetak Thermal & A4",
    description: "Terbitkan ratusan kode voucher dalam hitungan detik. Pilih tata letak cetak thermal untuk kasir atau kertas A4 berpola potong rapi untuk dibagikan ke warung mitra reseller.",
    specs: [
      { label: "Kecepatan Batch", value: "Generate 500 Voucher dalam < 2 Detik" },
      { label: "Tata Letak Cetak", value: "Thermal 58mm/80mm & Grid Kertas A4 (40 Kupon/Lembar)" },
      { label: "Batasan Profil", value: "Berdasarkan Durasi (Waktu) atau Kuota Bandwidth" },
      { label: "Keamanan Kode", value: "Kombinasi Karakter Acak Bebas Karakter Membingungkan" },
    ],
    highlight: "Dilengkapi QR Code login cepat, pengguna hotspot cukup scan tanpa mengetik username panjang.",
    features: ["Batch 500 Kupon", "Layout Thermal & A4", "QR Code Login", "Rate Limit Profil", "Monitoring Kuota"],
  },
  {
    id: "toko",
    name: "Toko Voucher Online & QRIS",
    badge: "Self-Service • QRIS Instan",
    icon: "wallet",
    tagline: "Etalase Voucher Publik 24 Jam dengan Pengaman Anti-Fraud",
    description: "Pelanggan hotspot dapat membeli voucher mandiri langsung dari smartphone mereka tanpa perlu datang ke loket kasir. Pembayaran diverifikasi otomatis via QRIS Dinamis dan Virtual Account.",
    specs: [
      { label: "Metode Bayar", value: "QRIS Dinamis, Virtual Account Bank, E-Wallet" },
      { label: "Proteksi Anti-Fraud", value: "Rate-Limiting IP, Captcha, Enkripsi Voucher Token" },
      { label: "Pengiriman Kode", value: "Tampil Langsung di Layar & Terkirim ke WhatsApp Pembeli" },
      { label: "Payment Gateway", value: "Midtrans, Xendit, Tripay, Duitku, Faspay" },
    ],
    highlight: "Toko voucher aktif 24/7 menghasilkan pendapatan tanpa memerlukan staf jaga loket.",
    features: ["QRIS Dinamis", "Self-Service 24 Jam", "Anti-Fraud Rate Limit", "Auto-Kirim WhatsApp", "Auto-Konfirmasi"],
  },
];

export function BillingTransactionExplorer() {
  const [activePillar, setActivePillar] = useState<string>("billing");
  const pillar = BILLING_PILLARS.find((p) => p.id === activePillar) ?? BILLING_PILLARS[0];

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-10">
      {/* Tab Navigation */}
      <div className="mb-8 flex flex-wrap gap-2.5 border-b border-slate-100 pb-5" role="tablist" aria-label="Pilar Billing dan Transaksi">
        {BILLING_PILLARS.map((item) => {
          const isActive = item.id === activePillar;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`billing-panel-${item.id}`}
              id={`billing-tab-${item.id}`}
              onClick={() => setActivePillar(item.id)}
              className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/60"
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Panel Content */}
      <div
        id={`billing-panel-${pillar.id}`}
        role="tabpanel"
        aria-labelledby={`billing-tab-${pillar.id}`}
        className="grid gap-8 lg:grid-cols-12"
      >
        {/* Left Column: Description & Feature Badges */}
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50 px-3.5 py-1 text-xs font-bold text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              {pillar.badge}
            </div>
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">{pillar.tagline}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{pillar.description}</p>
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-xs text-blue-900">
            <span className="font-bold text-primary">Keunggulan Bisnis: </span>
            {pillar.highlight}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mr-1">Kapabilitas:</span>
            {pillar.features.map((f) => (
              <span
                key={f}
                className="rounded-lg border border-slate-200/80 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Key Technical Parameters */}
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 lg:col-span-5">
          <div className="mb-4 flex items-center justify-between border-b border-slate-200/70 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Parameter Teknis</span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800">
              <span className="size-1.5 rounded-full bg-emerald-600" />
              Siap Produksi
            </span>
          </div>

          <dl className="divide-y divide-slate-200/60 text-xs">
            {pillar.specs.map((spec) => (
              <div key={spec.label} className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <dt className="text-slate-700">{spec.label}</dt>
                <dd className="font-semibold text-slate-900 text-left sm:text-right">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export function BillingLeakageCalculator() {
  const [customerScale, setCustomerScale] = useState<number>(1500);

  // Estimations based on typical ISP billing metrics
  const avgMonthlyArpu = 175000; // Rp 175.000 / month
  const monthlyBillingVolume = customerScale * avgMonthlyArpu;
  const estimatedLeakagePrevented = Math.round(monthlyBillingVolume * 0.024); // 2.4% typical revenue leakage from delayed billing/manual cashier error
  const hoursReconciliationSaved = Math.round((customerScale / 500) * 28); // hours saved per month

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end border-b border-slate-100 pb-6">
        <div>
          <span className="label text-xs font-bold text-primary uppercase tracking-wider">Kalkulator Proteksi Pendapatan</span>
          <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
            Simulasi Penghematan Arus Kas & Efisiensi Loket
          </h3>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">
            Pilih skala basis pelanggan aktif Anda untuk melihat estimasi proteksi kebocoran kas dan efisiensi waktu penagihan.
          </p>
        </div>

        {/* Customer Scale Selector */}
        <div className="flex flex-col gap-2 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Kapasitas:</span>
            <span className="text-primary text-sm font-extrabold">{customerScale.toLocaleString("id-ID")} Pelanggan</span>
          </div>
          <div className="flex gap-2">
            {[500, 1500, 3000, 5000].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setCustomerScale(num)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  customerScale === num
                    ? "bg-primary text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {num.toLocaleString("id-ID")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Result Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
          <span className="text-xs font-medium text-emerald-800">Kebocoran Kas Dicegah</span>
          <div className="mt-2 text-xl font-black text-emerald-700 sm:text-2xl">
            Rp {(estimatedLeakagePrevented / 1000000).toFixed(1)} Jt / Bln
          </div>
          <span className="mt-1 block text-[11px] font-medium text-emerald-800">Dari salah catat & tagihan terlewat</span>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
          <span className="text-xs font-medium text-blue-800">Waktu Tutup Buku Kasir</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-blue-600">5 Menit</span>
            <span className="text-xs line-through text-slate-700">120 Mnt</span>
          </div>
          <span className="mt-1 block text-[11px] font-medium text-blue-700">Otomatis per pergantian shift</span>
        </div>

        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
          <span className="text-xs font-medium text-indigo-800">Waktu Rekonsiliasi Dihemat</span>
          <div className="mt-2 text-2xl font-black text-indigo-600">{hoursReconciliationSaved} Jam / Bln</div>
          <span className="mt-1 block text-[11px] font-medium text-indigo-700">Staf fokus melayani pelanggan</span>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
          <span className="text-xs font-medium text-slate-700">Konfirmasi QRIS & VA</span>
          <div className="mt-2 text-2xl font-black text-slate-900">&lt; 2 Detik</div>
          <span className="mt-1 block text-[11px] text-slate-700">Langsung buka isolir tanpa kirim bukti transfer</span>
        </div>
      </div>
    </div>
  );
}
