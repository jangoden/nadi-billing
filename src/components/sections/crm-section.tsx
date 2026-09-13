import { customerJourney } from "@/data/marketing";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";

const labels = [
  "Awal pencatatan lead",
  "Survei ODP terdekat",
  "Pemasangan perangkat",
  "Pelanggan aktif",
  "Tagging risiko churn",
];

const portals = [
  {
    role: "CONSOLE STAF",
    title: "Back-Office Terpadu",
    desc: "11 hak akses RBAC granular untuk Super Admin, NOC Jaringan, Finance/Kasir, dan CS Support.",
    badge: "RBAC 11 Hak Akses",
    icon: "shield" as const,
  },
  {
    role: "TEKNISI LAPANGAN",
    title: "Portal Mobile Teknisi",
    desc: "Peta kerja GIS ODP/ODC, daftar tugas darurat dari Fault Engine, dan tool uji redaman optik di tempat.",
    badge: "Operasional Lapangan",
    icon: "network" as const,
  },
  {
    role: "AGEN / RESELLER",
    title: "Portal Kemitraan Agen",
    desc: "Cetak & jual voucher dengan saldo deposit, loket pembayaran tagihan, dan komisi otomatis per transaksi.",
    badge: "Komisi Otomatis",
    icon: "store" as const,
  },
  {
    role: "PELANGGAN AKHIR",
    title: "Portal Mandiri Pelanggan",
    desc: "Ganti nama SSID & password WiFi sendiri via GenieACS (maks 3x/hari), restart modem, dan cek tagihan.",
    badge: "Self-Service WiFi",
    icon: "user" as const,
  },
];

export function CRMSection() {
  return (
    <section id="crm" className="section relative overflow-hidden bg-white border-b border-slate-100">
      <div className="site-container">
        <SectionHeading
          eyebrow="CRM & Ekosistem 4 Portal"
          tone="tertiary"
          title="Pelanggan bukan sekadar username PPPoE."
          description="Kelola seluruh perjalanan pelanggan dari prospek hingga aktif, deteksi risiko churn otomatis, dan berdayakan operasional lewat 4 portal khusus peran."
        />

        {/* Customer Journey Milestone Pipeline */}
        <ol className="mb-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5" aria-label="Perjalanan pelanggan">
          {customerJourney.map((step, index) => {
            const isActive = index === 3;
            const isAtRisk = index === 4;
            return (
              <li
                key={step}
                className={`relative flex flex-col justify-between rounded-3xl p-5 border transition-all duration-200 hover:-translate-y-1 ${
                  isAtRisk
                    ? "col-span-2 md:col-span-1 border-rose-200 bg-rose-50/50 shadow-xs"
                    : isActive
                    ? "border-emerald-200 bg-emerald-50/50 shadow-xs"
                    : "border-slate-200/80 bg-slate-50/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="label text-[10px] font-bold uppercase text-slate-600">
                      Tahap 0{index + 1}
                    </span>
                    <span
                      className={`size-2 rounded-full ${
                        isAtRisk ? "bg-rose-500 animate-pulse" : isActive ? "bg-emerald-500" : "bg-slate-300"
                      }`}
                    />
                  </div>

                  <p className="font-extrabold text-sm uppercase text-slate-900 tracking-wide">
                    {step}
                  </p>
                </div>

                <div className="mt-4">
                  <span
                    className={`label inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      isAtRisk
                        ? "bg-rose-700 text-white"
                        : isActive
                        ? "bg-emerald-700 text-white"
                        : "bg-white text-slate-600 border border-slate-200 shadow-xs"
                    }`}
                  >
                    {labels[index]}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>

        {/* 4 Dedicated Portals Grid */}
        <div className="mb-10">
          <div className="mb-6 text-center">
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Empat Portal Terintegrasi untuk Seluruh Tim Anda
            </h3>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Satu database terpadu, melayani Console Manajemen, Teknisi Lapangan, Mitra Agen, dan Pelanggan Akhir.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {portals.map((portal) => (
              <div
                key={portal.role}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-purple-200 hover:bg-white hover:shadow-md hover:shadow-purple-500/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                      <Icon name={portal.icon} size={20} />
                    </span>
                    <span className="label rounded-full bg-purple-100/70 px-2.5 py-0.5 text-[10px] font-bold text-purple-800">
                      {portal.badge}
                    </span>
                  </div>
                  <p className="label text-[10px] font-bold tracking-wider text-slate-600 uppercase">
                    {portal.role}
                  </p>
                  <p className="mt-1 text-base font-bold text-slate-900">{portal.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{portal.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CRM Action Insight Card */}
        <div className="rounded-3xl border border-purple-100 bg-gradient-to-r from-purple-50/60 via-slate-50 to-white p-6 shadow-xl shadow-purple-900/5 sm:p-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="flex items-center gap-4 lg:col-span-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-md shadow-purple-500/20">
              <Icon name="heart" size={26} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Deteksi Risiko Churn Otomatis</h3>
              <p className="label mt-0.5 text-xs text-slate-500">Kombinasi riwayat telat bayar & keluhan tiket</p>
            </div>
          </div>

          <div className="my-4 lg:my-0 lg:col-span-5">
            <p className="text-sm font-semibold text-slate-800">
              Cegah pelanggan berhenti berlangganan sebelum terlambat.
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Sistem secara otomatis menandai pelanggan berisiko tinggi berdasarkan riwayat keterlambatan invoice dan frekuensi komplain untuk tindakan proaktif tim CS.
            </p>
          </div>

          <div className="lg:col-span-3 lg:text-right">
            <ButtonLink
              href="/demo?alur=crm"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/20 hover:shadow-xl hover:shadow-purple-600/30"
              icon="users"
            >
              JELAJAHI CRM & PORTAL
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
