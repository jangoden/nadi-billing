import { HeroSection } from "@/components/sections/hero-section";
import { IntegrationStrip } from "@/components/sections/integration-strip";
import { ProblemSection } from "@/components/sections/problem-section";
import { CorePillarsSection } from "@/components/sections/core-pillars-section";
import { ModuleMatrixPreview } from "@/components/sections/module-matrix-preview";
import { VoucherSection } from "@/components/sections/voucher-section";
import { BillingSection } from "@/components/sections/billing-section";
import { NetworkIntelligenceSection } from "@/components/sections/network-intelligence-section";
import { CRMSection } from "@/components/sections/crm-section";
import { WhyNadiSection } from "@/components/sections/why-nadi-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { TrustSection } from "@/components/sections/trust-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FinalCTA } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("ISP Operating Platform", "Semua operasional ISP. Satu platform. Kelola voucher hotspot, billing, jaringan, dan CRM untuk RT/RW Net, Mini ISP, dan ISP FTTH.", "/");

export default function HomePage() {
  return <>
    <HeroSection />
    <IntegrationStrip />
    <ProblemSection />
    <CorePillarsSection />
    <ModuleMatrixPreview />
    <VoucherSection />
    <BillingSection />
    <NetworkIntelligenceSection />
    <CRMSection />
    <WhyNadiSection />
    <PricingSection />
    <TrustSection />
    <FAQSection />
    <FinalCTA />
  </>;
}
