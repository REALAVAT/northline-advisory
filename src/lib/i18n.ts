import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import type { Localized } from "@/data/types";

export function resolveLocale(value: string): Locale {
  if (!hasLocale(routing.locales, value)) notFound();
  return value;
}

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value[routing.defaultLocale];
}

export const intlLocale: Record<Locale, string> = {
  en: "en-US",
  es: "es-US",
};

export function formatCurrency(
  amount: number,
  locale: Locale,
  options: Intl.NumberFormatOptions = {},
) {
  return new Intl.NumberFormat(intlLocale[locale], {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    ...options,
  }).format(amount);
}

export function formatDate(
  iso: string,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = { dateStyle: "medium" },
) {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    timeZone: "UTC",
    ...options,
  }).format(new Date(`${iso}T12:00:00Z`));
}
