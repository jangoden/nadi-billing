import type { AppModuleCategory, FeatureItem, Pillar } from "@/types/marketing";

export const pillars: Pillar[] = [
  {
    id: "voucher",
    verb: "JUAL",
    name: "Voucher & Loket Agen",
    description: "Generate voucher batch cepat, template cetak kustom, dan perluas penjualan melalui jaringan agen reseller.",
    icon: "store",
    tone: "teal",
    features: [
      "Generator batch (hingga 500 kode unik)",
      "Siap cetak thermal 58/80mm & A4",
      "Dual-mode: push MikroTik Local & RADIUS",
      "Ekosistem penjualan mitra agen & komisi",
    ],
  },
  {
    id: "billing",
    verb: "TAGIH",
    name: "Billing & Keuangan ISP",
    description: "Otomatiskan penagihan bulanan per siklus, pencatatan kasir audit-safe, dan rekonsiliasi arus kas operasional.",
    icon: "wallet",
    tone: "blue",
    features: [
      "Generate tagihan bulanan otomatis (idempotent)",
      "Kasir manual, loket agen & void audit-safe",
      "Laporan arus kas masuk vs biaya operasional",
    ],
  },
  {
    id: "network",
    verb: "PANTAU",
    name: "Network Intelligence",
    description: "Lokalisasi gangguan jaringan fiber otomatis 3-level dan pantau kesehatan router MikroTik, RADIUS, serta OLT/ONU.",
    icon: "chart",
    tone: "navy",
    features: [
      "Lokalisasi gangguan 3-level (Dropcore/Distribusi/Cascading)",
      "Monitoring redaman RX Power & tren degradasi 7 hari",
      "Dual-mode AAA: MikroTik Local API & FreeRADIUS",
    ],
  },
  {
    id: "crm",
    verb: "PERTAHANKAN",
    name: "CRM & 4 Portal Terpadu",
    description: "Kelola riwayat 360° pelanggan, deteksi dini risiko churn, dan berdayakan seluruh tim melalui portal khusus peran.",
    icon: "heart",
    tone: "purple",
    features: [
      "Profil 360° pelanggan & deteksi risiko churn",
      "Self-service ganti WiFi mandiri oleh pelanggan (3x/hari)",
      "4 portal: Console Staf, Teknisi, Agen, & Pelanggan",
    ],
  },
];

export const problems: (FeatureItem & { label: string })[] = [
  {
    label: "REKONSILIASI MANUAL",
    icon: "receipt",
    title: "Masih mencocokkan pembayaran pelanggan satu per satu?",
    description: "Bukti transfer dan status invoice harus diperiksa berulang kali, menyita waktu kasir dan memperlambat rekapitulasi keuangan.",
  },
  {
    label: "TAGIHAN BERANTAKAN",
    icon: "lock",
    title: "Masih membuat tagihan manual setiap awal bulan?",
    description: "Membuat invoice satu per satu untuk ratusan pelanggan rawan salah hitung, lupa penyesuaian biaya, dan terlambat ditagihkan.",
  },
  {
    label: "BLIND SPOT JARINGAN",
    icon: "network",
    title: "Pelanggan lebih dulu mengetahui gangguan jaringan?",
    description: "Kondisi kabel fiber atau router baru diselidiki setelah telepon komplain masuk, tanpa tahu persis di titik mana kabel putus.",
  },
  {
    label: "DATA TERPISAH",
    icon: "folder",
    title: "Data jaringan, pelanggan, dan agen masih terpencar?",
    description: "Tim teknis melihat Winbox, kasir mencatat di buku/Excel, dan data pelanggan tercecer tanpa satu histori terpusat.",
  },
];

export const integrations: { name: string; category: string; icon: FeatureItem["icon"] }[] = [
  { name: "MikroTik Local", category: "Hotspot User & PPP Secret", icon: "router" },
  { name: "FreeRADIUS", category: "Auth, Acct & CoA Disconnect", icon: "server" },
  { name: "GenieACS (TR-069)", category: "Manajemen Jarak Jauh ONT", icon: "hub" },
  { name: "SNMP (OLT / PON)", category: "Telemetri Port & Redaman", icon: "network" },
  { name: "VPN Multi-Protokol", category: "OpenVPN, L2TP & WireGuard", icon: "shield" },
  { name: "Leaflet GIS", category: "Peta Topologi Spasial Fiber", icon: "chart" },
];

export const voucherFeatures: FeatureItem[] = [
  {
    title: "Generator Voucher Batch Cepat",
    description: "Terbitkan ratusan kode voucher unik dalam hitungan detik dengan mode username=password (hingga 500 voucher per batch).",
    icon: "store",
  },
  {
    title: "Cetak Siap Pakai (A4 & Thermal)",
    description: "Layout cetak fleksibel langsung dari browser untuk printer thermal kasir 58/80mm maupun kertas A4 kisi.",
    icon: "receipt",
  },
  {
    title: "Kemitraan & Distribusi Agen",
    description: "Mitra reseller dapat mencetak dan menjual voucher menggunakan saldo deposit mereka dengan komisi terhitung otomatis.",
    icon: "wallet",
  },
];

export const voucherFlow = [
  "Pilih Paket & Jumlah",
  "Generate Batch Kode",
  "Cetak A4 / Thermal",
  "Distribusi via Agen & Kios",
  "Aktivasi Pelanggan",
  "Login Hotspot (RADIUS / MikroTik Local)",
];

export const billingFlow = [
  "Invoice Dibuat",
  "Reminder",
  "Jatuh Tempo",
  "Kasir & Loket Agen",
  "Pencatatan Arus Kas",
  "Audit Log & Rekonsiliasi",
];

export const customerJourney = [
  "Lead",
  "Survei Topologi",
  "Instalasi Lapangan",
  "Pelanggan Aktif",
  "Risiko Churn",
];

export const networkConcepts = [
  "Redaman RX Power 4 Ambang",
  "Lokalisasi Gangguan 3-Level",
  "Deteksi Degradasi 7 Hari",
  "Korelasi Topologi ODP/ODC",
  "Auto-Task Teknisi Darurat",
  "Laporan SLA (MTTD/MTTR)",
];

export const includedFeatures = [
  "Manajemen MikroTik RouterOS & Backup Harian",
  "Dual-Mode AAA: MikroTik Local API & FreeRADIUS Server",
  "GenieACS TR-069 & Self-Service WiFi",
  "Fault Detection Engine 3-Level & SLA",
  "GIS Topologi Fiber & Inventaris ODP/ODC",
  "Generate Tagihan Bulanan Otomatis",
  "Generator Voucher Batch (A4 & Thermal)",
  "Ekosistem Reseller & Skema Komisi",
  "CRM Pelanggan 360° & Deteksi Churn",
  "4 Portal Terpadu (Console, Teknisi, Agen, Pelanggan)",
  "RBAC Granular 11 Hak Akses & Audit Log",
];

export const supportItems: FeatureItem[] = [
  {
    title: "Dukungan Teknis",
    description: "Pendampingan untuk kebutuhan operasional dan integrasi perangkat jaringan ISP Anda.",
    icon: "support",
  },
  {
    title: "Dokumentasi Lengkap",
    description: "Panduan setup MikroTik API, FreeRADIUS, GenieACS, dan manajemen alur kerja operasional.",
    icon: "book",
  },
  {
    title: "Keamanan Data & Vault",
    description: "Password router dan kredensial sensitif tersimpan dalam database dengan enkripsi teruji.",
    icon: "shield",
  },
  {
    title: "Backup Router Otomatis",
    description: "Konfigurasi router dicadangkan harian secara otomatis via FTP ke media penyimpanan server.",
    icon: "cloud",
  },
  {
    title: "Migrasi & Onboarding",
    description: "Impor data pelanggan massal via file CSV dengan validasi integritas per baris.",
    icon: "migrate",
  },
  {
    title: "Protokol Standar Industri",
    description: "Berkomunikasi menggunakan RouterOS API resmi, RADIUS AAA standar, TR-069 NBI, dan SNMP.",
    icon: "code",
  },
];

export const faqs = [
  {
    question: "Apa itu NADI Billing?",
    answer:
      "NADI Billing adalah platform SaaS manajemen bisnis ISP yang menyatukan billing pelanggan, manajemen jaringan (MikroTik, FreeRADIUS, GIS, OLT, ONT/GenieACS), CRM, reseller, dan layanan pelanggan dalam satu sistem dengan integrasi nyata ke perangkat jaringan (bukan sekadar pencatatan manual).",
  },
  {
    question: "Apakah NADI Billing mendukung MikroTik RouterOS tanpa server FreeRADIUS?",
    answer:
      "Ya, tentu saja. NADI Billing mendukung Dual-Mode AAA: Mode MikroTik Local (mengelola Hotspot User, PPP Secret, limit bandwidth, pemutusan sesi, dan auto-isolir langsung ke router via RouterOS API tanpa butuh server Linux/RADIUS tambahan) serta Mode FreeRADIUS Terpusat (dengan CoA Disconnect Port 3799 untuk skala ISP multi-router). Anda juga mendapatkan sinkronisasi resource real-time dan backup konfigurasi harian otomatis via FTP.",
  },
  {
    question: "Bagaimana sistem voucher hotspot bekerja?",
    answer:
      "NADI Billing menyediakan generator voucher batch (hingga 500 kode sekali klik) dengan mode username=password, template kustom QR code siap cetak format A4 dan thermal (58/80mm), serta mendukung dual-mode autentikasi: push langsung ke MikroTik Hotspot User lokal atau tersinkronisasi via database FreeRADIUS, lengkap dengan integrasi portal agen reseller dan perhitungan komisi otomatis.",
  },
  {
    question: "Bagaimana pembayaran tagihan pelanggan dicatat?",
    answer:
      "Pembayaran saat ini dicatat secara audit-safe oleh kasir atau melalui loket agen reseller menggunakan saldo deposit. Sistem mencakup fitur void pembayaran untuk keamanan audit dan laporan arus kas operasional. Integrasi payment gateway otomatis (QRIS/VA) saat ini berada dalam roadmap pengembangan.",
  },
  {
    question: "Bagaimana sistem monitoring dan deteksi gangguan jaringan bekerja?",
    answer:
      "NADI Billing dilengkapi Fault Detection Engine yang memantau redaman optik ONU secara berkala, otomatis melokalisasi akar penyebab gangguan (apakah dropcore 1 pelanggan, kabel distribusi 1 ODP, atau jalur cascading multi-ODP putus), serta membuat tiket darurat dan penugasan teknisi secara otomatis.",
  },
  {
    question: "Apakah pelanggan bisa mengubah password WiFi modem sendiri?",
    answer:
      "Ya. Melalui Portal Pelanggan, pelanggan dapat mengganti nama SSID, mengganti password WiFi, dan me-reboot modem ONT mereka secara mandiri yang tersambung langsung via GenieACS TR-069. Demi keamanan, fitur ganti password dibatasi maksimal 3 kali per hari.",
  },
  {
    question: "Apakah tersedia peran staf dan portal yang berbeda?",
    answer:
      "Ya. NADI Billing memiliki 4 portal khusus: Console Back-Office (untuk admin NOC, Finance, CS dengan 11 hak akses RBAC), Portal Teknisi Lapangan (tugas & uji redaman), Portal Agen/Reseller (kios voucher & loket tagihan), dan Portal Pelanggan Mandiri.",
  },
  {
    question: "Apakah semua fitur tersedia di setiap paket langganan?",
    answer:
      "Ya. Filosofi NADI Billing adalah transparansi: seluruh fitur (Core Jaringan, Fault Engine, TR-069, Billing, Reseller, GIS) tersedia di semua paket. Perbedaan kapasitas langganan hanya didasarkan pada jumlah pelanggan aktif Anda.",
  },
];

export const officialAppModules: AppModuleCategory[] = [
  {
    id: "core-network",
    category: "Core Jaringan & Autentikasi",
    group: "Jaringan & FTTH",
    badge: "Dual-Mode AAA",
    icon: "router",
    description: "Fondasi interkoneksi perangkat inti ISP, manajemen sesi pelanggan, tunnel VPN, dan kontrol bandwidth.",
    items: [
      { name: "Router MikroTik", description: "Integrasi API RouterOS resmi: tes koneksi, sinkronisasi resource real-time, dan push profil bandwidth." },
      { name: "Server RADIUS", description: "Autentikasi terpusat, pencatatan accounting data, dan pemutusan sesi via RFC 3576 CoA Disconnect UDP 3799." },
      { name: "VPN Bridge", description: "Tunnel multi-protokol (WireGuard, OpenVPN, L2TP) untuk akses router aman tanpa IP publik statis." },
      { name: "Profil Bandwidth & QoS", description: "Konfigurasi rate-limit, burst time, dan antrian queue tree yang diterapkan langsung ke router." },
      { name: "Backup & Maintenance Router", description: "Pencadangan file konfigurasi RouterOS harian terjadwal otomatis via FTP server internal." },
    ],
  },
  {
    id: "customer-management",
    category: "Manajemen Pelanggan & Layanan",
    group: "Pelanggan & CS",
    badge: "CRM 360°",
    icon: "users",
    description: "Basis data pelanggan menyeluruh, manajemen paket langganan, pelacakan alur prospek, dan deteksi retensi.",
    items: [
      { name: "Daftar Pelanggan", description: "Pusat profil data pelanggan lengkap dengan status langganan, alokasi IP dial, dan riwayat tagihan." },
      { name: "Paket Layanan", description: "Pengaturan paket internet PPPoE, Hotspot, atau Dedicated dengan masa berlaku dan batasan kecepatan." },
      { name: "CRM & Sales Pipeline", description: "Pelacakan tahapan pelanggan: Lead prospek baru, Survey lokasi, Instalasi lapangan, hingga Aktif." },
      { name: "Deteksi Risiko Churn", description: "Algoritma penandaan otomatis pelanggan berisiko berhenti berdasarkan histori tunggakan dan komplain." },
      { name: "Impor & Ekspor Data", description: "Migrasi data pelanggan secara massal menggunakan format CSV dengan validasi integritas data." },
    ],
  },
  {
    id: "voucher-hotspot",
    category: "Voucher Hotspot & Prepaid",
    group: "Billing & Finansial",
    badge: "Cetak Cepat",
    icon: "store",
    description: "Penerbitan kode voucher massal, editor template kustom, dan pencetakan instan ke printer thermal maupun kertas A4.",
    items: [
      { name: "Generator Voucher", description: "Generate hingga 500 kode voucher unik sekali klik dengan mode username=password atau kode unik." },
      { name: "Data & Stok Voucher", description: "Inventaris status voucher aktif, belum terpakai, expired, atau terkunci pada akun tertentu." },
      { name: "Paket Voucher", description: "Konfigurasi paket berbasis jam, harian, mingguan, bulanan, atau kuota kuantum gigabyte." },
      { name: "Template & Editor Voucher", description: "Kustomisasi tata letak, warna brand, identitas ISP, dan QR Code untuk login cepat." },
      { name: "Cetak Voucher", description: "Output siap cetak presisi langsung dari browser ke printer thermal kasir 58/80mm atau lembar kertas A4." },
      { name: "Laporan Voucher", description: "Statistik real-time omzet penjualan voucher per router, paket layanan, dan kasir penjualan." },
    ],
  },
  {
    id: "toko-voucher",
    category: "Toko Voucher Online",
    group: "Billing & Finansial",
    badge: "Self-Service Publik",
    icon: "store",
    description: "Etalase digital penjualan voucher hotspot mandiri tanpa kertas yang dapat diakses langsung oleh publik.",
    items: [
      { name: "Katalog Produk Toko", description: "Etalase publik modern bagi calon pembeli voucher untuk memilih paket tanpa perlu login." },
      { name: "Transaksi Toko Online", description: "Pencatatan riwayat pesanan voucher digital dari captive portal atau domain publik." },
      { name: "Pengaturan Storefront", description: "Kustomisasi logo toko, domain akses, instruksi pembayaran, dan narahubung bantuan." },
      { name: "Sistem Anti-Fraud", description: "Proteksi cerdas pembatasan frekuensi transaksi (rate limiting) dan pencegahan bot abuse." },
    ],
  },
  {
    id: "billing-finance",
    category: "Billing, Invoice & Keuangan",
    group: "Billing & Finansial",
    badge: "Audit-Safe",
    icon: "receipt",
    description: "Siklus penagihan otomatis berulang, pencatatan kasir kantor, loket agen, dan rekonsiliasi arus kas.",
    items: [
      { name: "Daftar Tagihan & Invoice", description: "Penerbitan tagihan bulanan terjadwal otomatis yang bersifat idempotent (bebas tagihan ganda)." },
      { name: "Laporan Keuangan & Akuntansi", description: "Pencatatan kasir manual, pelacakan kas masuk vs operasional, dan fitur void pembayaran audit-safe." },
      { name: "Payment Gateway", description: "Modul penerimaan pembayaran tagihan dan kesiapan integrasi multi-kanal pembayaran." },
    ],
  },
  {
    id: "gis-ftth-inventory",
    category: "GIS, Topologi FTTH & Inventaris",
    group: "Jaringan & FTTH",
    badge: "Spasial & Logistik",
    icon: "network",
    description: "Pemetaan spasial jaringan kabel optik, pemantauan perangkat OLT/ODP, dan manajemen inventaris logistik gudang.",
    items: [
      { name: "Peta Jaringan Spasial GIS", description: "Peta interaktif Leaflet/OpenStreetMap menampilkan seluruh rute kabel fiber, ODC, ODP, dan pelanggan." },
      { name: "Manajemen ODP & ODC", description: "Hierarki parent-child, rasio splitting port (1:8 / 1:16), serta kalkulasi sisa kapasitas port." },
      { name: "Manajemen OLT & Port PON", description: "Monitoring perangkat OLT GPON/EPON, status port PON, dan deteksi link via protokol SNMP." },
      { name: "Daftar ONU / ONT Terpasang", description: "Daftar perangkat modem pelanggan dengan status registrasi dan ambang batas redaman optik." },
      { name: "Inventaris Logistik Gudang", description: "Manajemen stok logistik fisik: kabel dropcore, modem ONT, pigtail, adaptor, dan mutasi barang keluar/masuk." },
    ],
  },
  {
    id: "fault-engine",
    category: "Mesin Deteksi Gangguan Otomatis",
    group: "Jaringan & FTTH",
    badge: "3-Level Engine",
    icon: "warning",
    description: "Mesin cerdas lokalisasi gangguan optik proaktif yang mengidentifikasi titik kabel putus sebelum pelanggan komplain.",
    items: [
      { name: "Status Gangguan Realtime", description: "Dashboard insiden live yang mendeteksi penurunan status link atau kabel putus seketika." },
      { name: "Deteksi Dini & Tren Penurunan", description: "Analisis tren degradasi nilai RX Power 7 hari untuk pencegahan gangguan massal." },
      { name: "Riwayat Gangguan & SLA", description: "Rekapitulasi log insiden, durasi perbaikan, serta metrik ketaatan SLA (MTTD dan MTTR)." },
      { name: "Retensi Data Optik", description: "Penyimpanan dan rollup historis telemetri kualitas redaman serat optik jangka panjang." },
    ],
  },
  {
    id: "customer-service",
    category: "Customer Service & Tiket",
    group: "Pelanggan & CS",
    badge: "Helpdesk Terpadu",
    icon: "support",
    description: "Pusat penanganan keluhan pelanggan, antrian live chat dengan CS, dan penerbitan tiket darurat teknisi.",
    items: [
      { name: "Live Chat Antrian CS", description: "Sistem percakapan real-time terintegrasi antara tim customer service kantor dan pelanggan." },
      { name: "Respon Cepat", description: "Koleksi templat jawaban cepat (canned responses) untuk efisiensi penyelesaian kendala umum." },
      { name: "Sistem Tiket Gangguan", description: "Eskalasi tiket komplain dengan penugasan otomatis ke teknisi lapangan terdekat." },
      { name: "Knowledge Base & Bot FAQ", description: "Pusat artikel panduan mandiri dan asisten bot otomatis menjawab pertanyaan umum." },
      { name: "Laporan Kinerja Layanan", description: "Metrik performa CS: waktu respon awal, waktu penyelesaian tiket, dan tingkat kepuasan." },
    ],
  },
  {
    id: "cpe-tr069",
    category: "CPE & TR-069 GenieACS",
    group: "Jaringan & FTTH",
    badge: "Remote Massal",
    icon: "hub",
    description: "Kendali jarak jauh perangkat modem pelanggan via protokol TR-069 tanpa teknisi perlu datang ke rumah.",
    items: [
      { name: "Daftar Perangkat TR-069", description: "Inventaris modem ONT yang terhubung via GenieACS NBI REST secara real-time." },
      { name: "Audit Log Penggantian SSID", description: "Pencatatan jejak audit perubahan nama WiFi dan password oleh pelanggan maupun admin." },
      { name: "Kontrol Remote Massal", description: "Eksekusi reboot, restart, atau pembaruan konfigurasi modem secara massal per ODP/wilayah." },
    ],
  },
  {
    id: "reseller-keagenan",
    category: "Reseller & Keagenan",
    group: "Billing & Finansial",
    badge: "Portal Mitra",
    icon: "wallet",
    description: "Ekosistem kemitraan loket pembayaran dan agen reseller voucher dengan bagi hasil komisi otomatis.",
    items: [
      { name: "Daftar Mitra & Reseller", description: "Manajemen akun mitra agen, warung, dan loket pembayaran tagihan di wilayah operasional." },
      { name: "Deposit & Mutasi Saldo", description: "Pengelolaan saldo deposit agen untuk mencetak voucher atau menerima pembayaran tagihan." },
      { name: "Skema Harga & Komisi", description: "Penetapan margin keuntungan komisi persen atau nominal flat per transaksi produk." },
      { name: "Laporan Penjualan Reseller", description: "Laporan performa transaksi dan akumulasi pendapatan komisi agen yang transparan." },
    ],
  },
  {
    id: "notifikasi-broadcast",
    category: "Notifikasi & Broadcast",
    group: "Operasional & Keamanan",
    badge: "Otomasi Pesan",
    icon: "chat",
    description: "Pusat pengaturan pesan otomatis di seluruh siklus layanan dan pengumuman broadcast massal ke pelanggan.",
    items: [
      { name: "Koneksi Gateway Notifikasi", description: "Integrasi konektor gateway notifikasi untuk pengiriman pesan operasional." },
      { name: "Template Notifikasi Otomatis", description: "Templat siap pakai untuk invoice tagihan, konfirmasi pembayaran, dan pengingat jatuh tempo." },
      { name: "Broadcast Massal", description: "Pengiriman pengumuman massal pemeliharaan jaringan, perbaikan kabel, atau info penting sekali klik." },
      { name: "Antrian & Log Pengiriman", description: "Pemantauan antrian pengiriman pesan, status sukses/gagal, dan riwayat pengiriman." },
    ],
  },
  {
    id: "keamanan-administrasi",
    category: "Keamanan, Tenant & Administrasi Sistem",
    group: "Operasional & Keamanan",
    badge: "Enterprise RBAC",
    icon: "shield",
    description: "Pengaturan izin akses staf, autentikasi ganda, audit log sistem yang tidak dapat diubah, dan multi-tenant.",
    items: [
      { name: "Manajemen Pengguna & Hak Akses", description: "Kontrol 11 hak akses granular berbasis peran (Admin NOC, Keuangan, CS, Teknisi)." },
      { name: "Keamanan Akun (2FA)", description: "Autentikasi dua faktor berbasis kode OTP untuk melindungi akun admin dari akses ilegal." },
      { name: "Log Audit Sistem", description: "Perekaman jejak seluruh tindakan penting di sistem yang bersifat immutable demi keamanan." },
      { name: "Pengaturan Multi-Tenant", description: "Isolasi data organisasi, pengaturan zona waktu, dan identitas tenant secara mandiri." },
    ],
  },
];
