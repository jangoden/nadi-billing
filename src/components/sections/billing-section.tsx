import { billingFlow } from "@/data/marketing";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon, type IconName } from "@/components/ui/icon";

const details = [
  "Tagihan bulanan terbit otomatis sesuai siklus masing-masing pelanggan (idempotent)",
  "Antrian pengingat pembayaran disiapkan menjelang jatuh tempo",
  "Pemantauan batas waktu pembayaran tagihan secara real-time",
  "Kasir kantor atau loket mitra agen memverifikasi pembayaran pelanggan",
  "Arus kas operasional tercatat seketika (tersedia fitur void audit-safe)",
  "Histori pembayaran terkunci permanen di audit log sistem tanpa manipulasi",
];

const icons: IconName[] = ["sync", "receipt", "warning", "wallet", "chart", "shield"];

export function BillingSection() {
  return (
    <section id="billing" className="section relative overflow-hidden bg-white border-b border-slate-100">
      <div className="site-container grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: Interactive Billing Automation Timeline Panel */}
        <div className="order-2 lg:order-1 lg:col-span-6">
          <figure className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
            <figcaption className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex size-3 rounded-full bg-blue-600" />
                <span className="font-bold text-slate-900 text-sm">Automated Billing Engine</span>
              </div>
              <span className="label rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold text-primary">
                Idempotent & Audit-Safe
              </span>
            </figcaption>

            <ol className="space-y-3">
              {billingFlow.map((step, index) => {
                const isAudit = index === 5;
                const isInvoice = index === 1;
                return (
                  <li
                    key={step}
                    className={`flex items-center gap-3.5 rounded-2xl p-3.5 border transition-all ${
                      isAudit
                        ? "border-emerald-200 bg-emerald-50/60"
                        : isInvoice
                        ? "border-blue-200 bg-blue-50/60"
                        : "border-slate-100 bg-slate-50/60"
                    }`}
                  >
                    <span
                      className={`label flex size-8 shrink-0 items-center justify-center rounded-xl font-bold text-xs ${
                        isAudit
                          ? "bg-emerald-600 text-white"
                          : isInvoice
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-primary"
                      }`}
                    >
                      {index + 1}
                    </span>

                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-900">{step}</p>
                      <p className="label mt-0.5 text-[11px] text-slate-500">{details[index]}</p>
                    </div>

                    <Icon
                      name={icons[index]}
                      size={18}
                      className={isAudit ? "text-emerald-600" : isInvoice ? "text-blue-600" : "text-slate-400"}
                    />
                  </li>
                );
              })}
            </ol>

            <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs">
              <p className="label font-bold text-primary uppercase text-[10px]">Audit-Safe Accounting</p>
              <p className="mt-1 font-semibold text-slate-800">
                Pencatatan kasir dan void pembayaran dilindungi audit log permanen untuk transparansi operasional ISP Anda.
              </p>
            </div>
          </figure>
        </div>

        {/* Right: Content & CTAs */}
        <div className="order-1 space-y-6 lg:order-2 lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50 px-4 py-1 text-primary shadow-xs">
            <Icon name="receipt" size={16} />
            <span className="label text-[11px] font-bold uppercase tracking-wider">Billing & Keuangan ISP</span>
          </div>

          <h2 className="section-heading text-slate-900">
            Biarkan sistem mengurus tagihan Anda<br />
            <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
              Tepat Waktu & Audit-Safe.
            </span>
          </h2>

          <p className="section-copy text-base text-slate-600 sm:text-lg">
            Otomatiskan penerbitan invoice bulanan sesuai siklus masing-masing pelanggan secara idempotent tanpa risiko dobel tagih. Dilengkapi kasir manual, void pembayaran audit-safe, loket agen, dan laporan arus kas operasional tanpa perlu software akuntansi terpisah.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {[
              "Generate Tagihan Otomatis",
              "Siklus Tagih Idempotent",
              "Kasir & Void Audit-Safe",
              "Loket Agen Reseller",
              "Laporan Arus Kas Masuk & Biaya",
            ].map((item) => (
              <span
                key={item}
                className="label rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="pt-4">
            <ButtonLink href="/demo?alur=billing" className="shadow-lg shadow-primary/20">
              PELAJARI BILLING & KEUANGAN
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
