export const mainNav = [
  { key: "services", href: "/services" },
  { key: "industries", href: "/industries" },
  { key: "about", href: "/about" },
  { key: "insights", href: "/insights" },
  { key: "resources", href: "/resources" },
  { key: "contact", href: "/contact" },
] as const;

export const companyNav = [
  { key: "about", href: "/about" },
  { key: "team", href: "/team" },
  { key: "industries", href: "/industries" },
  { key: "locations", href: "/locations" },
  { key: "contact", href: "/contact" },
] as const;

export const resourcesNav = [
  { key: "insights", href: "/insights" },
  { key: "resources", href: "/resources" },
  { key: "portal", href: "/portal" },
] as const;

export type NavKey =
  | (typeof mainNav)[number]["key"]
  | (typeof companyNav)[number]["key"]
  | (typeof resourcesNav)[number]["key"];
