import { PageIntro } from "@/components/marketing/page-intro";
import { DocViewer } from "@/components/documentation/doc-viewer";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Dokumentasi",
  "Panduan teknis dan materi dokumentasi operasional NADI Billing: konfigurasi MikroTik RouterOS, protokol RADIUS AAA, CoA session disconnect, dan manajemen billing ISP.",
  "/documentation",
  true
);

export default function DocumentationPage() {
  return (
    <>
      <PageIntro
        eyebrow="DOKUMENTASI SISTEM"
        title="Panduan Teknis & Integrasi NADI"
        description="Pelajari konfigurasi awal, integrasi router MikroTik RouterOS, protokol RADIUS/CoA, manajemen billing ISP, dan telemetri FTTH."
        showDemo={false}
      />
      <DocViewer />
    </>
  );
}
