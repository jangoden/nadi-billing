export function SectionHeading({ eyebrow, title, description, tone = "primary", className = "" }: {
  eyebrow: string; title: string; description?: string; tone?: "primary" | "secondary" | "error" | "tertiary"; className?: string;
}) {
  const tones = {
    primary: { badge: "bg-blue-50 text-primary border-blue-200/60", dot: "bg-primary" },
    secondary: { badge: "bg-teal-50 text-secondary border-teal-200/60", dot: "bg-secondary" },
    error: { badge: "bg-rose-50 text-rose-800 border-rose-200/60", dot: "bg-rose-600" },
    tertiary: { badge: "bg-purple-50 text-tertiary border-purple-200/60", dot: "bg-tertiary" },
  };
  const activeTone = tones[tone];
  return <div className={`mx-auto mb-14 max-w-3xl text-center ${className}`}>
    <div className="mb-4 inline-flex items-center justify-center">
      <span className={`badge-pill border shadow-xs ${activeTone.badge}`}>
        <span className={`size-1.5 rounded-full ${activeTone.dot}`} />
        {eyebrow}
      </span>
    </div>
    <h2 className="section-heading text-slate-900">{title}</h2>
    {description && <p className="section-copy mx-auto mt-4 max-w-2xl text-slate-600 leading-relaxed">{description}</p>}
  </div>;
}

