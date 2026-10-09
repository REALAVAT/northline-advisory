import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-gold-700">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-navy-950 sm:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">{t("text")}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="xl">
          <Link href="/">{t("home")}</Link>
        </Button>
        <Button asChild size="xl" variant="outline">
          <Link href="/contact">{t("contact")}</Link>
        </Button>
      </div>
    </section>
  );
}
