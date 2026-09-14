import { PageIntro } from "@/components/marketing/page-intro";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { FinalCTA } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import {
  AgencyAutomationExplorer,
  AgencyCommissionCalculator,
} from "@/components/solutions/agency-solution-interactive";

export const metadata = pageMetadata(
  "Solusi Keagenan & Otomasi",
  "Jaringan mitra reseller voucher, sistem saldo deposit agen, gateway broadcast massal anti-ban, autentikasi 2FA, dan 11 hak akses RBAC.",
  "/solutions/reseller-automation"
);

const metricStats = [
  { value: "11 Peran", label: "RBAC Granular Terstandar", desc: "Akses aman kasir, teknisi, CS, agen" },
  { value: "Otomatis", label: "Bagi Hasil Komisi Mitra", desc: "Potong deposit & catat mutasi real-time" },
  { value: "2FA & Audit", label: "Keamanan Akun Berlapis", desc: "OTP Authenticator & log anti-fraud" },
  { value: "Anti-Ban", label: "Broadcast Gateway Massal", desc: "Throttling cerdas via WhatsApp & Telegram" },
];

const rbacRoles = [
  {
    role: "Owner / Direksi",
    scope: "Akses Penuh Seluruh Sistem",
    features: "Laporan laba rugi, penarikan saldo, audit log lengkap, manajemen user",
    security: "Wajib 2FA & Notifikasi Login Baru",
  },
  {
    role: "Finance & Kasir Loket",
    scope: "Transaksi Keuangan & Pembukuan",
    features: "Penerimaan pembayaran, cetak struk thermal, permohonan void, rekonsiliasi laci kas",
    security: "Dilarang ubah konfigurasi router & wajib persetujuan void",
  },
  {
    role: "Network Engineer (NOC)",
    scope: "Infrastruktur Jaringan & Routing",
    features: "Manajemen MikroTik, sync IP Pool, telemetri OLT, ODC/ODP, remote ONT GenieACS",
    security: "Dilarang melihat laporan keuangan & pembukuan kasir",
  },
  {
    role: "Teknisi Lapangan",
    scope: "Pemeliharaan & Instalasi",
    features: "Tiket tugas gangguan, navigasi GPS ODP, upload foto redaman & bukti instalasi",
    security: "Hanya melihat tiket yang ditugaskan ke dirinya",
  },
  {
    role: "Customer Service (CS Desk)",
    scope: "Layanan & Komplain Pelanggan",
    features: "Antrian live chat WhatsApp, profil 360° pelanggan, pembuatan tiket perbaikan",
    security: "Dilarang menghapus invoice atau mengubah tarif langganan",
  },
  {
    role: "Mitra Agen / Reseller",
    scope: "Penjualan Voucher & Loket Warga",
    features: "Cetak voucher dari saldo deposit, pembayaran tagihan tetangga, cek komisi",
    security: "Portal terisolasi, hanya dapat menggunakan saldo milik sendiri",
  },
];

const technicalFaqs = [
  {
    question: "Bagaimana cara kerja sistem saldo deposit dan komisi bagi mitra agen warung?",
    answer:
      "Mitra agen mengisi saldo deposit melalui transfer Virtual Account atau QRIS yang diverifikasi otomatis oleh sistem. Ketika agen mencetak voucher hotspot atau menerima pembayaran tagihan warga, saldo depositnya otomatis terpotong sesuai harga modal dan komisi bagi hasil langsung tercatat di dompet komisi agen secara real-time.",
  },
  {
    question: "Apakah pengiriman notifikasi broadcast massal aman dari risiko blokir WhatsApp?",
    answer:
      "Sangat aman. NADI Billing menerapkan teknologi anti-ban throttling: pesan massal dikirimkan dengan jeda waktu acak (pacing 3-7 detik per pesan), memanfaatkan rotasi template pesan dinamis (spintax), dan dapat dihubungkan ke beberapa nomor WhatsApp pengirim (multi-device sender pool) untuk membagi beban kirim.",
  },
  {
    question: "Bagaimana fitur 2FA (Two-Factor Authentication) melindungi akun admin dan kasir?",
    answer:
      "Setiap kali staf login ke dasbor NADI, selain memasukkan password, mereka wajib memasukkan kode 6 digit berbasis waktu (TOTP) dari aplikasi seperti Google Authenticator atau Authy di ponsel mereka. Ini memastikan akun tetap terlindungi walau password karyawan bocor atau dicuri orang lain.",
  },
  {
    question: "Apa saja yang dicatat dalam Audit Trail NADI Billing?",
    answer:
      "Sistem merekam seluruh tindakan sensitif: login/logout staf, pembuatan tagihan manual, pembatalan (void) pembayaran, pemotongan diskon, perubahan paket bandwidth pelanggan, dan pengubahan parameter router MikroTik. Setiap catatan menyertakan tanggal & jam presisi, alamat IP, nama pengguna, dan detail nilai data sebelum vs sesudah perubahan.",
  },
  {
    question: "Bisakah satu instansi ISP membagi akses untuk beberapa kantor cabang (Multi-Cabang)?",
    answer:
      "Ya. Fitur Multi-Tenant NADI memungkinkan Anda membuat beberapa cabang atau wilayah operasional berbeda dalam satu sistem. Setiap cabang memiliki kasir loket, teknisi, dan router MikroTik sendiri, sementara kantor pusat (Owner) dapat memantau seluruh performa cabang secara terpadu dari satu layar.",
  },
];

export default function ResellerAutomationPage() {
  return (
    <>
      {/* 1. Standard PageIntro Header matching all other site pages */}
      <PageIntro
        eyebrow="Solusi Keagenan & Otomasi"
        title="Ekosistem Mitra Reseller, Notifikasi Massal & Keamanan Audit RBAC."
        description="Perluas penetrasi bisnis ISP dan jaga integritas operasional: kelola jaringan agen voucher berdeposit saldo, bagi hasil komisi otomatis, gateway broadcast notifikasi massal, autentikasi 2FA, hingga 11 hak akses granular dengan audit trail permanen."
      />

      {/* 2. Key Metrics Strip */}
      <section className="relative -mt-6 mb-12 sm:mb-16" aria-label="Statistik Kunci Solusi Keagenan">
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

      {/* 3. Section 1: Agency & Automation Explorer */}
      <section className="section bg-slate-50/60 py-16 sm:py-24 border-y border-slate-100" aria-labelledby="blueprint-heading">
        <div className="site-container">
          <SectionHeading
            eyebrow="Ekosistem Keagenan & Otomasi"
            title="Sinergi Penjualan Luas dengan Keamanan Tanpa Kompromi"
            description="Eksplorasi modul reseller, saluran notifikasi broadcast massal, sistem autentikasi ganda 2FA, dan matriks hak akses 11 peran dalam satu sistem."
          />
          <AgencyAutomationExplorer />
        </div>
      </section>

      {/* 4. Section 2: 4 Pillars Deep Dive */}
      <section className="section bg-white py-16 sm:py-24" aria-labelledby="pillars-heading">
        <div className="site-container">
          <SectionHeading
            eyebrow="Pilar Keagenan & Keamanan"
            title="Skalabilitas Bisnis Tanpa Celah Kebocoran Akses"
            description="Membangun kemitraan lokal yang saling menguntungkan sekaligus menjaga integritas operasional internal perusahaan."
          />

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {/* Pillar 1: Reseller & Deposit */}
            <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-xs transition-all hover:border-blue-200 hover:shadow-lg">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-primary mb-6">
                  <Icon name="wallet" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Jaringan Mitra Reseller & Saldo Deposit
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Jadikan warung tetangga sebagai loket resmi jaringan Anda:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Sistem Saldo Pra-Bayar:</strong> Nol risiko piutang macet, voucher dicetak memotong deposit saldo agen.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Bagi Hasil Komisi Transparan:</strong> Nilai komisi langsung masuk ke mutasi saldo agen secara otomatis.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Portal Khusus Mitra:</strong> Akses mandiri ringan via browser smartphone tanpa install aplikasi rumit.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-bold text-primary">
                Top-Up Saldo Instan via QRIS & Virtual Account
              </div>
            </article>

            {/* Pillar 2: Broadcast Gateway */}
            <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-xs transition-all hover:border-blue-200 hover:shadow-lg">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-secondary mb-6">
                  <Icon name="send" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Gateway Notifikasi Broadcast & Anti-Ban
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Komunikasi masif ke ribuan pelanggan dengan proteksi pemblokiran:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-secondary font-bold">✓</span>
                    <span><strong>Pacing Pengiriman Cerdas:</strong> Jeda waktu acak adaptif menjaga reputasi nomor WhatsApp tetap aman.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-secondary font-bold">✓</span>
                    <span><strong>Filter Berdasarkan ODP & Wilayah:</strong> Beri tahu hanya pelanggan di ODP spesifik saat kabel putus.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-secondary font-bold">✓</span>
                    <span><strong>Fallback Multi-Kanal:</strong> Pengiriman alternatif otomatis via Telegram atau SMS jika nomor WA tidak aktif.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-bold text-secondary">
                Dukungan WhatsApp Multi-Device & Telegram Bot
              </div>
            </article>

            {/* Pillar 3: 2FA & Audit Trail */}
            <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-xs transition-all hover:border-blue-200 hover:shadow-lg">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-50 text-tertiary mb-6">
                  <Icon name="shield" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Keamanan Akun 2FA & Audit Trail Permanen
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Lindungi aset bisnis dari pembobolan akun dan manipulasi data:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-50 text-tertiary font-bold">✓</span>
                    <span><strong>Two-Factor Authentication:</strong> Wajibkan verifikasi kode OTP dari Google Authenticator saat login.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-50 text-tertiary font-bold">✓</span>
                    <span><strong>Catatan Jejak Audit Anti-Ubah:</strong> Rekam setiap penghapusan, void kasir, dan pengubahan paket.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-50 text-tertiary font-bold">✓</span>
                    <span><strong>Cadangan Otomatis Terjadwal:</strong> Backup database dan script router MikroTik ke cloud setiap malam.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-bold text-tertiary">
                Standar Keamanan Enkripsi SHA-256 & TOTP
              </div>
            </article>

            {/* Pillar 4: 11 Hak Akses RBAC */}
            <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-xs transition-all hover:border-blue-200 hover:shadow-lg">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-primary mb-6">
                  <Icon name="lock" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  11 Hak Akses Granular RBAC & Multi-Cabang
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Bagi tugas tim secara profesional dengan pembatasan ketat:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>11 Peran Siap Pakai:</strong> Pembagian wewenang untuk Owner, Finance, NOC, Teknisi, CS, hingga Agen.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Kunci Menu & Tombol Eksekusi:</strong> Kasir tidak bisa menyentuh router, teknisi tidak bisa melihat profit.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Isolasi Multi-Cabang:</strong> Pisahkan data operasional kantor cabang dengan pengawasan terpusat.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-bold text-primary">
                Pencabutan Hak Akses (Revoke) Instan
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 5. Section 3: RBAC Roles Matrix Table */}
      <section className="section bg-slate-50/60 py-16 sm:py-24 border-y border-slate-100" aria-labelledby="rbac-heading">
        <div className="site-container">
          <SectionHeading
            eyebrow="Tata Kelola Hak Akses"
            title="Matriks 11 Peran RBAC Terstandarisasi"
            description="Standar pembagian peran untuk menjaga kerahasiaan keuangan dan integritas konfigurasi perangkat jaringan."
          />

          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
            <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Tabel Hak Akses Peran RBAC">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-slate-200/80 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <tr>
                    <th scope="col" className="p-4 sm:p-5">Peran / Role</th>
                    <th scope="col" className="p-4 sm:p-5">Cakupan Wewenang</th>
                    <th scope="col" className="p-4 sm:p-5">Fitur yang Dapat Diakses</th>
                    <th scope="col" className="p-4 sm:p-5">Kebijakan Keamanan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rbacRoles.map((item) => (
                    <tr key={item.role} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">{item.role}</td>
                      <td className="p-4 sm:p-5 font-semibold text-primary">{item.scope}</td>
                      <td className="p-4 sm:p-5 text-slate-600">{item.features}</td>
                      <td className="p-4 sm:p-5 text-slate-600">{item.security}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section 4: Commission & Agency Calculator */}
      <section className="section bg-white py-16 sm:py-24" aria-labelledby="calculator-heading">
        <div className="site-container">
          <SectionHeading
            eyebrow="Kalkulator Penjualan Agen"
            title="Berapa Potensi Penjualan dari Mitra Warung?"
            description="Simulasikan pendapatan tambahan dan perputaran komisi dari ekosistem agen voucher hotspot di lingkungan sekitar Anda."
          />
          <AgencyCommissionCalculator />
        </div>
      </section>

      {/* 7. Technical FAQ Section */}
      <section className="section bg-slate-50/60 py-16 sm:py-24 border-t border-slate-100" aria-labelledby="faq-heading">
        <div className="site-container max-w-[900px]">
          <SectionHeading
            eyebrow="Tanya Jawab Teknis"
            title="Kerap ditanyakan seputar Keagenan & Otomasi."
            description="Jawaban seputar sistem saldo deposit, broadcast WhatsApp anti-blokir, 2FA, dan izin peran RBAC."
          />

          <div className="space-y-3.5">
            {technicalFaqs.map((faq, index) => (
              <details
                key={faq.question}
                id={`faq-${index + 1}`}
                name="agency-faq"
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

      {/* 8. Final CTA */}
      <FinalCTA />
    </>
  );
}
