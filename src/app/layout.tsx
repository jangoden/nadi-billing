import type { Metadata } from "next";
import { Geist, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { publicOrigin } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
  metadataBase: publicOrigin(),
  title: { default: "NADI Billing — ISP Operating Platform", template: "%s | NADI Billing" },
  description: "Semua operasional ISP. Satu platform. Voucher, billing, keuangan, jaringan, dan CRM untuk RT/RW Net, Mini ISP, ISP FTTH, serta hotspot.",
  applicationName: "NADI Billing",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id" className={`${inter.variable} ${jakarta.variable} ${geist.variable}`}>
    <body className="antialiased">
      <a href="#main-content" className="sr-only z-[100] rounded-lg bg-white p-4 text-primary focus:not-sr-only focus:fixed focus:top-4 focus:left-4">Lewati ke konten utama</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <Footer />
    </body>
  </html>;
}
