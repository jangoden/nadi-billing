import { ButtonLink } from "@/components/ui/button-link";

export function PageIntro({ eyebrow, title, description, showDemo = true }: { eyebrow: string; title: string; description: string; showDemo?: boolean }) {
  return (
    <section className="section relative overflow-hidden pt-16 pb-14 text-center sm:pt-20 sm:pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-full max-w-5xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400/15 via-cyan-400/10 to-transparent blur-3xl"
      />
      <div className="site-container relative">
        <div className="mb-5 inline-block">
          <span className="badge-pill border border-blue-200 bg-blue-50/90 px-4 py-1.5 text-xs font-bold text-primary shadow-xs">
            <span className="size-1.5 rounded-full bg-primary" />
            {eyebrow}
          </span>
        </div>
        <h1 className="mx-auto max-w-4xl text-[32px] leading-[1.15] font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          {title}
        </h1>
        <p className="section-copy mx-auto mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
          {description}
        </p>
        {showDemo && (
          <div className="mt-8">
            <ButtonLink href="/demo" className="shadow-lg shadow-primary/20">
              COBA DEMO
            </ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}

