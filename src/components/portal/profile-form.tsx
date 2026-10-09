"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/i18n/routing";
import { demoClient } from "@/data/portal";
import { pick } from "@/lib/i18n";
import { PortalHeader } from "./portal-header";

export function ProfileForm() {
  const t = useTranslations("portal");
  const locale = useLocale() as Locale;
  const [saving, setSaving] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSaving(false);
    toast.success(t("saved"));
  }

  const company = [
    { id: "legalName", label: t("fields.legalName"), value: demoClient.legalName, autoComplete: "organization" },
    { id: "ein", label: t("fields.ein"), value: demoClient.ein, readOnly: true },
    { id: "entity", label: t("fields.entity"), value: pick(demoClient.entity, locale), readOnly: true },
    { id: "fiscalYear", label: t("fields.fiscalYear"), value: pick(demoClient.fiscalYear, locale), readOnly: true },
    { id: "address", label: t("fields.address"), value: demoClient.address, autoComplete: "street-address", wide: true },
  ];
  const contact = [
    { id: "contactName", label: t("fields.contactName"), value: demoClient.contactName, autoComplete: "name" },
    { id: "contactEmail", label: t("fields.contactEmail"), value: demoClient.contactEmail, autoComplete: "email", type: "email" },
    { id: "contactPhone", label: t("fields.contactPhone"), value: demoClient.contactPhone, autoComplete: "tel", type: "tel" },
  ];
  const notifications = [
    { id: "notifyDeadlines", label: t("notifyDeadlines"), checked: true },
    { id: "notifyDocuments", label: t("notifyDocuments"), checked: true },
    { id: "notifyInvoices", label: t("notifyInvoices"), checked: false },
  ];

  return (
    <div>
      <PortalHeader title={t("profileTitle")} text={t("profileText")} />
      <form onSubmit={onSubmit} className="space-y-6">
        <fieldset className="rounded-2xl border border-border bg-white p-6">
          <legend className="float-left w-full text-lg font-semibold text-navy-950">{t("companyDetails")}</legend>
          <div className="clear-left grid gap-5 pt-5 sm:grid-cols-2">
            {company.map((field) => (
              <div key={field.id} className={field.wide ? "space-y-2 sm:col-span-2" : "space-y-2"}>
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  name={field.id}
                  defaultValue={field.value}
                  readOnly={field.readOnly}
                  autoComplete={field.autoComplete}
                  className="h-11 text-base read-only:bg-navy-50 read-only:text-navy-700"
                />
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-border bg-white p-6">
          <legend className="float-left w-full text-lg font-semibold text-navy-950">{t("contactDetails")}</legend>
          <div className="clear-left grid gap-5 pt-5 sm:grid-cols-3">
            {contact.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  name={field.id}
                  type={field.type ?? "text"}
                  defaultValue={field.value}
                  autoComplete={field.autoComplete}
                  className="h-11 text-base"
                />
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-border bg-white p-6">
          <legend className="float-left w-full text-lg font-semibold text-navy-950">{t("notifications")}</legend>
          <div className="clear-left space-y-3 pt-4">
            {notifications.map((item) => (
              <label key={item.id} className="flex cursor-pointer items-center gap-3 text-sm text-navy-900">
                <input
                  type="checkbox"
                  name={item.id}
                  defaultChecked={item.checked}
                  className="size-4 accent-navy-900"
                />
                {item.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex justify-end">
          <Button type="submit" size="xl" disabled={saving}>
            {t("save")}
          </Button>
        </div>
      </form>
    </div>
  );
}
