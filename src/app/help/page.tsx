import { PageIntro } from "@/components/marketing/page-intro";
import { HelpCenter } from "@/components/help/help-center";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Pusat Bantuan & Dukungan",
  "Pusat bantuan dan dukungan teknis NADI Billing: troubleshooting router MikroTik, status layanan, WhatsApp support, dan tiket kendala jaringan.",
  "/help",
  true
);

export default function HelpPage() {
  return (
    <>
      <PageIntro
        eyebrow="DUKUNGAN & BANTUAN TEKNIS"
        title="Pusat Bantuan NADI Billing"
        description="Temukan solusi cepat kendala operasional, status layanan real-time, panduan pemecahan masalah, dan saluran bantuan langsung dari tim teknisi NADI."
        showDemo={false}
      />
      <HelpCenter />
    </>
  );
}
