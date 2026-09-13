import { PageIntro } from "@/components/marketing/page-intro";
import { PricingSection } from "@/components/sections/pricing-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FinalCTA } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Harga & Kapasitas",
  "Semua fitur NADI Billing tersedia di setiap paket. Pilih kapasitas berdasarkan jumlah pelanggan aktif Anda.",
  "/pricing"
);

export default function PricingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Harga NADI Billing"
        title="Semua fitur. Kapasitas sesuai kebutuhan."
        description="Semua fitur tersedia di setiap paket. Anda hanya membayar berdasarkan jumlah pelanggan aktif."
        showDemo={false}
      />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
