import type { IconName, Localized, TimelineEntry } from "./types";

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  key: "clients" | "years" | "retention" | "savings";
}

export const stats: Stat[] = [
  { key: "clients", value: 600, suffix: "+" },
  { key: "years", value: 15 },
  { key: "retention", value: 97, suffix: "%" },
  { key: "savings", value: 18, prefix: "$", suffix: "M" },
];

export const trustBadges: { label: string; detail: Localized; icon: IconName }[] = [
  { label: "AICPA", detail: { en: "Member firm", es: "Firma miembro" }, icon: "award" },
  { label: "NYSSCPA", detail: { en: "Member firm", es: "Firma miembro" }, icon: "badge" },
  { label: "IRS e-file", detail: { en: "Authorized provider", es: "Proveedor autorizado" }, icon: "shield" },
  { label: "QuickBooks", detail: { en: "ProAdvisor Elite", es: "ProAdvisor Elite" }, icon: "book" },
  { label: "Xero", detail: { en: "Gold Partner", es: "Socio Gold" }, icon: "trending" },
  { label: "SOC 2", detail: { en: "Aligned processes", es: "Procesos alineados" }, icon: "lock" },
];

export const whyItems = [
  { key: "senior", icon: "users" },
  { key: "pricing", icon: "wallet" },
  { key: "speed", icon: "clock" },
  { key: "security", icon: "lock" },
] as const satisfies readonly { key: string; icon: IconName }[];

export const values = [
  { key: "clarity", icon: "scale" },
  { key: "ownership", icon: "badge" },
  { key: "integrity", icon: "shield" },
  { key: "craft", icon: "award" },
] as const satisfies readonly { key: string; icon: IconName }[];

export const timeline: TimelineEntry[] = [
  {
    year: 2011,
    title: { en: "Founded on Lexington Avenue", es: "Fundada en Lexington Avenue" },
    text: {
      en: "Eleanor Whitfield opens Northline with three clients and a promise of on-time monthly closes.",
      es: "Eleanor Whitfield abre Northline con tres clientes y la promesa de cierres mensuales puntuales.",
    },
  },
  {
    year: 2014,
    title: { en: "Sales tax practice launched", es: "Nace el área de impuesto sobre ventas" },
    text: {
      en: "We launch a dedicated multi-state sales tax team for the first wave of e-commerce clients.",
      es: "Lanzamos un equipo dedicado al impuesto sobre ventas multiestatal para la primera ola de clientes de e-commerce.",
    },
  },
  {
    year: 2016,
    title: { en: "Fractional CFO practice", es: "Área de CFO fraccional" },
    text: {
      en: "Marcus Chen joins as partner to lead advisory and fractional CFO services.",
      es: "Marcus Chen se une como socio para dirigir la asesoría y los servicios de CFO fraccional.",
    },
  },
  {
    year: 2019,
    title: { en: "Move to East 45th Street", es: "Traslado a East 45th Street" },
    text: {
      en: "A larger Midtown office next to Grand Central for a team of 25.",
      es: "Una oficina más grande en Midtown, junto a Grand Central, para un equipo de 25 personas.",
    },
  },
  {
    year: 2022,
    title: { en: "Client portal and automation", es: "Portal de clientes y automatización" },
    text: {
      en: "We launch the Northline client portal and automate reconciliations for every client.",
      es: "Lanzamos el portal de clientes de Northline y automatizamos las conciliaciones de todos los clientes.",
    },
  },
  {
    year: 2026,
    title: { en: "600+ clients nationwide", es: "Más de 600 clientes en todo el país" },
    text: {
      en: "A team of 40+ serving companies in 38 states, still independent and senior-led.",
      es: "Un equipo de más de 40 personas que atiende empresas en 38 estados, aún independiente y dirigido por sénior.",
    },
  },
];
