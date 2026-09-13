"use client";

import { useState, useMemo } from "react";
import { Icon, type IconName } from "@/components/ui/icon";
import { ButtonLink } from "@/components/ui/button-link";
import { documentationCategories } from "@/data/documentation-data";

export function DocViewer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string>(documentationCategories[0].id);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedSnippet(id);
      setTimeout(() => setCopiedSnippet(null), 2500);
    });
  };

  // Filter categories and articles based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return documentationCategories;
    const query = searchQuery.toLowerCase();

    return documentationCategories
      .map((category) => {
        const matchingArticles = category.articles.filter(
          (article) =>
            article.title.toLowerCase().includes(query) ||
            article.summary.toLowerCase().includes(query) ||
            article.description.some((d) => d.toLowerCase().includes(query)) ||
            article.snippets?.some((s) => s.code.toLowerCase().includes(query))
        );

        return {
          ...category,
          articles: matchingArticles,
        };
      })
      .filter((category) => category.articles.length > 0);
  }, [searchQuery]);

  // Current active category or first available filtered category
  const activeCategory = useMemo(() => {
    const found = filteredCategories.find((c) => c.id === activeCategoryId);
    return found || filteredCategories[0] || null;
  }, [filteredCategories, activeCategoryId]);

  return (
    <div className="site-container pb-28">
      {/* Pra-rilis Notice Banner */}
      <div className="mb-10 overflow-hidden rounded-2xl border border-blue-200/80 bg-linear-to-r from-blue-50/90 via-sky-50/70 to-indigo-50/80 p-5 shadow-xs sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
              <Icon name="book" size={20} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Preview Dokumentasi Teknis</span>
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-800">
                  Pra-Rilis
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-700 sm:text-base">
                Materi panduan teknis sementara ini disiapkan untuk memandu konfigurasi MikroTik RouterOS, AAA RADIUS, CoA isolir otomatis, dan integrasi payment gateway NADI Billing.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <ButtonLink href="/demo" variant="secondary" className="text-xs sm:text-sm">
              COBA SIMULASI DI DEMO
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Search & Quick Filter Bar */}
      <div className="relative mb-10">
        <label htmlFor="doc-search" className="sr-only">Cari materi dokumentasi</label>
        <div className="relative flex items-center">
          <div className="pointer-events-none absolute left-4.5 text-slate-400">
            <Icon name="search" size={20} />
          </div>
          <input
            id="doc-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari materi, script MikroTik, FreeRADIUS, CoA, GenieACS, atau API..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pr-12 pl-12 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 sm:text-base"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Bersihkan pencarian"
              className="absolute right-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <Icon name="close" size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Main Documentation Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Sidebar / Categories Nav */}
        <aside className="lg:col-span-4" aria-label="Kategori Dokumentasi">
          <div className="sticky top-24 space-y-2 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs">
            <div className="px-3 pt-2 pb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Kategori Panduan ({filteredCategories.length})
              </h2>
            </div>

            <nav className="space-y-1" aria-label="Daftar Kategori">
              {filteredCategories.length === 0 ? (
                <div className="p-4 text-center text-sm text-slate-500">
                  Tidak ada topik yang cocok dengan kata kunci &quot;{searchQuery}&quot;.
                </div>
              ) : (
                filteredCategories.map((cat) => {
                  const isActive = activeCategory?.id === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategoryId(cat.id)}
                      className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left transition-all ${
                        isActive
                          ? "bg-primary text-white shadow-sm"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-blue-50 text-primary group-hover:bg-blue-100"
                          }`}
                        >
                          <Icon name={cat.icon as IconName} size={18} />
                        </span>
                        <div>
                          <div className="text-sm font-semibold leading-tight">{cat.title}</div>
                          <div
                            className={`text-xs ${
                              isActive ? "text-blue-100" : "text-slate-600"
                            }`}
                          >
                            {cat.articles.length} topik panduan
                          </div>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-semibold ${
                          isActive ? "text-white" : "text-slate-500 group-hover:text-slate-700"
                        }`}
                      >
                        <Icon name="arrow" size={14} />
                      </span>
                    </button>
                  );
                })
              )}
            </nav>

            <div className="mt-4 border-t border-slate-100 pt-3">
              <div className="flex items-center justify-between px-3 py-1 text-xs text-slate-500">
                <span>Total Modul</span>
                <span className="font-semibold text-slate-800">
                  {documentationCategories.reduce((acc, c) => acc + c.articles.length, 0)} Panduan
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content Area / Articles Display */}
        <main className="lg:col-span-8" aria-label="Materi Dokumentasi">
          {activeCategory ? (
            <div className="space-y-10">
              {/* Category Header */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary">
                    <Icon name={activeCategory.icon as IconName} size={22} />
                  </span>
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                      {activeCategory.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 sm:text-base">
                      {activeCategory.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Articles in Category */}
              <div className="space-y-8">
                {activeCategory.articles.map((article, idx) => (
                  <article
                    key={article.id}
                    id={article.id}
                    className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-shadow hover:shadow-md"
                  >
                    {/* Article Header */}
                    <div className="border-b border-slate-100 bg-slate-50/50 p-6 sm:p-8">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-primary">
                          Topik #{idx + 1}
                        </span>
                        {article.badge && (
                          <span className="rounded-md bg-slate-200/80 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                            {article.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-xl font-extrabold text-slate-900 sm:text-2xl">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                        {article.summary}
                      </p>
                    </div>

                    {/* Article Body */}
                    <div className="space-y-6 p-6 sm:p-8">
                      {/* Paragraphs */}
                      <div className="space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                        {article.description.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>

                      {/* Numbered Steps if present */}
                      {article.steps && article.steps.length > 0 && (
                        <div className="mt-6 space-y-3 rounded-xl border border-slate-200/70 bg-slate-50/60 p-4 sm:p-6">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Langkah Pelaksanaan
                          </h4>
                          <div className="space-y-3">
                            {article.steps.map((step, sIdx) => (
                              <div key={sIdx} className="flex items-start gap-3">
                                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                                  {sIdx + 1}
                                </span>
                                <div>
                                  <div className="text-sm font-bold text-slate-900">{step.title}</div>
                                  <div className="mt-0.5 text-sm text-slate-600">{step.detail}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Code Snippets if present */}
                      {article.snippets && article.snippets.length > 0 && (
                        <div className="mt-6 space-y-4">
                          {article.snippets.map((snippet, snipIdx) => {
                            const snippetKey = `${article.id}-${snipIdx}`;
                            const isCopied = copiedSnippet === snippetKey;

                            return (
                              <div
                                key={snipIdx}
                                className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 text-slate-100 shadow-sm"
                              >
                                <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5">
                                  <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5" aria-hidden="true">
                                      <span className="size-2.5 rounded-full bg-red-500/80" />
                                      <span className="size-2.5 rounded-full bg-yellow-500/80" />
                                      <span className="size-2.5 rounded-full bg-green-500/80" />
                                    </div>
                                    <span className="text-xs font-medium text-slate-400">
                                      {snippet.caption || snippet.language.toUpperCase()}
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleCopy(snippet.code, snippetKey)}
                                    className="flex items-center gap-1.5 rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700 hover:text-white"
                                    aria-label={`Salin kode ${snippet.caption || ""}`}
                                  >
                                    <Icon name={isCopied ? "check" : "copy"} size={14} className={isCopied ? "text-green-400" : ""} />
                                    <span>{isCopied ? "Tersalin!" : "Salin Script"}</span>
                                  </button>
                                </div>
                                <div className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-blue-200/90 sm:text-sm">
                                  <pre>
                                    <code>{snippet.code}</code>
                                  </pre>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Callout Box if present */}
                      {article.callout && (
                        <div
                          className={`mt-5 rounded-xl border p-4.5 sm:p-5 ${
                            article.callout.type === "tip"
                              ? "border-emerald-200 bg-emerald-50/70 text-emerald-900"
                              : article.callout.type === "important"
                              ? "border-amber-200 bg-amber-50/70 text-amber-900"
                              : "border-blue-200 bg-blue-50/70 text-blue-900"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="shrink-0 pt-0.5">
                              <Icon
                                name={
                                  article.callout.type === "tip"
                                    ? "checkCircle"
                                    : article.callout.type === "important"
                                    ? "warning"
                                    : "book"
                                }
                                size={18}
                              />
                            </span>
                            <div>
                              <div className="text-sm font-bold">{article.callout.title}</div>
                              <div className="mt-1 text-xs leading-relaxed sm:text-sm">
                                {article.callout.message}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <Icon name="search" size={32} className="mx-auto text-slate-400" />
              <h3 className="mt-4 text-lg font-bold text-slate-900">Materi Tidak Ditemukan</h3>
              <p className="mt-2 text-sm text-slate-600">
                Tidak ada materi yang sesuai dengan pencarian Anda. Silakan coba kata kunci lain seperti &quot;radius&quot;, &quot;mikrotik&quot;, atau &quot;genieacs&quot;.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
              >
                Reset Pencarian
              </button>
            </div>
          )}

          {/* Bottom Help Card */}
          <div className="mt-12 rounded-2xl border border-slate-200/80 bg-slate-900 p-8 text-center text-white shadow-md sm:p-10">
            <h3 className="text-xl font-extrabold sm:text-2xl">Butuh Panduan Khusus untuk Topologi Anda?</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
              Tim arsitek jaringan NADI siap membantu integrasi MikroTik, konfigurasi OLT, dan setup payment gateway langsung pada infrastruktur ISP Anda.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/demo" className="shadow-lg shadow-primary/30">
                SIMULASIKAN ALUR DI DEMO
              </ButtonLink>
              <ButtonLink href="/pricing" variant="secondary" className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700">
                LIHAT PAKET & KAPASITAS
              </ButtonLink>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
