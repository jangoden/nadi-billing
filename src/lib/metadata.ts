import type { Metadata } from "next";

export function publicOrigin(): URL | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("NEXT_PUBLIC_SITE_URL must use http or https");
  return new URL(url.origin);
}

export function pageMetadata(title: string, description: string, path: string, noIndex = false): Metadata {
  const origin = publicOrigin();
  const url = origin ? new URL(path, origin) : undefined;
  return {
    title: { absolute: `${title} | NADI Billing` }, description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: { title: `${title} | NADI Billing`, description, type: "website", locale: "id_ID", siteName: "NADI Billing", ...(url ? { url } : {}) },
    twitter: { card: "summary", title, description },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
