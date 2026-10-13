import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowDown } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import emblem from "@/assets/southgate-logo-transparent-gates.png";
import { images, newsIntro, school, sections } from "@/content/site";
import { HeroVideo } from "@/components/site/HeroVideo";
import { PhotoCard } from "@/components/site/PhotoCard";
import { AdmissionsCta, NewsFeed } from "@/components/site/PageParts";
import { Star } from "@/components/site/Star";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Southgate High School — Forms 1 to 6, opening January 2027" },
      { name: "description", content: school.subhead },
      { property: "og:title", content: "Southgate High School — Nurturing Character. Inspiring Excellence." },
      { property: "og:description", content: school.subhead },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const discover = [
  { section: "about", page: "our-history", eyebrow: "About", tone: "paper" as const, theme: "theme-about" },
  { section: "academics", page: "curriculum-overview", eyebrow: "Academics", tone: "sec" as const, theme: "theme-academics" },
  { section: "admissions", page: "how-to-apply", eyebrow: "Admissions", tone: "sec" as const, theme: "theme-admissions" },
  { section: "student-life", page: "agricultural-programme", eyebrow: "Student Life", tone: "soft" as const, theme: "theme-life" },
  { section: "student-life", page: "boarding", eyebrow: "Boarding", tone: "paper" as const, theme: "theme-life" },
  { section: "news-and-events", page: "latest-news", eyebrow: "News & Events", tone: "sec" as const, theme: "theme-news" },
];

function Home() {
  const discoverCards = discover.map((d) => {
    const s = sections.find((x) => x.slug === d.section)!;
    const p = s.pages.find((x) => x.slug === d.page)!;
    return { ...d, title: p.title, text: p.summary, image: p.image, imageAlt: p.imageAlt };
  });

  return (
    <>
      {/* Opening */}
      <section className="relative isolate flex min-h-svh items-end overflow-hidden bg-ink text-primary-foreground">
        <HeroVideo src={heroVideo.url} poster={images.heroGates} label="Illustrative video of students walking through open school gates" />
        <div className="scrim pointer-events-none absolute inset-0" />
        <div className="scrim-side pointer-events-none absolute inset-0" />
        <Star className="pointer-events-none absolute right-[8%] top-28 hidden h-48 w-48 text-gold opacity-70 drift md:block" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-36">
          <div className="glass-dark mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold rise">
            <Star className="h-4 w-4 text-gold" strokeWidth={1.75} />
            Opening January 2027 · Forms 1 to 6
          </div>
          <h1 className="text-hero rise">Southgate<br />High School</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed opacity-95 sm:text-xl rise">{school.subhead}</p>
          <div className="mt-8 flex flex-wrap gap-3 rise">
            <Link to="/$section/$page" params={{ section: "admissions", page: "how-to-apply" }} className="inline-flex min-h-12 items-center gap-2 rounded-md bg-gold px-6 py-3 font-semibold text-ink hover:bg-sun">
              Apply for January 2027 <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/$section/$page" params={{ section: "contact", page: "enquiry-form" }} className="glass-dark inline-flex min-h-12 items-center rounded-md px-6 py-3 font-semibold hover:bg-paper/20">
              Make an enquiry
            </Link>
          </div>
        </div>
        <span className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] opacity-80 sm:inline-flex">
          <ArrowDown className="h-4 w-4" aria-hidden="true" /> Scroll
        </span>
      </section>

      {/* Welcome with emblem */}
      <section className="relative overflow-hidden bg-paper">
        <Star className="absolute -left-20 top-16 h-72 w-72 text-olive opacity-[0.07]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:py-28">
          <div className="flex flex-col items-start gap-6">
            <img src={emblem} alt="Southgate High School emblem: open gates, a star and an open book" width={900} height={543} loading="lazy" className="w-full max-w-md" />
          </div>
          <div>
            <p className="eyebrow mb-4 text-rose">Welcome to Southgate</p>
            <h2 className="text-section text-olive">{school.headline}</h2>
            <div className="mt-8 flex flex-col gap-5 text-lg leading-relaxed text-foreground/85">
              {school.intro.map((t) => (
                <p key={t.slice(0, 24)}>{t}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars — alternating editorial bands */}
      <section aria-labelledby="pillars" className="bg-olive-deep text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 pt-20">
          <p className="eyebrow mb-3 text-gold">What shapes a Southgate education</p>
          <h2 id="pillars" className="text-section max-w-3xl">Excellence, faith, character and a full life beyond the classroom.</h2>
        </div>
        <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-0 px-5 pb-20">
          {school.pillars.map((pl, i) => (
            <div key={pl.title} className="grid gap-8 border-t border-primary-foreground/15 py-12 md:grid-cols-2 md:items-center md:gap-14">
              <div className={i % 2 ? "md:order-2" : ""}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                  <img src={pl.image} alt={`Illustrative image: ${pl.title}`} loading="lazy" width={1600} height={1008} className="h-full w-full object-cover" />
                </div>
              </div>
              <div>
                <span className="font-display text-5xl text-gold/80">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-3xl sm:text-4xl">{pl.title}</h3>
                <p className="mt-5 text-lg leading-relaxed opacity-85">{pl.text}</p>
                <Link to="/$section/$page" params={{ section: pl.section, page: pl.page }} className="mt-6 inline-flex items-center gap-2 font-semibold text-gold hover:underline">
                  Read more <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* At a glance */}
      <section className="relative overflow-hidden bg-sun text-olive-deep">
        <Star className="absolute -right-12 bottom-[-3rem] h-80 w-80 opacity-25" strokeWidth={1} />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow mb-3">At a glance</p>
            <h2 className="text-section">Southgate in six facts</h2>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-lg bg-olive-deep/15 sm:grid-cols-2">
            {school.glance.map((g) => (
              <li key={g} className="flex items-start gap-3 bg-sun p-6 text-lg font-semibold">
                <Star className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.75} />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Discover cards */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-3 text-rose">Discover</p>
              <h2 className="text-section max-w-2xl text-olive">Find your way around Southgate</h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {discoverCards.map((c) => (
              <div key={c.page} className={c.theme}>
                <PhotoCard section={c.section} page={c.page} image={c.image} imageAlt={c.imageAlt} eyebrow={c.eyebrow} title={c.title} text={c.text} tone={c.tone} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="relative isolate overflow-hidden bg-teal text-primary-foreground">
        <img src={images.choirImg} alt="Illustrative image of students singing together" loading="lazy" width={1600} height={1008} className="absolute inset-y-0 right-0 -z-10 hidden h-full w-1/2 object-cover md:block" />
        <div className="mx-auto max-w-7xl px-5 py-24">
          <div className="max-w-xl">
            <Star className="mb-6 h-12 w-12 text-sun" />
            <p className="eyebrow mb-3 text-sun">Our community</p>
            <p className="font-display text-2xl leading-snug sm:text-3xl">{school.community}</p>
            <Link to="/$section/$page" params={{ section: "about", page: "our-zcc-foundation" }} className="mt-8 inline-flex items-center gap-2 font-semibold text-sun hover:underline">
              Our ZCC foundation <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3 text-olive">{newsIntro.eyebrow}</p>
              <h2 className="text-section text-olive">{newsIntro.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{newsIntro.summary}</p>
            </div>
            <Link to="/$section/$page" params={{ section: "news-and-events", page: "latest-news" }} className="inline-flex shrink-0 items-center gap-2 font-semibold text-olive hover:underline">
              News & Events <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <NewsFeed />
        </div>
      </section>

      <AdmissionsCta />
    </>
  );
}
