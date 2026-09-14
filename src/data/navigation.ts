import type { NavigationLink } from "@/types/marketing";

export const solutions: NavigationLink[] = [
  {
    label: "Jaringan & FTTH",
    href: "/solutions/network-ftth",
    icon: "network",
    description: "MikroTik, RADIUS, GIS, Fault Engine & TR-069",
  },
  {
    label: "Billing & Transaksi",
    href: "/solutions/billing-transactions",
    icon: "receipt",
    description: "Tagihan bulanan, kasir aman, voucher & toko online",
  },
  {
    label: "Pelanggan & CS Desk",
    href: "/solutions/customer-support",
    icon: "support",
    description: "CRM 360°, deteksi churn, tiket & antrian live chat",
  },
  {
    label: "Keagenan & Otomasi",
    href: "/solutions/reseller-automation",
    icon: "wallet",
    description: "Mitra reseller, deposit komisi, broadcast & RBAC",
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
