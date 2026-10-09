"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check, CircleCheck, Loader2, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm, type FieldPath } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const sizes = ["pre", "small", "mid", "large", "enterprise"] as const;
const timelines = ["now", "month", "quarter", "exploring"] as const;

const schema = z.object({
  services: z.array(z.string()).min(1, "services"),
  name: z.string().trim().min(2, "name"),
  email: z.email("email"),
  phone: z.string().trim().optional(),
  company: z.string().trim().min(2, "company"),
  industry: z.string().min(1, "industry"),
  size: z.enum(sizes, { message: "size" }),
  message: z.string().trim().min(20, "message"),
  timeline: z.enum(timelines, { message: "timeline" }),
  consent: z.boolean().refine((value) => value, "consent"),
});

type FormValues = z.input<typeof schema>;
type ErrorKey = "services" | "name" | "email" | "company" | "industry" | "size" | "message" | "timeline" | "consent";

const stepFields: FieldPath<FormValues>[][] = [
  ["services"],
  ["name", "email", "phone", "company", "industry", "size"],
  ["message", "timeline", "consent"],
];

interface Option {
  slug: string;
  label: string;
  description?: string;
}

function createReference() {
  const digits = new Uint32Array(1);
  crypto.getRandomValues(digits);
  return `NLA-2026-${String(digits[0] % 1_000_000).padStart(6, "0")}`;
}

const fieldClass = "h-11 text-base";
const selectClass =
  "h-11 w-full rounded-lg border border-input bg-white px-3 text-base text-navy-950 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none aria-invalid:border-destructive";

export function ContactWizard({ services, industries }: { services: Option[]; industries: Option[] }) {
  const t = useTranslations("contact");
  const c = useTranslations("common");
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState<{ reference: string; email: string } | null>(null);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      services: [],
      name: "",
      email: "",
      phone: "",
      company: "",
      industry: "",
      message: "",
      consent: false,
    },
    shouldFocusError: true,
  });

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service");
    if (requested && services.some((service) => service.slug === requested)) {
      setValue("services", [requested]);
    }
  }, [services, setValue]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    stepHeading.current?.focus();
  }, [step]);

  useEffect(() => {
    if (submitted) successHeading.current?.focus();
  }, [submitted]);

  const errorText = (key?: string) => (key ? t(`errors.${key as ErrorKey}`) : undefined);
  const stepLabels = [t("steps.service"), t("steps.company"), t("steps.message")];
  const legends = [t("serviceLegend"), t("companyLegend"), t("messageLegend")];

  async function next() {
    const valid = await trigger(stepFields[step], { shouldFocus: true });
    if (valid) setStep((current) => Math.min(current + 1, stepFields.length - 1));
  }

  async function onSubmit(values: FormValues) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitted({ reference: createReference(), email: values.email });
  }

  function startOver() {
    reset();
    setSubmitted(null);
    setStep(0);
  }

  if (submitted) {
    const whatsapp = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
      `${t("successReference")}: ${submitted.reference}`,
    )}`;
    return (
      <div className="rounded-3xl border border-border bg-white p-6 text-center sm:p-12" role="status">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
          <CircleCheck className="size-8" aria-hidden="true" />
        </span>
        <h2
          ref={successHeading}
          tabIndex={-1}
          className="mt-6 text-2xl font-semibold text-navy-950 focus:outline-none sm:text-3xl"
        >
          {t("successTitle")}
        </h2>
        <p className="mx-auto mt-4 max-w-md leading-7 text-muted-foreground">
          {t("successText", { reference: submitted.reference, email: submitted.email })}
        </p>
        <p className="mx-auto mt-6 w-fit rounded-xl bg-navy-50 px-5 py-3">
          <span className="block text-xs font-semibold tracking-[0.14em] text-navy-700 uppercase">
            {t("successReference")}
          </span>
          <span className="mt-1 block font-mono text-xl font-semibold text-navy-950">{submitted.reference}</span>
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="xl" className="bg-[#1f8f4e] hover:bg-[#1a7a43]">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" />
              {c("whatsapp")}
            </a>
          </Button>
          <Button type="button" size="xl" variant="outline" onClick={startOver}>
            {t("successAgain")}
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{t("demoNote")}</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-border bg-white p-6 sm:p-10"
    >
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          {t("stepOf", { current: step + 1, total: stepFields.length })}
        </p>
        <ol className="mt-4 grid grid-cols-3 gap-2">
          {stepLabels.map((label, index) => (
            <li key={label} aria-current={index === step ? "step" : undefined}>
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-colors",
                  index <= step ? "bg-navy-900" : "bg-navy-100",
                )}
              />
              <span
                className={cn(
                  "mt-2 flex items-center gap-1.5 text-xs font-medium sm:text-sm",
                  index === step ? "text-navy-950" : "text-muted-foreground",
                )}
              >
                {index < step ? <Check className="size-3.5 text-success" aria-hidden="true" /> : null}
                {label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <fieldset className="mt-10">
        <legend className="w-full">
          <h2 ref={stepHeading} tabIndex={-1} className="text-2xl font-semibold text-navy-950 focus:outline-none">
            {legends[step]}
          </h2>
          {step === 0 ? <span className="mt-1 block text-muted-foreground">{t("serviceHint")}</span> : null}
        </legend>

        {step === 0 ? (
          <div className="mt-6">
            <div
              className="grid gap-3 sm:grid-cols-2"
              aria-describedby={errors.services ? "services-error" : undefined}
            >
              {services.map((service) => (
                <label
                  key={service.slug}
                  className="flex cursor-pointer gap-3 rounded-xl border border-input p-4 transition-colors hover:border-navy-300 has-[:checked]:border-navy-900 has-[:checked]:bg-navy-50 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50"
                >
                  <input
                    type="checkbox"
                    value={service.slug}
                    {...register("services")}
                    aria-invalid={errors.services ? true : undefined}
                    className="mt-1 size-4 shrink-0 accent-navy-900"
                  />
                  <span>
                    <span className="block font-medium text-navy-950">{service.label}</span>
                    {service.description ? (
                      <span className="mt-1 block text-sm leading-5 text-muted-foreground">
                        {service.description}
                      </span>
                    ) : null}
                  </span>
                </label>
              ))}
            </div>
            <FieldError id="services-error" message={errorText(errors.services?.message)} />
          </div>
        ) : null}

        {step === 1 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field id="name" label={t("fields.name")} error={errorText(errors.name?.message)}>
              <Input id="name" autoComplete="name" className={fieldClass} {...register("name")} {...invalid("name", errors.name)} />
            </Field>
            <Field id="email" label={t("fields.email")} error={errorText(errors.email?.message)}>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                className={fieldClass}
                {...register("email")}
                {...invalid("email", errors.email)}
              />
            </Field>
            <Field id="phone" label={t("fields.phone")} optional={c("optional")}>
              <Input id="phone" type="tel" autoComplete="tel" className={fieldClass} {...register("phone")} />
            </Field>
            <Field id="company" label={t("fields.company")} error={errorText(errors.company?.message)}>
              <Input
                id="company"
                autoComplete="organization"
                className={fieldClass}
                {...register("company")}
                {...invalid("company", errors.company)}
              />
            </Field>
            <Field id="industry" label={t("fields.industry")} error={errorText(errors.industry?.message)}>
              <select id="industry" className={selectClass} {...register("industry")} {...invalid("industry", errors.industry)}>
                <option value="">{t("fields.selectPlaceholder")}</option>
                {industries.map((industry) => (
                  <option key={industry.slug} value={industry.slug}>
                    {industry.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="size" label={t("fields.size")} error={errorText(errors.size?.message)}>
              <select id="size" className={selectClass} defaultValue="" {...register("size")} {...invalid("size", errors.size)}>
                <option value="" disabled>
                  {t("fields.selectPlaceholder")}
                </option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {t(`sizes.${size}`)}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="mt-6 space-y-6">
            <Field id="message" label={t("fields.message")} error={errorText(errors.message?.message)}>
              <Textarea
                id="message"
                rows={6}
                placeholder={t("fields.messagePlaceholder")}
                className="min-h-36 text-base"
                {...register("message")}
                {...invalid("message", errors.message)}
              />
            </Field>
            <fieldset aria-describedby={errors.timeline ? "timeline-error" : undefined}>
              <legend className="text-sm font-medium text-navy-950">{t("fields.timeline")}</legend>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {timelines.map((timeline) => (
                  <label
                    key={timeline}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-input px-3 py-2.5 text-sm text-navy-900 has-[:checked]:border-navy-900 has-[:checked]:bg-navy-50 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50"
                  >
                    <input
                      type="radio"
                      value={timeline}
                      {...register("timeline")}
                      className="size-4 shrink-0 accent-navy-900"
                    />
                    {t(`timelines.${timeline}`)}
                  </label>
                ))}
              </div>
              <FieldError id="timeline-error" message={errorText(errors.timeline?.message)} />
            </fieldset>
            <div>
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-navy-800">
                <input
                  type="checkbox"
                  {...register("consent")}
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                  className="mt-1 size-4 shrink-0 accent-navy-900"
                />
                {t("fields.consent")}
              </label>
              <FieldError id="consent-error" message={errorText(errors.consent?.message)} />
            </div>
          </div>
        ) : null}
      </fieldset>

      <div className="mt-10 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <Button type="button" variant="ghost" size="xl" onClick={() => setStep((current) => current - 1)}>
            <ArrowLeft aria-hidden="true" />
            {c("back")}
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">{t("demoNote")}</p>
        )}
        {step < stepFields.length - 1 ? (
          <Button type="button" size="xl" onClick={next}>
            {c("next")}
            <ArrowRight aria-hidden="true" />
          </Button>
        ) : (
          <Button type="submit" size="xl" variant="gold" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" aria-hidden="true" /> : null}
            {isSubmitting ? t("sending") : t("send")}
          </Button>
        )}
      </div>
    </form>
  );
}

function invalid(id: string, error: unknown) {
  return error ? { "aria-invalid": true, "aria-describedby": `${id}-error` } : {};
}

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {optional ? <span className="font-normal text-muted-foreground">({optional})</span> : null}
      </Label>
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-destructive">
      {message}
    </p>
  );
}
