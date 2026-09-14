"use client";

import { useState, useMemo } from "react";
import { officialAppModules } from "@/data/marketing";
import { Icon, type IconName } from "@/components/ui/icon";

const filterGroups = [
  "Semua Modul",
  "Jaringan & FTTH",
  "Billing & Finansial",
  "Pelanggan & CS",
  "Operasional & Keamanan",
] as const;

type FilterGroup = (typeof filterGroups)[number];

export function ModuleDirectory() {
  const [selectedGroup, setSelectedGroup] = useState<FilterGroup>("Semua Modul");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModules = useMemo(() => {
    return officialAppModules.filter((module) => {
      const matchesGroup =
        selectedGroup === "Semua Modul" || module.group === selectedGroup;

      if (!matchesGroup) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      const inCategory = module.category.toLowerCase().includes(query);
      const inDescription = module.description.toLowerCase().includes(query);
      const inBadge = module.badge.toLowerCase().includes(query);
      const inItems = module.items.some(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );

      return inCategory || inDescription || inBadge || inItems;
    });
  }, [selectedGroup, searchQuery]);

  return (
    <section
      id="module-directory"
      aria-label="Direktori 12 Modul Resmi NADI Billing"
      className="site-container py-12 sm:py-16"
    >
      {/* Search & Filter Header Bar */}
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        {/* Category Pill Filters */}
        <div
          role="group"
          aria-label="Filter kategori modul"
          className="flex flex-wrap items-center gap-2"
        >
          {filterGroups.map((group) => {
            const isActive = selectedGroup === group;
            return (
              <button
                key={group}
                type="button"
                onClick={() => setSelectedGroup(group)}
                aria-pressed={isActive}
                className={`label rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "border border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {group}
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-80">
          <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400">
            <Icon name="search" size={16} />
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari fitur (misal: OLT, TR-069, Gudang)..."
            aria-label="Cari fitur dalam modul NADI"
            className="w-full rounded-full border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-xs text-slate-800 placeholder-slate-400 shadow-xs transition-colors focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Bersihkan pencarian"
              className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              <Icon name="close" size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Module Cards Grid */}
      {filteredModules.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredModules.map((module, index) => (
            <article
              key={module.id}
              className="card group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-900/5"
            >
              <div>
                {/* Header: Number & Badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon name={module.icon as IconName} size={20} />
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="label rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-slate-700 uppercase">
                      {module.badge}
                    </span>
                    <span className="label text-[11px] font-bold text-slate-600">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Module Title & Description */}
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                  {module.category}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {module.description}
                </p>

                {/* Sub-menu / Features List */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="label mb-2 text-[10px] font-bold tracking-wider text-slate-600 uppercase">
                    Sub-Menu &amp; Kapabilitas Aplikasi:
                  </p>
                  <ul className="space-y-2.5">
                    {module.items.map((item) => (
                      <li key={item.name} className="flex items-start gap-2 text-xs">
                        <span className="mt-1 flex size-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <Icon name="check" size={10} />
                        </span>
                        <div>
                          <strong className="font-semibold text-slate-900">
                            {item.name}
                          </strong>
                          <span className="text-slate-600"> — {item.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Tag */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-3 text-[11px] text-slate-600">
                <span className="label uppercase font-medium text-slate-600">{module.group}</span>
                <span className="font-semibold text-primary">{module.items.length} Fitur Teruji</span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <Icon name="search" size={32} className="mx-auto text-slate-400" />
          <h3 className="mt-4 text-base font-bold text-slate-900">Modul Tidak Ditemukan</h3>
          <p className="mt-1 text-xs text-slate-600">
            Tidak ada fitur yang cocok dengan kata kunci &quot;{searchQuery}&quot;. Silakan coba kata kunci lain.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedGroup("Semua Modul");
            }}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-primary/90"
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </section>
  );
}
