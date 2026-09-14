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

const CRM_PILLARS: ModulePillar[] = [
  {
    id: "crm360",
    name: "Profil Pelanggan 360°",
    badge: "Visibilitas Lengkap • Single View",
    icon: "user",
    tagline: "Satu Layar untuk Data Jaringan, Tagihan, dan Riwayat Gangguan",
    description: "Hilangkan kebiasaan membuka 5 aplikasi berbeda untuk melayani 1 pelanggan. Begitu data pelanggan dibuka, CS dan teknisi langsung melihat koordinat rumah, ODP terhubung, nomor port, status redaman ONT, dan tagihan tertunggak.",
    specs: [
      { label: "Data Jaringan", value: "Port ODP, IP PPPoE/Statis, MAC Address, Sinyal ONT" },
      { label: "Data Keuangan", value: "Status Tagihan, Riwayat Bayar, Metode Pembayaran Favorit" },
      { label: "Alur Pelanggan", value: "Tahapan Lead &rarr; Pemasangan &rarr; Aktif &rarr; Isolir" },
      { label: "Riwayat Interaksi", value: "Log Percakapan CS & Arsip Tiket Gangguan Lampau" },
    ],
    highlight: "Staf CS tidak perlu lagi bertanya nomor internet atau tipe modem saat pelanggan komplain.",
    features: ["Profil Terpadu 360°", "Data Port ODP & GIS", "Arsip Percakapan", "Riwayat Tagihan", "Status ONU Live"],
  },
  {
    id: "churn",
    name: "Deteksi Dini Risiko Churn",
    badge: "Retensi Pelanggan • AI Heuristic",
    icon: "chart",
    tagline: "Ketahui Pelanggan yang Berisiko Berhenti Sebelum Mereka Memutuskan Berhenti",
    description: "Sistem analitik NADI terus memantau indikator perilaku pelanggan: penurunan drastis trafik data, komplain berulang dalam 14 hari, dan pola pembayaran yang kerap menunda hingga batas isolir.",
    specs: [
      { label: "Metrik Risiko", value: "Skor Churn 0 - 100 (Aman, Waspada, Berisiko Tinggi)" },
      { label: "Faktor Pemicu", value: "Frekuensi Komplain, Penurunan Trafik, Pola Jatuh Tempo" },
      { label: "Aksi Otomatis", value: "Notifikasi ke Manajer Retensi & Penawaran Diskon Loyalitas" },
      { label: "Survei Kepuasan", value: "Auto-Kirim CSAT Rating setelah Tiket Selesai" },
    ],
    highlight: "Mencegah hingga 60% potensi pelanggan putus langganan dengan tindakan retensi proaktif.",
    features: ["Skor Risiko Churn", "Heuristik Komplain", "Alert Manajer Retensi", "CSAT Rating", "Diskon Loyalitas"],
  },
  {
    id: "csdesk",
    name: "Antrian Live Chat CS Terpadu",
    badge: "Omnichannel Helpdesk • Respon Cepat",
    icon: "chat",
    tagline: "Kelola Komplain WhatsApp & Web Chat dalam Satu Dasbor Antrian Rapi",
    description: "Koneksikan saluran WhatsApp resmi ISP Anda ke dasbor antrian multi-agent NADI. Percakapan didistribusikan merata ke agen CS yang sedang aktif dengan template jawaban cepat (canned responses).",
    specs: [
      { label: "Kanal Terhubung", value: "WhatsApp Business API, Web Portal Chat, Telegram" },
      { label: "Distribusi Pesan", value: "Round-Robin Otomatis ke Agen CS yang Sedang Online" },
      { label: "Canned Responses", value: "Template Jawaban Panduan Troubleshooting Instan" },
      { label: "Pemantauan SLA", value: "Pelacakan Response Time & Resolution Time Agen CS" },
    ],
    highlight: "Profil lengkap pelanggan langsung muncul di panel samping saat agen CS membuka obrolan.",
    features: ["WhatsApp Multi-Agent", "Round-Robin Queue", "Canned Responses", "Panel Profil Pelanggan", "SLA Monitoring"],
  },
  {
    id: "ticket",
    name: "Tiket Gangguan & Auto-Assign",
    badge: "Field Dispatch • Alur Kerja Presisi",
    icon: "support",
    tagline: "Konversi Komplain Menjadi Tiket Perbaikan Lapangan dengan Rute GPS",
    description: "Dari jendela chat CS, 1 klik langsung menerbitkan tiket gangguan teknis. Sistem otomatis mendeteksi lokasi ODP dan mengarahkan tiket ke teknisi area terdekat lengkap dengan titik GPS Google Maps.",
    specs: [
      { label: "Alokasi Teknisi", value: "Auto-Assign Berdasarkan Wilayah ODP / ODC Terdekat" },
      { label: "Pembaruan Status", value: "Open &rarr; In-Progress &rarr; Pending Material &rarr; Resolved" },
      { label: "Dokumentasi Foto", value: "Teknisi Wajib Upload Bukti Redaman & Foto Splicing Selesai" },
      { label: "Auto-Konfirmasi", value: "WhatsApp Otomatis ke Pelanggan Menanyakan Kualitas Koneksi" },
    ],
    highlight: "Riwayat MTTR per teknisi tercatat objektif untuk evaluasi insentif dan performa kerja bulanan.",
    features: ["Auto-Assign Teknisi", "Koordinat GPS Maps", "Upload Foto Bukti", "SLA Status Tracking", "Notifikasi Pelanggan"],
  },
];

export function CrmCsExplorer() {
  const [activePillar, setActivePillar] = useState<string>("crm360");
  const pillar = CRM_PILLARS.find((p) => p.id === activePillar) ?? CRM_PILLARS[0];

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-10">
      {/* Tab Navigation */}
      <div className="mb-8 flex flex-wrap gap-2.5 border-b border-slate-100 pb-5" role="tablist" aria-label="Pilar CRM dan Layanan Pelanggan">
        {CRM_PILLARS.map((item) => {
          const isActive = item.id === activePillar;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`crm-panel-${item.id}`}
              id={`crm-tab-${item.id}`}
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
        id={`crm-panel-${pillar.id}`}
        role="tabpanel"
        aria-labelledby={`crm-tab-${pillar.id}`}
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
            <span className="font-bold text-primary">Nilai Tambah Layanan: </span>
            {pillar.highlight}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mr-1">Fitur Tersemat:</span>
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
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Kemampuan Modul</span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800">
              <span className="size-1.5 rounded-full bg-emerald-600" />
              Terstandarisasi
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

export function CrmRetentionCalculator() {
  const [customerScale, setCustomerScale] = useState<number>(1500);

  // Estimations based on standard ISP retention metrics
  const avgMonthlyArpu = 175000; // Rp 175.000 / month
  const monthlyNaturalChurnRate = 0.035; // 3.5% monthly churn
  const naturalChurnCustomers = Math.round(customerScale * monthlyNaturalChurnRate);
  const churnSavedCustomers = Math.round(naturalChurnCustomers * 0.55); // 55% saved through early intervention
  const monthlyRevenueProtected = churnSavedCustomers * avgMonthlyArpu;
  const annualRevenueProtected = monthlyRevenueProtected * 12;

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end border-b border-slate-100 pb-6">
        <div>
          <span className="label text-xs font-bold text-primary uppercase tracking-wider">Kalkulator Retensi & Penyelamatan MRR</span>
          <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
            Simulasi Penyelamatan Pendapatan Langganan
          </h3>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">
            Pilih skala basis pelanggan untuk melihat estimasi nilai pendapatan berulang yang diselamatkan dari risiko churn.
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
          <span className="text-xs font-medium text-emerald-800">MRR Diselamatkan</span>
          <div className="mt-2 text-xl font-black text-emerald-700 sm:text-2xl">
            Rp {(monthlyRevenueProtected / 1000000).toFixed(1)} Jt / Bln
          </div>
          <span className="mt-1 block text-[11px] font-medium text-emerald-800">Dari ~{churnSavedCustomers} pelanggan terselamatkan</span>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
          <span className="text-xs font-medium text-blue-800">Proteksi Omzet Tahunan</span>
          <div className="mt-2 text-xl font-black text-blue-600 sm:text-2xl">
            Rp {(annualRevenueProtected / 1000000).toFixed(0)} Jt / Thn
          </div>
          <span className="mt-1 block text-[11px] font-medium text-blue-700">Nilai umur pelanggan (LTV) terjaga</span>
        </div>

        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
          <span className="text-xs font-medium text-indigo-800">Kecepatan Respon CS</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-indigo-600">&lt; 45 Detik</span>
            <span className="text-xs line-through text-slate-700">15 Mnt</span>
          </div>
          <span className="mt-1 block text-[11px] font-medium text-indigo-700">Antrian live chat omnichannel</span>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
          <span className="text-xs font-medium text-slate-700">Efisiensi Dispatch Lapangan</span>
          <div className="mt-2 text-2xl font-black text-slate-900">100% Akurat</div>
          <span className="mt-1 block text-[11px] text-slate-700">Auto-assign ke teknisi terdekat via GPS</span>
        </div>
      </div>
    </div>
  );
}
