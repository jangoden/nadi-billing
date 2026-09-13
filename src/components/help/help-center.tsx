"use client";

import { useState, useMemo } from "react";
import { Icon } from "@/components/ui/icon";
import { ButtonLink } from "@/components/ui/button-link";
import {
  supportChannels,
  systemServices,
  helpTopics,
  helpCategories,
} from "@/data/help-data";

export function HelpCenter() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua Kategori");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openTopicId, setOpenTopicId] = useState<string | null>(helpTopics[0].id);
  const [showStatusDetail, setShowStatusDetail] = useState(false);

  // Fast Ticket Form State
  const [ticketName, setTicketName] = useState("");
  const [ticketContact, setTicketContact] = useState("");
  const [ticketCategory, setTicketCategory] = useState("Koneksi Router");
  const [ticketMessage, setTicketMessage] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketName || !ticketContact || !ticketMessage) return;
    setTicketId(`TK-${Date.now().toString().slice(-6)}`);
    setTicketSubmitted(true);
  };

  const filteredTopics = useMemo(() => {
    return helpTopics.filter((topic) => {
      const matchesCategory =
        selectedCategory === "Semua Kategori" || topic.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        topic.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.answer.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (topic.tips && topic.tips.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="site-container pb-28">
      {/* 1. Live System Status Bar */}
      <div className="mb-10 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-3">
            <span className="relative flex size-3">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">
                  Status Sistem: Semua Layanan Beroperasi Normal
                </span>
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                  99.98% Uptime
                </span>
              </div>
              <div className="text-xs text-slate-600">
                Cloud RADIUS, Webhook Pembayaran, dan WhatsApp Gateway siap melayani 24 jam.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowStatusDetail(!showStatusDetail)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            aria-expanded={showStatusDetail}
          >
            <span>{showStatusDetail ? "Sembunyikan Metrik" : "Lihat Metrik Layanan"}</span>
            <Icon name="chevron" size={14} className={`transition-transform ${showStatusDetail ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Expandable Service Metrics */}
        {showStatusDetail && (
          <div className="border-t border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {systemServices.map((svc, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-2xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 line-clamp-1">{svc.name}</span>
                    <span className="size-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="mt-2 flex items-baseline justify-between text-[11px] text-slate-600">
                    <span>Uptime: <strong className="text-slate-800">{svc.uptime}</strong></span>
                    <span>{svc.latency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Official Support Channels (4 Cards) */}
      <div className="mb-14">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              Saluran Dukungan Langsung
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Pilih saluran yang paling nyaman untuk terhubung dengan teknisi siaga NADI Billing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {supportChannels.map((channel) => (
            <div
              key={channel.id}
              className={`flex flex-col justify-between rounded-2xl border p-6 transition-all ${
                channel.isPrimary
                  ? "border-emerald-300 bg-linear-to-b from-emerald-50/70 via-white to-white shadow-md"
                  : "border-slate-200/80 bg-white shadow-xs hover:border-blue-200 hover:shadow-md"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`flex size-10 items-center justify-center rounded-xl ${
                      channel.isPrimary ? "bg-emerald-500 text-white" : "bg-blue-50 text-primary"
                    }`}
                  >
                    <Icon name={channel.icon} size={20} />
                  </span>
                  <span
                    className={`rounded-md px-2.5 py-0.5 text-xs font-bold ${
                      channel.isPrimary
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {channel.badge}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-extrabold text-slate-900">
                  {channel.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {channel.description}
                </p>

                <div className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                  {channel.contact}
                </div>
              </div>

              <div className="mt-6 pt-2">
                <a
                  href={channel.actionHref}
                  target={channel.actionHref.startsWith("http") ? "_blank" : undefined}
                  rel={channel.actionHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                    channel.isPrimary
                      ? "bg-emerald-800 text-white shadow-sm hover:bg-emerald-900"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  <span>{channel.actionText}</span>
                  <Icon name="arrow" size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Troubleshooting & FAQ Explorer */}
      <div className="mb-14">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              Panduan Pemecahan Masalah (Troubleshooting)
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Cari panduan langkah demi langkah untuk kendala teknis yang paling sering dihadapi di lapangan.
            </p>
          </div>
          <ButtonLink href="/documentation" variant="secondary" className="text-xs sm:text-sm">
            BUKA DOKUMENTASI TEKNIS
          </ButtonLink>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 flex items-center">
          <div className="pointer-events-none absolute left-4.5 text-slate-400">
            <Icon name="search" size={20} />
          </div>
          <input
            id="help-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari solusi kendala (misal: mikrotik disconnected, coa port, redaman optik, voucher)..."
            aria-label="Cari solusi bantuan"
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

        {/* Category Filter Pills */}
        <div className="mb-8 flex flex-wrap items-center gap-2" role="tablist" aria-label="Kategori Bantuan">
          {helpCategories.map((cat) => {
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

        {/* Topics Accordion List */}
        {filteredTopics.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
            <Icon name="search" size={32} className="mx-auto text-slate-400" />
            <h3 className="mt-4 text-lg font-bold text-slate-900">Solusi Tidak Ditemukan</h3>
            <p className="mt-2 text-sm text-slate-600">
              Tidak ada panduan yang cocok dengan kata kunci &quot;{searchQuery}&quot;. Silakan hubungi teknisi siaga kami melalui tombol WhatsApp di atas.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Semua Kategori");
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
            >
              Tampilkan Semua Solusi
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTopics.map((topic) => {
              const isOpen = openTopicId === topic.id;
              return (
                <div
                  key={topic.id}
                  className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all hover:border-blue-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenTopicId(isOpen ? null : topic.id)}
                    className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-slate-50/80 sm:p-6"
                    aria-expanded={isOpen}
                  >
                    <div className="pr-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-primary">
                          {topic.category}
                        </span>
                        {topic.badge && (
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                            {topic.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 text-base font-extrabold text-slate-900 sm:text-lg">
                        {topic.question}
                      </h3>
                    </div>

                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-transform ${
                        isOpen ? "rotate-180 bg-blue-50 text-primary" : ""
                      }`}
                    >
                      <Icon name="chevron" size={18} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 bg-slate-50/40 p-5 sm:p-6">
                      <div className="space-y-2.5 text-sm leading-relaxed text-slate-700">
                        {topic.answer.map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>

                      {topic.tips && (
                        <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/80 p-3.5 text-xs text-emerald-900 sm:text-sm">
                          <span className="shrink-0 pt-0.5 text-emerald-700">
                            <Icon name="checkCircle" size={16} />
                          </span>
                          <div>
                            <strong>Tips Teknisi: </strong>
                            <span>{topic.tips}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Quick Helpdesk Form & SLA Guarantee */}
      <div className="grid grid-cols-1 gap-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-5">
          <span className="badge-pill border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold text-primary">
            Tiket Bantuan Instan
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Kirimkan Pertanyaan atau Kendala Jaringan Anda
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            Tidak menemukan jawaban yang sesuai? Isi formulir singkat ini dan teknisi NADI akan langsung menghubungi Anda melalui nomor WhatsApp dalam waktu kurang dari 5 menit.
          </p>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 sm:text-sm">
              <span className="text-emerald-600"><Icon name="checkCircle" size={18} /></span>
              <span>Dukungan teknisi jaringan berpengalaman BRAS &amp; FTTH</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 sm:text-sm">
              <span className="text-emerald-600"><Icon name="checkCircle" size={18} /></span>
              <span>Layanan remote debugging Winbox via AnyDesk gratis</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 sm:text-sm">
              <span className="text-emerald-600"><Icon name="checkCircle" size={18} /></span>
              <span>Prioritas tinggi untuk status router down</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 lg:col-span-7 sm:p-8">
          {ticketSubmitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Icon name="checkCircle" size={32} />
              </span>
              <h3 className="mt-4 text-xl font-extrabold text-slate-900">
                Tiket Berhasil Diterbitkan!
              </h3>
              <p className="mt-2 max-w-md text-sm text-slate-600">
                Nomor Tiket: <strong className="text-primary font-mono">#{ticketId}</strong>. Tim teknisi siaga kami segera memproses kendala Anda dan mengirimkan tanggapan ke WhatsApp <strong>{ticketContact}</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setTicketSubmitted(false);
                  setTicketMessage("");
                }}
                className="mt-6 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-primary/90"
              >
                KIRIM TIKET LAIN
              </button>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ticket-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Nama Lengkap / Nama ISP *
                  </label>
                  <input
                    id="ticket-name"
                    type="text"
                    required
                    value={ticketName}
                    onChange={(e) => setTicketName(e.target.value)}
                    placeholder="Contoh: Budi (Nusantara Net)"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-2xs focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/10"
                  />
                </div>

                <div>
                  <label htmlFor="ticket-contact" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Nomor WhatsApp Aktif *
                  </label>
                  <input
                    id="ticket-contact"
                    type="tel"
                    required
                    value={ticketContact}
                    onChange={(e) => setTicketContact(e.target.value)}
                    placeholder="081234567890"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-2xs focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="ticket-category" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Jenis Kendala
                </label>
                <select
                  id="ticket-category"
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-2xs focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/10"
                >
                  <option value="Koneksi Router">Koneksi Router &amp; RADIUS MikroTik</option>
                  <option value="Billing & Kasir">Billing Bulanan &amp; Kasir ISP</option>
                  <option value="FTTH & GenieACS">FTTH, OLT SNMP &amp; TR-069 GenieACS</option>
                  <option value="Hotspot Voucher">Hotspot Captive Portal &amp; Voucher</option>
                  <option value="Migrasi Data">Bantuan Migrasi Database Pelanggan</option>
                  <option value="Lainnya">Pertanyaan Umum Lainnya</option>
                </select>
              </div>

              <div>
                <label htmlFor="ticket-msg" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Deskripsi Kendala atau Pertanyaan *
                </label>
                <textarea
                  id="ticket-msg"
                  required
                  rows={4}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Ceritakan detail kendala Anda, tipe router MikroTik, atau pesan error yang muncul..."
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-2xs focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/10"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/20"
              >
                KIRIM TIKET BANTUAN SEKARANG
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
