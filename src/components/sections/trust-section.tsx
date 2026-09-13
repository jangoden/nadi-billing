import { supportItems } from "@/data/marketing";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";

export function TrustSection() {
  return (
    <section id="support" className="section relative overflow-hidden bg-slate-50/70 border-b border-slate-100 lg:py-24">
      <div className="site-container">
        <SectionHeading
          eyebrow="Reliability & Support"
          title="Teknologi yang kuat tetap membutuhkan dukungan yang jelas."
          description="Dukungan untuk membantu Anda memahami platform dan menyiapkan operasional yang terhubung tanpa rasa cemas."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {supportItems.map((item) => (
            <article
              key={item.title}
              className="card group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xs transition-all duration-200 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div>
                <span className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-primary border border-blue-100 transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon name={item.icon} size={22} />
                </span>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

