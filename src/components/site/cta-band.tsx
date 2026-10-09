import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-3xl bg-navy-900 px-6 py-14 text-center sm:px-12 lg:py-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(201,164,106,0.25),transparent_45%),radial-gradient(circle_at_90%_100%,rgba(61,90,136,0.6),transparent_50%)]"
          />
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-navy-100">{text}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="gold" size="xl">
              <Link href={primary.href}>
                {primary.label}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            {secondary ? (
              <Button asChild variant="inverse" size="xl">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
