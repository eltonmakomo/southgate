import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Block, Section } from "@/content/site";
import { cn } from "@/lib/utils";
import { CareersForm, EnquiryForm, NewsletterForm } from "./Forms";
import { IllustrativeLabel, Star } from "./Star";

export function PageBanner({
  image,
  imageAlt,
  eyebrow,
  title,
  lead,
  crumbs,
}: {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs: { label: string; to?: string; params?: Record<string, string> }[];
}) {
  return (
    <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-ink text-primary-foreground">
      <img src={image} alt={imageAlt} width={1600} height={1008} className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="scrim absolute inset-0 -z-10" />
      <div className="scrim-side absolute inset-0 -z-10" />
      <Star className="absolute right-[6%] top-28 h-40 w-40 text-sec-accent opacity-60 drift sm:h-64 sm:w-64" />
      <IllustrativeLabel className="absolute bottom-5 right-5" />
      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-36">
        <nav aria-label="Breadcrumb" className="glass-dark mb-6 inline-flex max-w-full flex-wrap items-center gap-1 rounded-md px-3 py-1.5 text-sm">
          <Link to="/" className="hover:underline">Home</Link>
          {crumbs.map((c, i) => (
            <span key={i} className="inline-flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
              {c.to ? (
                <Link to={c.to} params={c.params} className="hover:underline">{c.label}</Link>
              ) : (
                <span aria-current="page" className="font-semibold">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <p className="eyebrow mb-4 text-sec-accent rise">{eyebrow}</p>
        <h1 className="text-title max-w-4xl rise">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed opacity-90 rise">{lead}</p>}
      </div>
    </section>
  );
}

export function SectionNav({ section, current }: { section: Section; current?: string }) {
  return (
    <nav aria-label={`Explore ${section.navTitle}`} className="glass rounded-lg p-4 lg:sticky lg:top-28">
      <p className="eyebrow mb-3 flex items-center gap-2 text-sec">
        <Star className="h-4 w-4" /> Explore {section.navTitle}
      </p>
      <ol className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
        <li className="shrink-0">
          <Link
            to="/$section"
            params={{ section: section.slug }}
            activeOptions={{ exact: true }}
            className={cn(
              "group flex items-center gap-3 whitespace-nowrap rounded-md px-3 py-2 text-sm hover:bg-sec-soft lg:whitespace-normal",
              !current && "bg-sec-soft font-semibold text-sec-soft-foreground",
            )}
            aria-current={!current ? "page" : undefined}
          >
            <span className="w-6 font-display text-xs text-sec">00</span>
            <span className="flex-1">Overview</span>
            <ArrowRight className="hidden h-3.5 w-3.5 opacity-50 transition-transform group-hover:translate-x-0.5 lg:block" aria-hidden="true" />
          </Link>
        </li>
        {section.pages.map((pg, i) => {
          const active = current === pg.slug;
          return (
            <li key={pg.slug} className="shrink-0">
              <Link
                to="/$section/$page"
                params={{ section: section.slug, page: pg.slug }}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex items-center gap-3 whitespace-nowrap rounded-md px-3 py-2 text-sm hover:bg-sec-soft lg:whitespace-normal",
                  active && "bg-sec-soft font-semibold text-sec-soft-foreground",
                )}
              >
                <span className="w-6 font-display text-xs text-sec">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">{pg.title}</span>
                <ArrowRight className="hidden h-3.5 w-3.5 opacity-50 transition-transform group-hover:translate-x-0.5 lg:block" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className={cn("leading-relaxed text-foreground/85", i === 0 ? "text-xl leading-relaxed text-foreground" : "text-lg")}>
                {b.text}
              </p>
            );
          case "h":
            return <h2 key={i} className="text-section mt-6">{b.text}</h2>;
          case "list":
            return (
              <ul key={i} className="grid gap-x-8 gap-y-3 border-y border-border py-6 sm:grid-cols-2">
                {b.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-base">
                    <Star className="mt-0.5 h-5 w-5 shrink-0 text-sec" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "steps":
            return (
              <ol key={i} className="grid gap-4 sm:grid-cols-2">
                {b.items.map((it, n) => (
                  <li key={it} className="relative rounded-lg bg-sec-soft p-6 text-sec-soft-foreground">
                    <span className="font-display text-4xl text-sec">{n + 1}</span>
                    <p className="mt-3 font-medium leading-relaxed">{it}</p>
                  </li>
                ))}
              </ol>
            );
          case "values":
            return (
              <dl key={i} className="divide-y divide-border border-y border-border">
                {b.items.map((v) => (
                  <div key={v.title} className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr] sm:gap-8">
                    <dt className="flex items-center gap-2 font-display text-2xl text-sec">
                      <Star className="h-5 w-5" /> {v.title}
                    </dt>
                    <dd className="text-lg leading-relaxed text-foreground/85">{v.text}</dd>
                  </div>
                ))}
              </dl>
            );
          case "faq":
            return (
              <Accordion key={i} type="multiple" className="border-t border-border">
                {b.items.map((f, n) => (
                  <AccordionItem key={f.q} value={`q-${n}`} className="border-border">
                    <AccordionTrigger className="py-5 text-left text-lg font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent className="pb-5 text-base leading-relaxed text-foreground/85">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            );
          case "quote":
            return (
              <figure key={i} className="relative rounded-lg bg-sec p-8 text-sec-foreground sm:p-12">
                <Star className="absolute right-6 top-6 h-16 w-16 text-sec-accent opacity-70" />
                <blockquote className="flex flex-col gap-5 text-lg leading-relaxed sm:text-xl">
                  {b.text.map((t) => (
                    <p key={t.slice(0, 20)}>{t}</p>
                  ))}
                </blockquote>
                <figcaption className="eyebrow mt-8 text-sec-accent">— {b.cite}</figcaption>
              </figure>
            );
          case "pending":
            return (
              <p key={i} className="flex items-start gap-3 rounded-md border border-dashed border-sec/50 bg-card p-4 text-sm text-muted-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-sec" aria-hidden="true" />
                <span><strong className="text-foreground">To be confirmed: </strong>{b.text}</span>
              </p>
            );
          case "form":
            return (
              <div key={i} className="mt-4 rounded-lg border border-border bg-card p-6 shadow-card sm:p-10">
                <h2 className="text-section mb-2">
                  {b.form === "careers" ? "Apply to join our team" : b.form === "newsletter" ? "Register for our newsletter" : "Make an enquiry"}
                </h2>
                <p className="mb-8 text-muted-foreground">Fields marked * are required. Your details are stored privately and only seen by school staff.</p>
                {b.form === "careers" ? <CareersForm /> : b.form === "newsletter" ? <NewsletterForm /> : <EnquiryForm defaultCategory={b.category} />}
              </div>
            );
        }
      })}
    </div>
  );
}

export function AdmissionsCta() {
  return (
    <section className="theme-admissions relative overflow-hidden bg-sec text-sec-foreground">
      <Star className="absolute -right-10 -top-10 h-72 w-72 text-sec-accent opacity-40 drift" />
      <Star className="absolute bottom-6 left-[40%] h-8 w-8 opacity-50" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-5 py-20 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4 text-sec-accent">January 2027 intake</p>
          <h2 className="text-section">Admissions for our January 2027 intake are now open.</h2>
          <p className="mt-4 text-lg opacity-90">Begin your enquiry today.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/$section/$page" params={{ section: "contact", page: "enquiry-form" }} className="inline-flex min-h-12 items-center gap-2 rounded-md bg-paper px-6 py-3 font-semibold text-foreground hover:bg-cream">
            Begin your enquiry <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to="/$section/$page" params={{ section: "admissions", page: "how-to-apply" }} className="inline-flex min-h-12 items-center rounded-md border border-current px-6 py-3 font-semibold hover:bg-paper/10">
            How to apply
          </Link>
        </div>
      </div>
    </section>
  );
}
