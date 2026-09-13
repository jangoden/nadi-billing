import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return <Link href="/" aria-label="NADI Billing — Beranda" className="inline-flex shrink-0 rounded-lg">
    <Image src="/images/nadi-logo.svg" alt="NADI Billing" width={200} height={48} className="h-10 w-auto sm:h-12" priority />
  </Link>;
}
