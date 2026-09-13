import { notFound } from "next/navigation";
import { PageIntro } from "@/components/marketing/page-intro";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";
import { secondaryPages } from "@/data/secondary-pages";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return secondaryPages.map((page) => ({ slug: page.path.split("/") }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = secondaryPages.find((item) => item.path === slug.join("/"));
  if (!page) notFound();
  return pageMetadata(page.title, page.description, `/${page.path}`, true);
}

export default async function SecondaryPage({ params }: Props) {
  const { slug } = await params;
  const page = secondaryPages.find((item) => item.path === slug.join("/"));
  if (!page) notFound();
  return <>
    <PageIntro eyebrow={page.eyebrow} title={page.title} description={page.description} showDemo={false} />
    <section className="site-container pb-28" aria-label="Jelajahi NADI">
      {page.topics.length > 0 && <ul className="mx-auto mb-12 grid max-w-4xl gap-4 sm:grid-cols-3">{page.topics.map((topic) => <li key={topic} className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 text-sm font-bold text-slate-800 shadow-xs transition-all hover:border-blue-200 hover:shadow-md"><span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary"><Icon name="checkCircle" size={18} /></span><span>{topic}</span></li>)}</ul>}
      <div className="flex flex-wrap justify-center gap-4"><ButtonLink href={page.target} className="shadow-lg shadow-primary/25">{page.targetLabel}</ButtonLink><ButtonLink href="/" variant="secondary">KEMBALI KE BERANDA</ButtonLink></div>
    </section>
  </>;
}
