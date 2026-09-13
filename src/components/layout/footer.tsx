import Link from "next/link";
import { footerGroups } from "@/data/navigation";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/80 text-slate-600">
      <div className="wide-container py-16 sm:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 space-y-4 lg:col-span-4">
            <Logo />
            <p className="max-w-sm text-xs leading-relaxed text-slate-600">
              ISP Operating Platform terpadu untuk RT/RW Net, Mini ISP, ISP FTTH, dan operator hotspot voucher di seluruh Indonesia.
            </p>
            <div className="pt-1">
              <span className="label inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold text-slate-700 shadow-xs">
                <span className="size-2 rounded-full bg-emerald-500" />
                Semua operasional dalam satu platform.
              </span>
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:col-span-8">
            {footerGroups.map((group) => (
              <nav aria-label={`Footer ${group.label}`} key={group.label}>
                <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900">
                  {group.label}
                </h2>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-block text-xs text-slate-600 transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="label mt-16 flex flex-col justify-between gap-4 border-t border-slate-200/70 pt-8 text-xs text-slate-600 sm:flex-row">
          <p>© {new Date().getFullYear()} NADI Billing. All rights reserved.</p>
          <p>Jual · Tagih · Pantau · Pertahankan.</p>
        </div>
      </div>
    </footer>
  );
}

