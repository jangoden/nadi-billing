import { PageIntro } from "@/components/marketing/page-intro";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { CRMSection } from "@/components/sections/crm-section";
import { FinalCTA } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import {
  CrmCsExplorer,
  CrmRetentionCalculator,
} from "@/components/solutions/crm-solution-interactive";

export const metadata = pageMetadata(
  "Solusi Pelanggan & CS Desk",
  "Manajemen profil 360°, deteksi churn proaktif, antrian live chat CS omnichannel, dan sistem tiket otomatis teknisi dengan SLA terukur.",
  "/solutions/customer-support"
);

const metricStats = [
  { value: "360°", label: "Profil Terpadu Pelanggan", desc: "Data jaringan, tagihan, & riwayat tiket" },
  { value: "< 45 Detik", label: "Respon Cepat Agen CS", desc: "Antrian round-robin chat omnichannel" },
  { value: "Auto-Assign", label: "Tiket Teknisi Lapangan", desc: "Akurasi titik GPS & ODP terdekat" },
  { value: "+55%", label: "Efektivitas Retensi Churn", desc: "Pencegahan dini sebelum pelanggan putus" },
];

const slaWorkflows = [
  {
    priority: "Kritis (P1) - Jaringan Padam Total (LOS)",
    targetResponse: "< 5 Menit",
    targetResolve: "< 60 Menit",
    action: "Auto-assign darurat ke teknisi patroli terdekat via koordinat GPS + broadcast WhatsApp ke pelanggan terdampak.",
  },
  {
    priority: "Tinggi (P2) - Degradasi Redaman Optik (High Loss)",
    targetResponse: "< 15 Menit",
    targetResolve: "< 3 Jam",
    action: "Sistem membaca redaman > -27 dBm &rarr; tiket pengecekan patchcord/pigtail diterbitkan ke tim maintenance.",
  },
  {
    priority: "Sedang (P3) - Kendala WiFi & Penggantian Password",
    targetResponse: "< 2 Menit",
    targetResolve: "< 10 Menit",
    action: "CS Desk langsung meremot SSID / password via GenieACS TR-069 tanpa perlu kunjungan fisik teknisi.",
  },
  {
    priority: "Rendah (P4) - Permintaan Pasang Baru / Upgrade Paket",
    targetResponse: "< 30 Menit",
    targetResolve: "< 24 Jam",
    action: "Pipeline prospek otomatis memicu survei ketersediaan port ODP terdekat dan generate invoice registrasi.",
  },
];

const technicalFaqs = [
  {
    question: "Bagaimana sistem live chat NADI membantu agen CS melayani pelanggan lebih cepat?",
    answer:
      "NADI mengintegrasikan nomor WhatsApp resmi ISP Anda ke dasbor antrian CS. Ketika pesan masuk, sistem otomatis mengenali nomor telepon pelanggan dan menampilkan kartu profil 360° di sisi kanan obrolan (meliputi paket aktif, status redaman ONT saat ini, port ODP terhubung, dan riwayat tagihan). CS tidak perlu bertanya berulang-ulang dan dapat merespons dalam hitungan detik.",
  },
  {
    question: "Bagaimana algoritma Deteksi Dini Churn bekerja?",
    answer:
      "Algoritma NADI menganalisis korelasi 3 faktor kunci: (1) frekuensi tiket keluhan internet lambat dalam 14 hari terakhir, (2) tren penurunan volume penggunaan trafik bulanan, dan (3) riwayat tanggal pembayaran yang berulang kali mendekati masa isolir. Pelanggan dengan skor risiko tinggi diberi label khusus agar tim retensi dapat segera memberikan perhatian khusus atau voucher apresiasi.",
  },
  {
    question: "Apakah tiket perbaikan teknisi dapat dikonfirmasi langsung oleh pelanggan?",
    answer:
      "Ya. Begitu teknisi menandai tiket telah selesai diperbaiki (lengkap dengan foto hasil redaman optik di lokasi), sistem NADI otomatis mengirim pesan WhatsApp ke pelanggan berisi konfirmasi status koneksi dan survei rating kepuasan (CSAT). Tiket baru benar-benar ditutup (Closed) setelah pelanggan mengonfirmasi internet telah normal.",
  },
  {
    question: "Apakah portal mandiri pelanggan (Customer Portal) membutuhkan instalasi aplikasi?",
    answer:
      "Tidak. Portal mandiri NADI adalah Progressive Web App (PWA) yang ringan dan dapat diakses langsung dari browser ponsel tanpa perlu download dari Play Store atau App Store. Pelanggan cukup login menggunakan nomor WhatsApp atau nomor pelanggan untuk cek kuota, bayar tagihan via QRIS, atau ubah password WiFi.",
  },
  {
    question: "Bisakah performa kerja masing-masing teknisi dan CS dipantau secara objektif?",
    answer:
      "Sangat bisa. NADI menyediakan laporan analitik SLA: rata-rata waktu respon pertama CS (First Response Time), durasi rata-rata penyelesaian masalah (Mean Time to Resolve / MTTR) per teknisi, tingkat kepuasan pelanggan (CSAT), dan jumlah tiket yang terselesaikan dalam target waktu yang ditentukan.",
  },
];

export default function CustomerSupportPage() {
  return (
    <>
      {/* 1. Standard PageIntro Header matching all other site pages */}
      <PageIntro
        eyebrow="Solusi Pelanggan & CS Desk"
        title="Manajemen Pelanggan 360° & Layanan Helpdesk Responsif Skala ISP."
        description="Tingkatkan kepuasan dan retensi pelanggan ISP Anda: dari pelacakan alur prospek hingga aktif, algoritma pencegah churn, antrian live chat CS terpadu, hingga sistem tiket otomatis ke teknisi lapangan dengan SLA terukur."
      />

      {/* 2. Key Metrics Strip */}
      <section className="relative -mt-6 mb-12 sm:mb-16" aria-label="Statistik Kunci Solusi Pelanggan">
        <div className="site-container">
          <div className="grid grid-cols-2 gap-3.5 sm:gap-4 lg:grid-cols-4">
            {metricStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-blue-200 hover:shadow-md"
              >
                <div className="text-2xl font-extrabold text-primary sm:text-3xl">{stat.value}</div>
                <div className="mt-1 text-sm font-bold text-slate-900">{stat.label}</div>
                <div className="mt-1 text-xs text-slate-600">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Section 1: CRM & CS Desk Explorer */}
      <section className="section bg-slate-50/60 py-16 sm:py-24 border-y border-slate-100" aria-labelledby="blueprint-heading">
        <div className="site-container">
          <SectionHeading
            eyebrow="Ekosistem CRM & Helpdesk"
            title="Integrasi Utuh Pelayanan & Retensi Pelanggan"
            description="Eksplorasi profil 360°, deteksi dini churn, sistem antrian chat terpusat, dan otomatisasi tiket lapangan dalam satu platform terpadu."
          />
          <CrmCsExplorer />
        </div>
      </section>

      {/* 4. Established CRM Engine Showcase */}
      <CRMSection />

      {/* 5. Section 2: 4 Pillars Deep Dive */}
      <section className="section bg-white py-16 sm:py-24" aria-labelledby="pillars-heading">
        <div className="site-container">
          <SectionHeading
            eyebrow="Pilar Pelayanan"
            title="Layanan Responsif yang Membangun Loyalitas Jangka Panjang"
            description="Solusi end-to-end untuk mempercepat waktu penanganan komplain dan menjaga pelanggan tetap berlangganan."
          />

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {/* Pillar 1: CRM 360° */}
            <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-xs transition-all hover:border-blue-200 hover:shadow-lg">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-primary mb-6">
                  <Icon name="user" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Profil Pelanggan 360° Terpadu
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Akses seluruh riwayat pelanggan dalam satu kali klik:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Data Port ODP & Koordinat GIS:</strong> Ketahui persis lokasi tiang dan sambungan fisik kabel rumah pelanggan.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Status Sinyal ONT Terkini:</strong> Baca nilai redaman optik dBm secara real-time langsung dari layar profil.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Histori Finansial Lengkap:</strong> Riwayat invoice lunas, tagihan tertunda, dan metode pembayaran favorit.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-bold text-primary">
                Terhubung Otomatis ke MikroTik & OLT
              </div>
            </article>

            {/* Pillar 2: Deteksi Churn */}
            <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-xs transition-all hover:border-blue-200 hover:shadow-lg">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-secondary mb-6">
                  <Icon name="chart" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Deteksi Dini & Pencegahan Churn
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Amankan omzet bulanan dengan intervensi retensi tepat waktu:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-secondary font-bold">✓</span>
                    <span><strong>Peringatan Dini Churn:</strong> Sistem mendeteksi penurunan kuota harian dan keluhan berulang dalam 14 hari.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-secondary font-bold">✓</span>
                    <span><strong>Tindakan Proaktif Manajer Retensi:</strong> Kirim penawaran loyalitas atau voucher pemeliharaan jaringan secara otomatis.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-secondary font-bold">✓</span>
                    <span><strong>Survei Kepuasan CSAT Otomatis:</strong> Ukur skor bintang kepuasan pelanggan begitu tiket kendala diselesaikan.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-bold text-secondary">
                Selamatkan hingga 55% Potensi Churn
              </div>
            </article>

            {/* Pillar 3: Antrian CS WhatsApp */}
            <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-xs transition-all hover:border-blue-200 hover:shadow-lg">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-50 text-tertiary mb-6">
                  <Icon name="chat" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Antrian Live Chat CS & Omnichannel
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Kelola ribuan chat komplain pelanggan tanpa berebut nomor:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-50 text-tertiary font-bold">✓</span>
                    <span><strong>Satu Nomor Banyak Agen (Multi-Agent):</strong> Distribusi obrolan otomatis round-robin ke agen CS yang online.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-50 text-tertiary font-bold">✓</span>
                    <span><strong>Template Balasan Cepat (Canned Responses):</strong> Standarisasi panduan langkah troubleshooting teknis dasar.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-50 text-tertiary font-bold">✓</span>
                    <span><strong>Pengawasan SLA Respon Agen:</strong> Pantau waktu tunggu pelanggan dan kecepatan respon tim CS secara transparan.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-bold text-tertiary">
                Waktu Respon Rata-Rata &lt; 45 Detik
              </div>
            </article>

            {/* Pillar 4: Tiket Teknisi & GPS */}
            <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-xs transition-all hover:border-blue-200 hover:shadow-lg">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-primary mb-6">
                  <Icon name="support" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Sistem Tiket Otomatis & Rute GPS Teknisi
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Kirim teknisi ke lokasi yang tepat tanpa tersesat:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Auto-Assign Wilayah:</strong> Tiket langsung dialokasikan ke teknisi patroli terdekat berdasarkan ODP/GIS.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Wajib Lampiran Bukti Redaman:</strong> Teknisi wajib unggah foto hasil penyambungan kabel sebelum menutup tiket.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Konfirmasi Otomatis ke Pelanggan:</strong> WhatsApp otomatis menanyakan apakah koneksi sudah kembali lancar.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-bold text-primary">
                Pelacakan Status Real-Time (Open &rarr; Resolved)
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 6. Section 3: SLA & Workflow Matrix */}
      <section className="section bg-slate-50/60 py-16 sm:py-24 border-y border-slate-100" aria-labelledby="sla-heading">
        <div className="site-container">
          <SectionHeading
            eyebrow="Standar Operasional Prosedur"
            title="Matriks SLA Penanganan Gangguan & Helpdesk"
            description="Standar waktu respon dan penyelesaian masalah terukur demi reputasi kualitas layanan internet ISP Anda."
          />

          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
            <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Tabel Standar SLA Penanganan Gangguan">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-slate-200/80 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <tr>
                    <th scope="col" className="p-4 sm:p-5">Tingkat Prioritas</th>
                    <th scope="col" className="p-4 sm:p-5">Target Respon CS</th>
                    <th scope="col" className="p-4 sm:p-5">Target Selesai (MTTR)</th>
                    <th scope="col" className="p-4 sm:p-5">Tindakan Otomatis Sistem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {slaWorkflows.map((item) => (
                    <tr key={item.priority} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">{item.priority}</td>
                      <td className="p-4 sm:p-5 font-semibold text-primary">{item.targetResponse}</td>
                      <td className="p-4 sm:p-5 font-semibold text-emerald-800">{item.targetResolve}</td>
                      <td className="p-4 sm:p-5 text-slate-600">{item.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Section 4: Retention & MRR Protection Calculator */}
      <section className="section bg-white py-16 sm:py-24" aria-labelledby="calculator-heading">
        <div className="site-container">
          <SectionHeading
            eyebrow="Kalkulator Retensi"
            title="Berapa Pendapatan yang Dapat Anda Selamatkan?"
            description="Simulasikan nilai pendapatan bulanan (MRR) yang terlindungi dari penurunan pelanggan dengan deteksi proaktif NADI."
          />
          <CrmRetentionCalculator />
        </div>
      </section>

      {/* 8. Technical FAQ Section */}
      <section className="section bg-slate-50/60 py-16 sm:py-24 border-t border-slate-100" aria-labelledby="faq-heading">
        <div className="site-container max-w-[900px]">
          <SectionHeading
            eyebrow="Tanya Jawab Teknis"
            title="Kerap ditanyakan seputar Pelanggan & CS Desk."
            description="Jawaban seputar profil 360°, algoritma deteksi churn, tiket WhatsApp, dan portal mandiri."
          />

          <div className="space-y-3.5">
            {technicalFaqs.map((faq, index) => (
              <details
                key={faq.question}
                id={`faq-${index + 1}`}
                name="crm-faq"
                className="group rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-200 open:border-blue-200 open:shadow-md open:shadow-blue-500/5"
              >
                <summary className="flex min-h-14 list-none items-center justify-between gap-4 rounded-2xl px-6 py-4.5 font-bold text-slate-900 transition-colors group-hover:text-primary cursor-pointer">
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform duration-200 group-open:rotate-180 group-open:bg-blue-100 group-open:text-primary">
                    <Icon name="chevron" size={16} />
                  </span>
                </summary>
                <p className="px-6 pb-6 text-sm leading-relaxed text-slate-600 border-t border-slate-100/80 pt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <FinalCTA />
    </>
  );
}
