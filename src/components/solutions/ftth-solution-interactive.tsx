"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/ui/icon";

type ArchitectureLayer = {
  id: string;
  name: string;
  badge: string;
  icon: IconName;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  highlight: string;
  protocols: string[];
};

const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: "core",
    name: "Core Routing & RADIUS AAA",
    badge: "Layer 1 • Backbone & Gateway",
    icon: "router",
    tagline: "Orkestrasi Multi-Router MikroTik & RADIUS CoA Terpusat",
    description: "Hubungkan puluhan router CCR/CHR MikroTik secara fleksibel. Pilih Mode Local REST API untuk kemudahan instan, atau Mode RADIUS CoA untuk throughput jutaan paket tanpa membebani CPU router.",
    specs: [
      { label: "Protokol AAA", value: "FreeRADIUS RFC-2865 & CoA RFC-3576" },
      { label: "Throughput", value: "Up to 50.000+ Sesi PPPoE Simultan" },
      { label: "IP Pool Sync", value: "Sinkronisasi Subnet Dinamis & Statis" },
      { label: "Dukungan OS", value: "MikroTik RouterOS v6.4x s/d v7.x Native" },
    ],
    highlight: "Isolir instan via Paket CoA Disconnect tanpa perlu reboot sesi router.",
    protocols: ["MikroTik API", "RADIUS CoA", "PPPoE", "IPoE", "BGP", "Queue Tree"],
  },
  {
    id: "olt",
    name: "OLT & Optical Aggregation",
    badge: "Layer 2 • Aggregation Hardware",
    icon: "server",
    tagline: "Telemetri Redaman SNMP Multi-Vendor Real-Time",
    description: "Pantau kesehatan modul SFP optik, suhu chassis OLT, dan utilisasi PON port secara terpusat tanpa terkunci satu vendor (vendor-agnostic).",
    specs: [
      { label: "Vendor Support", value: "ZTE, Huawei, VSOL, HIOSO, BDCOM" },
      { label: "Protokol Query", value: "SNMP v2c / v3 Poller + CLI Bridge" },
      { label: "Telemetry Cycle", value: "Polling Metrik Adaptif 60 Detik" },
      { label: "Optical Budget", value: "Deteksi Degradasi Redaman > 3dB/minggu" },
    ],
    highlight: "Menampilkan RX Power seluruh ONU di setiap port PON secara grafis.",
    protocols: ["SNMP v2c/v3", "EPON 1.25G", "GPON 2.5G", "XGS-PON 10G", "MIB Standard"],
  },
  {
    id: "distribution",
    name: "Passive Optical (ODC/ODP) & GIS",
    badge: "Layer 3 • Distribusi Spasial",
    icon: "network",
    tagline: "Pemetaan Spasial GIS & Manajemen Material Gudang",
    description: "Visualisasikan jalur kabel fiber optic, penempatan tiang, box ODC, dan titik ODP di peta geografis presisi dengan status utilisasi port dan inventaris material gudang.",
    specs: [
      { label: "Format Peta", value: "GIS Spasial Vektor, KML, & GeoJSON" },
      { label: "Status Port", value: "Visualisasi Available, In-Use, & Damaged" },
      { label: "Integrasi Gudang", value: "Barcode Tracking SFP, Splitter, Dropcore" },
      { label: "Rute Tercepat", value: "Navigasi GPS Teknisi Langsung ke Titik ODP" },
    ],
    highlight: "Pelacakan sisa panjang rol kabel dropcore dan barcode serial number material.",
    protocols: ["GeoJSON", "GIS Spatial", "Barcode Code128/QR", "Splitter 1:8 / 1:16"],
  },
  {
    id: "cpe",
    name: "CPE ONT & GenieACS TR-069",
    badge: "Layer 4 • Pelanggan & ONT",
    icon: "sync",
    tagline: "Zero-Touch Provisioning & Remote Diagnostic Tanpa Kunjungan",
    description: "Kelola puluhan ribu modem ONT pelanggan dari jauh. Aktifkan modem baru seketika, ubah password WiFi atas permintaan pelanggan, dan jalankan diagnostic redaman tanpa turun ke lapangan.",
    specs: [
      { label: "Standar Industri", value: "TR-069 CWMP, TR-098 & TR-181 Data Model" },
      { label: "Zero-Touch", value: "Auto-Push Konfigurasi VLAN & PPPoE Baru" },
      { label: "Remote Action", value: "Reboot Massal, Ganti SSID, Speed Profile" },
      { label: "Firmware Push", value: "Batch Update Firmware Terjadwal Non-Peak" },
    ],
    highlight: "CS Desk dapat mengecek redaman optik dan reset WiFi langsung dari tiket komplain.",
    protocols: ["CWMP TR-069", "GenieACS v1.2+", "TR-098", "TR-181", "HTTP/HTTPS RPC"],
  },
];

export function FtthArchitectureExplorer() {
  const [activeLayer, setActiveLayer] = useState<string>("core");
  const layer = ARCHITECTURE_LAYERS.find((l) => l.id === activeLayer) ?? ARCHITECTURE_LAYERS[0];

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-10">
      {/* Tab Navigation */}
      <div className="mb-8 flex flex-wrap gap-2.5 border-b border-slate-100 pb-5" role="tablist" aria-label="Lapisan Arsitektur Jaringan">
        {ARCHITECTURE_LAYERS.map((item) => {
          const isActive = item.id === activeLayer;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`layer-panel-${item.id}`}
              id={`layer-tab-${item.id}`}
              onClick={() => setActiveLayer(item.id)}
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

      {/* Layer Content Card */}
      <div
        id={`layer-panel-${layer.id}`}
        role="tabpanel"
        aria-labelledby={`layer-tab-${layer.id}`}
        className="grid gap-8 lg:grid-cols-12"
      >
        {/* Left Column: Description & Highlights */}
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50 px-3.5 py-1 text-xs font-bold text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              {layer.badge}
            </div>
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">{layer.tagline}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{layer.description}</p>
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-xs text-blue-900">
            <span className="font-bold text-primary">Keunggulan Operasional: </span>
            {layer.highlight}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mr-1">Protokol:</span>
            {layer.protocols.map((p) => (
              <span
                key={p}
                className="rounded-lg border border-slate-200/80 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Key Technical Specs Table */}
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 lg:col-span-5">
          <div className="mb-4 flex items-center justify-between border-b border-slate-200/70 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Parameter Teknis</span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800">
              <span className="size-1.5 rounded-full bg-emerald-600" />
              Tervalidasi
            </span>
          </div>

          <dl className="divide-y divide-slate-200/60 text-xs">
            {layer.specs.map((spec) => (
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

export function FtthMttrCalculator() {
  const [customerScale, setCustomerScale] = useState<number>(1500);

  // Estimations based on industry ISP benchmark
  const ticketsPerMonth = Math.round(customerScale * 0.08); // 8% monthly ticket rate
  const traditionalMttrHours = 3.0; // 180 mins
  const nadiMttrHours = 0.25; // 15 mins
  const hoursSavedPerMonth = Math.round(ticketsPerMonth * (traditionalMttrHours - nadiMttrHours));
  const falseVisitsEliminated = Math.round(ticketsPerMonth * 0.45); // 45% of false visits prevented by auto-localization

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end border-b border-slate-100 pb-6">
        <div>
          <span className="label text-xs font-bold text-primary uppercase tracking-wider">Kalkulator Efisiensi Lapangan</span>
          <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
            Simulasi Penghematan Jam Kerja & Biaya Teknisi
          </h3>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">
            Pilih skala jumlah pelanggan aktif untuk melihat estimasi jam kerja teknisi yang dihemat setiap bulan.
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
        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
          <span className="text-xs font-medium text-slate-700">Estimasi Gangguan</span>
          <div className="mt-2 text-2xl font-black text-slate-900">{ticketsPerMonth} Tiket</div>
          <span className="mt-1 block text-[11px] text-slate-700">Rata-rata 8% basis bulanan</span>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
          <span className="text-xs font-medium text-emerald-800">Waktu Penanganan (MTTR)</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-600">15 Menit</span>
            <span className="text-xs line-through text-slate-700">180 Mnt</span>
          </div>
          <span className="mt-1 block text-[11px] font-medium text-emerald-700">Turun drastis hingga 91%</span>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
          <span className="text-xs font-medium text-blue-800">Jam Teknisi Dihemat</span>
          <div className="mt-2 text-2xl font-black text-blue-600">{hoursSavedPerMonth} Jam / Bln</div>
          <span className="mt-1 block text-[11px] font-medium text-blue-700">Dapat dialokasikan ke pasang baru</span>
        </div>

        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
          <span className="text-xs font-medium text-indigo-800">Kunjungan Sia-Sia Dicegah</span>
          <div className="mt-2 text-2xl font-black text-indigo-600">{falseVisitsEliminated} Lokasi</div>
          <span className="mt-1 block text-[11px] font-medium text-indigo-700">Titik putus terlokalisasi akurat</span>
        </div>
      </div>
    </div>
  );
}
