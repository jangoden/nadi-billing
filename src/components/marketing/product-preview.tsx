import { Icon } from "@/components/ui/icon";

export function ProductPreview() {
  return (
    <figure
      className="relative w-full text-left"
      aria-label="Ilustrasi antarmuka operasional terhubung NADI Billing"
    >
      {/* Outer ambient glow behind window */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-b from-blue-500/15 via-cyan-400/10 to-indigo-500/10 blur-2xl"
      />

      {/* Main application window mockup */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-blue-900/10 transition-all">
        {/* Window Chrome / Title Bar */}
        <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-3 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-rose-400/80 border border-rose-500/30" />
              <span className="size-3 rounded-full bg-amber-400/80 border border-amber-500/30" />
              <span className="size-3 rounded-full bg-emerald-400/80 border border-emerald-500/30" />
            </div>
            <div className="hidden items-center gap-2 pl-3 sm:flex">
              <span className="label rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500 shadow-xs">
                https://app.nadibilling.id/console/dashboard
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="label inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200/60">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
              Console Terhubung
            </span>
            <span className="label hidden rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-primary sm:inline-block">
              MikroTik &amp; RADIUS Live
            </span>
          </div>
        </figcaption>

        {/* Tab Bar */}
        <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-100 bg-white px-4 pt-2 text-xs font-semibold sm:px-6">
          <button type="button" className="border-b-2 border-primary pb-2.5 px-3 text-primary font-bold flex items-center gap-1.5">
            <Icon name="chart" size={14} /> Telemetri Terpadu
          </button>
          <button type="button" className="border-b-2 border-transparent pb-2.5 px-3 text-slate-500 hover:text-slate-800 flex items-center gap-1.5">
            <Icon name="router" size={14} /> MikroTik &amp; RADIUS
          </button>
          <button type="button" className="border-b-2 border-transparent pb-2.5 px-3 text-slate-500 hover:text-slate-800 flex items-center gap-1.5">
            <Icon name="receipt" size={14} /> Billing &amp; Kasir
          </button>
          <button type="button" className="border-b-2 border-transparent pb-2.5 px-3 text-slate-500 hover:text-slate-800 flex items-center gap-1.5">
            <Icon name="network" size={14} /> FTTH &amp; GenieACS
          </button>
          <button type="button" className="border-b-2 border-transparent pb-2.5 px-3 text-slate-500 hover:text-slate-800 flex items-center gap-1.5">
            <Icon name="user" size={14} /> CRM &amp; 4 Portal
          </button>
        </div>

        {/* Application Dashboard Body */}
        <div className="bg-slate-50/50 p-4 sm:p-6">
          {/* 4 Core Vital Cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* Vital 1: Billing */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="label text-[10px] font-bold text-blue-600 uppercase tracking-wider">Billing &amp; Keuangan</span>
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">Idempotent</span>
              </div>
              <p className="mt-2 text-xl font-extrabold text-slate-900">Rp 148,5 Jt</p>
              <p className="label mt-1 text-[11px] text-slate-500">Siklus Tagih Bulanan Otomatis</p>
              <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                <Icon name="checkCircle" size={14} />
                <span>Kasir &amp; Void Audit-Safe</span>
              </div>
            </div>

            {/* Vital 2: Hotspot Voucher */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="label text-[10px] font-bold text-teal-800 uppercase tracking-wider">Voucher Hotspot</span>
                <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-800">Batch maks 500</span>
              </div>
              <p className="mt-2 text-xl font-extrabold text-slate-900">1.840 Kode</p>
              <p className="label mt-1 text-[11px] text-slate-600">Siap Cetak Thermal &amp; A4</p>
              <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-teal-50 px-2.5 py-1 text-[11px] font-semibold text-teal-800">
                <Icon name="wallet" size={14} />
                <span>Komisi Agen Otomatis</span>
              </div>
            </div>

            {/* Vital 3: Network Intelligence */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="label text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Fault Detection</span>
                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">3-Level Engine</span>
              </div>
              <p className="mt-2 text-xl font-extrabold text-slate-900">MikroTik &amp; RADIUS</p>
              <p className="label mt-1 text-[11px] text-slate-500">RX Power avg -19.4 dBm</p>
              <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-700">
                <Icon name="warning" size={14} />
                <span>1 ODP Redaman Waspada</span>
              </div>
            </div>

            {/* Vital 4: CRM & Portals */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="label text-[10px] font-bold text-purple-600 uppercase tracking-wider">Ekosistem 4 Portal</span>
                <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-700">Multi-Role</span>
              </div>
              <p className="mt-2 text-xl font-extrabold text-slate-900">3.412 Pelanggan</p>
              <p className="label mt-1 text-[11px] text-slate-500">Self-Service WiFi 3x/hari</p>
              <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-purple-50 px-2.5 py-1 text-[11px] font-semibold text-purple-700">
                <Icon name="heart" size={14} />
                <span>Deteksi Risiko Churn Aktif</span>
              </div>
            </div>
          </div>

          {/* Telemetry & Event Stream Split Panel */}
          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            {/* Left: Live Network Topology Visualizer */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs lg:col-span-7">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <p className="text-xs font-bold text-slate-900">PON Topology // Signal Telemetry</p>
                </div>
                <span className="label text-[10px] text-slate-500">SNMP OLT Polling: Aktif</span>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200/60">
                  <p className="label text-[10px] font-bold text-slate-500 uppercase">Core</p>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">OLT-01</p>
                  <span className="mt-1 inline-block rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800">Normal</span>
                  <p className="label text-[10px] text-slate-500 mt-1">10 Gbps</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200/60">
                  <p className="label text-[10px] font-bold text-slate-500 uppercase">Distrib</p>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">ODC-03</p>
                  <span className="mt-1 inline-block rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800">Normal</span>
                  <p className="label text-[10px] text-slate-500 mt-1">1:8 Split</p>
                </div>
                <div className="rounded-lg bg-rose-50/70 p-2.5 border border-rose-200/80">
                  <p className="label text-[10px] font-bold text-rose-800 uppercase">Drop Point</p>
                  <p className="text-xs font-bold text-rose-900 mt-0.5">ODP-14</p>
                  <span className="mt-1 inline-block rounded bg-rose-200 px-1.5 py-0.5 text-[9px] font-bold text-rose-900">-24.8 dBm</span>
                  <p className="label text-[10px] text-rose-800 mt-1">Waspada</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200/60">
                  <p className="label text-[10px] font-bold text-slate-600 uppercase">Pelanggan</p>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">ONT-882</p>
                  <span className="mt-1 inline-block rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800">Online</span>
                  <p className="label text-[10px] text-slate-600 mt-1">GenieACS TR-069</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs border border-slate-100">
                <span className="text-slate-600">Diagnosa Fault Engine:</span>
                <span className="font-semibold text-primary">Lokalisasi 3-Level mengidentifikasi titik gangguan sebelum komplain pelanggan</span>
              </div>
            </div>

            {/* Right: Live Automated Events Feed */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs lg:col-span-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <p className="text-xs font-bold text-slate-900">Alur Kerja Real-Time</p>
                <span className="label text-[10px] text-emerald-800 font-semibold">&bull; Otomasi Aktif</span>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-start gap-2.5 rounded-lg bg-emerald-50/60 p-2 border border-emerald-100">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Icon name="check" size={12} />
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900">Invoice #INV-4912 Terverifikasi</p>
                    <p className="text-[11px] text-slate-600">Pembayaran dicatat kasir, masuk ke laporan arus kas</p>
                  </div>
                  <span className="label text-[10px] text-slate-600">1m lalu</span>
                </div>

                <div className="flex items-start gap-2.5 rounded-lg bg-blue-50/60 p-2 border border-blue-100">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <Icon name="store" size={12} />
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900">Batch Voucher #VCH-08 Terbit</p>
                    <p className="text-[11px] text-slate-600">100 kode unik siap cetak thermal 58mm &amp; agen</p>
                  </div>
                  <span className="label text-[10px] text-slate-600">3m lalu</span>
                </div>

                <div className="flex items-start gap-2.5 rounded-lg bg-purple-50/60 p-2 border border-purple-100">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white">
                    <Icon name="warning" size={12} />
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900">Tiket Darurat Fault Engine</p>
                    <p className="text-[11px] text-slate-600">Level 1: Dropcore putus &rarr; Tugas teknisi terbuat otomatis</p>
                  </div>
                  <span className="label text-[10px] text-slate-600">8m lalu</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Connected Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-white px-4 py-3 text-xs sm:px-6">
          <p className="flex items-center gap-2 text-slate-600">
            <Icon name="sync" size={16} className="text-primary animate-spin" />
            <span>
              <strong>Ekosistem Terpadu:</strong> MikroTik RouterOS &bull; FreeRADIUS &bull; GenieACS &bull; Fault Engine &bull; Billing &bull; 4 Portal
            </span>
          </p>
          <span className="label font-bold text-secondary">
            Integrasi Nyata ke Perangkat
          </span>
        </div>
      </div>
    </figure>
  );
}
