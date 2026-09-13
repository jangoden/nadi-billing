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
    ];
  },
};

export default nextConfig;
