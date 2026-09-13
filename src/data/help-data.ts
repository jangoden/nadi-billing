export interface HelpTopic {
  id: string;
  category: "Koneksi Router & RADIUS" | "Billing & Kasir" | "FTTH & GenieACS" | "Hotspot & Voucher" | "Akun & Kapasitas";
  question: string;
  answer: string[];
  tips?: string;
  badge?: string;
}

export interface SupportChannel {
  id: string;
  title: string;
  badge: string;
  description: string;
  contact: string;
  actionText: string;
  actionHref: string;
  icon: "chat" | "router" | "support" | "users";
  isPrimary?: boolean;
}

export const supportChannels: SupportChannel[] = [
  {
    id: "whatsapp-emergency",
    title: "Kontak Tim Siaga Teknis (24/7)",
    badge: "Respons < 5 Menit",
    description: "Saluran darurat langsung ke tim Network Engineer NADI untuk kendala router offline, RADIUS timeout, atau kendala sinkronisasi sistem.",
    contact: "+62 812-3456-7890",
    actionText: "HUBUNGI TIM SIAGA",
    actionHref: "https://wa.me/6281234567890?text=Halo%20Tim%20Support%20NADI%2C%20saya%20membutuhkan%20bantuan%20teknis",
    icon: "chat",
    isPrimary: true,
  },
  {
    id: "remote-session",
    title: "Sesi Remote Setup (AnyDesk / Meet)",
    badge: "Panduan Interaktif",
    description: "Jadwalkan sesi pendampingan jarak jauh bersama arsitek jaringan kami untuk konfigurasi awal BRAS MikroTik, CoA, dan topologi OLT.",
    contact: "Sesi 1-on-1 Teknis",
    actionText: "JADWALKAN SESI REMOTE",
    actionHref: "/demo",
    icon: "router",
    isPrimary: false,
  },
  {
    id: "email-support",
    title: "Email Helpdesk & Tiket Resmi",
    badge: "SLA 1-2 Jam Kerja",
    description: "Gunakan untuk pelaporan bug sistemik, pengajuan fitur kustom, permintaan e-Faktur pajak, atau pertanyaan kepatuhan hukum.",
    contact: "support@nadibilling.id",
    actionText: "KIRIM EMAIL RESMI",
    actionHref: "mailto:support@nadibilling.id?subject=Bantuan%20Teknis%20NADI%20Billing",
    icon: "support",
    isPrimary: false,
  },
  {
    id: "community-forum",
    title: "Komunitas Pengelola ISP & RT/RW Net",
    badge: "1.200+ Anggota Aktif",
    description: "Ruang berbagi tips konfigurasi queue tree, rekomendasi perangkat OLT/ONU terjangkau, dan diskusi strategi bisnis jaringan se-Indonesia.",
    contact: "Telegram Community",
    actionText: "GABUNG KOMUNITAS",
    actionHref: "https://t.me/nadibilling_community",
    icon: "users",
    isPrimary: false,
  },
];

export const systemServices = [
  { name: "NADI Console & API Core", status: "Operational", uptime: "99.99%", latency: "14ms" },
  { name: "FreeRADIUS AAA Server (Port 1812/1813)", status: "Operational", uptime: "99.98%", latency: "18ms" },
  { name: "Real-time CoA Disconnect (Port 3799)", status: "Operational", uptime: "100%", latency: "12ms" },
  { name: "GenieACS TR-069 ACS Bridge", status: "Operational", uptime: "99.95%", latency: "45ms" },
  { name: "SNMP OLT Telemetry Poller", status: "Operational", uptime: "100%", latency: "85ms" },
];

export const helpTopics: HelpTopic[] = [
  {
    id: "router-offline",
    category: "Koneksi Router & RADIUS",
    question: "Router MikroTik berstatus 'Disconnected' di Console NADI?",
    badge: "Solusi Cepat",
    answer: [
      "1. Periksa koneksi internet router MikroTik Anda dengan melakukan ping ke IP server atau DNS publik melalui menu New Terminal di Winbox.",
      "2. Pastikan port API (default: 8728 plain atau 8729 SSL) aktif di menu `/ip service` MikroTik dan IP server NADI diizinkan pada kolom 'Address'.",
      "3. Pastikan username dan password API yang didaftarkan di Console NADI memiliki grup hak akses 'full' atau 'read+write'.",
      "4. Jika router berada di balik NAT tanpa IP Publik Statis, pastikan status koneksi VPN Bridge (WireGuard / OpenVPN) berstatus aktif."
    ],
    tips: "Gunakan tombol 'Test Connection' pada detail router di Console untuk memverifikasi respons API MikroTik secara langsung."
  },
  {
    id: "coa-not-triggering",
    category: "Koneksi Router & RADIUS",
    question: "Mengapa perintah CoA Disconnect tidak memutus sesi pelanggan?",
    badge: "Konfigurasi BRAS",
    answer: [
      "1. Pastikan menu `/radius incoming` di MikroTik telah diaktifkan dengan perintah: `/radius incoming set accept=yes port=3799`.",
      "2. Periksa firewall filter rules MikroTik pada chain `input`. Pastikan port UDP 3799 tidak terblokir oleh rule drop umum.",
      "3. Pastikan `shared secret` pada menu `/radius` MikroTik sama persis dengan secret key server FreeRADIUS yang terdaftar di NADI.",
      "4. Pastikan session yang ingin diputus memang tercatat aktif di tabel radacct FreeRADIUS."
    ],
    tips: "Anda dapat memantau log autentikasi dan status paket disconnect pada menu Sesi Aktif RADIUS di Console."
  },
  {
    id: "cashier-void",
    category: "Billing & Kasir",
    question: "Bagaimana cara membatalkan (void) pembayaran kasir yang salah input?",
    badge: "Audit-Safe",
    answer: [
      "1. Buka menu Billing > Riwayat Pembayaran di Console NADI.",
      "2. Cari nomor pembayaran terkait, lalu klik tombol 'Void Pembayaran'.",
      "3. Masukkan alasan pembatalan secara rinci (misalnya: salah nominal atau salah pilih invoice pelanggan).",
      "4. Sistem NADI akan mengubah status transaksi menjadi 'void', mengembalikan sisa tagihan invoice ke nominal semula, dan mencatat aksi tersebut secara permanen ke Audit Log."
    ],
    tips: "Demi kepatuhan audit finansial, sistem NADI tidak menghapus (DELETE) data pembayaran melainkan menandainya sebagai void."
  },
  {
    id: "invoice-cycle",
    category: "Billing & Kasir",
    question: "Kapan tagihan bulanan pelanggan diterbitkan oleh sistem?",
    badge: "Idempotent Scheduler",
    answer: [
      "1. Scheduler harian otomatis memeriksa field `billing_cycle_day` dari masing-masing pelanggan setiap hari.",
      "2. Tagihan bulanan terbit otomatis lengkap dengan nomor faktur urut dan rincian harga paket langganan.",
      "3. Eksekusi ini bersifat idempotent: menjalankan scheduler berkali-kali tidak akan pernah menerbitkan invoice dobel untuk periode yang sama.",
      "4. Kasir atau admin dapat menambahkan item penyesuaian khusus (diskon, denda, sewa modem) sebelum invoice dibayarkan."
    ]
  },
  {
    id: "genieacs-wifi-limit",
    category: "FTTH & GenieACS",
    question: "Mengapa pelanggan dibatasi mengganti password WiFi maksimal 3 kali per hari?",
    badge: "Keamanan Perangkat",
    answer: [
      "1. Perubahan parameter SSID dan password WiFi dikirimkan langsung via protokol TR-069 ke flash memory modem ONT pelanggan.",
      "2. Pembatasan 3 kali per hari diterapkan untuk mencegah keausan flash memory perangkat modem akibat penulisan berlebihan (*flash write wear-out*).",
      "3. Kebijakan ini juga mencegah upaya brute-force atau keisengan yang dapat menyebabkan perangkat modem hang atau gagal booting."
    ],
    tips: "Jika pelanggan sangat membutuhkan reset di luar kuota harian, admin NOC dapat melakukan perubahan manual dari Console."
  },
  {
    id: "optical-degradation-alert",
    category: "FTTH & GenieACS",
    question: "Bagaimana sistem mendeteksi penurunan kualitas sinyal optik (RX Power)?",
    badge: "Fault Engine",
    answer: [
      "1. Sistem melakukan polling redaman optik ONU secara berkala dan membagi hasilnya ke 4 kategori status: Normal (> -22 dBm), Perhatian (-22 s/d -25 dBm), Waspada (-25 s/d -27 dBm), dan Kritis (< -27 dBm).",
      "2. Service `PredictiveDegradationService` memantau tren pergeseran sinyal selama 7 hari.",
      "3. Jika redaman optik turun lebih dari 3 dB dalam seminggu, sistem langsung memicu peringatan prediktif dan menghitung estimasi hari sebelum mencapai batas kritis (LOS)."
    ]
  },
  {
    id: "voucher-cannot-login",
    category: "Hotspot & Voucher",
    question: "Kode voucher tidak bisa login di Captive Portal MikroTik?",
    badge: "RADIUS Hotspot",
    answer: [
      "1. Buka Winbox > IP > Hotspot > Server Profiles. Klik dua kali profile hotspot yang digunakan, buka tab 'RADIUS', lalu pastikan opsi 'Use RADIUS' dicentang.",
      "2. Pada tab 'Login', pastikan metode otentikasi mencentang 'HTTP PAP' dan 'HTTP CHAP'.",
      "3. Pastikan kode voucher yang dimasukkan belum kedaluwarsa dan belum mencapai batas kuota pemakaian.",
      "4. Periksa apakah masa berlaku voucher dihitung per jam online (uptime) atau batas waktu kalender."
    ]
  },
  {
    id: "exceeding-capacity",
    category: "Akun & Kapasitas",
    question: "Bagaimana jika jumlah pelanggan aktif melebihi batas kapasitas paket saya?",
    badge: "Skalabilitas",
    answer: [
      "1. NADI tidak akan pernah memutus operasional atau koneksi pelanggan yang sedang berjalan hanya karena kapasitas terlampaui.",
      "2. Sistem memberikan toleransi kelebihan kapasitas (Grace Capacity) hingga 10% di atas kuota paket Anda.",
      "3. Anda akan menerima notifikasi pengingat di Console dan email untuk melakukan upgrade paket secara proporsional sesuai kebutuhan ekspansi jaringan Anda."
    ],
    tips: "Upgrade kapasitas berlangsung instan tanpa downtime dan sisa pembayaran bulan berjalan dihitung secara prorata (pro-rate)."
  },
  {
    id: "migration-from-old-billing",
    category: "Akun & Kapasitas",
    question: "Bagaimana cara memindahkan database pelanggan dari sistem billing lama?",
    badge: "Migrasi CSV",
    answer: [
      "1. Buka menu Pelanggan > Impor Data di Console NADI dan unduh template CSV resmi.",
      "2. Salin data pelanggan lama Anda (Nama, Nomor Kontak, Paket Layanan, Username PPPoE, Password, ODP/Alamat) ke kolom template.",
      "3. Unggah file CSV ke sistem. Sistem akan memvalidasi duplikasi username dan format data per baris sebelum menyimpan ke database.",
      "4. Jika Anda membutuhkan bantuan migrasi database skala besar (> 1.000 pelanggan), tim teknis kami siap mendampingi proses impor."
    ]
  }
];

export const helpCategories = [
  "Semua Kategori",
  "Koneksi Router & RADIUS",
  "Billing & Kasir",
  "FTTH & GenieACS",
  "Hotspot & Voucher",
  "Akun & Kapasitas"
] as const;
