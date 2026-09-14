import type { MetadataRoute } from "next";
import { publicOrigin } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = publicOrigin();
  if (!origin) return [];
  return [
    "/",
    "/features",
    "/pricing",
    "/demo",
    "/blog",
    "/solutions/network-ftth",
    "/solutions/billing-transactions",
    "/solutions/customer-support",
    "/solutions/reseller-automation",
  ].map((path) => ({ url: new URL(path, origin).href }));
}
