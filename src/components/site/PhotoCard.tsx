import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Star } from "./Star";

type Props = {
  section: string;
  page: string;
  image: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  text?: string;
  tone?: "paper" | "sec" | "soft";
  className?: string;
};

export function PhotoCard({ section, page, image, imageAlt, eyebrow, title, text, tone = "paper", className }: Props) {
  const panel =
    tone === "sec"
      ? "bg-sec text-sec-foreground"
      : tone === "soft"
        ? "bg-sec-soft text-sec-soft-foreground"
        : "bg-card text-card-foreground";
  return (
    <Link
      to="/$section/$page"
      params={{ section, page }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg shadow-card transition-transform duration-300 hover:-translate-y-1",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          width={1600}
          height={1008}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className={cn("relative flex flex-1 flex-col gap-3 p-6", panel)}>
        <Star className="absolute right-5 top-5 h-5 w-5 opacity-50" />
        {eyebrow && <span className="eyebrow opacity-75">{eyebrow}</span>}
        <h3 className="pr-8 text-xl leading-tight sm:text-2xl">{title}</h3>
        {text && <p className="text-sm leading-relaxed opacity-85">{text}</p>}
        <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold">
          Explore
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-current transition-transform group-hover:translate-x-1">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </span>
      </div>
    </Link>
  );
}
