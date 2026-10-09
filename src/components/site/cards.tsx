import Image from "next/image";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import type { Industry, PriceUnit, Service, TeamMember, Testimonial } from "@/data/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatCurrency, pick } from "@/lib/i18n";
import { Icon } from "./icon";

export interface PriceLabels {
  from: string;
  units: Record<PriceUnit, string>;
}

export function PriceTag({
  amount,
  unit,
  locale,
  labels,
  className,
}: {
  amount: number;
  unit: PriceUnit;
  locale: Locale;
  labels: PriceLabels;
  className?: string;
}) {
  return (
    <p className={className}>
      <span className="text-sm text-muted-foreground">{labels.from} </span>
      <span className="font-semibold text-navy-950">{formatCurrency(amount, locale)}</span>
      <span className="text-sm text-muted-foreground">
        {unit === "project" ? ` ${labels.units.project}` : labels.units[unit]}
      </span>
    </p>
  );
}

export function ServiceCard({
  service,
  locale,
  labels,
  learnMore,
}: {
  service: Service;
  locale: Locale;
  labels: PriceLabels;
  learnMore: string;
}) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(11,31,58,0.04)] transition-all hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-[0_12px_32px_-12px_rgba(11,31,58,0.18)]">
      <span className="flex size-11 items-center justify-center rounded-xl bg-navy-900 text-gold-300">
        <Icon name={service.icon} className="size-5" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-navy-950">
        <Link
          href={`/services/${service.slug}`}
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
        >
          {pick(service.title, locale)}
        </Link>
      </h3>
      <p className="mt-2 flex-1 leading-7 text-muted-foreground">{pick(service.summary, locale)}</p>
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <PriceTag amount={service.priceFrom} unit={service.priceUnit} locale={locale} labels={labels} />
        <span className="flex items-center gap-1 text-sm font-medium text-navy-700 group-hover:text-navy-950">
          <span className="sr-only sm:not-sr-only">{learnMore}</span>
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}

export function IndustryCard({ industry, locale }: { industry: Industry; locale: Locale }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-white">
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
        <Image
          src={industry.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
        <span className="absolute bottom-4 left-4 flex size-10 items-center justify-center rounded-lg bg-white/95 text-navy-900">
          <Icon name={industry.icon} className="size-5" />
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-navy-950">
          <Link
            href={`/industries/${industry.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {pick(industry.title, locale)}
          </Link>
        </h3>
        <p className="mt-2 leading-7 text-muted-foreground">{pick(industry.summary, locale)}</p>
      </div>
    </article>
  );
}

export function TeamCard({
  member,
  locale,
  priority = false,
}: {
  member: TeamMember;
  locale: Locale;
  priority?: boolean;
}) {
  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy-100">
        <Image
          src={member.image}
          alt={member.name}
          fill
          preload={priority}
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="mt-4 text-base font-semibold text-navy-950">
        <Link href={`/team/${member.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {member.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{pick(member.role, locale)}</p>
    </article>
  );
}

export function TestimonialCard({ testimonial, locale }: { testimonial: Testimonial; locale: Locale }) {
  const ratingLabel = locale === "es" ? `${testimonial.rating} de 5 estrellas` : `${testimonial.rating} out of 5 stars`;
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-white p-7">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5" role="img" aria-label={ratingLabel}>
          {Array.from({ length: testimonial.rating }).map((_, index) => (
            <Star key={index} className="size-4 fill-gold-500 text-gold-500" aria-hidden="true" />
          ))}
        </div>
        <Quote className="size-6 text-navy-100" aria-hidden="true" />
      </div>
      <blockquote className="mt-5 flex-1 text-[1.02rem] leading-7 text-navy-800">
        “{pick(testimonial.quote, locale)}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <span
          aria-hidden="true"
          className="flex size-10 items-center justify-center rounded-full bg-navy-900 text-sm font-semibold text-gold-300"
        >
          {testimonial.name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </span>
        <span>
          <span className="block text-sm font-semibold text-navy-950">{testimonial.name}</span>
          <span className="block text-sm text-muted-foreground">
            {pick(testimonial.role, locale)}, {testimonial.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
