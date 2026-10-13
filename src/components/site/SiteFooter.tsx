import { Link } from "@tanstack/react-router";
import emblem from "@/assets/southgate-logo-clean.png";
import { school, sections } from "@/content/site";
import { NewsletterForm } from "./Forms";
import { Star } from "./Star";

export function SiteFooter() {
  return (
    <footer className="theme-about relative overflow-hidden bg-olive-deep text-primary-foreground">
      <Star className="absolute -left-16 -top-16 h-72 w-72 text-gold opacity-15" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.1fr_2fr]">
        <div className="flex flex-col gap-6">
          <div className="w-fit rounded-lg bg-paper p-4">
            <img src={emblem} alt="Southgate High School emblem" width={900} height={543} loading="lazy" className="h-24 w-auto" />
          </div>
          <p className="max-w-sm text-sm leading-relaxed opacity-85">
            A private high school in Zimbabwe, proudly affiliated with the Zion Christian Church. Forms 1 to 6 — opening January 2027.
          </p>
          <div className="rounded-lg bg-paper p-5 text-foreground">
            <h2 className="mb-1 text-lg">Newsletter</h2>
            <p className="mb-4 text-sm text-muted-foreground">Admissions updates, school news and upcoming events.</p>
            <NewsletterForm compact />
          </div>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {sections.map((s) => (
            <div key={s.slug}>
              <Link to="/$section" params={{ section: s.slug }} className="font-display text-base text-gold hover:underline">
                {s.navTitle}
              </Link>
              <ul className="mt-3 flex flex-col gap-2">
                {s.pages.map((pg) => (
                  <li key={pg.slug}>
                    <Link to="/$section/$page" params={{ section: s.slug, page: pg.slug }} className="text-sm opacity-80 hover:opacity-100 hover:underline">
                      {pg.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="relative border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs opacity-75 sm:flex-row sm:justify-between">
          <p>© {school.name}. {school.tagline}</p>
          <p>Photography and video on this site are illustrative and do not depict Southgate’s campus or pupils.</p>
        </div>
      </div>
    </footer>
  );
}
