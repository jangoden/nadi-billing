import { PageIntro } from "@/components/marketing/page-intro";
import { DocViewer } from "@/components/documentation/doc-viewer";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Dokumentasi",
  "Panduan teknis dan materi dokumentasi operasional NADI Billing: konfigurasi MikroTik, RADIUS AAA, isolir otomatis, dan payment gateway.",
  "/documentation",
  true
);

export default function DocumentationPage() {
  return (
    <>
      <PageIntro
        eyebrow="DOKUMENTASI SISTEM"
        title="Panduan Teknis & Integrasi NADI"
        description="Pelajari konfigurasi awal, integrasi router MikroTik RouterOS, protokol RADIUS/CoA, manajemen billing, dan payment gateway."
        showDemo={false}
      />
      <DocViewer />
    </>
  );
}
