"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("error");

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="text-4xl font-semibold text-navy-950">{t("title")}</h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">{t("text")}</p>
      <Button size="xl" className="mt-8" onClick={reset}>
        {t("retry")}
      </Button>
    </section>
  );
}
