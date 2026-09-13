import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return <div className="site-container py-24 text-center"><p className="eyebrow mb-4 text-primary">404</p><h1 className="section-heading mb-4">Halaman tidak ditemukan.</h1><p className="section-copy mb-8">Kembali ke beranda untuk menjelajahi NADI Billing.</p><ButtonLink href="/">KEMBALI KE BERANDA</ButtonLink></div>;
}
