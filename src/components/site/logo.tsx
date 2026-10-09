import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-8 shrink-0", className)}
    >
      <rect width="32" height="32" rx="7" fill="#0b1f3a" />
      <path d="M9 23V9l14 14V9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 6.5h16" stroke="#c9a46a" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className={inverted ? "[&>rect]:fill-white/10" : undefined} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[1.05rem] font-semibold tracking-tight",
            inverted ? "text-white" : "text-navy-900",
          )}
        >
          Northline
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.62rem] font-medium tracking-[0.22em] uppercase",
            inverted ? "text-gold-300" : "text-gold-700",
          )}
        >
          Advisory
        </span>
      </span>
    </span>
  );
}
