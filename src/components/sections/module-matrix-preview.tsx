import { officialAppModules } from "@/data/marketing";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon, type IconName } from "@/components/ui/icon";

export function ModuleMatrixPreview() {
  return (
    <section
      id="modules-preview"
      aria-label="Direktori 12 Modul Aplikasi NADI Billing"
      className="section border-b border-slate-100 bg-white"
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="Direktori Modul Lengkap"
          title="12 Modul Operasional. Satu Console Terpadu."
          description="Bukan sekadar billing. NADI Billing mencakup seluruh spektrum operasional ISP: dari core routing, topologi FTTH, inventaris logistik, hingga CS desk terintegrasi."
        />

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {officialAppModules.map((module, idx) => (
            <div
              key={module.id}
              className="card group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-md"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white text-primary border border-slate-200/80 shadow-xs transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon name={module.icon as IconName} size={18} />
                  </span>
                  <span className="label text-[10px] font-bold text-slate-600">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                  {module.category}
                </h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
                  {module.description}
                </p>

                <div className="mt-3 border-t border-slate-200/60 pt-2.5">
                  <ul className="space-y-1 text-[11px] text-slate-700">
                    {module.items.slice(0, 3).map((item) => (
                      <li key={item.name} className="flex items-center gap-1.5 truncate">
                        <span className="size-1 rounded-full bg-primary" />
                        <span className="truncate">{item.name}</span>
                      </li>
                    ))}
                    {module.items.length > 3 && (
                      <li className="text-[10px] font-medium text-slate-600 pt-0.5">
                        +{module.items.length - 3} fitur lainnya...
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-2 text-right">
                <span className="label text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Pelajari &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink
            href="/features#module-directory"
            className="shadow-lg shadow-primary/25"
          >
            JELAJAHI 12 MODUL LENGKAP
          </ButtonLink>
          <ButtonLink href="/demo" variant="secondary">
            SIMULASIKAN ALUR DI DEMO
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
