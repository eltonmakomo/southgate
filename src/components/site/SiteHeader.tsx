import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import emblem from "@/assets/southgate-logo-transparent-gates.png";
import { sections } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="relative mx-auto flex min-h-24 max-w-7xl items-center justify-between gap-3 rounded-lg px-3 py-2 sm:min-h-28 sm:px-5">
        <div className="glass pointer-events-none absolute inset-0 -z-10 rounded-lg" aria-hidden="true" />
        <Link to="/" className="flex shrink-0 items-center gap-2 sm:gap-3" aria-label="Southgate High School home">
          <img src={emblem} alt="Southgate High School emblem" width={900} height={543} className="h-20 w-auto shrink-0 object-contain sm:h-24" />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
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
                      "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-mint",
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
                      <Link to="/$section" params={{ section: s.slug }} className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-bold hover:bg-mint">
                        {s.title} overview <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <ul className="mt-1 border-t border-border pt-1">
                        {s.pages.map((pg) => (
                          <li key={pg.slug}>
                            <Link
                              to="/$section/$page"
                              params={{ section: s.slug, page: pg.slug }}
                              className="block rounded-md px-3 py-2 text-sm hover:bg-mint"
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

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/$section/$page"
            params={{ section: "admissions", page: "how-to-apply" }}
            className="hidden rounded-md bg-olive px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-olive-deep sm:inline-flex"
          >
            Apply for 2027
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-mint xl:hidden"
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
        <nav id="mobile-menu" aria-label="Mobile" className="glass mx-auto mt-2 max-h-[calc(100dvh-8rem)] max-w-7xl overflow-y-auto rounded-lg p-3 xl:hidden">
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
                          <Link to="/$section/$page" params={{ section: s.slug, page: pg.slug }} className="block rounded-md px-2 py-2 text-sm hover:bg-mint" activeProps={{ className: "bg-mint font-semibold" }}>
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
            className="mt-3 flex justify-center rounded-md bg-olive px-4 py-3 font-semibold text-primary-foreground"
          >
            Apply for 2027
          </Link>
        </nav>
      )}
    </header>
  );
}
