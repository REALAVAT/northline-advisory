import { getTranslations } from "next-intl/server";
import type { PriceLabels } from "@/components/site/cards";
import type { Locale } from "@/i18n/routing";

export async function getPriceLabels(locale: Locale): Promise<PriceLabels> {
  const t = await getTranslations({ locale, namespace: "common" });
  return {
    from: t("from"),
    units: {
      month: t("perMonth"),
      year: t("perYear"),
      project: t("perProject"),
    },
  };
}
