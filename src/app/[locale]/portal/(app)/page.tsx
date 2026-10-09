import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DashboardView } from "@/components/portal/dashboard-view";
import { demoClient } from "@/data/portal";
import { getTeamMember } from "@/data/team";
import { pick, resolveLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/portal">): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "portal" });
  return buildMetadata({
    locale,
    path: "/portal",
    title: t("nav.dashboard"),
    description: t("loginText"),
    noindex: true,
  });
}

export default async function PortalDashboardPage({ params }: PageProps<"/[locale]/portal">) {
  const locale = resolveLocale((await params).locale);
  const advisor = getTeamMember(demoClient.advisorSlug);
  if (!advisor) throw new Error("Demo advisor missing");

  return (
    <DashboardView
      advisor={{
        name: advisor.name,
        role: pick(advisor.role, locale),
        image: advisor.image,
        email: advisor.email,
      }}
    />
  );
}
