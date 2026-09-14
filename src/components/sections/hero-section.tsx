import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";
import { ProductPreview } from "@/components/marketing/product-preview";
import { HeroNetworkStars } from "@/components/marketing/hero-network-stars";

export function HeroSection() {
  return (
    <section className="section relative overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-28">
      {/* Network stars background with 20% transparency and smooth gradients */}
      <HeroNetworkStars />

      {/* Background ambient radial gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[640px] w-full max-w-7xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/15 via-cyan-400/10 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-48 size-96 rounded-full bg-blue-400/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-48 size-96 rounded-full bg-cyan-400/10 blur-[100px]"
      />

      <div className="site-container relative flex flex-col items-center text-center">
        {/* Modern Pill Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-4 py-1.5 shadow-xs backdrop-blur-sm">
          <span className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,74,198,.5)]" />
          <span className="label text-[11px] font-bold text-primary uppercase tracking-wider">
            ISP Operating Platform
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="mb-6 text-[34px] leading-[1.14] font-extrabold tracking-tight text-slate-900 sm:text-[54px] sm:leading-[1.08] max-w-4xl">
          Semua Operasional ISP.<br />
          <span className="bg-gradient-to-r from-primary via-primary-container to-secondary bg-clip-text text-transparent">
            Satu Platform Terpadu.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="section-copy mx-auto mb-6 max-w-2xl text-base text-slate-600 sm:text-lg sm:leading-relaxed">
          Kelola voucher, pembayaran, billing, keuangan, jaringan, dan pelanggan dalam satu sistem yang saling terhubung.
        </p>


        {/* Action Buttons */}
        <div className="mt-6 mb-8 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          <ButtonLink href="/demo" className="shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35">
            COBA DEMO
          </ButtonLink>
          <ButtonLink href="/features" variant="secondary" icon="sliders">
            LIHAT FITUR
          </ButtonLink>
        </div>

        {/* Value Micro-Pills */}
        <ul className="label mb-12 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] tracking-wide text-slate-500 uppercase">
          {["Dual-Mode MikroTik & FreeRADIUS", "Payment Gateway Otomatis", "Monitoring NOC Real-time"].map((text) => (
            <li key={text} className="flex items-center gap-1.5">
              <Icon name="checkCircle" size={16} className="text-secondary" />
              <span>{text}</span>
            </li>
          ))}
        </ul>

        {/* High-Fidelity Mockup Window */}
        <div className="w-full max-w-5xl">
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}

