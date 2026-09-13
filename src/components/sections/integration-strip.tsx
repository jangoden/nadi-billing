import { integrations } from "@/data/marketing";
import { Icon } from "@/components/ui/icon";

export function IntegrationStrip() {
  return (
    <section className="relative border-y border-slate-100 bg-slate-50/60 py-14" aria-labelledby="integration-title">
      <div className="site-container text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/70 px-4 py-1 text-primary shadow-2xs">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="label text-[11px] font-bold uppercase tracking-wider">
            Integrasi Nyata ke Perangkat &bull; Bukan Mock
          </span>
        </div>

        <h2 id="integration-title" className="section-heading mb-2 text-xl font-bold text-slate-900 sm:text-2xl">
          Terhubung langsung dengan ekosistem jaringan Anda.
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-xs text-slate-500 sm:text-sm">
          NADI Billing berkomunikasi langsung melalui API, protokol AAA, dan telemetri perangkat untuk kendali operasional tanpa jeda.
        </p>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {integrations.map((item) => (
            <li
              key={item.name}
              className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/5"
            >
              <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition-colors group-hover:bg-blue-50 group-hover:text-primary">
                <Icon name={item.icon} size={26} />
              </div>
              <p className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{item.name}</p>
              <p className="label mt-1 text-[11px] text-slate-500">{item.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
