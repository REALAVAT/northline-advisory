"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, CalendarClock, CircleDollarSign, FileText, ListChecks } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { deadlines, demoClient, documentCategories, documents, invoices, tasks } from "@/data/portal";
import { shiftDays, useToday } from "@/lib/demo-date";
import { formatCurrency, formatDate, pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { PortalHeader } from "./portal-header";

export interface AdvisorSummary {
  name: string;
  role: string;
  image: string;
  email: string;
}

export function DashboardView({ advisor }: { advisor: AdvisorSummary }) {
  const t = useTranslations("portal");
  const locale = useLocale() as Locale;
  const today = useToday();
  const [taskState, setTaskState] = useState(() =>
    Object.fromEntries(tasks.map((task) => [task.id, task.done])),
  );

  const upcoming = deadlines
    .filter((deadline) => deadline.offsetDays >= 0)
    .sort((a, b) => a.offsetDays - b.offsetDays);
  const next = upcoming[0];
  const outstanding = invoices
    .filter((invoice) => invoice.status !== "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const doneCount = Object.values(taskState).filter(Boolean).length;
  const recentDocs = [...documents].sort((a, b) => b.offsetDays - a.offsetDays).slice(0, 4);
  const date = (offset: number) => formatDate(shiftDays(today, offset), locale);

  const stats = [
    {
      icon: CircleDollarSign,
      label: t("outstanding"),
      value: formatCurrency(outstanding, locale),
    },
    {
      icon: CalendarClock,
      label: t("nextFiling"),
      value: next ? next.form : "—",
      detail: next ? t("daysLeft", { days: next.offsetDays }) : undefined,
    },
    {
      icon: ListChecks,
      label: t("openTasks"),
      value: String(tasks.length - doneCount),
    },
  ];

  return (
    <div>
      <PortalHeader title={t("welcome", { name: demoClient.contactFirstName })} text={t("welcomeText")} />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ icon: Icon, label, value, detail }) => (
          <li key={label} className="rounded-2xl border border-border bg-white p-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="size-4 text-gold-600" aria-hidden="true" />
              {label}
            </div>
            <p className="mt-3 text-2xl font-semibold text-navy-950 tabular-nums">{value}</p>
            {detail ? <p className="mt-1 text-sm text-gold-700">{detail}</p> : null}
          </li>
        ))}
      </ul>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-5">
        <section aria-labelledby="deadlines-title" className="rounded-2xl border border-border bg-white p-6 xl:col-span-3">
          <h2 id="deadlines-title" className="text-lg font-semibold text-navy-950">
            {t("upcomingDeadlines")}
          </h2>
          <ul className="mt-4 divide-y divide-border">
            {upcoming.map((deadline) => (
              <li key={deadline.id} className="flex items-center justify-between gap-4 py-3.5">
                <div className="min-w-0">
                  <p className="font-medium text-navy-950">{pick(deadline.title, locale)}</p>
                  <p className="text-sm text-muted-foreground">
                    {deadline.form} · <time dateTime={shiftDays(today, deadline.offsetDays)}>{date(deadline.offsetDays)}</time>
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold",
                    deadline.offsetDays <= 7 ? "bg-warning/15 text-[#7a4a00]" : "bg-navy-50 text-navy-800",
                  )}
                >
                  {t("daysLeft", { days: deadline.offsetDays })}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="tasks-title" className="rounded-2xl border border-border bg-white p-6 xl:col-span-2">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="tasks-title" className="text-lg font-semibold text-navy-950">
              {t("tasks")}
            </h2>
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {t("tasksDone", { done: doneCount, total: tasks.length })}
            </p>
          </div>
          <div
            className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy-100"
            role="progressbar"
            aria-label={t("tasks")}
            aria-valuemin={0}
            aria-valuemax={tasks.length}
            aria-valuenow={doneCount}
          >
            <div
              className="h-full rounded-full bg-gold-500 transition-[width]"
              style={{ width: `${(doneCount / tasks.length) * 100}%` }}
            />
          </div>
          <ul className="mt-4 space-y-1">
            {tasks.map((task) => (
              <li key={task.id}>
                <label className="flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-navy-50">
                  <input
                    type="checkbox"
                    checked={taskState[task.id]}
                    onChange={(event) => setTaskState((state) => ({ ...state, [task.id]: event.target.checked }))}
                    className="mt-1 size-4 shrink-0 accent-navy-900"
                  />
                  <span className="text-sm">
                    <span className={cn("block text-navy-900", taskState[task.id] && "text-muted-foreground line-through")}>
                      {pick(task.title, locale)}
                    </span>
                    <span className="text-xs text-muted-foreground">{date(task.offsetDays)}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="recent-docs-title" className="rounded-2xl border border-border bg-white p-6 xl:col-span-3">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="recent-docs-title" className="text-lg font-semibold text-navy-950">
              {t("recentDocuments")}
            </h2>
            <Link href="/portal/documents" className="text-sm font-medium text-navy-700 hover:text-navy-950 hover:underline">
              {t("viewAll")}
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {recentDocs.map((doc) => (
              <li key={doc.id} className="flex items-center gap-3 py-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                  <FileText className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-navy-950">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {pick(documentCategories[doc.category], locale)} · {date(doc.offsetDays)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="advisor-title" className="rounded-2xl bg-navy-900 p-6 text-white xl:col-span-2">
          <h2 id="advisor-title" className="text-xs font-semibold tracking-[0.14em] text-gold-300 uppercase">
            {t("advisor")}
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <Image src={advisor.image} alt="" width={56} height={56} className="size-14 rounded-full object-cover" />
            <div>
              <p className="font-semibold">{advisor.name}</p>
              <p className="text-sm text-navy-100">{advisor.role}</p>
            </div>
          </div>
          <p className="mt-4 text-sm break-all text-navy-100">{advisor.email}</p>
          <Link
            href="/portal/messages"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-50"
          >
            {t("messageAdvisor")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
