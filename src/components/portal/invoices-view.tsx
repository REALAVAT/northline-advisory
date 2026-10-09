"use client";

import { CreditCard, Download } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import type { Locale } from "@/i18n/routing";
import { invoices, type InvoiceStatus } from "@/data/portal";
import { shiftDays, useToday } from "@/lib/demo-date";
import { formatCurrency, formatDate, pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { PortalHeader } from "./portal-header";

const statusStyles: Record<InvoiceStatus, string> = {
  paid: "bg-success/10 text-[#13663a]",
  due: "bg-warning/15 text-[#7a4a00]",
  overdue: "bg-destructive/10 text-destructive",
};

export function InvoicesView() {
  const t = useTranslations("portal");
  const locale = useLocale() as Locale;
  const today = useToday();

  const totalPaid = invoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0);
  const totalDue = invoices.filter((inv) => inv.status !== "paid").reduce((sum, inv) => sum + inv.amount, 0);
  const money = (value: number) => formatCurrency(value, locale);
  const date = (offset: number) => formatDate(shiftDays(today, offset), locale);
  const statusLabel: Record<InvoiceStatus, string> = {
    paid: t("paid"),
    due: t("unpaid"),
    overdue: t("overdueStatus"),
  };

  return (
    <div>
      <PortalHeader title={t("invoicesTitle")} text={t("invoicesText")} />

      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-5">
          <dt className="text-sm text-muted-foreground">{t("totalPaid")}</dt>
          <dd className="mt-2 text-2xl font-semibold text-navy-950 tabular-nums">{money(totalPaid)}</dd>
        </div>
        <div className="flex items-end justify-between gap-4 rounded-2xl bg-navy-900 p-5 text-white">
          <div>
            <dt className="text-sm text-navy-100">{t("totalDue")}</dt>
            <dd className="mt-2 text-2xl font-semibold text-gold-300 tabular-nums">{money(totalDue)}</dd>
          </div>
          {totalDue > 0 ? (
            <button
              type="button"
              onClick={() => toast(t("payDemo"))}
              className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400"
            >
              <CreditCard className="size-4" aria-hidden="true" />
              {t("payNow")}
            </button>
          ) : null}
        </div>
      </dl>

      <section aria-label={t("invoicesTitle")} className="mt-6 rounded-2xl border border-border bg-white p-6">
        <ul className="divide-y divide-border md:hidden">
          {invoices.map((inv) => (
            <li key={inv.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-navy-950">{inv.number}</span>
                <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", statusStyles[inv.status])}>
                  {statusLabel[inv.status]}
                </span>
              </div>
              <p className="mt-1 text-sm text-navy-800">{pick(inv.description, locale)}</p>
              <div className="mt-2 flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">
                  {t("due")}: {date(inv.dueOffset)}
                </span>
                <span className="font-semibold text-navy-950 tabular-nums">{money(inv.amount)}</span>
              </div>
              <a
                href="/portal/sample.pdf"
                download={`${inv.number}.pdf`}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-navy-700 hover:underline"
              >
                <Download className="size-4" aria-hidden="true" />
                {t("downloadPdf")}
                <span className="sr-only">: {inv.number}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="relative hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">{t("invoicesTitle")}</caption>
            <thead className="border-b border-border text-xs tracking-wide text-muted-foreground uppercase">
              <tr>
                <th scope="col" className="py-3 pr-4 font-medium">{t("invoice")}</th>
                <th scope="col" className="py-3 pr-4 font-medium">{t("issued")}</th>
                <th scope="col" className="py-3 pr-4 font-medium">{t("due")}</th>
                <th scope="col" className="py-3 pr-4 text-right font-medium">{t("amount")}</th>
                <th scope="col" className="py-3 pr-4 font-medium">{t("status")}</th>
                <th scope="col" className="py-3 text-right font-medium">
                  <span className="sr-only">{t("actions")}</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="py-3.5 pr-4">
                    <span className="block font-semibold text-navy-950">{inv.number}</span>
                    <span className="block max-w-xs truncate text-muted-foreground">{pick(inv.description, locale)}</span>
                  </td>
                  <td className="py-3.5 pr-4 whitespace-nowrap text-navy-800">{date(inv.issuedOffset)}</td>
                  <td className="py-3.5 pr-4 whitespace-nowrap text-navy-800">{date(inv.dueOffset)}</td>
                  <td className="py-3.5 pr-4 text-right font-medium text-navy-950 tabular-nums">{money(inv.amount)}</td>
                  <td className="py-3.5 pr-4">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", statusStyles[inv.status])}>
                      {statusLabel[inv.status]}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <a
                      href="/portal/sample.pdf"
                      download={`${inv.number}.pdf`}
                      className="inline-flex size-9 items-center justify-center rounded-lg text-navy-700 hover:bg-navy-50 hover:text-navy-950"
                      aria-label={`${t("downloadPdf")}: ${inv.number}`}
                      title={t("downloadPdf")}
                    >
                      <Download className="size-4" aria-hidden="true" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
