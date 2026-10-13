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
        d="M11.013 5.189 Q12 2.6 12.987 5.189 L13.646 6.915 Q14.351 8.764 16.328 8.863 L18.173 8.956 Q20.94 9.095 18.783 10.834 L17.345 11.994 Q15.804 13.236 16.321 15.147 L16.802 16.93 Q17.525 19.605 15.205 18.091 L13.658 17.081 Q12 16 10.342 17.081 L8.795 18.091 Q6.475 19.605 7.198 16.93 L7.679 15.147 Q8.196 13.236 6.655 11.994 L5.217 10.834 Q3.06 9.095 5.827 8.956 L7.672 8.863 Q9.649 8.764 10.354 6.915 Z"
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

