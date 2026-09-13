import { faqs } from "@/data/marketing";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";

export function FAQSection() {
  return (
    <section id="faq" className="section relative overflow-hidden bg-slate-50/60 border-b border-slate-100">
      <div className="site-container max-w-[900px]">
        <SectionHeading
          eyebrow="Pertanyaan Umum"
          title="Kerap ditanyakan seputar NADI."
          description="Jawaban seputar fitur, kapasitas, dan alur kerja platform."
        />

        <div className="space-y-3.5">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              name="nadi-faq"
              className="group rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-200 open:border-blue-200 open:shadow-md open:shadow-blue-500/5"
            >
              <summary className="flex min-h-14 list-none items-center justify-between gap-4 rounded-2xl px-6 py-4.5 font-bold text-slate-900 transition-colors group-hover:text-primary">
                <span className="text-sm sm:text-base">{faq.question}</span>
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform duration-200 group-open:rotate-180 group-open:bg-blue-100 group-open:text-primary">
                  <Icon name="chevron" size={16} />
                </span>
              </summary>
              <p className="px-6 pb-6 text-sm leading-relaxed text-slate-600 border-t border-slate-100/80 pt-3">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

