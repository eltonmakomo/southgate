import { cn } from "@/lib/utils";

/** Rounded, outlined five-point star — the Southgate signature motif. Never filled. */
export function Star({ className, strokeWidth = 1.25 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none", className)}
    >
      <path
        vectorEffect="non-scaling-stroke"
        d="M12 2.8l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7z"
      />
    </svg>
  );
}

export function StarField({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <Star className="absolute -right-10 top-8 h-56 w-56 opacity-20 drift" />
      <Star className="absolute left-[8%] bottom-10 h-10 w-10 opacity-30" />
      <Star className="absolute right-[30%] bottom-[18%] h-5 w-5 opacity-40" />
    </div>
  );
}

