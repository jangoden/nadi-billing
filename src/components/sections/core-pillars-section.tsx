import Link from "next/link";
import { pillars } from "@/data/marketing";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";

const tones = {
  teal: {
    border: "border-teal-100 hover:border-teal-300",
    badgeBg: "bg-teal-50 text-teal-700 border-teal-200/60",
    icon: "bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-md shadow-teal-500/20",
    text: "text-teal-700",
    dot: "bg-teal-500",
  },
  blue: {
    border: "border-blue-100 hover:border-blue-300",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200/60",
    icon: "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/20",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  navy: {
    border: "border-indigo-100 hover:border-indigo-300",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
    icon: "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20",
    text: "text-indigo-700",
    dot: "bg-indigo-500",
  },
  purple: {
    border: "border-purple-100 hover:border-purple-300",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200/60",
    icon: "bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md shadow-purple-500/20",
    text: "text-purple-700",
    dot: "bg-purple-500",
  },
};

export function CorePillarsSection() {
  return (
    <section id="features" className="section relative overflow-hidden bg-white">
      <div className="site-container">
        <SectionHeading
          eyebrow="Satu Platform untuk Operasional ISP"
          title="Jual. Tagih. Pantau. Pertahankan."
          description="Empat pilar produk yang menghubungkan operasional, jaringan, dan perjalanan pelanggan Anda."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => {
            const tone = tones[pillar.tone];
            return (
              <article
                key={pillar.id}
                className={`group flex flex-col justify-between rounded-3xl border bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-900/5 ${tone.border}`}
              >
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className={`flex size-14 items-center justify-center rounded-2xl ${tone.icon}`}>
                      <Icon name={pillar.icon} size={28} />
                    </span>
                    <span className={`label rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${tone.badgeBg}`}>
                      Pilar 0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                    {pillar.verb}
                  </h3>
                  <p className={`label mt-1 mb-3 text-xs font-bold tracking-wide uppercase ${tone.text}`}>
                    {pillar.name}
                  </p>
                  <p className="mb-6 text-sm leading-relaxed text-slate-600">
                    {pillar.description}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <ul className="space-y-2.5 text-xs font-medium text-slate-700">
                    {pillar.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5">
                        <span className={`size-1.5 shrink-0 rounded-full ${tone.dot}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/features"
            className="label inline-flex min-h-11 items-center gap-2 rounded-full border border-blue-200 bg-blue-50/60 px-6 py-2 text-xs font-bold tracking-wider text-primary uppercase shadow-xs transition-all hover:bg-blue-100/70 hover:shadow-sm"
          >
            <span>JELAJAHI FITUR NADI</span>
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

