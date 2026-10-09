const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (productionHost
    ? `https://${productionHost}`
    : "https://accounting.ahmadkhajeh.com")
).replace(/\/$/, "");

export const siteConfig = {
  name: "Northline Advisory",
  legalName: "Northline Advisory LLC",
  shortName: "Northline",
  foundingYear: 2011,
  copyrightYear: 2026,
  email: "hello@northlineadvisory.com",
  phone: "+1 (212) 555-0148",
  phoneHref: "+12125550148",
  whatsapp: "12125550148",
  author: {
    name: "Ahmad Khajeh",
    url: "https://ahmadkhajeh.com",
  },
  social: {
    linkedin: "https://www.linkedin.com/",
    x: "https://x.com/",
  },
} as const;

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
