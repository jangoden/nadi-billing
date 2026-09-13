import { voucherFeatures, voucherFlow } from "@/data/marketing";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";
import { FlowSteps } from "@/components/marketing/flow-steps";

export function VoucherSection() {
  return (
    <section id="voucher" className="section relative overflow-hidden bg-slate-50/70 border-b border-slate-100">
      <div className="site-container grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: Copy & Features */}
        <div className="space-y-6 lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-teal-50 px-4 py-1 text-teal-700 shadow-xs">
            <Icon name="store" size={16} />
            <span className="label text-[11px] font-bold uppercase tracking-wider">Voucher & Loket Agen</span>
          </div>

          <h2 className="section-heading text-slate-900">
            Hotspot Anda. Cetak Cepat.<br />
            <span className="text-teal-700">Siap Jual ke Agen & Pelanggan.</span>
          </h2>

          <p className="section-copy text-base text-slate-600 sm:text-lg">
            Terbitkan ratusan voucher hotspot sekali klik dengan kode unik dan mode username=password. Siap cetak ke printer thermal 58/80mm atau lembar A4, dan distribusikan langsung lewat jaringan mitra reseller dengan komisi otomatis.
          </p>

          <div className="space-y-3 pt-2">
            {voucherFeatures.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-xs transition-all hover:border-teal-200 hover:shadow-sm"
              >
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <Icon name={item.icon} size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <ButtonLink href="/demo?alur=voucher" variant="teal" className="shadow-lg shadow-teal-700/20">
              PELAJARI ALUR VOUCHER & KEAGENAN
            </ButtonLink>
          </div>
        </div>

        {/* Right: High-Fidelity Interactive Preview Card */}
        <div className="lg:col-span-6">
          <figure className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
            <figcaption className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 font-label font-bold text-white shadow-sm">
                  NB
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">Generator & Cetak Voucher</p>
                  <p className="label text-[11px] text-slate-600">Template Kustom & Distribusi Agen</p>
                </div>
              </div>
              <span className="label rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[11px] font-bold text-teal-700">
                Batch maks 500 Kode
              </span>
            </figcaption>

            {/* Selected Voucher Package Simulation */}
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-teal-200 bg-teal-50/50 p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-teal-800 px-1.5 py-0.5 text-[10px] font-bold text-white">Batch Aktif</span>
                    <p className="text-sm font-bold text-slate-900">Batch #VCH-2026-09A (100 Kode)</p>
                  </div>
                  <p className="label mt-1 text-[11px] text-slate-600">Paket 24 Jam · Speed 10 Mbps · Mode User=Password</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-extrabold text-teal-700">Rp 5.000</p>
                  <p className="label text-[10px] text-slate-600">Thermal 58mm / A4</p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-700">Mitra Agen</span>
                    <p className="text-sm font-semibold text-slate-800">Kios Sinar Net (Agen #04)</p>
                  </div>
                  <p className="label mt-0.5 text-[11px] text-slate-600">Saldo Deposit: Rp 450.000 · Komisi 10% per Voucher</p>
                </div>
                <p className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                  Komisi Otomatis
                </p>
              </div>
            </div>

            {/* Live Delivery Status */}
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                  <Icon name="check" size={18} />
                </span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-emerald-950">Voucher Siap Distribusi & Tercatat di Sistem</p>
                  <p className="label text-[11px] text-emerald-800">Layout print thermal & A4 siap pakai, masa aktif dihitung saat voucher pertama kali login.</p>
                </div>
              </div>
            </div>

            {/* Horizontal Milestone Steps */}
            <div className="mt-6 border-t border-slate-100 pt-5">
              <FlowSteps steps={voucherFlow} />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
