import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroPhoto, PageHero } from "@/components/PageHero";
import { UpdateCard } from "@/components/UpdateCard";
import { publishedUpdates } from "@/content/updates";
import { getDict } from "@/content/ui";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

const PATH = "/updates";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const d = getDict(lang);
  return buildMetadata({ lang, path: PATH, title: d.updates.title, description: d.updates.description });
}

export default async function UpdatesPage({ params }: LangParams) {
  const lang = await getLang(params);
  const list = publishedUpdates();
  if (list.length === 0) notFound();
  const d = getDict(lang);
  const lead = list[0].featured || list.length === 1 ? list[0] : null;
  const latestImage = list[0].heroImage ?? list[0].image;
  const rest = lead ? list.slice(1) : list;
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={d.updates.eyebrow}
        lead={d.updates.lead}
        body={d.updates.body}
        points={d.updates.points}
        visual={
          latestImage ? (
            <HeroPhoto
              image={{ ...latestImage, alt: latestImage.alt }}
              lang={lang}
            />
          ) : undefined
        }
        path={PATH}
        title={d.updates.title}
        description={d.updates.description}
        crumbs={[{ name: d.updates.title, path: PATH }]}
      />
      <div className="section shell">
        {lead && (
          <UpdateCard
            update={lead}
            lang={lang}
            readMore={d.updates.readMore}
            variant="feature"
            featuredLabel={d.updates.featured}
            headingLevel="h2"
          />
        )}
        {rest.length > 0 && (
          <div className={`grid gap-12 md:grid-cols-2 lg:grid-cols-3 ${lead ? "mt-20" : ""}`}>
            {rest.map((u) => (
              <UpdateCard
                key={u.slug}
                update={u}
                lang={lang}
                readMore={d.updates.readMore}
                featuredLabel={d.updates.featured}
            headingLevel="h2"
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
