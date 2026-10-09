"use client";

import { useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { salesTaxPresets } from "@/data/resources";
import type { Locale } from "@/i18n/routing";
import { formatCurrency } from "@/lib/i18n";
import { parseAmount } from "./parse";

const CUSTOM = "custom";

export function SalesTaxCalculator() {
  const t = useTranslations("resources.salesTax");
  const c = useTranslations("common");
  const locale = useLocale() as Locale;
  const id = useId();
  const [amount, setAmount] = useState("1250");
  const [preset, setPreset] = useState(salesTaxPresets[0].id);
  const [customRate, setCustomRate] = useState("8.875");

  const subtotal = parseAmount(amount);
  const rate =
    preset === CUSTOM
      ? Math.min(parseAmount(customRate), 100)
      : (salesTaxPresets.find((item) => item.id === preset)?.rate ?? 0);
  const tax = Math.round(subtotal * rate) / 100;
  const total = subtotal + tax;
  const money = (value: number) => formatCurrency(value, locale, { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor={`${id}-amount`}>{t("amount")}</Label>
          <Input
            id={`${id}-amount`}
            inputMode="decimal"
            autoComplete="off"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="h-11 text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-jurisdiction`}>{t("jurisdiction")}</Label>
          <select
            id={`${id}-jurisdiction`}
            value={preset}
            onChange={(event) => setPreset(event.target.value)}
            className="h-11 w-full rounded-lg border border-input bg-white px-3 text-base text-navy-950 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {salesTaxPresets.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label} ({item.rate}%)
              </option>
            ))}
            <option value={CUSTOM}>{t("custom")}</option>
          </select>
        </div>
        {preset === CUSTOM ? (
          <div className="space-y-2">
            <Label htmlFor={`${id}-rate`}>{t("rate")}</Label>
            <Input
              id={`${id}-rate`}
              inputMode="decimal"
              autoComplete="off"
              value={customRate}
              onChange={(event) => setCustomRate(event.target.value)}
              className="h-11 text-base"
            />
          </div>
        ) : null}
        <p className="text-sm leading-6 text-muted-foreground">{t("rateHint")}</p>
      </div>

      <div className="rounded-2xl bg-navy-900 p-6 text-white sm:p-8" aria-live="polite">
        <dl className="space-y-4">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-navy-100">{t("subtotal")}</dt>
            <dd className="font-medium tabular-nums">{money(subtotal)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-navy-100">
              {t("tax")} ({rate}%)
            </dt>
            <dd className="font-medium tabular-nums">{money(tax)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-t border-white/15 pt-4">
            <dt className="font-semibold">{t("total")}</dt>
            <dd className="text-3xl font-semibold text-gold-300 tabular-nums">{money(total)}</dd>
          </div>
        </dl>
        <p className="mt-6 text-xs leading-5 text-navy-100">{c("estimateOnly")}</p>
      </div>
    </div>
  );
}
