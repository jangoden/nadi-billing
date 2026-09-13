import type { FeatureItem, Pillar } from "@/types/marketing";

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
      "Integrasi nyata MikroTik, FreeRADIUS & GenieACS",
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
  { name: "MikroTik RouterOS", category: "API, QoS & Auto Backup", icon: "router" },
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
  "Login Hotspot via RADIUS",
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
  "Server FreeRADIUS & CoA Disconnect",
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
    question: "Apakah NADI Billing mendukung MikroTik RouterOS?",
    answer:
      "Ya, terintegrasi langsung melalui RouterOS API resmi. Anda dapat melakukan tes koneksi, sinkronisasi resource real-time, push profil bandwidth & QoS, hingga penjadwalan backup konfigurasi router harian otomatis ke server.",
  },
  {
    question: "Bagaimana sistem voucher hotspot bekerja?",
    answer:
      "NADI Billing menyediakan generator voucher batch (hingga 500 kode sekali klik), template kustom dengan QR code siap cetak format A4 dan thermal (58/80mm), serta integrasi ke portal agen reseller dengan komisi otomatis.",
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
