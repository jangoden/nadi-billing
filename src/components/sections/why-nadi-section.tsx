import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";

const connected = [
  "Billing Idempotent, Kasir Terverifikasi & Cetak Voucher",
  "CRM Komprehensif & Visualisasi Customer Journey",
  "Network Intelligence, Status ONU & Telemetri Redaman",
  "Otomasi Multi-Vendor (MikroTik, OLT ZTE/Huawei, GenieACS)",
];

export function WhyNadiSection() {
  return (
    <section id="why-nadi" className="section relative overflow-hidden bg-slate-50/70 border-b border-slate-100">
      <div className="site-container">
        <SectionHeading
          eyebrow="Operasional yang Saling Terhubung"
          title="Lebih dari sekadar billing."
          description="Billing dan voucher adalah fondasi. NADI melengkapinya dengan telemetri jaringan, FreeRADIUS CoA isolir, dan pengelolaan seluruh perjalanan pelanggan."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {/* Card 1: Conventional Billing */}
          <article className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xs sm:p-10">
            <div className="mb-4 inline-block">
              <span className="label rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-700 uppercase">
                Cakupan Umum
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-600">Billing Konvensional</h3>
            <p className="mt-2 mb-6 text-sm text-slate-600">
              Hanya mencakup penagihan dasar dan penjualan voucher tanpa korelasi langsung ke kondisi jaringan teknis.
            </p>

            <ul className="space-y-4 text-sm text-slate-600">
              {["Tagihan Manual Rawan Dobel", "Voucher Hotspot Sederhana", "Pencatatan Kasir Tanpa Audit Log", "Tidak Tahu Jika Ada Gangguan Sinyal OLT"].map((item) => (
                <li className="flex items-center gap-3" key={item}>
                  <span className="size-2 shrink-0 rounded-full bg-slate-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Card 2: NADI Operating Platform */}
          <article className="relative overflow-hidden rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20 p-7 shadow-xl shadow-blue-500/10 sm:p-10">
            <div aria-hidden="true" className="pointer-events-none absolute -top-12 -right-12 size-48 rounded-full bg-primary/10 blur-3xl" />
            <div className="mb-4 inline-block">
              <span className="label rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-[11px] font-bold text-primary uppercase">
                Satu Platform Terintegrasi
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900">
              NADI Operating Platform
            </h3>
            <p className="mt-2 mb-6 text-sm text-slate-600">
              Menghubungkan aspek komersial, teknis jaringan, dan interaksi pelanggan dalam satu alur kerja yang serasi.
            </p>

            <ul className="space-y-4 text-sm font-medium text-slate-800">
              {connected.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <Icon name="check" size={12} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <p className="label mx-auto mt-10 max-w-xl rounded-full border border-slate-200 bg-white p-3 text-center text-xs text-slate-600 shadow-xs">
          Satu platform terintegrasi untuk mengendalikan bisnis, jaringan, dan pelanggan secara lebih utuh.
        </p>
      </div>
    </section>
  );
}

