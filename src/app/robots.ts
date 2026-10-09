import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: routing.locales.map((locale) => `/${locale}/portal`),
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
