import { PageIntro } from "@/components/marketing/page-intro";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { BillingSection } from "@/components/sections/billing-section";
import { VoucherSection } from "@/components/sections/voucher-section";
import { FinalCTA } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import {
  BillingTransactionExplorer,
  BillingLeakageCalculator,
} from "@/components/solutions/billing-solution-interactive";

export const metadata = pageMetadata(
  "Solusi Billing & Transaksi",
  "Siklus tagihan bulanan idempotent, kasir loket audit-safe, generator voucher cetak thermal 58/80mm, dan toko voucher online QRIS instan.",
  "/solutions/billing-transactions"
);

const metricStats = [
  { value: "100%", label: "Idempotent Guarantee", desc: "Anti invoice ganda & isolir otomatis aman" },
  { value: "0%", label: "Kasir Fraud & Leakage", desc: "Void transaksi wajib izin supervisor" },
  { value: "500+", label: "Batch Voucher Sekali Klik", desc: "Layout cetak thermal 58/80mm & grid A4" },
  { value: "< 2 Detik", label: "Verifikasi QRIS Instan", desc: "Buka isolir otomatis tanpa kirim struk" },
];

const paymentMethods = [
  {
    channel: "QRIS Dinamis (Semua Bank & E-Wallet)",
    providers: "BCA, Mandiri, BRI, BNI, GoPay, OVO, DANA, ShopeePay, LinkAja",
    settlement: "Real-Time Webhook (< 2 Detik Langsung Aktif)",
    feature: "QR otomatis tampil di layar atau terkirim via bot WhatsApp",
  },
  {
    channel: "Virtual Account (VA) Bank Otomatis",
    providers: "BCA VA, Mandiri VA, BRI BRIVA, BNI VA, Permata VA, CIMB Niaga",
    settlement: "Otomatis 24 Jam Tanpa Cek Mutasi Manual",
    feature: "Nomor VA tetap per pelanggan atau dinamis per invoice",
  },
  {
    channel: "Gerai Retail & Minimarket Modern",
    providers: "Indomaret, Alfamart, Alfamidi, Ceriamart, Dan+Dan",
    settlement: "Otomatis via Payment Gateway",
    feature: "Kode bayar praktis untuk pelanggan tanpa rekening bank",
  },
  {
    channel: "Kasir Loket Kantor & Saldo Agen",
    providers: "Kasir Tunai Kantor, EDC Merchant, Saldo Deposit Reseller",
    settlement: "Real-Time Print Struk Thermal & Update Laci Kas",
    feature: "Void transaksi terkunci dengan otorisasi supervisor",
  },
];

const technicalFaqs = [
  {
    question: "Apa yang dimaksud dengan proteksi penagihan Idempotent di NADI Billing?",
    answer:
      "Idempotent menjamin operasi penagihan hanya akan dieksekusi tepat satu kali untuk setiap periode tagihan pelanggan, tidak peduli berapa kali proses generate dipicu ulang atau jika koneksi internet terputus saat proses berlangsung. Hal ini menghindarkan pelanggan Anda dari tagihan ganda atau invoice duplikat.",
  },
  {
    question: "Bagaimana fitur Void Audit-Safe melindungi pemilik ISP dari kecurangan kasir?",
    answer:
      "Pada kasir konvensional, oknum kasir dapat membatalkan transaksi pembayaran tunai yang sudah diterima dan mengantongi uangnya. Di NADI, kasir tidak dapat membatalkan (void) transaksi secara sepihak. Pembatalan memerlukan otorisasi PIN/akun supervisor, dan alasan pembatalan dicatat permanen dalam audit log sistem yang tidak dapat diedit atau dihapus.",
  },
  {
    question: "Apakah cetak voucher hotspot mendukung printer thermal Bluetooth ukuran 58mm dan 80mm?",
    answer:
      "Ya. NADI menyediakan template cetak langsung berstandar ESC/POS untuk printer thermal kasir berukuran 58mm dan 80mm (baik koneksi Bluetooth ponsel maupun USB/LAN komputer kasir), serta template grid kertas A4 (40 kupon per lembar dengan garis potong rapi) untuk distribusi ke warung mitra agen.",
  },
  {
    question: "Bagaimana cara kerja Toko Voucher Online mandiri bagi pengguna hotspot?",
    answer:
      "Begitu pengguna terhubung ke WiFi hotspot, captive portal dapat mengarahkan ke halaman toko online. Pengguna memilih paket durasi, memasukkan nomor WhatsApp, dan membayar via QRIS. Begitu pembayaran berhasil (dalam 2 detik), username dan password voucher langsung muncul di layar dan salinannya dikirim ke WhatsApp pembeli tanpa perlu bantuan staf kasir.",
  },
  {
    question: "Gateway pembayaran apa saja yang sudah terintegrasi dengan NADI Billing?",
    answer:
      "NADI mendukung integrasi langsung ke agregator resmi terkemuka di Indonesia, antara lain Midtrans, Xendit, Tripay, Duitku, dan Faspay. Anda cukup memasukkan API Key dan Secret Key ke dasbor NADI, dan seluruh webhook pembayaran otomatis aktif.",
  },
];

export default function BillingTransactionsPage() {
  return (
    <>
      {/* 1. PageIntro matching NADI Billing layout system */}
      <PageIntro
        eyebrow="Solusi Billing & Transaksi"
        title="Siklus Keuangan & Penjualan Voucher ISP Tertib, Idempotent, dan Audit-Safe."
        description="Kelola seluruh transaksi keuangan ISP Anda tanpa celah kebocoran: dari penagihan bulanan otomatis yang idempotent, pencatatan kasir loket berfitur void audit-safe, generator voucher batch cetak thermal 58/80mm, serta etalase toko voucher online mandiri ber-QRIS instan."
      />

      {/* 2. Key Metrics Strip */}
      <section className="relative -mt-6 mb-12 sm:mb-16" aria-label="Statistik Kunci Solusi Billing">
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

      {/* 3. Section 1: Billing & Transaction Explorer */}
      <section className="section bg-slate-50/60 py-16 sm:py-24 border-y border-slate-100" aria-labelledby="blueprint-heading">
        <div className="site-container">
          <SectionHeading
            eyebrow="Sistem Keuangan Terpadu"
            title="Siklus Transaksi Tanpa Celah Kebocoran"
            description="Eksplorasi modul penagihan, kasir loket audit-safe, pabrik voucher, dan etalase toko online mandiri yang dirancang untuk skala bisnis ISP."
          />
          <BillingTransactionExplorer />
        </div>
      </section>

      {/* 4. Established Billing Engine Showcase */}
      <BillingSection />

      {/* 5. Section 2: 4 Pillars Deep Dive */}
      <section className="section bg-white py-16 sm:py-24" aria-labelledby="pillars-heading">
        <div className="site-container">
          <SectionHeading
            eyebrow="Pilar Transaksi"
            title="Keamanan Finansial & Fleksibilitas Distribusi Voucher"
            description="Solusi lengkap dari manajemen loket hingga penjualan tiket voucher mandiri secara digital."
          />

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {/* Pillar 1: Tagihan Idempotent */}
            <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-xs transition-all hover:border-blue-200 hover:shadow-lg">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-primary mb-6">
                  <Icon name="receipt" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Tagihan Bulanan Idempotent & Auto-Isolir
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Pastikan tagihan terbit tepat waktu tanpa kesalahan ganda:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Token Idempotent:</strong> Mencegah invoice terbuat ganda akibat delay jaringan atau klik ganda admin.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Auto-Isolir MikroTik & RADIUS:</strong> Otomatis alihkan pelanggan menunggak ke pool isolir begitu lewat jatuh tempo.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Auto-Reopen:</strong> Begitu pembayaran terkonfirmasi, isolir otomatis terbuka dalam hitungan detik.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-bold text-primary">
                Multi-Channel Reminder (WhatsApp, Telegram, Email)
              </div>
            </article>

            {/* Pillar 2: Kasir POS & Void Audit-Safe */}
            <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-xs transition-all hover:border-blue-200 hover:shadow-lg">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-secondary mb-6">
                  <Icon name="store" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Kasir Kantor POS & Void Audit-Safe
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Kendalikan uang loket dengan sistem pembukuan kasir anti-fraud:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-secondary font-bold">✓</span>
                    <span><strong>Otorisasi Void Berlapis:</strong> Kasir tidak bisa membatalkan transaksi sembarangan tanpa persetujuan supervisor.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-secondary font-bold">✓</span>
                    <span><strong>Jejak Audit Permanen:</strong> Setiap aksi void, pembatalan, atau diskon terekam permanen dengan alasan dan timestamp.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-secondary font-bold">✓</span>
                    <span><strong>Rekonsiliasi Laci Kas:</strong> Tutup buku pergantian shift teller dalam hitungan detik dengan pencocokan fisik uang tunai.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-bold text-secondary">
                Dukungan Struk Thermal 58mm & 80mm
              </div>
            </article>

            {/* Pillar 3: Pabrik Voucher Hotspot */}
            <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-xs transition-all hover:border-blue-200 hover:shadow-lg">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-50 text-tertiary mb-6">
                  <Icon name="bolt" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Pabrik Cetak Voucher (Thermal & Grid A4)
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Cetak voucher hotspot siap edar dalam hitungan detik:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-50 text-tertiary font-bold">✓</span>
                    <span><strong>Batch 500 Voucher Sekali Klik:</strong> Generate ratusan kupon acak tanpa kode membingungkan dalam &lt; 2 detik.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-50 text-tertiary font-bold">✓</span>
                    <span><strong>Layout Kertas A4 & Thermal:</strong> Tata letak 40 voucher per lembar A4 dengan garis potong rapi untuk mitra warung.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-50 text-tertiary font-bold">✓</span>
                    <span><strong>QR Code Login Otomatis:</strong> Pengguna tinggal scan kamera untuk login tanpa repot mengetik karakter panjang.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-bold text-tertiary">
                Limit Berdasarkan Waktu, Kuota, & Masa Aktif
              </div>
            </article>

            {/* Pillar 4: Toko Voucher Online & QRIS */}
            <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-xs transition-all hover:border-blue-200 hover:shadow-lg">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-primary mb-6">
                  <Icon name="wallet" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Toko Voucher Online Mandiri & Anti-Fraud
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Dapatkan pendapatan pasif dari hotspot Anda 24 jam sehari:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Self-Service 24 Jam:</strong> Pelanggan beli voucher langsung dari captive portal tanpa perlu loket buka.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>QRIS Instan & Otomatis:</strong> Pembayaran diverifikasi langsung oleh payment gateway dalam 2 detik.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Pembatasan Anti-Fraud:</strong> Rate limiting IP dan token enkripsi mencegah serangan brute force dan manipulasi voucher.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-bold text-primary">
                Integrasi Midtrans, Xendit, Tripay, & Duitku
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 6. Established Voucher Engine Showcase */}
      <VoucherSection />

      {/* 7. Section 3: Payment Methods & Gateway Table */}
      <section className="section bg-slate-50/60 py-16 sm:py-24 border-y border-slate-100" aria-labelledby="payments-heading">
        <div className="site-container">
          <SectionHeading
            eyebrow="Kanal Pembayaran"
            title="Terintegrasi dengan Seluruh Saluran Pembayaran Modern"
            description="Beri kemudahan bagi pelanggan membayar tagihan bulanan dan voucher hotspot lewat metode yang paling nyaman bagi mereka."
          />

          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
            <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Tabel Saluran Pembayaran">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-slate-200/80 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <tr>
                    <th scope="col" className="p-4 sm:p-5">Kanal Pembayaran</th>
                    <th scope="col" className="p-4 sm:p-5">Penyedia / Bank Teruji</th>
                    <th scope="col" className="p-4 sm:p-5">Waktu Verifikasi</th>
                    <th scope="col" className="p-4 sm:p-5">Fitur Unggulan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paymentMethods.map((item) => (
                    <tr key={item.channel} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">{item.channel}</td>
                      <td className="p-4 sm:p-5 font-semibold text-primary">{item.providers}</td>
                      <td className="p-4 sm:p-5 text-slate-600">{item.settlement}</td>
                      <td className="p-4 sm:p-5 text-slate-600">{item.feature}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Section 4: Revenue Protection & Efficiency Calculator */}
      <section className="section bg-white py-16 sm:py-24" aria-labelledby="calculator-heading">
        <div className="site-container">
          <SectionHeading
            eyebrow="Kalkulator Pendapatan"
            title="Berapa Kebocoran Kas yang Dapat Anda Cegah?"
            description="Simulasikan nilai arus kas yang terselamatkan dari kesalahan pencatatan dan tagihan terlewat dengan sistem otomatis NADI."
          />
          <BillingLeakageCalculator />
        </div>
      </section>

      {/* 9. Technical FAQ Section */}
      <section className="section bg-slate-50/60 py-16 sm:py-24 border-t border-slate-100" aria-labelledby="faq-heading">
        <div className="site-container max-w-[900px]">
          <SectionHeading
            eyebrow="Tanya Jawab Teknis"
            title="Kerap ditanyakan seputar Billing & Transaksi."
            description="Jawaban seputar siklus tagihan idempotent, keamanan void kasir, cetak thermal, dan payment gateway."
          />

          <div className="space-y-3.5">
            {technicalFaqs.map((faq, index) => (
              <details
                key={faq.question}
                id={`faq-${index + 1}`}
                name="billing-faq"
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

      {/* 10. Final CTA */}
      <FinalCTA />
    </>
  );
}
