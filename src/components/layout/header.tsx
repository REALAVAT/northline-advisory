import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { mainNav } from "@/data/navigation";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";

export async function Header({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "nav" });
  const items = mainNav.map((item) => ({ href: item.href, label: t(item.key) }));
  const mobileItems = [
    { href: "/", label: t("home") },
    ...items,
    { href: "/team", label: t("team") },
    { href: "/locations", label: t("locations") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-white/90 backdrop-blur supports-backdrop-filter:bg-white/80">
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link href="/" className="rounded-md" aria-label="Northline Advisory">
          <Logo />
        </Link>
        <nav aria-label={t("primary")} className="hidden lg:block">
          <NavLinks items={items} />
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:flex" />
          <Button asChild variant="ghost" size="lg" className="hidden px-3 xl:inline-flex">
            <Link href="/portal">{t("portal")}</Link>
          </Button>
          <Button asChild size="lg" className="hidden px-4 md:inline-flex">
            <Link href="/contact">{t("bookCall")}</Link>
          </Button>
          <MobileNav items={mobileItems} />
        </div>
      </div>
    </header>
  );
}
