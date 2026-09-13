"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { ButtonLink } from "@/components/ui/button-link";
import { blogPosts, blogCategories, type BlogPost } from "@/data/blog-data";

export function BlogExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua Artikel");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "Semua Artikel" || post.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return blogPosts.find((p) => p.featured) || blogPosts[0];
  }, []);

  return (
    <div className="site-container pb-28">
      {/* Notice Banner */}
      <div className="mb-10 overflow-hidden rounded-2xl border border-blue-200/80 bg-linear-to-r from-blue-50/90 via-sky-50/70 to-indigo-50/80 p-5 shadow-xs sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
              <Icon name="chat" size={20} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Koleksi Insight ISP</span>
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-800">
                  Data Statis Pra-Rilis
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-700 sm:text-base">
                Kumpulan artikel teknis dan strategi operasional ISP untuk membantu pengoptimalan bandwidth, isolir otomatis MikroTik, dan pertumbuhan bisnis jaringan Anda.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <ButtonLink href="/documentation" variant="secondary" className="text-xs sm:text-sm">
              LIHAT DOKUMENTASI SISTEM
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Featured Post Card (only visible when not filtering with search) */}
      {!searchQuery && selectedCategory === "Semua Artikel" && featuredPost && (
        <div className="mb-12 overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            {/* Featured Image Column */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 shadow-xs lg:col-span-5 aspect-16/10">
              <Image
                src={featuredPost.imageUrl}
                alt={featuredPost.imageAlt}
                width={720}
                height={450}
                priority
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-lg bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 text-xs font-bold text-white">
                {featuredPost.category}
              </span>
            </div>

            {/* Content Column */}
            <div className="space-y-4 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  ★ Artikel Sorotan
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-medium text-slate-600">{featuredPost.date}</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-medium text-slate-600">{featuredPost.readTime}</span>
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                {featuredPost.title}
              </h2>

              <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                {featuredPost.summary}
              </p>

              {/* Key Takeaways snippet */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Poin Kunci Utama:
                </div>
                <div className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
                  <span className="shrink-0 pt-0.5 text-primary">
                    <Icon name="checkCircle" size={16} />
                  </span>
                  <span>{featuredPost.keyTakeaways[0]}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setReadingPost(featuredPost)}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/20"
                >
                  <span>BACA ARTIKEL LENGKAP</span>
                  <Icon name="arrow" size={16} />
                </button>
                <div className="flex items-center gap-2.5 text-xs text-slate-600 sm:text-sm">
                  <span className="flex size-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-primary">
                    {featuredPost.author.avatarInitials}
                  </span>
                  <span>Oleh <strong className="text-slate-800">{featuredPost.author.name}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search & Category Filter */}
      <div className="mb-8 space-y-6">
        {/* Search Input */}
        <div className="relative flex items-center">
          <div className="pointer-events-none absolute left-4.5 text-slate-400">
            <Icon name="search" size={20} />
          </div>
          <input
            id="blog-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari artikel (misal: mikrotik, ftth, genieacs, reseller, voucher)..."
            aria-label="Cari artikel blog"
            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pr-12 pl-12 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 sm:text-base"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Hapus pencarian"
              className="absolute right-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <Icon name="close" size={16} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Kategori Artikel">
          {blogCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
          <Icon name="search" size={32} className="mx-auto text-slate-400" />
          <h3 className="mt-4 text-lg font-bold text-slate-900">Artikel Tidak Ditemukan</h3>
          <p className="mt-2 text-sm text-slate-600">
            Tidak ada artikel yang cocok dengan &quot;{searchQuery}&quot;. Silakan coba kata kunci lain atau pilih kategori lain.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("Semua Artikel");
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
          >
            Tampilkan Semua Artikel
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-6"
            >
              <div>
                {/* Image Cover */}
                <div className="relative mb-4 overflow-hidden rounded-xl aspect-16/10 bg-slate-100 border border-slate-100">
                  <Image
                    src={post.imageUrl}
                    alt={post.imageAlt}
                    width={480}
                    height={300}
                    unoptimized={post.imageUrl.endsWith(".svg")}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-md bg-white/95 backdrop-blur-xs px-2.5 py-1 text-xs font-bold text-primary shadow-xs">
                    {post.category}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="font-medium text-slate-600">{post.date}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-medium text-slate-600">{post.readTime}</span>
                </div>

                <h3 className="mt-3 text-lg font-extrabold text-slate-900 transition-colors group-hover:text-primary sm:text-xl">
                  {post.title}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {post.summary}
                </p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-primary">
                      {post.author.avatarInitials}
                    </span>
                    <span className="text-xs font-semibold text-slate-800">{post.author.name}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setReadingPost(post)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 focus:outline-none"
                    aria-label={`Baca artikel: ${post.title}`}
                  >
                    <span>BACA</span>
                    <Icon name="arrow" size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Newsletter & Free Guide Box */}
      <div className="mt-16 rounded-3xl border border-blue-200/80 bg-linear-to-br from-slate-900 via-slate-800 to-indigo-950 p-8 text-center text-white shadow-xl sm:p-12">
        <span className="inline-flex items-center rounded-full bg-blue-500/20 px-3.5 py-1 text-xs font-bold text-blue-300">
          NADI Knowledge Hub
        </span>
        <h3 className="mx-auto mt-4 max-w-2xl text-2xl font-extrabold sm:text-3xl">
          Ingin Menerima Update Konfigurasi Jaringan & Panduan ISP Terbaru?
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
          Dapatkan tips routing MikroTik, otomasi penagihan, dan studi kasus pengoptimalan ISP langsung setiap minggu.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/demo" className="shadow-lg shadow-primary/30">
            JELAJAHI SIMULASI PLATFORM
          </ButtonLink>
          <ButtonLink href="/pricing" variant="secondary" className="border-slate-600 bg-slate-800 text-white hover:bg-slate-700">
            LIHAT PAKET KEMITRAAN
          </ButtonLink>
        </div>
      </div>

      {/* Article Reader Modal / Overlay */}
      {readingPost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-article-title"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-xs"
        >
          <div className="relative my-8 w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-4 sm:px-8">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-primary">
                  {readingPost.category}
                </span>
                <span className="text-xs text-slate-600">• {readingPost.readTime}</span>
              </div>
              <button
                type="button"
                onClick={() => setReadingPost(null)}
                aria-label="Tutup artikel"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="max-h-[75vh] overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
              {/* Large Cover Image in Reader */}
              <div className="relative mb-6 overflow-hidden rounded-2xl aspect-16/9 bg-slate-100 border border-slate-200/80 shadow-xs">
                <Image
                  src={readingPost.imageUrl}
                  alt={readingPost.imageAlt}
                  width={800}
                  height={450}
                  unoptimized={readingPost.imageUrl.endsWith(".svg")}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/80 via-slate-950/30 to-transparent p-4 text-xs font-medium text-slate-200">
                  {readingPost.imageAlt}
                </div>
              </div>

              <h2 id="modal-article-title" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                {readingPost.title}
              </h2>

              <div className="mt-4 flex items-center gap-3 border-b border-slate-100 pb-6 text-sm text-slate-600">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {readingPost.author.avatarInitials}
                </span>
                <div>
                  <div className="font-bold text-slate-900">{readingPost.author.name}</div>
                  <div className="text-xs text-slate-600">{readingPost.author.role} • {readingPost.date}</div>
                </div>
              </div>

              {/* Body paragraphs */}
              <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
                {readingPost.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Takeaways Card */}
              <div className="mt-8 rounded-2xl border border-blue-200/80 bg-blue-50/70 p-6">
                <h4 className="flex items-center gap-2 text-sm font-bold text-primary">
                  <Icon name="checkCircle" size={18} />
                  <span>Kesimpulan Operasional</span>
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {readingPost.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="shrink-0 pt-0.5 text-primary">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/50 px-6 py-4 sm:px-8">
              <ButtonLink href="/demo" className="text-xs sm:text-sm">
                COBA SIMULASI FITUR INI
              </ButtonLink>
              <button
                type="button"
                onClick={() => setReadingPost(null)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-100 sm:text-sm"
              >
                Tutup Baca
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
