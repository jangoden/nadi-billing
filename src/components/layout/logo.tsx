import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" aria-label="NADI Billing — Beranda" className="inline-flex shrink-0 items-center rounded-lg transition-opacity hover:opacity-90">
      <Image
        src="/images/logo/logo-nadi.png"
        alt="NADI Billing"
        width={1944}
        height={740}
        className="h-8 w-auto sm:h-9 md:h-10 object-contain"
        priority
      />
    </Link>
  );
}
