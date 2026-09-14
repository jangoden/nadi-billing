import { includedFeatures } from "@/data/marketing";
import { CapacitySelector } from "@/components/marketing/capacity-selector";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";

export function PricingSection() {
  return (
    <section id="pricing" className="section relative overflow-hidden bg-white border-b border-slate-100">
      <div className="site-container">
        <SectionHeading
          eyebrow="Transparent Pricing"
          tone="secondary"
          title="Pricing yang tidak membuat Anda menghitung fitur."
          description="Semua fitur NADI tersedia sejak hari pertama tanpa pembatasan paket."
        />

        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-10">
          <div className="mb-8 flex justify-center">
            <span className="badge-pill border border-blue-200 bg-blue-50/80 px-4 py-1.5 font-bold text-primary shadow-xs">
              <span className="size-2 rounded-full bg-primary" />
              All Features Included
            </span>
          </div>

          <CapacitySelector />

          <div className="mt-8 border-t border-slate-100 pt-8">
            <p className="label mb-4 text-xs font-bold tracking-wider text-slate-600 uppercase">
              Semua termasuk di setiap langganan:
            </p>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-secondary border border-teal-200">
                    <Icon name="check" size={12} />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

