import type { Localized } from "./types";

export interface Guide {
  slug: string;
  file: string;
  title: Localized;
  description: Localized;
  pages: number;
  category: Localized;
}

export interface Webinar {
  slug: string;
  title: Localized;
  description: Localized;
  date: string;
  duration: number;
  presenter: string;
  upcoming: boolean;
}

export const guides: Guide[] = [
  {
    slug: "year-end-tax-checklist",
    file: "/guides/northline-year-end-tax-checklist.pdf",
    title: { en: "2026 Year-End Tax Checklist", es: "Lista de cierre fiscal 2026" },
    description: {
      en: "Twenty-five actions to take before December 31 to lower your federal and New York tax bill.",
      es: "Veinticinco acciones antes del 31 de diciembre para reducir tus impuestos federales y de Nueva York.",
    },
    pages: 12,
    category: { en: "Tax planning", es: "Planificación fiscal" },
  },
  {
    slug: "sales-tax-nexus-guide",
    file: "/guides/northline-sales-tax-nexus-guide.pdf",
    title: { en: "Sales Tax Nexus Guide for Online Sellers", es: "Guía de nexo de impuesto sobre ventas para vendedores online" },
    description: {
      en: "State-by-state economic nexus thresholds and a decision tree for registration.",
      es: "Umbrales de nexo económico por estado y un árbol de decisión para registrarte.",
    },
    pages: 18,
    category: { en: "Sales tax", es: "Impuesto sobre ventas" },
  },
  {
    slug: "monthly-close-playbook",
    file: "/guides/northline-monthly-close-playbook.pdf",
    title: { en: "The 10-Day Monthly Close Playbook", es: "Manual de cierre mensual en 10 días" },
    description: {
      en: "The exact checklist and calendar our team uses to close books by the tenth business day.",
      es: "La lista y el calendario exactos que usa nuestro equipo para cerrar antes del décimo día hábil.",
    },
    pages: 14,
    category: { en: "Bookkeeping", es: "Contabilidad" },
  },
  {
    slug: "fundraising-finance-kit",
    file: "/guides/northline-fundraising-finance-kit.pdf",
    title: { en: "Fundraising Finance Kit", es: "Kit financiero para rondas de inversión" },
    description: {
      en: "Data room index, model checklist and the metrics investors ask for at seed through Series B.",
      es: "Índice de sala de datos, lista para el modelo y las métricas que piden los inversores desde semilla hasta Serie B.",
    },
    pages: 22,
    category: { en: "Advisory", es: "Asesoría" },
  },
];

export const webinars: Webinar[] = [
  {
    slug: "q4-tax-planning-2026",
    title: { en: "Q4 Tax Planning for Growing Companies", es: "Planificación fiscal del T4 para empresas en crecimiento" },
    description: {
      en: "Bonus depreciation, PTET elections and year-end moves that still make sense in 2026.",
      es: "Depreciación adicional, elección PTET y movimientos de fin de año que siguen teniendo sentido en 2026.",
    },
    date: "2026-11-12",
    duration: 45,
    presenter: "Eleanor Whitfield",
    upcoming: true,
  },
  {
    slug: "board-reporting-that-works",
    title: { en: "Board Reporting That Actually Helps", es: "Reportes al consejo que realmente ayudan" },
    description: {
      en: "How to build a board deck in a day, and the five slides every board wants to see.",
      es: "Cómo preparar una presentación al consejo en un día y las cinco diapositivas que todo consejo quiere ver.",
    },
    date: "2026-12-03",
    duration: 60,
    presenter: "Marcus Chen",
    upcoming: true,
  },
  {
    slug: "sales-tax-after-wayfair",
    title: { en: "Sales Tax for SaaS and E-commerce", es: "Impuesto sobre ventas para SaaS y e-commerce" },
    description: {
      en: "Nexus, taxability and voluntary disclosures explained with real client examples.",
      es: "Nexo, tributación y divulgaciones voluntarias explicados con casos reales de clientes.",
    },
    date: "2026-06-18",
    duration: 50,
    presenter: "Sofía Ramírez",
    upcoming: false,
  },
];

export interface SalesTaxPreset {
  id: string;
  label: string;
  rate: number;
}

export const salesTaxPresets: SalesTaxPreset[] = [
  { id: "nyc", label: "New York City, NY", rate: 8.875 },
  { id: "nys", label: "New York State (base)", rate: 4 },
  { id: "nj", label: "New Jersey", rate: 6.625 },
  { id: "ct", label: "Connecticut", rate: 6.35 },
  { id: "la", label: "Los Angeles, CA", rate: 9.75 },
  { id: "chi", label: "Chicago, IL", rate: 10.25 },
  { id: "aus", label: "Austin, TX", rate: 8.25 },
  { id: "mia", label: "Miami, FL", rate: 7 },
  { id: "sea", label: "Seattle, WA", rate: 10.35 },
];
