export interface BlogPost {
  slug: string;
  title: string;
  category: "Jaringan & MikroTik" | "Finansial & Billing" | "FTTH & Optik" | "Voucher & Hotspot" | "Strategi Bisnis" | "Regulasi & Pajak";
  date: string;
  readTime: string;
  imageUrl: string;
  imageAlt: string;
  author: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  summary: string;
  content: string[];
  keyTakeaways: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "optimasi-bandwidth-isolir-mikrotik-coa",
    title: "Optimasi Bandwidth & Mekanisme Pemutusan Sesi MikroTik via RADIUS CoA",
    category: "Jaringan & MikroTik",
    date: "10 September 2026",
    readTime: "6 menit baca",
    imageUrl: "/images/blog/mikrotik-bandwidth.jpg",
    imageAlt: "Server rack pusat data dengan kabel fiber optik dan routing MikroTik",
    author: {
      name: "Budi Hartanto",
      role: "Network Infrastructure Specialist",
      avatarInitials: "BH"
    },
    featured: true,
    summary: "Bagaimana integrasi FreeRADIUS CoA port 3799 mengelola pemutusan sesi bermasalah secara instan tanpa membebani CPU router MikroTik Anda.",
    content: [
      "Bagi pengelola ISP atau RT/RW Net dengan ratusan pelanggan PPPoE, mengelola sesi aktif secara manual adalah beban operasional tersendiri. Mengubah profile secret atau memutus user satu per satu di Winbox memakan waktu dan berisiko salah klik.",
      "Solusi standar industri adalah menggunakan mekanisme RADIUS CoA (Change of Authorization / RFC 3576). Ketika operator perlu memutus sesi gantung atau sesi bermasalah langsung dari dashboard, NADI mengirimkan Packet of Disconnect (PoD) ke port UDP 3799 MikroTik Anda.",
      "MikroTik langsung memutus sesi PPP pelanggan dalam waktu kurang dari 1 detik. Saat perangkat router pelanggan melakukan dial ulang, FreeRADIUS secara otomatis memberikan alokasi IP baru dan profile kecepatan sesuai paket aktif.",
      "Proses ini berjalan mulus tanpa teknisi perlu login manual ke router dan tanpa perlu melakukan restart BRAS yang dapat mengganggu pelanggan lain."
    ],
    keyTakeaways: [
      "Pemutusan sesi bermasalah bekerja instan dari dashboard Console tanpa login Winbox.",
      "Tidak ada penumpukan script scheduler lokal di MikroTik yang sering menyebabkan lonjakan CPU.",
      "Integrasi berbasis protokol standar RFC 3576 yang stabil untuk RouterOS v6 maupun v7."
    ]
  },
  {
    slug: "mencegah-churn-pelanggan-radar-gangguan-3level",
    title: "Mencegah Churn Pelanggan dengan Mesin Lokalisasi Gangguan 3-Level",
    category: "FTTH & Optik",
    date: "05 September 2026",
    readTime: "6 menit baca",
    imageUrl: "/images/blog/ftth-telemetry.jpg",
    imageAlt: "Teknisi mengukur optical power meter pada titik distribusi fiber optik ODP",
    author: {
      name: "Siti Rahma",
      role: "Head of Product & Operations",
      avatarInitials: "SR"
    },
    featured: false,
    summary: "Strategi menekan angka churn pelanggan ISP dengan mendeteksi dan melokalisasi kabel putus sebelum pelanggan sempat menelepon komplain.",
    content: [
      "Penyebab utama pelanggan berpindah ke ISP lain (churn) adalah gangguan jaringan yang berulang dan penanganan teknis yang lambat. Seringkali teknisi menghabiskan waktu berjam-jam hanya untuk mencari di mana titik kabel fiber yang putus.",
      "NADI Fault Detection Engine memecahkan masalah ini dengan algoritma lokalisasi 3-level berbasis pola korelasi redaman optik:",
      "1. Level 1 (Dropcore): Jika hanya 1 pelanggan di suatu ODP yang padam, sistem menyimpulkan kabel drop rumah putus dan teknisi diarahkan langsung ke lokasi pelanggan.",
      "2. Level 2 (Distribusi ODP): Jika seluruh pelanggan di ODP yang sama padam serentak, sistem menyimpulkan kabel distribusi dari ODC putus.",
      "3. Level 3 (Cascading Hulu): Jika beberapa ODP berurutan padam, sistem mengarahkan pemeriksaan ke kabel feeder utama atau port PON OLT.",
      "Berdasarkan uji implementasi topologi FTTH di lapangan, lokalisasi gangguan otomatis dapat memangkas Mean Time to Detect (MTTD) dan Mean Time to Repair (MTTR) secara signifikan, menjaga loyalitas pelanggan tetap tinggi."
    ],
    keyTakeaways: [
      "Akar masalah jaringan terisolasi secara otomatis tanpa penelusuran manual di lapangan.",
      "Tiket tugas teknisi darurat langsung terbuat seketika saat insiden terdeteksi.",
      "Laporan SLA (MTTD/MTTR) mencatat kecepatan respons tim secara objektif."
    ]
  },
  {
    slug: "mengurangi-beban-cs-self-service-wifi-tr069",
    title: "Mengurangi Beban CS Lapangan Lewat Fitur Self-Service WiFi TR-069",
    category: "Strategi Bisnis",
    date: "28 Agustus 2026",
    readTime: "5 menit baca",
    imageUrl: "/images/blog/allinone-billing.svg",
    imageAlt: "Diagram portal mandiri pelanggan dan kontrol TR-069 GenieACS",
    author: {
      name: "Arif Wicaksono",
      role: "Optical & TR-069 Specialist",
      avatarInitials: "AW"
    },
    featured: false,
    summary: "Bagaimana integrasi GenieACS memungkinkan pelanggan mengubah password WiFi dan restart modem sendiri tanpa membebani staf CS.",
    content: [
      "Hampir 40% tiket keluhan harian yang masuk ke tim Customer Service ISP UMKM berkisar pada dua hal sepele: 'Minta tolong ganti password WiFi' dan 'Minta tolong restart modem dari pusat'.",
      "NADI Billing menghadirkan solusi cerdas dengan menghubungkan Portal Pelanggan langsung ke server GenieACS via protokol TR-069 (CWMP).",
      "Pelanggan dapat login ke portal mandiri mereka dari ponsel, mengganti nama SSID, memasukkan password baru, atau me-restart perangkat modem ONT mereka sendiri tanpa perlu menunggu balasan admin.",
      "Untuk menjaga keawetan flash memory perangkat ONT dan mencegah serangan iseng, sistem membatasi pergantian password maksimal 3 kali per hari. Seluruh perubahan tercatat rapi di CPE Audit Log."
    ],
    keyTakeaways: [
      "Beban tiket CS untuk permintaan pergantian password berkurang drastis.",
      "Pelanggan merasa lebih berdaya dengan kendali mandiri atas modem mereka.",
      "Perlindungan batas 3x/hari menjaga modem dari kerusakan flash memory."
    ]
  },
  {
    slug: "billing-all-in-one-vs-software-terpisah",
    title: "Mengapa Platform All-in-One Lebih Hemat Dibanding 4 Software Berlangganan Terpisah",
    category: "Strategi Bisnis",
    date: "20 Agustus 2026",
    readTime: "5 menit baca",
    imageUrl: "/images/blog/allinone-billing.svg",
    imageAlt: "Diagram dashboard all-in-one terpadu penghematan biaya operasional ISP",
    author: {
      name: "Deni Prasetyo",
      role: "CEO & Co-founder NADI",
      avatarInitials: "DP"
    },
    featured: false,
    summary: "Kalkulasi perbandingan biaya total (TCO) antara mengelola tools terpisah vs satu sistem operasional ISP terpadu.",
    content: [
      "Dalam operasional ISP konvensional, manajemen sering kali harus membayar biaya langganan ke banyak software terpisah: tools billing mandiri, server RADIUS terpisah, aplikasi teknisi lapangan pihak ketiga, dan spreadsheet pencatatan kasir manual.",
      "Selain biaya bulanan yang membengkak, masalah terbesar adalah ketidaksinkronan data: data pelanggan di spreadsheet berbeda dengan username di MikroTik, dan status pembayaran di buku kas tidak cocok dengan sesi aktif RADIUS.",
      "NADI Billing didesain dengan konsep satu ekosistem: Billing Otomatis, FreeRADIUS AAA, Manajemen MikroTik, GenieACS TR-069, Fault Engine, dan 4 Portal terintegrasi dalam satu database terpadu.",
      "Pendekatan all-in-one ini menghemat biaya pengadaan aplikasi terpisah dan mengeliminasi redundansi entri data manual lintas divisi operasional."
    ],
    keyTakeaways: [
      "Eliminasi masalah integrasi dan ketidaksinkronan data antar software yang berbeda.",
      "Satu biaya transparan berbasis kapasitas pelanggan aktif tanpa batasan fitur.",
      "Seluruh divisi (NOC, Kasir, CS, Teknisi, dan Agen) bekerja di sistem yang sama."
    ]
  },
  {
    slug: "membangun-ekosistem-reseller-komisi-transparan",
    title: "Membangun Ekosistem Kemitraan Reseller ISP dengan Skema Komisi Transparan",
    category: "Voucher & Hotspot",
    date: "14 Agustus 2026",
    readTime: "5 menit baca",
    imageUrl: "/images/blog/hotspot-voucher.svg",
    imageAlt: "Ilustrasi captive portal mandiri dan kartu voucher hotspot otomatis",
    author: {
      name: "Eko Prasojo",
      role: "Hotspot & Commercial Specialist",
      avatarInitials: "EP"
    },
    featured: false,
    summary: "Strategi melipatgandakan omset penjualan voucher dan loket tagihan melalui jaringan agen lokal dengan sistem dompet deposit dan komisi otomatis.",
    content: [
      "Membuka kantor cabang baru membutuhkan biaya sewa dan staf yang tinggi bagi ISP skala berkembang. Alternatif terbaik yang jauh lebih menguntungkan adalah bermitra dengan warung, konter pulsa, dan tokoh warga lokal sebagai Agen Reseller.",
      "NADI Billing memfasilitasi model kemitraan ini melalui Portal Agen khusus (`/agent/*`):",
      "1. Agen melakukan top-up saldo deposit ke rekening kasir ISP Anda.",
      "2. Agen dapat mencetak voucher hotspot secara mandiri atau melayani pembayaran tagihan bulanan tetangga sekitar menggunakan saldo mereka.",
      "3. Sistem secara otomatis menghitung komisi agen (baik persentase seperti 10% atau nominal flat seperti Rp 2.500 per transaksi) seketika transaksi terjadi.",
      "Transparansi ini membuat mitra agen semakin bersemangat memasarkan layanan ISP Anda tanpa rasa curiga atas komisi yang mereka dapatkan."
    ],
    keyTakeaways: [
      "Ekspansi jangkauan penjualan voucher dan titik loket bayar tanpa biaya sewa cabang.",
      "Sistem dompet deposit mencegah piutang macet pada mitra agen.",
      "Skema komisi otomatis membangun loyalitas dan motivasi jaringan mitra."
    ]
  },
  {
    slug: "panduan-pajak-ppn-isp-indonesia",
    title: "Panduan Lengkap Penerapan PPN pada Tagihan Internet ISP",
    category: "Regulasi & Pajak",
    date: "02 Agustus 2026",
    readTime: "8 menit baca",
    imageUrl: "/images/blog/tax-compliance.svg",
    imageAlt: "Format resmi faktur pajak dan invoice kepatuhan PPN untuk bisnis ISP",
    author: {
      name: "Dewi Lestari",
      role: "Tax & Compliance Consultant",
      avatarInitials: "DL"
    },
    featured: false,
    summary: "Aspek legalitas, pemisahan Dasar Pengenaan Pajak (DPP), dan format faktur resmi untuk kepatuhan perpajakan ISP.",
    content: [
      "Seiring berkembangnya skala usaha ISP atau penyedia jasa internet, kepatuhan terhadap regulasi perpajakan seperti Pajak Pertambahan Nilai (PPN) menjadi aspek krusial untuk menghindari sanksi administratif.",
      "NADI Billing memfasilitasi pencetakan invoice yang memisahkan antara nilai Dasar Pengenaan Pajak (DPP) dengan nominal PPN secara jelas dan transparan.",
      "Pengelola ISP dapat menentukan skema harga inklusif (harga paket sudah termasuk PPN) atau eksklusif (PPN ditambahkan pada subtotal tagihan) secara fleksibel.",
      "Laporan rekonsiliasi bulanan NADI siap diekspor untuk memudahkan pelaporan SPT Masa PPN ke Direktorat Jenderal Pajak tanpa perlu perhitungan manual di spreadsheet."
    ],
    keyTakeaways: [
      "Invoice memenuhi standar dokumentasi komersial dan pemisahan DPP/PPN yang rapi.",
      "Dukungan multi-tarif pajak memudahkan adaptasi jika terjadi penyesuaian regulasi tarif PPN.",
      "Rekapitulasi omzet dan PPN terutang tersedia otomatis di menu laporan finansial."
    ]
  }
];

export const blogCategories = [
  "Semua Artikel",
  "Jaringan & MikroTik",
  "Finansial & Billing",
  "FTTH & Optik",
  "Voucher & Hotspot",
  "Strategi Bisnis",
  "Regulasi & Pajak"
] as const;
