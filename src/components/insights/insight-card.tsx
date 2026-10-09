import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface InsightCardData {
  slug: string;
  title: string;
  description: string;
  image: string;
  categoryLabel: string;
  dateLabel: string;
  date: string;
  readingLabel: string;
  authorName: string;
}

export function InsightCard({
  post,
  featured = false,
  priority = false,
}: {
  post: InsightCardData;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-[0_12px_32px_-12px_rgba(11,31,58,0.18)]",
        featured && "lg:flex-row",
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/9] overflow-hidden bg-navy-100",
          featured && "lg:aspect-auto lg:w-1/2",
        )}
      >
        <Image
          src={post.image}
          alt=""
          fill
          preload={priority}
          sizes={featured ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className={cn("flex flex-1 flex-col p-6", featured && "lg:p-10")}>
        <p className="text-xs font-semibold tracking-[0.14em] text-gold-700 uppercase">{post.categoryLabel}</p>
        <h3
          className={cn(
            "mt-3 font-semibold text-navy-950",
            featured ? "text-2xl sm:text-3xl" : "text-lg",
          )}
        >
          <Link href={`/insights/${post.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </Link>
        </h3>
        <p className={cn("mt-3 flex-1 leading-7 text-muted-foreground", !featured && "line-clamp-3")}>
          {post.description}
        </p>
        <p className="mt-6 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
          <span className="font-medium text-navy-800">{post.authorName}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{post.dateLabel}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingLabel}</span>
        </p>
      </div>
    </article>
  );
}
