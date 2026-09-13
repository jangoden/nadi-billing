export interface DocSnippet {
  language: string;
  code: string;
  caption?: string;
}

export interface DocArticle {
  id: string;
  title: string;
  badge?: string;
  summary: string;
  description: string[];
  steps?: { title: string; detail: string }[];
  snippets?: DocSnippet[];
  callout?: {
    type: "tip" | "important" | "note";
    title: string;
    message: string;
  };
}

export interface DocCategory {
  id: string;
  title: string;
  icon: "server" | "router" | "receipt" | "wallet" | "chat" | "store" | "code" | "shield";
  description: string;
  articles: DocArticle[];
}

export const documentationCategories: DocCategory[] = [
  {
    id: "getting-started",
    title: "Quickstart & Setup Awal",
    icon: "server",
    description: "Langkah awal menghubungkan router MikroTik, FreeRADIUS, dan konfigurasi tenant NADI Billing.",
    articles: [
      {
        id: "architecture-overview",
        title: "Arsitektur Multi-Tenant NADI",
        badge: "Konsep Dasar",
        summary: "Memahami bagaimana NADI Billing berkomunikasi secara aman dengan router MikroTik, FreeRADIUS, dan perangkat OLT/ONT.",
        description: [
          "NADI Billing menggunakan arsitektur multi-tenant single-database dengan isolasi ketat per organisasi (tenant). Seluruh data operasional, kredensial perangkat, pelanggan, dan transaksi diisolasi menggunakan scoping otomatis.",
          "Router MikroTik (NAS) dan server FreeRADIUS terhubung ke sistem NADI melalui RouterOS API dan koneksi database RADIUS terpisah, didukung tunnel VPN WireGuard/OpenVPN untuk site tanpa IP publik statis.",
          "Kredensial sensitif seperti password router dan SNMP community disimpan menggunakan vault enkripsi bawaan di database untuk perlindungan maksimal."
        ],
        callout: {
          type: "tip",
          title: "Koneksi Aman Tanpa IP Publik Statis",
          message: "Jika router MikroTik Anda berada di balik NAT atau modem seluler GSM, gunakan VPN Bridge multi-protokol (WireGuard/OpenVPN) yang status konektivitasnya dicek secara berkala."
        }
      },
      {
        id: "quickstart-4-steps",
        title: "Panduan Onboarding 4 Langkah",
        badge: "Panduan Cepat",
        summary: "Langkah terarah menyiapkan operasional ISP dari pendaftaran hingga cetak voucher atau invoice pertama.",
        description: [
          "Ikuti 4 langkah terarah berikut untuk mulai mengoperasikan NADI Billing di jaringan ISP Anda:",
          "Pastikan Anda memiliki akses Winbox/API ke router MikroTik utama (BRAS / Gateway)."
        ],
        steps: [
          { title: "1. Daftarkan Router MikroTik", detail: "Buka Console > Jaringan > Tambah Router. Masukkan Host/IP, Port API (default 8728), Username, Password API, dan lakukan 'Test Connection'." },
          { title: "2. Hubungkan ke Server FreeRADIUS", detail: "Konfigurasi NAS client pada FreeRADIUS dan tautkan kredensial rahasia (shared secret) ke router MikroTik Anda." },
          { title: "3. Tentukan Paket Layanan & Profil QoS", detail: "Buat profil paket bandwidth (rate-limit, burst, priority) yang langsung di-push ke RouterOS." },
          { title: "4. Impor Data Pelanggan atau Terbitkan Voucher", detail: "Gunakan fitur import CSV massal pelanggan atau langsung generate batch voucher hotspot siap cetak." }
        ]
      },
      {
        id: "mikrotik-initial-cli",
        title: "Script Konfigurasi Awal MikroTik",
        badge: "RouterOS CLI",
        summary: "Perintah terminal RouterOS untuk mendaftarkan server RADIUS dan mengaktifkan Incoming CoA Port 3799.",
        description: [
          "Jalankan baris perintah berikut pada terminal Winbox Anda untuk mengaktifkan AAA RADIUS dan fitur pemutusan sesi real-time (CoA Disconnect):"
        ],
        snippets: [
          {
            language: "routeros",
            code: `# 1. Daftarkan RADIUS Server NADI
/radius
add address=10.10.0.1 secret="NADI_RADIUS_SECRET" \\
    service=hotspot,ppp authentication-port=1812 accounting-port=1813 \\
    timeout=3000ms comment="NADI Billing RADIUS Server"

# 2. Aktifkan RADIUS Incoming (RFC 3576 / RFC 5176 CoA Port 3799)
/radius incoming
set accept=yes port=3799

# 3. Aktifkan RADIUS Accounting pada PPP & Hotspot
/ppp aaa
set use-radius=yes accounting=yes interim-update=5m
/ip hotspot profile
set [ find default=yes ] use-radius=yes radius-accounting=yes`,
            caption: "Terminal MikroTik (RouterOS v6 & v7 compatible)"
          }
        ],
        callout: {
          type: "important",
          title: "Wajib Buka Port 3799 UDP",
          message: "Incoming port 3799 UDP harus diizinkan pada firewall filter input MikroTik agar perintah CoA Disconnect dari Console NADI dapat langsung memutus sesi PPPoE bermasalah tanpa restart router."
        }
      }
    ]
  },
  {
    id: "mikrotik-ppp",
    title: "MikroTik & RADIUS AAA",
    icon: "router",
    description: "Konfigurasi mendalam RouterOS API, monitoring sesi RADIUS aktif, profil bandwidth QoS, dan backup otomatis harian.",
    articles: [
      {
        id: "mikrotik-api-sync",
        title: "Sinkronisasi Resource Router & Backup FTP",
        badge: "Network Core",
        summary: "Bagaimana NADI Billing memantau CPU/memori router dan mencadangkan konfigurasi harian otomatis via FTP.",
        description: [
          "NADI Billing menggunakan library resmi `evilfreelancer/routeros-api-php` untuk berkomunikasi langsung ke port API MikroTik (8728/8729).",
          "Setiap 5 menit, scheduler otomatis memeriksa penggunaan CPU, memori, dan uptime router.",
          "Setiap malam, scheduler `console:backup-all-routers` mengeksekusi script backup di router, lalu mengunduh file `.backup` via FTP ke media penyimpanan server Laravel untuk pemulihan bencana."
        ]
      },
      {
        id: "coa-disconnect",
        title: "Pemutusan Sesi Real-Time (FreeRADIUS CoA Disconnect)",
        badge: "Real-Time CoA",
        summary: "Mekanisme pemutusan sesi PPPoE atau Hotspot langsung dari dashboard console menggunakan paket CoA RFC 3576.",
        description: [
          "Ketika pelanggan mengalami sesi gantung (stale session) atau admin perlu mereset koneksi pelanggan dari dashboard:",
          "1. Admin menekan tombol 'Putuskan Sesi' pada menu Sesi Aktif RADIUS di Console.",
          "2. `SqlRadiusSessionService` mengirimkan paket PoD (Packet of Disconnect) via UDP 3799 ke router NAS terkait.",
          "3. MikroTik memutus sesi PPP/Hotspot seketika dan mencatat event di auth log.",
          "4. Perangkat ONT pelanggan dial ulang otomatis dalam 1-3 detik untuk mendapatkan koneksi segar."
        ],
        callout: {
          type: "note",
          title: "Interim Update 5 Menit",
          message: "Interim update RADIUS disarankan disetel ke 5m agar pembacaan byte upload/download pada laporan akuntansi akurat tanpa membebani prosesor router."
        }
      }
    ]
  },
  {
    id: "fault-engine",
    title: "Fault Detection & Telemetri FTTH",
    icon: "shield",
    description: "Algoritma lokalisasi gangguan fiber 3-level, telemetri redaman optik ONU, polling SNMP OLT, dan pelaporan SLA.",
    articles: [
      {
        id: "fault-localization-3level",
        title: "Cara Kerja Mesin Lokalisasi Gangguan 3-Level",
        badge: "Hero Feature",
        summary: "Algoritma threshold cerdas yang mengklasifikasikan titik kabel putus (dropcore vs distribusi vs cascading).",
        description: [
          "NADI Fault Engine menganalisis korelasi status LOS (Loss of Signal) dari pembacaan redaman time-series lintas topologi FTTH:",
          "• Level 1 (Dropcore): Hanya 1 pelanggan di suatu ODP yang mengalami LOS, sementara pelanggan lain di ODP yang sama tetap normal. Sistem menyimpulkan kabel dropcore rumah putus.",
          "• Level 2 (Distribusi): Seluruh pelanggan pada satu ODP mengalami LOS secara bersamaan. Sistem menyimpulkan kabel distribusi dari ODC ke ODP terputus.",
          "• Level 3 (Cascading Hulu): Beberapa ODP berurutan atau satu ODC padam serentak. Sistem menyimpulkan kabel feeder utama putus atau port PON OLT bermasalah.",
          "Sistem otomatis menerbitkan tugas darurat ke teknisi dan membuat tiket gangguan pelanggan tanpa perlu penelusuran manual."
        ]
      },
      {
        id: "predictive-degradation",
        title: "Deteksi Dini Degradasi Redaman Optik (7 Hari)",
        badge: "Preventive Alert",
        summary: "Peringatan prediktif saat tren redaman turun >3dB dalam 7 hari sebelum sinyal jatuh ke level kritis.",
        description: [
          "NADI mengelompokkan redaman optik ONU ke dalam 4 ambang batas: Normal (> -22 dBm), Perhatian (-22 s/d -25 dBm), Waspada (-25 s/d -27 dBm), dan Kritis (< -27 dBm / LOS).",
          "Service `PredictiveDegradationService` membandingkan tren rata-rata bergerak 7 hari. Jika redaman memburuk lebih dari 3 dB, sistem menghitung proyeksi hari menuju batas kritis dan menampilkan peringatan preventif di dashboard."
        ],
        snippets: [
          {
            language: "php",
            code: `// Cuplikan Algoritma Degradasi Sinyal (PredictiveDegradationService.php)
if ($currentReading <= -25.0 && ($sevenDayAvg - $currentReading) >= 3.0) {
    $daysToCritical = ceil(abs(-27.0 - $currentReading) / $dailyDropRate);
    DegradationAlert::create([
        'onu_device_id' => $onu->id,
        'severity' => 'warning',
        'projected_days_to_critical' => $daysToCritical,
        'message' => "Tren redaman turun >3dB dalam 7 hari. Proyeksi kritis: {$daysToCritical} hari."
    ]);
}`,
            caption: "Logika deteksi penurunan redaman optik NADI Billing"
          }
        ]
      }
    ]
  },
  {
    id: "cpe-genieacs",
    title: "CPE & TR-069 GenieACS",
    icon: "server",
    description: "Integrasi NBI REST GenieACS, remote reboot ONT satuan/massal, audit log, dan portal ganti WiFi mandiri.",
    articles: [
      {
        id: "genieacs-nbi-integration",
        title: "Integrasi NBI REST GenieACS",
        badge: "TR-069 Standard",
        summary: "Menghubungkan server GenieACS ke NADI Billing untuk kendali jarak jauh perangkat modem pelanggan.",
        description: [
          "NADI Billing terhubung ke GenieACS melalui REST NBI (Northbound Interface) pada port 7557.",
          "Klien TR-069 NADI mendukung dua skema standar perangkat: TR-098 (`InternetGatewayDevice.*`) dan TR-181 (`Device.*`).",
          "Admin dan teknisi dapat melakukan tes redaman optik, sinkronisasi uptime, serta reboot individual maupun massal per-wilayah langsung dari Console tanpa membuka antarmuka GenieACS manual."
        ]
      },
      {
        id: "customer-self-service-wifi",
        title: "Portal Mandiri WiFi Pelanggan (Self-Service)",
        badge: "Batas 3x/Hari",
        summary: "Memberikan akses ke pelanggan untuk mengganti nama SSID, password WiFi, dan reboot modem sendiri.",
        description: [
          "Pelanggan dapat login ke Portal Pelanggan (`/portal/*`) dan membuka menu WiFi:",
          "1. Pelanggan memasukkan nama WiFi (SSID) baru atau password WPA2/WPA3 baru.",
          "2. Sistem mengirim perintah parameter update via GenieACS NBI ke modem ONT pelanggan secara asynchronous.",
          "3. Seluruh perubahan tercatat di CPE Audit Log (siapa mengubah apa, kapan, dan dari IP mana).",
          "Untuk mencegah penyalahgunaan dan beban berlebih ke ONT, fitur ganti password dibatasi maksimal 3 kali per hari per pelanggan."
        ]
      }
    ]
  },
  {
    id: "billing-finance",
    title: "Billing & Keuangan ISP",
    icon: "receipt",
    description: "Siklus tagihan bulanan otomatis idempotent, kasir manual audit-safe, void pembayaran, dan laporan arus kas.",
    articles: [
      {
        id: "billing-cycle-rules",
        title: "Generate Tagihan Bulanan Idempotent",
        badge: "Idempotent Scheduler",
        summary: "Penerbitan tagihan otomatis terjadwal berdasarkan siklus tagih masing-masing pelanggan.",
        description: [
          "Command `GenerateMonthlyCustomerInvoices` dijalankan setiap hari oleh scheduler Laravel.",
          "Sistem mencari pelanggan aktif yang `billing_cycle_day`-nya jatuh pada hari ini.",
          "Eksekusi bersifat idempotent: jika command dijalankan berulang kali pada hari yang sama, invoice untuk periode tersebut tidak akan pernah terbit ganda.",
          "Invoice mendukung item penyesuaian fleksibel: diskon promo, denda keterlambatan, biaya instalasi, atau sewa perangkat."
        ]
      },
      {
        id: "cashier-audit-safe",
        title: "Kasir Manual & Void Pembayaran Audit-Safe",
        badge: "Audit-Safe",
        summary: "Pencatatan pembayaran tunai/transfer bank dengan sistem void audit-safe (tanpa hapus data).",
        description: [
          "Kasir kantor atau admin finance mencatat pembayaran pelanggan sebagai entitas `CustomerPayment`.",
          "Jika kasir melakukan kesalahan input nominal atau salah pilih invoice, pembayaran tidak dihapus dari database (`DELETE`), melainkan dibatalkan menggunakan status `void` dengan alasan pembatalan wajib dicatat.",
          "Setiap mutasi kas masuk langsung terhubung ke laporan arus kas operasional untuk membandingkan pendapatan vs biaya operasional bulanan."
        ]
      }
    ]
  },
  {
    id: "hotspot-voucher",
    title: "Voucher Hotspot & Reseller",
    icon: "store",
    description: "Generator batch voucher, template cetak thermal 58/80mm & A4, serta portal keagenan reseller dengan komisi otomatis.",
    articles: [
      {
        id: "batch-voucher-generator",
        title: "Generator Batch Voucher Hotspot",
        badge: "Maks 500/Batch",
        summary: "Menerbitkan ratusan kode voucher acak unik dalam hitungan detik dengan mode username=password.",
        description: [
          "Generator voucher NADI memungkinkan pembuatan hingga 500 kode voucher unik per batch.",
          "Fitur utama generator voucher:",
          "• Mode Kredensial: Username = Password (mempermudah pelanggan mengetik di captive portal).",
          "• Masa Aktif Terhitung Saat Login: Masa berlaku voucher dihitung sejak pertama kali dipakai login, bukan sejak dicetak.",
          "• Filter Status Lengkap: Available, Used, Expired, dan Disabled."
        ]
      },
      {
        id: "thermal-printing",
        title: "Cetak Layout Thermal 58/80mm & A4",
        badge: "Print Layout",
        summary: "Format cetak langsung dari browser ke printer kasir mini thermal atau lembar A4.",
        description: [
          "NADI menyediakan format cetak voucher langsung via CSS print browser tanpa perlu aplikasi tambahan:",
          "• Layout Kertas A4: Format kisi grid rapi siap potong dengan logo operator dan petunjuk login.",
          "• Layout Printer Thermal: Format continuous roll untuk printer thermal kasir 58mm atau 80mm ESC/POS.",
          "Setiap voucher memuat QR Code login captive portal instan."
        ]
      },
      {
        id: "reseller-agency-portal",
        title: "Portal Agen Reseller & Komisi Otomatis",
        badge: "Ekosistem Mitra",
        summary: "Pemberdayaan mitra loket dan konter penjualan voucher menggunakan sistem saldo deposit dan komisi otomatis.",
        description: [
          "Operator ISP dapat mendaftarkan mitra agen pada menu Reseller Console:",
          "1. Mitra agen diberikan akses ke Portal Agen (`/agent/*`) dengan dompet saldo deposit.",
          "2. Agen dapat mencetak voucher atau melayani pembayaran tagihan pelanggan menggunakan saldo mereka.",
          "3. Skema komisi (persentase atau nominal flat per transaksi) dihitung secara otomatis oleh sistem.",
          "Operator dapat memantau omset penjualan seluruh agen melalui laporan penjualan reseller terpadu."
        ]
      }
    ]
  },
  {
    id: "developer-api",
    title: "Protokol Standar & Keamanan",
    icon: "code",
    description: "Protokol standar industri, RBAC granular 11 hak akses, enkripsi kredensial, dan audit log sistem.",
    articles: [
      {
        id: "rbac-and-security",
        title: "RBAC Granular 4 Peran Staf & Audit Log",
        badge: "Keamanan Sistem",
        summary: "Pengaturan hak akses staf operasional dan jejak audit immutable.",
        description: [
          "NADI Billing membagi peran staf console menjadi 4 console role spesifik:",
          "• Super Admin: Akses penuh seluruh 11 modul operasional.",
          "• Admin Jaringan (NOC): Khusus mengelola Core Jaringan, GIS FTTH, CPE GenieACS, dan Fault Engine.",
          "• Finance / Kasir: Khusus mengelola Pelanggan, Voucher, Billing ISP, dan Reseller.",
          "• Customer Service (CS): Khusus mengelola Pelanggan dan Support Ticket Desk.",
          "Setiap perubahan paket, penghapusan data, dan penyesuaian biaya dicatat dalam audit log sistem yang tidak dapat diubah (immutable)."
        ]
      },
      {
        id: "api-protocols",
        title: "Protokol Standar Industri Terpasang",
        badge: "Protokol Resmi",
        summary: "Daftar protokol standar yang digunakan NADI Billing untuk menghubungkan perangkat jaringan.",
        description: [
          "NADI Billing mengedepankan interoperabilitas tanpa ketergantungan pada vendor tunggal:",
          "• MikroTik RouterOS API: Manajemen router, QoS bandwidth, dan backup harian.",
          "• FreeRADIUS (RFC 2865 / RFC 2866 / RFC 3576): Autentikasi PPPoE/Hotspot, akuntansi, dan CoA Disconnect.",
          "• TR-069 / CWMP (via GenieACS REST NBI): Manajemen CPE modem ONT jarak jauh.",
          "• SNMP v2c: Polling telemetri port PON dan kesehatan perangkat OLT."
        ]
      }
    ]
  }
];
