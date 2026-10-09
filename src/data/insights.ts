import type { Localized } from "./types";

export const insightCategories = {
  tax: { en: "Tax planning", es: "Planificación fiscal" },
  compliance: { en: "Compliance", es: "Cumplimiento" },
  accounting: { en: "Accounting", es: "Contabilidad" },
  advisory: { en: "Advisory", es: "Asesoría" },
} satisfies Record<string, Localized>;

export type InsightCategory = keyof typeof insightCategories;

export const insightCategoryKeys = Object.keys(insightCategories) as InsightCategory[];
