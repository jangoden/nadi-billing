import { ButtonLink } from "@/components/ui/button-link";

export function FinalCTA() {
  return (
    <section id="demo" className="section relative overflow-hidden py-20 sm:py-28">
      <div className="site-container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-primary-container to-indigo-600 px-6 py-14 text-center text-white shadow-2xl shadow-blue-500/20 sm:px-12 sm:py-20">
          {/* Ambient blurred glow rings */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-cyan-400/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-white/15 blur-3xl"
          />

          <div className="relative mx-auto max-w-3xl space-y-6">
            <div className="inline-block">
              <span className="label rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-sm">
                Siap menghubungkan operasional ISP Anda?
              </span>
            </div>

            <h2 className="text-[32px] leading-tight font-extrabold tracking-tight sm:text-5xl">
              Saatnya operasional ISP bekerja lebih terhubung.
            </h2>

            <p className="mx-auto max-w-xl text-base leading-relaxed text-blue-50 sm:text-lg">
              Voucher hotspot, pembayaran digital, billing otomatis, telemetri jaringan, dan CRM dalam satu platform terpadu.
            </p>

            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
              <ButtonLink href="/demo" variant="white" className="shadow-lg shadow-black/10">
                COBA DEMO
              </ButtonLink>
              <ButtonLink href="/pricing" variant="ghost" icon="wallet">
                LIHAT HARGA
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

