import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = Record<Locale, T>;

export type IconName =
  | "landmark"
  | "receipt"
  | "book"
  | "building"
  | "shield"
  | "chart"
  | "cloud"
  | "cart"
  | "briefcase"
  | "health"
  | "house"
  | "rocket"
  | "users"
  | "clock"
  | "lock"
  | "badge"
  | "scale"
  | "wallet"
  | "award"
  | "trending";

export type ServiceSlug =
  | "corporate-tax"
  | "sales-tax-compliance"
  | "bookkeeping-payroll"
  | "business-formation"
  | "audit-support"
  | "fractional-cfo";

export type IndustrySlug =
  | "saas"
  | "e-commerce"
  | "professional-services"
  | "healthcare"
  | "real-estate"
  | "startups";

export type PriceUnit = "month" | "year" | "project";

export interface FaqItem {
  question: Localized;
  answer: Localized;
}

export interface ProcessStep {
  title: Localized;
  text: Localized;
}

export interface Service {
  slug: ServiceSlug;
  icon: IconName;
  image: string;
  title: Localized;
  summary: Localized;
  overview: Localized<string[]>;
  included: Localized<string[]>;
  idealFor: Localized<string[]>;
  process: ProcessStep[];
  priceFrom: number;
  priceUnit: PriceUnit;
  faqs: FaqItem[];
  related: ServiceSlug[];
}

export interface Industry {
  slug: IndustrySlug;
  icon: IconName;
  image: string;
  title: Localized;
  summary: Localized;
  intro: Localized;
  challenges: Localized<string[]>;
  solutions: Localized<string[]>;
  metrics: Localized<string[]>;
  services: ServiceSlug[];
}

export interface TeamMember {
  slug: string;
  name: string;
  role: Localized;
  image: string;
  bio: Localized<string[]>;
  shortBio: Localized;
  specialties: Localized<string[]>;
  credentials: string[];
  education: Localized<string[]>;
  languages: Localized<string[]>;
  email: string;
  leadership: boolean;
}

export interface Testimonial {
  quote: Localized;
  name: string;
  role: Localized;
  company: string;
  rating: number;
}

export interface TimelineEntry {
  year: number;
  title: Localized;
  text: Localized;
}
