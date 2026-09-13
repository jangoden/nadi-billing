import { DemoExplorer } from "@/components/marketing/demo-explorer";
import { PageIntro } from "@/components/marketing/page-intro";
import { capacityOptions, demoFlows } from "@/data/demo";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Demo Alur Operasional", "Jelajahi simulasi alur voucher, billing, jaringan, dan pelanggan NADI Billing.", "/demo");

export default async function DemoPage({ searchParams }: { searchParams: Promise<{ alur?: string; kapasitas?: string }> }) {
  const params = await searchParams;
  const flow = demoFlows.find((item) => item.id === params.alur)?.id ?? "voucher";
  const capacity = capacityOptions.find((item) => item === params.kapasitas);
  const demoUrl = process.env.NADI_DEMO_URL;
  const validDemoUrl = demoUrl && /^https?:\/\//i.test(demoUrl) ? new URL(demoUrl).href : undefined;

  return <>
    <PageIntro eyebrow="Jelajahi NADI" title="Lihat bagaimana semuanya terhubung." description="Coba simulasi alur voucher, billing, jaringan, dan pelanggan. Pilih alur, lalu ikuti setiap langkahnya." showDemo={false} />
    <section className="site-container pb-28" aria-label="Simulasi alur operasional">
      {capacity && <p className="mx-auto mb-6 max-w-4xl rounded-2xl border border-blue-200/80 bg-blue-50/90 p-4 text-sm font-medium text-primary shadow-xs">Kapasitas pilihan: <strong>{capacity === "Custom" ? "Custom" : `${capacity} pelanggan aktif`}</strong>. Semua fitur termasuk.</p>}
      <DemoExplorer initialFlow={flow} key={flow} />
      <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-slate-600">Simulasi ini menggambarkan alur kerja NADI. Tidak memproses pembayaran, mengirim pesan, atau mengakses jaringan dan data pelanggan.</p>
      {validDemoUrl && <div className="mt-8 text-center"><a href={validDemoUrl} className="button button-primary shadow-lg shadow-primary/25">BUKA DEMO APLIKASI</a></div>}
    </section>
  </>;
}

