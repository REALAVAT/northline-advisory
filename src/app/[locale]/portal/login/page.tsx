import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { images } from "@/data/images";
import { resolveLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { enterDemo } from "../actions";

export async function generateMetadata({ params }: PageProps<"/[locale]/portal/login">): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "portal" });
  return buildMetadata({
    locale,
    path: "/portal/login",
    title: t("loginTitle"),
    description: t("loginText"),
    noindex: true,
  });
}

export default async function PortalLoginPage({ params }: PageProps<"/[locale]/portal/login">) {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "portal" });

  return (
    <div className="bg-navy-50/60 py-12 sm:py-20">
      <div className="container-page">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-border bg-white shadow-[0_24px_48px_-24px_rgba(11,31,58,0.25)] lg:grid-cols-2">
          <div className="relative hidden min-h-[520px] bg-navy-900 lg:block">
            <Image src={images.skyline} alt="" fill sizes="32rem" className="object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-10 text-white">
              <ShieldCheck className="size-8 text-gold-300" aria-hidden="true" />
              <p className="mt-4 text-2xl font-semibold">{t("loginText")}</p>
              <p className="mt-3 text-sm text-navy-100">{t("secure")}</p>
            </div>
          </div>
          <div className="p-6 sm:p-12">
            <Logo />
            <h1 className="mt-10 text-3xl font-semibold text-navy-950">{t("loginTitle")}</h1>
            <p className="mt-2 text-muted-foreground lg:hidden">{t("loginText")}</p>

            <form action={enterDemo} className="mt-8">
              <input type="hidden" name="locale" value={locale} />
              <Button type="submit" size="xl" variant="gold" className="w-full">
                {t("demoButton")}
                <ArrowRight aria-hidden="true" />
              </Button>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("demoHint")}</p>
            </form>

            <div className="my-8 flex items-center gap-4 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
              <span className="h-px flex-1 bg-border" />
              {t("or")}
              <span className="h-px flex-1 bg-border" />
            </div>

            <form aria-describedby="password-disabled" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">{t("email")}</Label>
                <Input id="login-email" type="email" autoComplete="username" disabled className="h-11 text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">{t("password")}</Label>
                <Input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  disabled
                  className="h-11 text-base"
                />
              </div>
              <Button type="submit" size="xl" variant="outline" className="w-full" disabled>
                <Lock aria-hidden="true" />
                {t("signIn")}
              </Button>
              <p id="password-disabled" className="text-sm text-muted-foreground">
                {t("signInDisabled")}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
