import { networkConcepts } from "@/data/marketing";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";

const nodes = [
  {
    label: "Core OLT",
    title: "OLT PON Port 01",
    subtitle: "Telemetri SNMP Standar",
    state: "Normal",
    detail: "Redaman Hulu Stabil",
    alert: false,
    val: "-15.2 dBm",
  },
  {
    label: "Distribusi",
    title: "ODC-02 (Split 1:8)",
    subtitle: "Titik Distribusi Fiber",
    state: "Normal",
    detail: "Korelasi Jalur Aman",
    alert: false,
    val: "-18.5 dBm",
  },
  {
    label: "Titik ODP",
    title: "ODP-07 (8 Port)",
    subtitle: "Fluktuasi RX Power Optik",
    state: "Waspada",
    detail: "Tren Penurunan >3dB / 7 Hari",
    alert: true,
    val: "-24.9 dBm",
  },
  {
    label: "Lokalisasi Otomatis",
    title: "Dropcore #PLG-014",
    subtitle: "Akar Masalah Terisolasi",
    state: "Auto-Ticket",
    detail: "Tugas Darurat Teknisi Terbuat",
    alert: true,
    val: "LOS Detected",
  },
];

const localizationLevels = [
  {
    level: "LEVEL 1",
    title: "Dropcore Pelanggan",
    pattern: "1 Pelanggan LOS, ODP Tetap Normal",
    action: "Sistem menyimpulkan kabel drop rumah putus, teknisi diarahkan ke titik pelanggan tanpa cek ODC.",
    icon: "user" as const,
  },
  {
    level: "LEVEL 2",
    title: "Kabel Distribusi ODP",
    pattern: "Semua Pelanggan di 1 ODP Padam Bersamaan",
    action: "Sistem menyimpulkan kabel distribusi ODC ke ODP terputus. Notifikasi broadcast area otomatis terkirim.",
    icon: "hub" as const,
  },
  {
    level: "LEVEL 3",
    title: "Jalur Cascading Hulu",
    pattern: "Beberapa ODP Berurutan Padam Serentak",
    action: "Sistem mengidentifikasi putusnya kabel feeder hulu atau gangguan port PON OLT utama.",
    icon: "network" as const,
  },
];

export function NetworkIntelligenceSection() {
  return (
    <section id="network" className="section relative overflow-hidden bg-[#070e20] text-white py-24 sm:py-32">
      {/* Background radial ambient lights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 size-[500px] rounded-full bg-cyan-500/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 size-[500px] rounded-full bg-blue-600/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-indigo-500/10 blur-[140px]"
      />

      <div className="site-container relative">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/60 px-4 py-1.5 shadow-xs backdrop-blur-md">
            <span className="size-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span className="label text-[11px] font-bold text-cyan-300 uppercase tracking-wider">
              NADI Fault Detection Engine &bull; Hero Differentiator
            </span>
          </div>

          <h2 className="section-heading text-white">
            Jangan tunggu pelanggan<br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Mengabarkan Jaringan Anda Bermasalah.
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            NADI membaca kondisi jaringan secara proaktif: mengukur telemetri redaman optik ONU, memetakan tren degradasi 7 hari, dan secara cerdas melokalisasi titik kabel putus hingga ke level ODP spesifik sebelum menjadi komplain massal.
          </p>
        </div>

        {/* Telemetry Visualizer Card */}
        <figure className="mb-10 overflow-hidden rounded-3xl border border-slate-700/60 bg-[#0d1733]/90 p-6 shadow-2xl backdrop-blur-md sm:p-10">
          <figcaption className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <span className="size-3 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-bold text-slate-100 text-sm tracking-wide">
                FTTH Topology & Optical RX Power Telemetry Monitor
              </span>
            </div>
            <span className="label text-xs text-slate-400">
              Integrasi Nyata: SNMP OLT &bull; GenieACS TR-069 &bull; MikroTik CHR
            </span>
          </figcaption>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {nodes.map((node) => (
              <div
                key={node.title}
                className={`relative flex flex-col justify-between rounded-2xl p-5 border transition-all ${
                  node.alert
                    ? "border-rose-500/50 bg-[#26101d] shadow-[0_0_24px_rgba(244,63,94,0.15)]"
                    : "border-slate-800 bg-[#091126]/80 hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="label mb-4 flex items-center justify-between gap-2 text-[10px]">
                    <span className={`font-bold uppercase tracking-wider ${node.alert ? "text-rose-400" : "text-cyan-300"}`}>
                      {node.label}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        node.alert
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      }`}
                    >
                      {node.state}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-white">{node.title}</p>
                  <p className="label mt-1 text-[11px] text-slate-400">{node.subtitle}</p>
                </div>

                <div className="mt-6 border-t border-slate-800/80 pt-3 flex items-center justify-between">
                  <p className={`label text-[11px] font-semibold ${node.alert ? "text-rose-300" : "text-slate-300"}`}>
                    {node.detail}
                  </p>
                  <span className={`label text-xs font-bold ${node.alert ? "text-rose-400" : "text-cyan-300"}`}>
                    {node.val}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 3-Level Fault Localization Engine Highlight */}
          <div className="mt-8 border-t border-slate-800/80 pt-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-white text-sm sm:text-base">
                  Mesin Lokalisasi Gangguan 3-Level Otomatis
                </p>
                <p className="text-xs text-slate-400">
                  Sistem langsung menyimpulkan akar masalah tanpa teknisi harus menelusuri manual dari OLT ke lapangan.
                </p>
              </div>
              <span className="hidden sm:inline-flex label rounded-full border border-cyan-500/30 bg-cyan-950/50 px-3 py-1 text-[11px] font-bold text-cyan-300">
                Threshold-Based Algorithm
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {localizationLevels.map((lvl) => (
                <div
                  key={lvl.level}
                  className="rounded-2xl border border-slate-800 bg-[#091126]/60 p-4 transition-all hover:border-cyan-500/40"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-300">
                      <Icon name={lvl.icon} size={16} />
                    </span>
                    <span className="label text-[10px] font-bold tracking-wider text-cyan-400 uppercase">
                      {lvl.level}
                    </span>
                  </div>
                  <p className="font-bold text-slate-100 text-sm">{lvl.title}</p>
                  <p className="label mt-1 text-[11px] font-semibold text-rose-300">{lvl.pattern}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{lvl.action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Preventive Alert & SLA Banner */}
          <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-slate-900/60 p-5 md:flex-row md:items-center">
            <div className="flex items-start gap-3.5">
              <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                <Icon name="chart" size={22} />
              </span>
              <div>
                <p className="font-bold text-white text-sm">Deteksi Dini & Pengukuran SLA (MTTD / MTTR)</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-300">
                  Peringatan prediktif mendeteksi tren redaman turun &gt;3dB dalam 7 hari sebelum sinyal kritis. Waktu deteksi dan pemulihan terekam otomatis dalam laporan SLA operasional.
                </p>
              </div>
            </div>
            <span className="label shrink-0 self-start rounded-full border border-cyan-400/40 bg-cyan-500/20 px-4 py-2 font-bold text-cyan-200 text-xs shadow-xs md:self-auto">
              SLA Metrics Ready
            </span>
          </div>
        </figure>

        {/* Network concepts tags */}
        <ul className="label mb-10 flex flex-wrap justify-center gap-2.5 text-xs text-slate-300">
          {networkConcepts.map((concept) => (
            <li
              key={concept}
              className="rounded-full border border-slate-700/80 bg-slate-900/60 px-4 py-1.5 backdrop-blur-xs transition-colors hover:border-cyan-500/60 hover:text-cyan-200"
            >
              {concept}
            </li>
          ))}
        </ul>

        <div className="text-center">
          <p className="mx-auto mb-6 max-w-2xl text-lg font-bold text-cyan-200">
            Bukan hanya mengetahui siapa yang offline. NADI membantu memahami apa yang sedang terjadi.
          </p>
          <ButtonLink
            href="/demo?alur=network"
            className="bg-gradient-to-r from-secondary to-primary-container shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30"
          >
            JELAJAHI RADAR GANGGUAN JARINGAN
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
