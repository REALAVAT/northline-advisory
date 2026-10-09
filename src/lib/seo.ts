import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl, siteConfig } from "./site";

const ogLocale: Record<Locale, string> = { en: "en_US", es: "es_US" };

export function localizedPath(locale: Locale, path = "") {
  const clean = path === "/" ? "" : path;
  return `/${locale}${clean}`;
}

export function languageAlternates(path = "") {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(localizedPath(locale, path));
  }
  languages["x-default"] = absoluteUrl(localizedPath(routing.defaultLocale, path));
  return languages;
}

interface BuildMetadataInput {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
  absoluteTitle?: boolean;
  publishedTime?: string;
  authors?: string[];
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  noindex = false,
  absoluteTitle = false,
  publishedTime,
  authors,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(localizedPath(locale, path));
  const isHome = path === "" || path === "/";
  const image = {
    url: absoluteUrl(`/api/og?${new URLSearchParams(isHome ? { locale } : { locale, title })}`),
    width: 1200,
    height: 630,
    alt: isHome ? siteConfig.name : title,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: ogLocale[locale],
      images: [image],
      alternateLocale: routing.locales
        .filter((code) => code !== locale)
        .map((code) => ogLocale[code]),
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
