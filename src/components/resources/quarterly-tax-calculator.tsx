"use client";

import { useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/i18n/routing";
import { formatCurrency, formatDate, intlLocale } from "@/lib/i18n";
import { estimateQuarterly, QUARTERLY_DUE_DATES_2026, type FilingStatus } from "@/lib/tax";
import { parseAmount } from "./parse";

export function QuarterlyTaxCalculator() {
  const t = useTranslations("resources.quarterly");
  const c = useTranslations("common");
  const locale = useLocale() as Locale;
  const id = useId();
  const [income, setIncome] = useState("180000");
  const [expenses, setExpenses] = useState("42000");
  const [status, setStatus] = useState<FilingStatus>("single");

  const result = estimateQuarterly(parseAmount(income), parseAmount(expenses), status);
  const money = (value: number) => formatCurrency(value, locale);
  const percent = new Intl.NumberFormat(intlLocale[locale], { style: "percent", maximumFractionDigits: 1 });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor={`${id}-income`}>{t("income")}</Label>
          <Input
            id={`${id}-income`}
            inputMode="decimal"
            autoComplete="off"
            value={income}
            onChange={(event) => setIncome(event.target.value)}
            className="h-11 text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-expenses`}>{t("expenses")}</Label>
          <Input
            id={`${id}-expenses`}
            inputMode="decimal"
            autoComplete="off"
            value={expenses}
            onChange={(event) => setExpenses(event.target.value)}
            className="h-11 text-base"
          />
        </div>
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-navy-950">{t("filingStatus")}</legend>
          <div className="grid grid-cols-2 gap-2">
            {(["single", "married"] as const).map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-input px-3 py-2.5 text-sm text-navy-900 has-[:checked]:border-navy-900 has-[:checked]:bg-navy-50 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50"
              >
                <input
                  type="radio"
                  name={`${id}-status`}
                  value={option}
                  checked={status === option}
                  onChange={() => setStatus(option)}
                  className="size-4 accent-navy-900"
                />
                {t(option)}
              </label>
            ))}
          </div>
        </fieldset>
        <p className="text-sm leading-6 text-muted-foreground">{t("assumptions")}</p>
      </div>

      <div className="rounded-2xl bg-navy-900 p-6 text-white sm:p-8" aria-live="polite">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-navy-100">{t("netIncome")}</dt>
            <dd className="tabular-nums">{money(result.netIncome)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-navy-100">{t("seTax")}</dt>
            <dd className="tabular-nums">{money(result.seTax)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-navy-100">{t("incomeTax")}</dt>
            <dd className="tabular-nums">{money(result.incomeTax)}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-white/15 pt-3">
            <dt className="font-semibold">{t("annualTotal")}</dt>
            <dd className="font-semibold tabular-nums">{money(result.annualTotal)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-navy-100">{t("effectiveRate")}</dt>
            <dd className="tabular-nums">{percent.format(result.effectiveRate)}</dd>
          </div>
        </dl>
        <div className="mt-6 rounded-xl bg-white/5 p-4">
          <p className="text-sm text-navy-100">{t("perQuarter")}</p>
          <p className="mt-1 text-3xl font-semibold text-gold-300 tabular-nums">{money(result.perQuarter)}</p>
          <h4 className="mt-4 text-xs font-semibold tracking-[0.14em] text-navy-100 uppercase">{t("dueDates")}</h4>
          <ol className="mt-2 grid grid-cols-2 gap-2 text-sm">
            {QUARTERLY_DUE_DATES_2026.map((date, index) => (
              <li key={date} className="flex justify-between gap-2 rounded-lg bg-white/5 px-3 py-2">
                <span className="text-navy-100">Q{index + 1}</span>
                <time dateTime={date} className="tabular-nums">
                  {formatDate(date, locale, { month: "short", day: "numeric", year: "numeric" })}
                </time>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-6 text-xs leading-5 text-navy-100">{c("estimateOnly")}</p>
      </div>
    </div>
  );
}
