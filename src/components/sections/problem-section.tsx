import Image from "next/image";
import { problems } from "@/data/marketing";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";

export function ProblemSection() {
  return (
    <section className="section bg-slate-50/70 border-b border-slate-100 lg:py-24">
      <div className="site-container">
        <SectionHeading
          eyebrow="Tantangan Operasional"
          title="Menjalankan ISP tidak seharusnya serumit ini."
          description="Pembayaran, penagihan, jaringan, dan pelanggan membutuhkan perhatian. Alur yang terpisah membuat pekerjaan sehari-hari semakin rumit."
          tone="error"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((item, index) => (
            <article
              key={item.label}
              className="card group relative flex flex-col justify-between overflow-hidden border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-100 transition-colors group-hover:bg-rose-600 group-hover:text-white">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <span className="label text-[10px] font-bold tracking-wider text-slate-600 uppercase">
                    0{index + 1}
                  </span>
                </div>
                <p className="label text-[10px] font-bold tracking-wider text-rose-800 uppercase">
                  {item.label}
                </p>
                <h3 className="mt-2 mb-3 text-base leading-snug font-bold text-slate-900">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-6 py-3 text-sm font-bold text-primary shadow-xs backdrop-blur-sm">
            <Image
              src="/images/logo/logo-icon.png"
              alt="NADI"
              width={18}
              height={18}
              className="size-4.5 shrink-0 object-contain"
            />
            <span>NADI menghubungkan semuanya dalam satu alur kerja.</span>
          </span>
        </div>
      </div>
    </section>
  );
}

