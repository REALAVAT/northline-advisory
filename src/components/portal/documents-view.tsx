"use client";

import { useId, useRef, useState } from "react";
import { Download, FileText, Search, UploadCloud, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import type { Locale } from "@/i18n/routing";
import { documentCategories, documents, type DocumentCategory } from "@/data/portal";
import { shiftDays, useToday } from "@/lib/demo-date";
import { formatDate, pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { PortalHeader } from "./portal-header";

function formatSize(kb: number) {
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB`;
}

export function DocumentsView() {
  const t = useTranslations("portal");
  const locale = useLocale() as Locale;
  const today = useToday();
  const id = useId();
  const fileInput = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DocumentCategory | "all">("all");
  const [dragging, setDragging] = useState(false);
  const [pending, setPending] = useState<{ name: string; size: number }[]>([]);

  const normalized = query.trim().toLowerCase();
  const visible = [...documents]
    .sort((a, b) => b.offsetDays - a.offsetDays)
    .filter((doc) => category === "all" || doc.category === category)
    .filter((doc) => !normalized || doc.name.toLowerCase().includes(normalized));

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = Array.from(list).map((file) => ({ name: file.name, size: file.size / 1024 }));
    setPending((current) => [...current, ...next]);
  }

  const categories = Object.keys(documentCategories) as DocumentCategory[];

  return (
    <div>
      <PortalHeader title={t("documentsTitle")} text={t("documentsText")} />

      <section aria-labelledby={`${id}-upload`} className="rounded-2xl border border-border bg-white p-6">
        <h2 id={`${id}-upload`} className="text-lg font-semibold text-navy-950">
          {t("uploadTitle")}
        </h2>
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            addFiles(event.dataTransfer.files);
          }}
          className={cn(
            "mt-4 flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors",
            dragging ? "border-gold-500 bg-gold-50" : "border-navy-200 bg-navy-50/50",
          )}
        >
          <UploadCloud className="size-8 text-navy-500" aria-hidden="true" />
          <p className="mt-3 max-w-sm text-sm text-navy-800">{t("uploadText")}</p>
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="mt-4 rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
          >
            {t("browse")}
          </button>
          <input
            ref={fileInput}
            type="file"
            multiple
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            onChange={(event) => {
              addFiles(event.target.files);
              event.target.value = "";
            }}
          />
        </div>
        {pending.length > 0 ? (
          <div className="mt-4" aria-live="polite">
            <p className="text-sm font-medium text-navy-950">{t("uploadPreview")}</p>
            <ul className="mt-2 space-y-2">
              {pending.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2"
                >
                  <span className="flex min-w-0 items-center gap-2 text-sm">
                    <FileText className="size-4 shrink-0 text-navy-500" aria-hidden="true" />
                    <span className="truncate text-navy-900">{file.name}</span>
                    <span className="shrink-0 text-muted-foreground">{formatSize(file.size)}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setPending((current) => current.filter((_, i) => i !== index))}
                    className="flex size-8 shrink-0 items-center justify-center rounded-md text-navy-600 hover:bg-navy-50"
                    aria-label={t("remove", { name: file.name })}
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">{t("uploadDemo")}</p>
          </div>
        ) : null}
      </section>

      <section aria-labelledby={`${id}-list`} className="mt-6 rounded-2xl border border-border bg-white p-6">
        <h2 id={`${id}-list`} className="sr-only">
          {t("documentsTitle")}
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-navy-500" aria-hidden="true" />
            <label htmlFor={`${id}-search`} className="sr-only">
              {t("searchDocuments")}
            </label>
            <Input
              id={`${id}-search`}
              type="search"
              placeholder={t("searchDocuments")}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-10 pl-9 text-base sm:text-sm"
            />
          </div>
          <label htmlFor={`${id}-category`} className="sr-only">
            {t("category")}
          </label>
          <select
            id={`${id}-category`}
            value={category}
            onChange={(event) => setCategory(event.target.value as DocumentCategory | "all")}
            className="h-10 rounded-lg border border-input bg-white px-3 text-sm text-navy-950 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <option value="all">{t("allCategories")}</option>
            {categories.map((key) => (
              <option key={key} value={key}>
                {pick(documentCategories[key], locale)}
              </option>
            ))}
          </select>
        </div>

        {visible.length === 0 ? (
          <p className="py-10 text-center text-muted-foreground">{t("noDocuments")}</p>
        ) : (
          <div className="relative mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <caption className="sr-only">{t("documentsTitle")}</caption>
              <thead className="border-b border-border text-xs tracking-wide text-muted-foreground uppercase">
                <tr>
                  <th scope="col" className="py-3 pr-4 font-medium">{t("name")}</th>
                  <th scope="col" className="py-3 pr-4 font-medium">{t("category")}</th>
                  <th scope="col" className="py-3 pr-4 font-medium">{t("date")}</th>
                  <th scope="col" className="py-3 pr-4 font-medium">{t("size")}</th>
                  <th scope="col" className="py-3 text-right font-medium">
                    <span className="sr-only">{t("actions")}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {visible.map((doc) => (
                  <tr key={doc.id}>
                    <td className="py-3 pr-4">
                      <span className="flex items-center gap-2 font-medium text-navy-950">
                        <FileText className="size-4 shrink-0 text-navy-500" aria-hidden="true" />
                        {doc.name}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-navy-800">{pick(documentCategories[doc.category], locale)}</td>
                    <td className="py-3 pr-4 whitespace-nowrap text-navy-800">
                      {formatDate(shiftDays(today, doc.offsetDays), locale)}
                    </td>
                    <td className="py-3 pr-4 whitespace-nowrap text-navy-800 tabular-nums">{formatSize(doc.sizeKb)}</td>
                    <td className="py-3 text-right">
                      <a
                        href="/portal/sample.pdf"
                        download={doc.name}
                        className="inline-flex size-9 items-center justify-center rounded-lg text-navy-700 hover:bg-navy-50 hover:text-navy-950"
                        aria-label={`${t("downloadPdf")}: ${doc.name}`}
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
        )}
      </section>
    </div>
  );
}
