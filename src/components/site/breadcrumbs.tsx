import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({
  items,
  label,
  invert = false,
}: {
  items: Crumb[];
  label: string;
  invert?: boolean;
}) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span
                  aria-current="page"
                  className={cn("font-medium", invert ? "text-white" : "text-navy-900")}
                >
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className={cn(
                      "hover:underline",
                      invert ? "text-navy-200 hover:text-white" : "text-navy-600 hover:text-navy-900",
                    )}
                  >
                    {item.name}
                  </Link>
                  <ChevronRight
                    className={cn("size-3.5", invert ? "text-navy-300" : "text-navy-400")}
                    aria-hidden="true"
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
