import { PageIntro } from "@/components/marketing/page-intro";
import { CorePillarsSection } from "@/components/sections/core-pillars-section";
import { VoucherSection } from "@/components/sections/voucher-section";
import { BillingSection } from "@/components/sections/billing-section";
import { NetworkIntelligenceSection } from "@/components/sections/network-intelligence-section";
import { CRMSection } from "@/components/sections/crm-section";
import { FinalCTA } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Fitur",
  "Jelajahi Voucher & Payment, Billing & Finance, Network Intelligence, dan CRM dalam satu platform operasional ISP.",
  "/features"
);

export default function FeaturesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Fitur NADI Billing"
        title="Semua operasional ISP, saling terhubung."
        description="Jual. Tagih. Pantau. Pertahankan. Empat pilar NADI membantu menghubungkan bisnis, jaringan, dan pelanggan Anda."
      />
      <CorePillarsSection />
      <VoucherSection />
      <BillingSection />
      <NetworkIntelligenceSection />
      <CRMSection />
      <FinalCTA />
    </>
  );
}
