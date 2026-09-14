# NADI Billing — Website Alignment & Implementation Task Plan

> **Sumber Kebenaran (Single Source of Truth):**
> 1. `NADI_BILLING_FEATURE_MATRIX.json`
> 2. `NADI_BILLING_PRODUCT_FEATURE_REPORT.md`
> 3. `NADI_BILLING_WEBSITE_FEATURE_SOURCE.md`

Dokumen ini berisi daftar tugas (TODO checklist) penyesuaian website pemasaran NADI Billing agar 100% selaras dengan kapabilitas teknis nyata dari backend Laravel 13 NADI Billing, mengeliminasi klaim fiktif/prematur, dan memaksimalkan *differentiator* unggulan produk.

---

## Prinsip Utama Penyelarasan (Ground Truth Alignment)

1. **Eliminasi Klaim Berisiko / Belum Siap (Features Not Ready to Promote):**
   - ❌ Hapus janji "Pembayaran otomatis QRIS / Virtual Account / e-wallet" (Status: PLANNED).
   - ❌ Hapus janji "Notifikasi & Pengiriman kode via WhatsApp otomatis" (Status: PLANNED / Stub log-only).
   - ❌ Hapus janji "Buka isolir otomatis 0.2 detik / instan pasca bayar" (Status: Tidak ada bukti implementasi di backend).
   - ❌ Hapus klaim "Checkout toko online instan publik end-to-end" (Status: Terhenti di pending menunggu payment gateway).
   - ❌ Hapus klaim "Push voucher otomatis ke hotspot MikroTik" (Status: PLANNED).
   - ❌ Hapus klaim "Keamanan 2FA & Cloud Backup database" (Status: PLANNED / Ditunda sengaja).

2. **Tonjolkan Kekuatan Nyata (Real Hero Capabilities & Differentiators):**
   - ✅ **Fault Detection Engine (Hero Differentiator):** Lokalisasi gangguan otomatis 3-level (Dropcore, Distribusi ODP, Cascading hulu), deteksi degradasi prediktif 7 hari (>3dB), laporan SLA (MTTD/MTTR), dan auto-task penugasan teknisi darurat.
   - ✅ **Network Core Nyata:** MikroTik RouterOS API langsung (test connection, sync resource 5 menit, backup harian via FTP, QoS bandwidth), Server FreeRADIUS nyata (monitoring sesi aktif & CoA Disconnect real-time), VPN Bridge multi-protokol (OpenVPN, L2TP, WireGuard) dengan cek konektivitas real.
   - ✅ **CPE & TR-069 GenieACS:** Integrasi GenieACS REST nyata, remote reboot/reset ONT (satuan & massal), dan **Self-Service WiFi Pelanggan** (ganti SSID/password mandiri maks 3x/hari & restart ONT tanpa telepon CS).
   - ✅ **GIS & Topologi FTTH:** Peta spasial interaktif Leaflet (node, ODC, ODP, kabel fiber), polling SNMP OLT nyata, monitoring redaman ONU 4 ambang batas, dan logistik gudang.
   - ✅ **Billing ISP Otomatis:** Generate tagihan bulanan otomatis per siklus pelanggan (idempotent), kasir manual & void pembayaran audit-safe, laporan arus kas.
   - ✅ **Ekosistem Reseller & 4 Portal:** 4 portal terintegrasi (Console Staf, Teknisi Lapangan, Agen/Reseller dengan komisi otomatis & dompet deposit, dan Portal Pelanggan).
   - ✅ **Keamanan & Audit:** RBAC granular 4 role console + 11 hak akses spesifik, kredensial sensitif terenkripsi, dan audit log immutable.

---

## FASE 1: Penyelarasan Data Inti (Data Foundation)

- [x] **1.1. Perbarui `src/data/marketing.ts`**
  - [x] Sesuaikan 4 Pilar produk:
    - *Voucher & Loket*: Fokus ke generator batch 500 voucher, template kustom QR code, siap cetak A4/thermal, dan distribusi lewat jaringan agen reseller.
    - *Billing & Finance*: Fokus ke tagihan bulanan otomatis per siklus tagih, kasir manual terverifikasi, void audit-safe, dan laporan arus kas.
    - *Network Intelligence*: Tonjolkan lokalisasi gangguan 3-level, monitoring RX power time-series, dan deteksi prediktif 7 hari.
    - *CRM & Portal*: Fokus ke 360° pelanggan, pipeline leads kanban, deteksi risiko churn otomatis, dan 4 portal terintegrasi.
  - [x] Perbarui `integrations`:
    - Hapus `Payment Gateway` dan `WhatsApp`.
    - Gantikan dengan: `MikroTik RouterOS`, `FreeRADIUS`, `GenieACS (TR-069)`, `SNMP (OLT)`, `OpenVPN / WireGuard`.
  - [x] Perbarui `voucherFeatures` dan `voucherFlow`:
    - Ganti dari `["Pilih Paket", "Bayar", "WhatsApp", ...]` ke alur operasional nyata: `["Pilih Paket & Template", "Generate Batch (Maks 500)", "Cetak A4 / Thermal", "Distribusi via Agen / Kios", "Aktivasi Pelanggan"]`.
  - [x] Perbarui `billingFlow`:
    - Hapus "Auto Isolir & Reconnect 0.2s" dan "WhatsApp Bot".
    - Ganti dengan alur nyata: `["Siklus Tagih Terjadwal", "Generate Invoice Otomatis", "Notifikasi Pengingat Terjadwal", "Kasir / Loket Pembayaran", "Pencatatan Arus Kas & Audit Log"]`.
  - [x] Perbarui `includedFeatures` & `faqs`:
    - Hapus klaim WhatsApp bot & pembayaran instan gateway.
    - Tambahkan FAQ akurat mengenai integrasi hardware MikroTik/RADIUS/GenieACS, self-service WiFi 3x/hari, lokalisasi gangguan, dan status roadmap payment gateway.

- [x] **1.2. Perbarui `src/data/demo.ts`**
  - [x] Sinkronkan langkah simulasi `demoFlows` untuk alur Voucher, Billing, Network, dan CRM sesuai dengan kapabilitas backend nyata.
  - [x] Perjelas bahwa alur jaringan mendemonstrasikan lokalisasi gangguan otomatis 3-level dan pembacaan telemetri redaman optik.

- [x] **1.3. Perbarui `src/data/secondary-pages.ts` & `src/data/navigation.ts`**
  - [x] Perbaiki ringkasan rute integrasi dan solusi: hilangkan klaim QRIS/WhatsApp, tonjolkan kapabilitas FTTH, MikroTik, RADIUS, dan GenieACS.

---

## FASE 2: Penyelarasan Komponen Homepage & Section Marketing

- [x] **2.1. Perbarui `IntegrationStrip` (`src/components/sections/integration-strip.tsx`)**
  - [x] Tampilkan logo/label teknologi nyata: MikroTik, FreeRADIUS, GenieACS (TR-069), SNMP (OLT), WireGuard/OpenVPN.
  - [x] Tambahkan badge kredibilitas: *"Diuji nyata ke perangkat, bukan simulasi mock."*

- [x] **2.2. Perbarui `VoucherSection` (`src/components/sections/voucher-section.tsx`)**
  - [x] Koreksi copy headline & subheadline: fokus ke kecepatan cetak, batch generator 500 kode, template thermal/A4, dan pemberdayaan mitra reseller.
  - [x] Perbarui mockup interaktif: ubah kartu "Voucher Terkirim via WhatsApp Bot" & "QRIS Instan" menjadi kartu "Batch Voucher Siap Cetak (Thermal 58/80mm & A4)" serta "Kode Unik & QR Siap Jual".

- [x] **2.3. Perbarui `BillingSection` (`src/components/sections/billing-section.tsx`)**
  - [x] Koreksi timeline: ganti "Auto Reconnect 0.2s" dan "WhatsApp Bot" dengan "Generate Otomatis per Siklus", "Pencatatan Kasir & Void Audit-Safe", dan "Laporan Arus Kas Operasional".
  - [x] Perbarui mockup: tampilkan rincian invoice pelanggan (diskon/denda/instalasi/sewa) dan status rekonsiliasi kas.

- [x] **2.4. Perbarui & Perkuat `NetworkIntelligenceSection` (`src/components/sections/network-intelligence-section.tsx`)**
  - [x] Jadikan ini sebagai section unggulan utama (*Hero Product Differentiator*).
  - [x] Perjelas konsep **Lokalisasi Gangguan 3-Level**:
    1. Level 1: Dropcore putus (1 pelanggan LOS).
    2. Level 2: Kabel distribusi putus (1 ODP LOS bersamaan).
    3. Level 3: Jalur cascading hulu putus (multi-ODP/ODC padam).
  - [x] Tampilkan indikator tren degradasi proaktif (>3dB / 7 hari) dan estimasi MTTD/MTTR.

- [x] **2.5. Perbarui `CRMSection` (`src/components/sections/crm-section.tsx`) & Soroti 4 Portal**
  - [x] Tampilkan 4 Portal Terintegrasi:
    - *Console Back-Office* (NOC & Finance dengan 11 hak akses RBAC).
    - *Portal Teknisi Lapangan* (Peta tugas, uji redaman optik di tempat).
    - *Portal Agen/Reseller* (Deposit saldo, jual voucher, komisi otomatis).
    - *Portal Mandiri Pelanggan* (Ganti password/SSID WiFi sendiri maks 3x/hari, reboot modem, cek tagihan).

- [x] **2.6. Perbarui Mockup Produk (`src/components/marketing/product-preview.tsx`)**
  - [x] Hapus badge dan teks "WhatsApp Bot Terkirim", "Penjualan Otomatis via QRIS", dan "Pembayaran QRIS sukses → WhatsApp terkirim".
  - [x] Ganti dengan data nyata: "MikroTik Sync Online", "FreeRADIUS CoA Active", "GenieACS ONT Sync", "Fault Engine: Normal".

---

## FASE 3: Penyelarasan Dokumentasi, Blog, dan Pusat Bantuan

- [x] **3.1. Perbarui `src/data/documentation-data.ts`**
  - [x] Hapus artikel panduan fiktif mengenai "WhatsApp Multi-Device QR setup" dan "Payment Gateway Webhook QRIS".
  - [x] Ganti dengan dokumentasi fitur nyata yang ada di backend:
    - Integrasi Router MikroTik & sinkronisasi resource.
    - Konfigurasi FreeRADIUS & CoA Disconnect.
    - Integrasi TR-069 GenieACS & pengaturan Self-Service WiFi pelanggan.
    - Algoritma Fault Localization Engine & pemantauan redaman optik.
    - Manajemen ODP/ODC dan polling SNMP OLT.
    - Pengaturan Skema Komisi Reseller & Saldo Deposit Agen.

- [x] **3.2. Perbarui `src/data/help-data.ts` (FAQ & Status Sistem)**
  - [x] Bersihkan kategori FAQ dari kendala QRIS pending dan WhatsApp disconnected.
  - [x] Perbarui status layanan: tampilkan status MikroTik API, FreeRADIUS Server, GenieACS ACS Bridge, SNMP Poller, dan Database Multi-Tenant.
  - [x] Perbarui pertanyaan lazim ke topik riil: penanganan redaman optik kritis, backup harian MikroTik, pembagian role staf console, batas ganti WiFi pelanggan (3x/hari).

- [x] **3.3. Perbarui `src/data/blog-data.ts`**
  - [x] Ganti artikel bertema QRIS/WhatsApp otomatis dengan studi kasus nyata ISP:
    - "Mencegah Churn Pelanggan dengan Radar Gangguan 3-Level NADI".
    - "Mengurangi Beban CS Lapangan Lewat Fitur Self-Service WiFi TR-069".
    - "Strategi Skalabilitas Jaringan RT/RW Net Menggunakan MikroTik & FreeRADIUS Terpadu".
    - "Membangun Ekosistem Kemitraan Reseller ISP dengan Skema Komisi Transparan".

---

## FASE 4: Verifikasi, Pengujian Kualitas & Audit Akhir

- [x] **4.1. Typecheck & Linter**
  - [x] Jalankan `npm.cmd run typecheck` (pastikan 0 error TypeScript).
  - [x] Jalankan `npm.cmd run lint` (pastikan lolos ESLint tanpa peringatan).
- [x] **4.2. Build Produksi**
  - [x] Jalankan `npm.cmd run build` (pastikan Next.js App Router mengompilasi semua route secara sempurna).
- [x] **4.3. Pengujian E2E & Browser Walkthrough**
  - [x] Jalankan Playwright / browser inspection untuk memastikan tidak ada teks sisa, tata letak tetap estetik, responsif, dan bebas error visual.

---

## FASE 5: Remediasi Temuan Prioritas P1 (Integritas Informasi & Klaim Layanan)
*Berdasarkan temuan F01, F02, F03, dan F04 dari `analisisproyek.md`.*

- [x] **5.1. Formulir Bantuan & Tiket (F01)**:
  - [x] Ubah formulir di `src/components/help/help-center.tsx` menjadi mode "Simulasi Pratinjau Alur Tiket" dengan label transparan.
  - [x] Tambahkan pesan jelas bahwa data tiket tidak dikirimkan ke server/WhatsApp dan sertakan tautan ke saluran kontak resmi.
- [x] **5.2. Telemetri & Status Layanan (F02)**:
  - [x] Beri label eksplisit "Arsitektur Layanan & Telemetri (Simulasi Pratinjau)" pada `src/components/help/help-center.tsx` dan `src/data/help-data.ts`.
  - [x] Hapus klaim status "live operasional 24 jam" dan uptime 99.98% tanpa sumber monitoring langsung.
- [x] **5.3. Pembersihan Sisa Klaim Produk yang Bertentangan (F03)**:
  - [x] Bersihkan `src/components/sections/why-nadi-section.tsx` (hapus sisa teks "Payment Gateway" & "otomasi isolir/reconnect").
  - [x] Bersihkan `src/components/help/help-center.tsx` (hapus "Webhook Pembayaran" dan "WhatsApp Gateway").
  - [x] Bersihkan `src/app/documentation/page.tsx` & `src/components/documentation/doc-viewer.tsx` (hapus materi setup payment gateway & isolir otomatis).
  - [x] Perjelas prasyarat login voucher pada `src/data/marketing.ts` & `src/data/demo.ts` (RADIUS AAA hotspot credentials vs push router).
- [x] **5.4. Kalibrasi Kontak, Janji SLA & Klaim Hasil (F04)**:
  - [x] Kalibrasi kontak di `src/data/help-data.ts` sebagai saluran konsultasi resmi/sales.
  - [x] Hapus janji respons mutlak ("< 5 menit", "SLA 1-2 jam") menjadi target respons tim operasional.
  - [x] Perbaiki tautan aksi "Jadwalkan Sesi Remote" agar mengarah ke saluran kontak konsultasi nyata (WhatsApp/Email) alih-alih melempar ke simulator demo.
  - [x] Netralkan klaim persentase tanpa acuan empiris ("hingga 60% MTTD/MTTR") ke konteks studi kasus implementasi.

---

## FASE 6: Remediasi Temuan Prioritas P2 (Aksesibilitas, Semantik ARIA & QA Suite)
*Berdasarkan temuan F05, F06, F07, F08, F09, dan F10 dari `analisisproyek.md`.*

- [x] **6.1. Modal Artikel Blog & Pengelolaan Fokus Keyboard (F05)**:
  - [x] Tambahkan event listener keyboard `Escape` untuk menutup modal di `src/components/blog/blog-explorer.tsx`.
  - [x] Kelola fokus keyboard: pindahkan fokus ke modal saat dibuka dan kembalikan ke tombol pemicu saat ditutup.
  - [x] Terapkan focus trap sederhana agar `Tab` tidak bocor ke latar belakang modal.
  - [x] Tambahkan `tabIndex={0}` dan `aria-label` pada kontainer scrollable dialog artikel (`scrollable-region-focusable`).
  - [x] Rapikan urutan heading (h1, h2, h3) di dalam modal.
- [x] **6.2. Dropdown Navigasi Pola Disclosure W3C (F06)**:
  - [x] Hapus `role="menu"` dan `role="none"` pada `src/components/layout/navbar.tsx`.
  - [x] Terapkan pola Disclosure Navigation standar (`aria-expanded`, list tautan `<ul><li><a>`) untuk menghilangkan pelanggaran axe `aria-required-children`.
- [x] **6.3. Filter Kategori Tombol Semantik (F07)**:
  - [x] Ubah `role="tablist"` dan `role="tab"` di `src/components/blog/blog-explorer.tsx` dan `src/components/help/help-center.tsx` menjadi grup filter tombol dengan `aria-pressed` atau tombol filter semantik.
- [x] **6.4. Koreksi Landmark Ganda `<main>` pada Dokumentasi (F08)**:
  - [x] Ubah `<main>` sekunder di `src/components/documentation/doc-viewer.tsx` (baris 183) menjadi `<section>` atau `<div>` berlabel.
- [x] **6.5. Perluasan Suite QA & Pengujian Regresi Lanjutan (F09)**:
  - [x] Tambahkan pengujian Axe saat dropdown navigasi desktop terbuka di `tests/marketing.spec.ts`.
  - [x] Tambahkan pengujian interaksi modal blog (buka via keyboard, trap fokus, scroll keyboard, tutup via Escape).
  - [x] Tambahkan pengujian Axe pada `/documentation` dan `/help` untuk memvalidasi ketiadaan duplikasi `<main>` dan struktur filter.
- [x] **6.6. Refactoring dan Penataan Batas Komponen (F10)**:
  - [x] Pisahkan tanggung jawab modal dan form pada komponen client agar lebih modular dan tahan regresi.

---

## FASE 7: Remediasi Temuan Prioritas P3 (Ketahanan Kode, Clipboard, Entity & Polish UI)
*Berdasarkan temuan F11, F12, F13, dan F14 dari `analisisproyek.md`.*

- [x] **7.1. Validasi Robust URL Demo Opsional (F11)**:
  - [x] Perbaiki parser URL di `src/app/demo/page.tsx` dengan blok pengaman `try/catch` agar tidak crash saat menerima URL malformed.
- [x] **7.2. Penanganan Rejection Clipboard & Feedback State (F12)**:
  - [x] Tambahkan handler `.catch()` pada `navigator.clipboard.writeText` di `src/components/documentation/doc-viewer.tsx` untuk menangani izin ditolak secara anggun.
- [x] **7.3. Koreksi Entity HTML Literal pada Teks (F13)**:
  - [x] Ganti `&gt;` dan `&lt;` di `src/data/documentation-data.ts` (baris 168) dengan karakter langsung `>` dan `<`.
- [x] **7.4. Tombol Ilustrasi Produk Non-Interaktif (F14)**:
  - [x] Ubah elemen `<button>` visual di `src/components/marketing/product-preview.tsx` menjadi tab badge non-interaktif atau berikan state aktif agar tidak membingungkan pengguna keyboard.

---

## FASE 8: Verifikasi Menyeluruh & Uji Kualitas Akhir
- [x] **8.1. Typecheck TypeScript**: `npm run typecheck` (lolos 0 error).
- [x] **8.2. Linting**: `npm run lint` (lolos 0 warning/error).
- [x] **8.3. Kompilasi Build**: `npm run build` (lolos 18/18 static pages).
- [x] **8.4. Pengujian E2E Lengkap**: `npm run test:e2e` (lolos 9/9 skenario uji Playwright & kepatuhan WCAG 2.1 AA).

---

## FASE 9: Penyelarasan Dual-Mode AAA (MikroTik Local & FreeRADIUS)

- [x] **9.1. Fondasi Data & Integrasi Marketing (`src/data/marketing.ts`, `demo.ts`, `secondary-pages.ts`)**:
  - [x] Perbarui pilar produk voucher dan network untuk menegaskan dukungan fleksibel: Dual-Mode AAA (MikroTik Local API & FreeRADIUS).
  - [x] Perbarui daftar integrasi, alur voucher (`Login Hotspot (RADIUS / MikroTik Local)`), dan fitur bawaan.
  - [x] Perbarui FAQ resmi menjelaskan pengoperasian tanpa server FreeRADIUS (Mode MikroTik Local murni).
  - [x] Sesuaikan alur demo dan topik solusi RT/RW Net.
- [x] **9.2. Pusat Dokumentasi Teknis (`src/data/documentation-data.ts`)**:
  - [x] Perbarui langkah onboarding: "Pilih Mode AAA (MikroTik Local / FreeRADIUS)".
  - [x] Sediakan script CLI MikroTik ganda: Opsi A (Mode Local API) dan Opsi B (Mode FreeRADIUS & CoA 3799).
  - [x] Tambahkan artikel baru `mikrotik-local-api-mode` ("Mode MikroTik Local (RouterOS API Direct)": Hotspot User, PPP Secret & Auto-Isolir).
  - [x] Tambahkan panduan komparasi kapan memilih Mode Local vs FreeRADIUS.
- [x] **9.3. Pusat Bantuan & FAQ Troubleshooting (`src/data/help-data.ts`)**:
  - [x] Tambahkan FAQ bantuan mengenai opsi tanpa server Linux/FreeRADIUS untuk pengusaha router tunggal.
  - [x] Tambahkan indikator kapan operator sebaiknya bertransisi ke Mode FreeRADIUS.
- [x] **9.4. Penyelarasan Visual & Komponen UI (`src/components/`)**:
  - [x] Perbarui copy `WhyNadiSection`, `VoucherSection`, dan `ProductPreview`.
- [x] **9.5. Migrasi Logo Resmi NADI Billing (`public/images/logo`)**:
  - [x] Jadikan `logo-nadi.png` sebagai logo utama di komponen `Logo` (Navbar & Footer).
  - [x] Jadikan `logo-icon.png` sebagai favicon dan app icon (`src/app/icon.png`, `layout.tsx`, `public/favicon.ico`).
  - [x] Pasang `logo-icon.png` pada kartu preview voucher dan address bar browser mockup produk.
- [x] **9.6. Verifikasi Kualitas Akhir**:
  - [x] Lolos typecheck TypeScript (`npm run typecheck`).
  - [x] Lolos linting ESLint (`npm run lint`).
  - [x] Lolos kompilasi build produksi (`npm run build`).
  - [x] Lolos regression test suite (`npm run test:e2e`).

---

## FASE 10: Transformasi Hero Section Animasi & Elemen Jaringan ISP (60 FPS)

- [x] **10.1. Animasi Latar Topologi Serat Optik (`src/components/marketing/hero-network-canvas.tsx`)**:
  - [x] Rancang topologi serat optik SVG realistis (Core BRAS MikroTik, Aggregation OLT, ODC 1:8, ODP, dan ONT pelanggan).
  - [x] Terapkan aliran paket data cahaya bergerak 60 FPS menggunakan CSS keyframe `@keyframes packetTravel`.
  - [x] Hadirkan gelombang radar telemetri melingkar pada node sentral dan tech dot matrix grid.
- [x] **10.2. Real-Time Telemetry HUD Ticker (`src/components/marketing/hero-telemetry-ticker.tsx`)**:
  - [x] Tampilkan status live router BRAS (MikroTik CCR CPU 4%), 2.894 sesi aktif, sinyal GPON RX -18.4 dBm, dan badge Dual-Mode AAA.
- [x] **10.3. Floating Live Telemetry Cards (`src/components/marketing/product-preview.tsx`)**:
  - [x] Tambahkan kartu mengambang kiri: MikroTik BRAS Online (CCR2004, 842 PPPoE Active, Local API 0ms, CoA 3799 UDP).
  - [x] Tambahkan kartu mengambang kanan: FTTH Optical Telemetry & Fault Engine (1.240 ONU, RX avg -18.2 dBm, Radar 3-Level OK).
  - [x] Terapkan animasi mengapung lembut (`animate-float-gentle` & `animate-float-reverse`).
- [x] **10.4. Penataan Ulang Komposisi Hero (`src/components/sections/hero-section.tsx`)**:
  - [x] Integrasikan canvas animasi dan telemetry ticker secara harmonis dan responsif.
- [x] **10.5. Verifikasi Menyeluruh**:
  - [x] Lolos typecheck TypeScript (`npm run typecheck`).
  - [x] Lolos linting ESLint (`npm run lint`).
  - [x] Lolos kompilasi build produksi (`npm run build`).
  - [x] Lolos regression test suite Playwright (`npm run test:e2e`).

