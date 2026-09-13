import { PageIntro } from "@/components/marketing/page-intro";
import { HelpCenter } from "@/components/help/help-center";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Pusat Bantuan & Dukungan",
  "Pusat bantuan dan panduan operasional NADI Billing: panduan router MikroTik, konfigurasi RADIUS, arsitektur layanan, dan saluran konsultasi teknis.",
  "/help",
  true
);

export default function HelpPage() {
  return (
    <>
      <PageIntro
        eyebrow="DUKUNGAN & BANTUAN TEKNIS"
        title="Pusat Bantuan NADI Billing"
        description="Temukan solusi cepat kendala operasional, panduan konfigurasi jaringan MikroTik/RADIUS, dan saluran konsultasi langsung dengan tim NADI."
        showDemo={false}
      />
      <HelpCenter />
    </>
  );
}
