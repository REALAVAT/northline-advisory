import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  tone = "white",
  labelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "white" | "muted" | "navy";
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        tone === "muted" && "bg-navy-50/60",
        tone === "navy" && "bg-navy-900 text-white",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  id,
  align = "left",
  invert = false,
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  id?: string;
  align?: "left" | "center";
  invert?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow", invert && "text-gold-300")}>{eyebrow}</p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "mt-3 text-3xl font-semibold sm:text-4xl",
          invert ? "text-white" : "text-navy-950",
        )}
      >
        {title}
      </Heading>
      {text ? (
        <p
          className={cn(
            "mt-4 text-lg leading-8",
            invert ? "text-navy-100" : "text-muted-foreground",
          )}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}
