import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProfileForm } from "@/components/portal/profile-form";
import { resolveLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/portal/profile">): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "portal" });
  return buildMetadata({
    locale,
    path: "/portal/profile",
    title: t("profileTitle"),
    description: t("profileText"),
    noindex: true,
  });
}

export default function PortalProfilePage() {
  return <ProfileForm />;
}
