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
        title="Kapasitas fleksibel sesuai skala kebutuhan Anda."
        description="Pilih tingkatan kapasitas pelanggan aktif yang tepat untuk skala operasional ISP Anda."
        showDemo={false}
      />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
