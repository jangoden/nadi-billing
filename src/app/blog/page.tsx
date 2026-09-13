import { PageIntro } from "@/components/marketing/page-intro";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Blog & Insight",
  "Kumpulan artikel, studi kasus, panduan routing MikroTik, dan strategi operasional ISP di Indonesia.",
  "/blog",
  true
);

export default function BlogPage() {
  return (
    <>
      <PageIntro
        eyebrow="BLOG & INSIGHT"
        title="Wawasan Praktis Operasional ISP"
        description="Pelajari praktik terbaik optimasi MikroTik, otomatisasi billing, telemetri FTTH, dan strategi peningkatan pendapatan bisnis jaringan Anda."
        showDemo={false}
      />
      <BlogExplorer />
    </>
  );
}
