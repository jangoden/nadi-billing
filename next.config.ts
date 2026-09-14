import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      { source: "/harga", destination: "/pricing", permanent: true },
      { source: "/fitur", destination: "/features", permanent: true },
      { source: "/solusi/:slug*", destination: "/solutions/:slug*", permanent: true },
      { source: "/dokumentasi", destination: "/documentation", permanent: true },
      { source: "/integrasi", destination: "/integrations", permanent: true },
      { source: "/bantuan", destination: "/help", permanent: true },
      { source: "/solutions/billing-transaksi", destination: "/solutions/billing-transactions", permanent: true },
      { source: "/solutions/jaringan-ftth", destination: "/solutions/network-ftth", permanent: true },
      { source: "/solutions/pelanggan-cs", destination: "/solutions/customer-support", permanent: true },
      { source: "/solutions/keagenan-otomasi", destination: "/solutions/reseller-automation", permanent: true },
    ];
  },
};

export default nextConfig;
