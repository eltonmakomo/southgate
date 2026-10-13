import { createFileRoute, notFound } from "@tanstack/react-router";
import { findSection } from "@/content/site";
import { AdmissionsCta, PageBanner, SectionNav } from "@/components/site/PageParts";
import { PhotoCard } from "@/components/site/PhotoCard";

export const Route = createFileRoute("/$section/")({
  loader: ({ params }) => {
    const section = findSection(params.section);
    if (!section) throw notFound();
    return { slug: section.slug };
  },
  head: ({ loaderData }) => {
    const section = loaderData ? findSection(loaderData.slug) : undefined;
    if (!section) return { meta: [{ title: "Page not found — Southgate High School" }, { name: "robots", content: "noindex" }] };
    const title = `${section.title} — Southgate High School`;
    return {
      meta: [
        { title },
        { name: "description", content: section.intro },
        { property: "og:title", content: title },
        { property: "og:description", content: section.intro },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: SectionOverview,
});

function SectionOverview() {
  const { slug } = Route.useLoaderData();
  const section = findSection(slug)!;
  return (
    <div className={`theme-${section.theme}`}>
      <PageBanner
        image={section.image}
        imageAlt={section.imageAlt}
        eyebrow={`Southgate · ${section.navTitle}`}
        title={section.title}
        lead={section.intro}
        crumbs={[{ label: section.title }]}
      />
      <div className="bg-sec-soft">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[18rem_1fr]">
          <aside className="lg:-mt-32 lg:pt-0">
            <SectionNav section={section} />
          </aside>
          <div>
            <h2 className="text-section mb-10 max-w-2xl text-sec-soft-foreground">Explore {section.navTitle.toLowerCase()} at Southgate</h2>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {section.pages.map((pg, i) => (
                <PhotoCard
                  key={pg.slug}
                  to={`/${section.slug}/${pg.slug}`}
                  image={pg.image}
                  imageAlt={pg.imageAlt}
                  eyebrow={String(i + 1).padStart(2, "0")}
                  title={pg.title}
                  text={pg.summary}
                  tone={i % 3 === 1 ? "sec" : "paper"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <AdmissionsCta />
    </div>
  );
}
