import type { NavigationLink } from "@/types/marketing";

export const solutions: NavigationLink[] = [
  {
    label: "RT/RW Net",
    href: "/solutions/rt-rw-net",
    icon: "hub",
    description: "Otomasi voucher, MikroTik & tagihan warga",
  },
  {
    label: "Mini ISP",
    href: "/solutions/mini-isp",
    icon: "router",
    description: "Billing otomatis & ekosistem reseller",
  },
  {
    label: "ISP FTTH",
    href: "/solutions/isp-ftth",
    icon: "network",
    description: "Radar gangguan 3-level & GenieACS TR-069",
  },
  {
    label: "Hotspot & Voucher",
    href: "/solutions/hotspot-voucher",
    icon: "store",
    description: "Cetak batch cepat & jaringan keagenan",
  },
];

export const resources: NavigationLink[] = [
  {
    label: "Dokumentasi",
    href: "/documentation",
    icon: "book",
    description: "Panduan setup & konfigurasi lengkap",
  },
  {
    label: "Integrasi",
    href: "/integrations",
    icon: "sync",
    description: "Koneksi MikroTik, FreeRADIUS, ACS & OLT",
  },
  {
    label: "Blog & Insight",
    href: "/blog",
    icon: "chat",
    description: "Artikel & strategi operasional ISP",
  },
  {
    label: "Pusat Bantuan",
    href: "/help",
    icon: "support",
    description: "Layanan teknis & panduan troubleshooting",
  },
  {
    label: "API Developer",
    href: "/developers",
    icon: "code",
    description: "Protokol standar industri & integrasi",
  },
];

export const footerGroups = [
  {
    label: "Produk",
    links: [
      { label: "Fitur", href: "/features" },
      { label: "Harga", href: "/pricing" },
      { label: "Demo", href: "/demo" },
    ],
  },
  {
    label: "Solusi",
    links: solutions,
  },
  {
    label: "Sumber Daya",
    links: resources,
  },
  {
    label: "Jelajahi NADI",
    links: [
      { label: "Tentang Platform", href: "/#why-nadi" },
      { label: "Dukungan", href: "/#support" },
      { label: "Pertanyaan Umum", href: "/#faq" },
    ],
  },
];
