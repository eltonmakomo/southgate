import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import emblemAsset from "@/assets/southgate-senior-emblem.png.asset.json";
const emblem = emblemAsset.url;
import { sections } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [past, setPast] = useState(false);

  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Once the opening banner has scrolled away, the menu collapses to a hamburger.
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const banner = document.querySelector<HTMLElement>("[data-banner]");
      const bottom = banner ? banner.getBoundingClientRect().bottom : window.innerHeight * 0.85;
      setPast(bottom <= 116);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pageshow", measure);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pageshow", measure);
    };
  }, [pathname]);

  useEffect(() => {
    if (!past && window.matchMedia("(min-width: 1280px)").matches) setMobile(false);
  }, [past]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5", past && "pointer-events-none")}>
      <div className="relative mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-3 rounded-lg px-3 py-1.5 sm:min-h-24 sm:px-5">
        <div
          className={cn("glass pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-300", past && "opacity-0")}
          aria-hidden="true"
        />
        <Link
          to="/"
          className={cn("relative flex shrink-0 items-center gap-2 transition-opacity duration-300 sm:gap-3", past && "invisible opacity-0")}
          aria-label="Southgate Senior School home"
          tabIndex={past ? -1 : undefined}
        >
          <img src={emblem} alt="Southgate Senior School emblem" width={1681} height={936} className="h-14 w-auto shrink-0 object-contain sm:h-16" />
        </Link>

        <nav aria-label="Main" className={cn("relative hidden", !past && "xl:block")}>
          <ul className="flex items-center gap-1">
            {sections.map((s) => {
              const active = pathname.startsWith(`/${s.slug}`);
              const isOpen = open === s.slug;
              return (
                <li key={s.slug} className="relative" onMouseEnter={() => setOpen(s.slug)} onMouseLeave={() => setOpen(null)}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`menu-${s.slug}`}
                    onClick={() => setOpen(isOpen ? null : s.slug)}
                    className={cn(
                      "font-display inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold tracking-wide transition-colors hover:bg-mint",
                      active && "bg-mint text-olive-deep",
                    )}
                  >
                    {s.navTitle}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} aria-hidden="true" />
                  </button>
                  <div
                    id={`menu-${s.slug}`}
                    className={cn(
                      "absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3",
                      isOpen ? "visible opacity-100" : "invisible opacity-0",
                      "transition-opacity",
                    )}
                  >
                    <div className="glass rounded-lg p-2">
                      <Link to="/$section" params={{ section: s.slug }} className="font-display flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-bold tracking-wide hover:bg-mint">
                        {s.title} overview <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <ul className="mt-1 border-t border-border pt-1">
                        {s.pages.map((pg) => (
                          <li key={pg.slug}>
                            <Link
                              to="/$section/$page"
                              params={{ section: s.slug, page: pg.slug }}
                              className="font-display block rounded-md px-3 py-2 text-sm tracking-wide hover:bg-mint"
                              activeProps={{ className: "bg-mint font-semibold" }}
                            >
                              {pg.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="relative flex shrink-0 items-center gap-2">
          {!past && (
            <Link
              to="/$section/$page"
              params={{ section: "admissions", page: "how-to-apply" }}
              className="hidden rounded-md bg-olive-deep px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-ink sm:inline-flex"
            >
              Apply for 2027
            </Link>
          )}
          <button
            type="button"
            className={cn(
              "pointer-events-auto inline-flex items-center justify-center transition-colors hover:bg-mint",
              past ? "glass h-12 w-12 rounded-full" : "h-11 w-11 rounded-md xl:hidden",
            )}
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            onClick={() => setMobile((m) => !m)}
          >
            {mobile ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobile && (
        <nav id="mobile-menu" aria-label="Mobile" className={cn("glass pointer-events-auto mx-auto mt-2 max-h-[calc(100dvh-8rem)] max-w-7xl overflow-y-auto rounded-lg p-3", !past && "xl:hidden")}>
          <ul className="flex flex-col">
            {sections.map((s) => {
              const expanded = mobileSection === s.slug;
              return (
                <li key={s.slug} className="border-b border-border last:border-0">
                  <div className="flex items-center justify-between">
                    <Link to="/$section" params={{ section: s.slug }} className="flex-1 px-2 py-3 font-display text-lg">
                      {s.navTitle}
                    </Link>
                    <button
                      type="button"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-mint"
                      aria-expanded={expanded}
                      aria-label={`${expanded ? "Hide" : "Show"} ${s.navTitle} pages`}
                      onClick={() => setMobileSection(expanded ? null : s.slug)}
                    >
                      <ChevronDown className={cn("h-5 w-5 transition-transform", expanded && "rotate-180")} aria-hidden="true" />
                    </button>
                  </div>
                  {expanded && (
                    <ul className="pb-3 pl-2">
                      {s.pages.map((pg) => (
                        <li key={pg.slug}>
                          <Link to="/$section/$page" params={{ section: s.slug, page: pg.slug }} className="font-display block rounded-md px-2 py-2 text-sm tracking-wide hover:bg-mint" activeProps={{ className: "bg-mint font-semibold" }}>
                            {pg.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          <Link
            to="/$section/$page"
            params={{ section: "admissions", page: "how-to-apply" }}
            className="mt-3 flex justify-center rounded-md bg-olive-deep px-4 py-3 font-semibold text-primary-foreground hover:bg-ink"
          >
            Apply for 2027
          </Link>
        </nav>
      )}
    </header>
  );
}
