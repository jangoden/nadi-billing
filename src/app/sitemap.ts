import type { MetadataRoute } from "next";
import { publicOrigin } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = publicOrigin();
  if (!origin) return [];
  return ["/", "/features", "/pricing", "/demo"].map((path) => ({ url: new URL(path, origin).href }));
}
