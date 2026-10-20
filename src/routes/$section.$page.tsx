import { createFileRoute, notFound } from "@tanstack/react-router";
import { findPage } from "@/content/site";
import { AdmissionsCta, Blocks, PageBanner, SectionNav } from "@/components/site/PageParts";
import { PhotoCard } from "@/components/site/PhotoCard";

export const Route = createFileRoute("/$section/$page")({
  loader: ({ params }) => {
    const found = findPage(params.section, params.page);
    if (!found) throw notFound();
    return { section: found.section.slug, page: found.page.slug };
  },
  head: ({ loaderData }) => {
    const found = loaderData ? findPage(loaderData.section, loaderData.page) : undefined;
    if (!found) return { meta: [{ title: "Page not found — Southgate Senior School" }, { name: "robots", content: "noindex" }] };
    const title = `${found.page.title} — ${found.section.navTitle} | Southgate Senior School`;
    return {
      meta: [
        { title },
        { name: "description", content: found.page.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: found.page.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: InnerPage,
});

function InnerPage() {
  const data = Route.useLoaderData();
  const { section, page } = findPage(data.section, data.page)!;
  const idx = section.pages.findIndex((p) => p.slug === page.slug);
  const related = [1, 2, 3].map((n) => section.pages[(idx + n) % section.pages.length]).filter((p): p is NonNullable<typeof p> => !!p && p.slug !== page.slug);

  return (
    <div className={`theme-${section.theme}`}>
      <PageBanner
        image={page.image}
        imageAlt={page.imageAlt}
        eyebrow={section.title}
        title={page.title}
        lead={page.summary}
        crumbs={[{ label: section.title, section: section.slug }, { label: page.title }]}
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[18rem_1fr] lg:gap-16">
        <aside className="min-w-0 lg:-mt-32">
          <SectionNav section={section} current={page.slug} />
        </aside>
        <article className="min-w-0 max-w-3xl">
          <Blocks blocks={page.blocks} />
        </article>
      </div>
      {related.length > 0 && (
        <section className="bg-sec-soft">
          <div className="mx-auto max-w-7xl px-5 py-16">
            <p className="eyebrow mb-3 text-sec">Continue exploring</p>
            <h2 className="text-section mb-10 text-sec-soft-foreground">More in {section.navTitle}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((pg, i) => (
                <PhotoCard
                  key={pg.slug}
                  section={section.slug}
                  page={pg.slug}
                  image={pg.image}
                  imageAlt={pg.imageAlt}
                  eyebrow={section.navTitle}
                  title={pg.title}
                  text={pg.summary}
                  tone={i === 1 ? "sec" : "paper"}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      <AdmissionsCta />
    </div>
  );
}
