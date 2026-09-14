import { PageIntro } from "@/components/marketing/page-intro";
import { ModuleDirectory } from "@/components/marketing/module-directory";
import { CorePillarsSection } from "@/components/sections/core-pillars-section";
import { VoucherSection } from "@/components/sections/voucher-section";
import { BillingSection } from "@/components/sections/billing-section";
import { NetworkIntelligenceSection } from "@/components/sections/network-intelligence-section";
import { CRMSection } from "@/components/sections/crm-section";
import { FinalCTA } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Direktori Modul & Fitur",
  "Eksplorasi 12 kelompok modul operasional ISP NADI Billing: Core Jaringan, FTTH GIS & Inventaris, Billing, Toko Online, CS Desk, hingga TR-069.",
  "/features"
);

export default function FeaturesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Direktori Fitur & Modul"
        title="Operasional Lengkap ISP Terpadu"
        description="Eksplorasi lengkap seluruh kapabilitas NADI Billing: dari routing MikroTik, RADIUS AAA, pemetaan GIS & inventaris gudang, hingga CS desk terintegrasi."
      />
      <ModuleDirectory />
      <CorePillarsSection />
      <VoucherSection />
      <BillingSection />
      <NetworkIntelligenceSection />
      <CRMSection />
      <FinalCTA />
    </>
  );
}
