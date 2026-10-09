import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { TeamCard } from "@/components/site/cards";
import { JsonLd } from "@/components/site/json-ld";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Section } from "@/components/site/section";
import { getTeamMember, team } from "@/data/team";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { pick, resolveLocale } from "@/lib/i18n";
import { breadcrumbJsonLd, personJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const instant = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => team.map((member) => ({ locale, slug: member.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/team/[slug]">): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = resolveLocale(raw);
  const member = getTeamMember(slug);
  if (!member) return {};
  return buildMetadata({
    locale,
    path: `/team/${member.slug}`,
    title: `${member.name}, ${pick(member.role, locale)}`,
    description: pick(member.shortBio, locale),
    type: "profile",
  });
}

export default async function TeamMemberPage({ params }: PageProps<"/[locale]/team/[slug]">) {
  const { locale: raw, slug } = await params;
  const locale = resolveLocale(raw);
  const member = getTeamMember(slug);
  if (!member) notFound();

  const [t, c] = await Promise.all([
    getTranslations({ locale, namespace: "team" }),
    getTranslations({ locale, namespace: "common" }),
  ]);
  const path = `/team/${member.slug}`;
  const crumbs = [
    { name: c("home"), path: "/" },
    { name: t("title"), path: "/team" },
    { name: member.name, path },
  ];
  const others = team.filter((item) => item.slug !== member.slug).slice(0, 3);
  const firstName = member.name.split(" ")[0];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, crumbs)} />
      <JsonLd
        data={personJsonLd({
          locale,
          path,
          name: member.name,
          jobTitle: pick(member.role, locale),
          image: member.image,
          email: member.email,
        })}
      />
      <section className="border-b border-border bg-navy-50/60">
        <div className="container-page py-12 lg:py-16">
          <Breadcrumbs items={crumbs} label={c("breadcrumb")} />
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-navy-100 sm:max-w-sm lg:col-span-4 lg:max-w-none">
              <Image
                src={member.image}
                alt={member.name}
                fill
                preload
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 384px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-8">
              <p className="eyebrow">{pick(member.role, locale)}</p>
              <h1 className="mt-3 text-4xl font-semibold text-navy-950 sm:text-5xl">{member.name}</h1>
              <p className="mt-5 text-xl leading-8 text-navy-800">{pick(member.shortBio, locale)}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="xl">
                  <Link href="/contact">
                    {t("contactPerson", { name: firstName })}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="outline">
                  <a href={`mailto:${member.email}`}>
                    <Mail aria-hidden="true" />
                    {member.email}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 text-lg leading-8 text-navy-800 lg:col-span-7">
            {pick(member.bio, locale).map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <dl className="space-y-6 rounded-2xl border border-border bg-white p-6 lg:col-span-5">
            <div>
              <dt className="text-sm font-semibold text-navy-950">{t("specialties")}</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {pick(member.specialties, locale).map((item) => (
                  <span key={item} className="rounded-full bg-navy-50 px-3 py-1 text-sm text-navy-800">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-navy-950">{t("credentials")}</dt>
              <dd className="mt-2 text-navy-800">{member.credentials.join(" · ")}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-navy-950">{t("education")}</dt>
              <dd className="mt-2 space-y-1 text-navy-800">
                {pick(member.education, locale).map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-navy-950">{t("languages")}</dt>
              <dd className="mt-2 text-navy-800">{pick(member.languages, locale).join(", ")}</dd>
            </div>
          </dl>
        </div>
      </Section>

      <Section tone="muted" labelledBy="more-team">
        <div className="flex items-end justify-between gap-4">
          <h2 id="more-team" className="text-2xl font-semibold text-navy-950 sm:text-3xl">
            {t("otherMembers")}
          </h2>
          <Link href="/team" className="text-sm font-medium text-navy-700 underline-offset-4 hover:underline">
            {t("allTeam")}
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3">
          {others.map((item) => (
            <li key={item.slug}>
              <TeamCard member={item} locale={locale} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
