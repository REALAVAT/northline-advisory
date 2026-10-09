import Image from "next/image";
import { cn } from "@/lib/utils";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  breadcrumbLabel,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  breadcrumbs: Crumb[];
  breadcrumbLabel: string;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            preload
            sizes="100vw"
            className="-z-20 object-cover opacity-25"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-900/95 to-navy-900/60" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(201,164,106,0.18),transparent_55%)]" />
      )}
      <div className="container-page py-14 sm:py-16 lg:py-20">
        <Breadcrumbs items={breadcrumbs} label={breadcrumbLabel} invert />
        <div className={cn("mt-8 max-w-3xl")}>
          <p className="eyebrow text-gold-300">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">{title}</h1>
          {intro ? (
            <p className="mt-5 text-lg leading-8 text-navy-100">{intro}</p>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
