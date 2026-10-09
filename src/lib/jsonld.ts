import type {
  Article,
  BreadcrumbList,
  FAQPage,
  Person,
  Service,
  WithContext,
} from "schema-dts";
import { office } from "@/data/office";
import type { FaqItem } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { pick } from "./i18n";
import { localizedPath } from "./seo";
import { absoluteUrl, siteConfig, siteUrl } from "./site";

const organizationId = `${siteUrl}/#organization`;
const businessId = `${siteUrl}/#accounting-service`;

export function organizationGraph(locale: Locale, description: string) {
  const address = {
    "@type": "PostalAddress",
    streetAddress: office.street,
    addressLocality: office.locality,
    addressRegion: office.region,
    postalCode: office.postalCode,
    addressCountry: office.country,
  };

  const openingHours = office.hours
    .filter((entry) => "opens" in entry && entry.opens)
    .map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${entry.schemaDay}`,
      opens: "opens" in entry ? entry.opens : undefined,
      closes: "closes" in entry ? entry.closes : undefined,
    }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: absoluteUrl(localizedPath(locale)),
        logo: absoluteUrl("/icon.svg"),
        email: siteConfig.email,
        telephone: siteConfig.phone,
        foundingDate: String(siteConfig.foundingYear),
        address,
        sameAs: [siteConfig.social.linkedin, siteConfig.social.x],
      },
      {
        "@type": ["AccountingService", "ProfessionalService"],
        "@id": businessId,
        name: siteConfig.name,
        description,
        url: absoluteUrl(localizedPath(locale)),
        image: absoluteUrl(`/${locale}/opengraph-image`),
        telephone: siteConfig.phone,
        email: siteConfig.email,
        priceRange: "$$$",
        currenciesAccepted: "USD",
        address,
        geo: {
          "@type": "GeoCoordinates",
          latitude: office.latitude,
          longitude: office.longitude,
        },
        areaServed: { "@type": "Country", name: "United States" },
        openingHoursSpecification: openingHours,
        parentOrganization: { "@id": organizationId },
        knowsLanguage: ["en", "es"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteConfig.name,
        inLanguage: locale,
        publisher: { "@id": organizationId },
      },
    ],
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  items: { name: string; path: string }[],
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localizedPath(locale, item.path)),
    })),
  };
}

export function faqJsonLd(locale: Locale, faqs: FaqItem[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: pick(faq.question, locale),
      acceptedAnswer: { "@type": "Answer", text: pick(faq.answer, locale) },
    })),
  };
}

export function serviceJsonLd(input: {
  locale: Locale;
  path: string;
  name: string;
  description: string;
  price: number;
}): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(localizedPath(input.locale, input.path)),
    serviceType: input.name,
    areaServed: { "@type": "Country", name: "United States" },
    provider: { "@id": businessId },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: input.price,
    },
  };
}

export function articleJsonLd(input: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorPath: string;
  keywords: string[];
}): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: [input.image],
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: input.locale,
    mainEntityOfPage: absoluteUrl(localizedPath(input.locale, input.path)),
    keywords: input.keywords.join(", "),
    author: {
      "@type": "Person",
      name: input.authorName,
      url: absoluteUrl(localizedPath(input.locale, input.authorPath)),
    },
    publisher: { "@id": organizationId },
  };
}

export function personJsonLd(input: {
  locale: Locale;
  path: string;
  name: string;
  jobTitle: string;
  image: string;
  email: string;
}): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    jobTitle: input.jobTitle,
    image: input.image,
    email: input.email,
    url: absoluteUrl(localizedPath(input.locale, input.path)),
    worksFor: { "@id": organizationId },
  };
}
