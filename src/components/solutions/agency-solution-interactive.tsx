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

const AGENCY_PILLARS: ModulePillar[] = [
  {
    id: "reseller",
    name: "Jaringan Mitra & Saldo Deposit",
    badge: "Distribusi Penjualan • Sistem Deposit",
    icon: "wallet",
    tagline: "Perluas Penjualan Voucher dan Titik Loket via Warung Mitra Lokal",
    description: "Berdayakan warung, kafe, dan toko kelontong di sekitar jaringan Anda menjadi mitra agen resmi. Mitra mengisi saldo deposit mandiri, mencetak voucher hotspot dari ponsel, dan menerima bagi hasil komisi otomatis.",
    specs: [
      { label: "Sistem Saldo", value: "Deposit Pra-Bayar Real-Time via VA & QRIS" },
      { label: "Bagi Hasil Komisi", value: "Nominal Flat (Rp/Kupon) atau Persentase Transaksi" },
      { label: "Portal Khusus Agen", value: "Antarmuka Mobile-Friendly Ringan Tanpa Install Aplikasi" },
      { label: "Layanan Loket", value: "Agen Dapat Melayani Pembayaran Tagihan Tetangga" },
    ],
    highlight: "Ekspansi titik penjualan tanpa biaya sewa tempat, listrik, atau gaji staf loket tambahan.",
    features: ["Saldo Deposit Real-Time", "Komisi Otomatis", "Portal Agen Mobile", "Cetak Struk Bluetooth", "Mutasi Komisi"],
  },
  {
    id: "broadcast",
    name: "Broadcast Gateway & Anti-Ban",
    badge: "Komunikasi Massal • Throttling Aman",
    icon: "send",
    tagline: "Kirim Pengumuman Perawatan & Notifikasi Massal Bebas Risiko Blokir",
    description: "Sampaikan informasi pemeliharaan jaringan kabel putus, invoice penagihan, atau ucapan hari raya ke ribuan nomor pelanggan secara serentak dengan algoritma jeda adaptif untuk menjaga nomor WhatsApp tetap aman.",
    specs: [
      { label: "Jalur Pengiriman", value: "WhatsApp Bot, Telegram Broadcast, SMS Gateway" },
      { label: "Anti-Ban Protection", value: "Jeda Pacing Acak (3-7 Detik) & Rotasi Template Pesan" },
      { label: "Segmentasi Target", value: "Kirim Berdasarkan Area ODP, Paket Langganan, atau Status" },
      { label: "Laporan Delivery", value: "Status Terkirim, Diterima, dan Gagal Real-Time" },
    ],
    highlight: "Satu klik mengabari seluruh pelanggan di ODP terdampak saat terjadi perbaikan darurat.",
    features: ["Anti-Ban Throttling", "Segmentasi ODP", "WhatsApp Multi-Device", "Laporan Delivery", "Jadwal Kirim"],
  },
  {
    id: "security",
    name: "Keamanan 2FA & Audit Trail",
    badge: "Keamanan Akun • Anti-Fraud",
    icon: "shield",
    tagline: "Perlindungan Akun Ganda dan Rekam Jejak Aktivitas Permanen",
    description: "Cegah akses ilegal dan kecurangan internal. Amankan akun staf dengan Two-Factor Authentication (2FA) dan pantau seluruh perubahan data melalui audit log permanen yang tidak dapat dimanipulasi.",
    specs: [
      { label: "Autentikasi Ganda", value: "TOTP RFC-6238 (Google Authenticator, Authy)" },
      { label: "Jejak Audit Trail", value: "Rekam Waktu, IP, Akun, Aksi, & Nilai Sebelum/Sesudah" },
      { label: "Proteksi Akses", value: "Pembatasan IP Whitelist & Auto-Logout Sesi Pasif" },
      { label: "Pencadangan Data", value: "Backup Otomatis Database & Script MikroTik Harian" },
    ],
    highlight: "Setiap perubahan paket, penghapusan tagihan, atau aksi void terekam selamanya.",
    features: ["2FA Google Authenticator", "Audit Log Permanen", "IP Whitelist", "Brute Force Defense", "Auto-Backup Cloud"],
  },
  {
    id: "rbac",
    name: "11 Hak Akses Granular RBAC",
    badge: "Tata Kelola • Role-Based Access",
    icon: "lock",
    tagline: "Wewenang Presisi: Staf Hanya Mengakses Sesuai Tanggung Jawabnya",
    description: "Terapkan tata kelola profesional dengan 11 peran siap pakai. Pisahkan wewenang kasir loket, teknisi lapangan, operator NOC, agen reseller, dan admin keuangan agar sistem bebas dari kebocoran.",
    specs: [
      { label: "Jumlah Peran", value: "11 Peran Terstandarisasi Siap Pakai & Kustom" },
      { label: "Tingkat Pembatasan", value: "Per Halaman, Tombol Eksekusi, dan Menu Navigasi" },
      { label: "Multi-Tenant", value: "Dukungan Cabang / Wilayah Operasional Terpisah" },
      { label: "Manajemen Sesi", value: "Revoke Akses Instan dalam 1 Klik saat Karyawan Mutasi" },
    ],
    highlight: "Kasir dilarang menyentuh konfigurasi router, dan teknisi tidak dapat melihat laporan laba bersih.",
    features: ["11 Peran RBAC", "Pembatasan Menu & Tombol", "Multi-Cabang", "Revoke Token Instan", "Izin Khusus Supervisor"],
  },
];

export function AgencyAutomationExplorer() {
  const [activePillar, setActivePillar] = useState<string>("reseller");
  const pillar = AGENCY_PILLARS.find((p) => p.id === activePillar) ?? AGENCY_PILLARS[0];

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-10">
      {/* Tab Navigation */}
      <div className="mb-8 flex flex-wrap gap-2.5 border-b border-slate-100 pb-5" role="tablist" aria-label="Pilar Keagenan dan Otomasi">
        {AGENCY_PILLARS.map((item) => {
          const isActive = item.id === activePillar;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`agency-panel-${item.id}`}
              id={`agency-tab-${item.id}`}
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
        id={`agency-panel-${pillar.id}`}
        role="tabpanel"
        aria-labelledby={`agency-tab-${pillar.id}`}
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
            <span className="font-bold text-primary">Keuntungan Operasional: </span>
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
              Keamanan Tinggi
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

export function AgencyCommissionCalculator() {
  const [agentsCount, setAgentsCount] = useState<number>(15);

  // Estimations based on active agent voucher sales
  const avgVouchersPerAgentPerDay = 15;
  const avgVoucherPrice = 5000;
  const agentCommissionPerVoucher = 1000;
  const daysInMonth = 30;

  const totalMonthlyVouchersSold = agentsCount * avgVouchersPerAgentPerDay * daysInMonth;
  const totalGrossRevenue = totalMonthlyVouchersSold * avgVoucherPrice;
  const totalCommissionDistributed = totalMonthlyVouchersSold * agentCommissionPerVoucher;
  const netIspProfit = totalGrossRevenue - totalCommissionDistributed;

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end border-b border-slate-100 pb-6">
        <div>
          <span className="label text-xs font-bold text-primary uppercase tracking-wider">Kalkulator Potensi Ekosistem Agen</span>
          <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
            Simulasi Penjualan Voucher via Jaringan Mitra Warung
          </h3>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">
            Pilih jumlah mitra agen di lapangan untuk menghitung omzet tambahan dan bagi hasil komisi per bulan.
          </p>
        </div>

        {/* Agent Count Selector */}
        <div className="flex flex-col gap-2 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Jumlah Mitra Agen:</span>
            <span className="text-primary text-sm font-extrabold">{agentsCount} Mitra Warung</span>
          </div>
          <div className="flex gap-2">
            {[5, 15, 30, 50].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setAgentsCount(num)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  agentsCount === num
                    ? "bg-primary text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {num} Agen
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Result Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
          <span className="text-xs font-medium text-blue-800">Total Voucher Terjual</span>
          <div className="mt-2 text-2xl font-black text-blue-600">{totalMonthlyVouchersSold.toLocaleString("id-ID")} Kupon</div>
          <span className="mt-1 block text-[11px] font-medium text-blue-700">~{avgVouchersPerAgentPerDay} kupon/agen/hari</span>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
          <span className="text-xs font-medium text-emerald-800">Omzet Kotor Penjualan</span>
          <div className="mt-2 text-xl font-black text-emerald-700 sm:text-2xl">
            Rp {(totalGrossRevenue / 1000000).toFixed(1)} Jt / Bln
          </div>
          <span className="mt-1 block text-[11px] font-medium text-emerald-800">Estimasi harga voucher Rp 5.000</span>
        </div>

        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
          <span className="text-xs font-medium text-indigo-800">Laba Bersih ISP</span>
          <div className="mt-2 text-xl font-black text-indigo-600 sm:text-2xl">
            Rp {(netIspProfit / 1000000).toFixed(1)} Jt / Bln
          </div>
          <span className="mt-1 block text-[11px] font-medium text-indigo-700">Setelah dipotong komisi agen</span>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
          <span className="text-xs font-medium text-slate-700">Komisi Dibagikan ke Warga</span>
          <div className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">
            Rp {(totalCommissionDistributed / 1000000).toFixed(1)} Jt
          </div>
          <span className="mt-1 block text-[11px] text-slate-700">Membantu ekonomi warga & warung mitra</span>
        </div>
      </div>
    </div>
  );
}
