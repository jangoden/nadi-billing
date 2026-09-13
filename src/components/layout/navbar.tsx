"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { resources, solutions } from "@/data/navigation";
import type { NavigationLink } from "@/types/marketing";
import { Icon } from "@/components/ui/icon";
import { Logo } from "./logo";

function Dropdown({ label, links, pathname }: { label: string; links: NavigationLink[]; pathname: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const openedByHoverRef = useRef(false);
  const id = label === "Solusi" ? "solutions-menu" : "resources-menu";

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    openedByHoverRef.current = true;
    setOpen(true);
  };

  const handleMouseLeave = () => {
    openedByHoverRef.current = false;
    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  const handleClick = () => {
    if (openedByHoverRef.current) {
      openedByHoverRef.current = false;
      setOpen(true);
    } else {
      setOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    }
    if (open) document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  return (
    <div
      ref={root}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="nav-link"
        aria-expanded={open}
        aria-controls={id}
        onClick={handleClick}
      >
        {label}
        <Icon
          name="chevron"
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul id={id} className="nav-dropdown" role="menu" aria-label={label}>
          {links.map((link) => (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                aria-label={link.label}
                className="dropdown-link group"
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.icon && (
                  <span className="dropdown-icon-container">
                    <Icon name={link.icon} size={18} />
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="dropdown-item-title">{link.label}</p>
                  {link.description && (
                    <p className="dropdown-item-desc">{link.description}</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MobileGroup({ label, links, pathname, close }: { label: string; links: NavigationLink[]; pathname: string; close: () => void }) {
  return (
    <details className="group border-t border-border py-1">
      <summary className="flex min-h-12 list-none items-center justify-between px-3 font-semibold text-slate-800">
        {label}
        <Icon name="chevron" size={18} className="transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <ul className="mb-2 ml-3 space-y-1 border-l-2 border-slate-200 pl-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-label={link.label}
              onClick={close}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-700 hover:bg-surface-low hover:text-primary transition-colors"
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.icon && (
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-container text-slate-600">
                  <Icon name={link.icon} size={16} />
                </span>
              )}
              <div>
                <p className="text-xs font-bold leading-tight">{link.label}</p>
                {link.description && (
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{link.description}</p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const close = () => setMobileOpen(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    function resize(event: MediaQueryListEvent) {
      if (event.matches) setMobileOpen(false);
    }
    query.addEventListener("change", resize);
    return () => query.removeEventListener("change", resize);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setMobileOpen(false);
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [mobileOpen]);

  return (
    <header
      ref={header}
      className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 shadow-[0_1px_8px_rgba(0,0,0,.02)] backdrop-blur-md transition-colors"
      onKeyDown={(event) => {
        if (event.key === "Escape" && mobileOpen) {
          close();
          mobileTrigger.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
    >
      <div className="wide-container flex h-20 items-center justify-between gap-4">
        {/* Left: Logo aligned to left */}
        <div className="flex flex-1 items-center justify-start">
          <Logo />
        </div>

        {/* Center: Desktop Navigation centered */}
        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-1 rounded-full border border-slate-200/60 bg-surface-low/80 px-4 py-1.5 shadow-xs backdrop-blur-sm lg:flex"
        >
          <Link href="/" className="nav-link" aria-current={pathname === "/" ? "page" : undefined}>
            Beranda
          </Link>
          <Link href="/features" className="nav-link" aria-current={pathname === "/features" ? "page" : undefined}>
            Fitur
          </Link>
          <Dropdown label="Solusi" links={solutions} pathname={pathname} />
          <Link href="/pricing" className="nav-link" aria-current={pathname === "/pricing" ? "page" : undefined}>
            Harga
          </Link>
          <Dropdown label="Sumber Daya" links={resources} pathname={pathname} />
        </nav>

        {/* Right: Action Buttons aligned to right */}
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
          <Link
            href="/demo"
            className="flex min-h-10 items-center rounded-full bg-gradient-to-r from-primary to-primary-container px-5 font-label text-[13px] font-semibold text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 hover:brightness-105 active:scale-98 sm:px-6"
            onClick={close}
          >
            DEMO
          </Link>
          <button
            ref={mobileTrigger}
            type="button"
            aria-label={mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="flex size-10 items-center justify-center rounded-full border border-slate-200 hover:bg-surface-low lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navigasi seluler"
          className="max-h-[calc(100dvh-80px)] overflow-y-auto border-t border-border bg-white px-4 py-3 shadow-xl lg:hidden"
        >
          <Link href="/" className="dropdown-link" onClick={close} aria-current={pathname === "/" ? "page" : undefined}>
            Beranda
          </Link>
          <Link href="/features" className="dropdown-link" onClick={close} aria-current={pathname === "/features" ? "page" : undefined}>
            Fitur
          </Link>
          <MobileGroup label="Solusi" links={solutions} pathname={pathname} close={close} />
          <Link href="/pricing" className="dropdown-link" onClick={close} aria-current={pathname === "/pricing" ? "page" : undefined}>
            Harga
          </Link>
          <MobileGroup label="Sumber Daya" links={resources} pathname={pathname} close={close} />
        </nav>
      )}
    </header>
  );
}

