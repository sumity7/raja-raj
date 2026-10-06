import type { Metadata } from "next";
import { MediaGallery } from "@/components/MediaGallery";
import { JsonLd } from "@/components/JsonLd";
import { MediaHero } from "@/components/PageHero";
import { heroImages } from "@/content/heroImages";
import { SocialSection } from "@/components/SocialSection";
import { mediaCategories, media } from "@/content/media";
import { pageSeo } from "@/content/seo";
import { getDict } from "@/content/ui";
import { publishedUpdates, updates } from "@/content/updates";
import { tr } from "@/lib/i18n";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const PATH = "/media";

const videoDate = (id: string) => updates.find((u) => u.videoId === id)?.date;

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  return buildMetadata({
    lang,
    path: PATH,
    absoluteTitle: true,
    title: pageSeo.media.title[lang],
    description: pageSeo.media.description[lang],
  });
}

export default async function MediaPage({ params }: LangParams) {
  const lang = await getLang(params);
  const d = getDict(lang);

  // Only categories that actually contain items get a filter tab.
  const categories = mediaCategories
    .filter((c) => media.some((m) => m.category === c.id))
    .map((c) => ({ id: c.id, label: tr(c.label, lang) }));

  return (
    <>
      <MediaHero
        lang={lang}
        path={PATH}
        crumbs={[{ name: d.media.title, path: PATH }]}
        title={d.media.title}
        lead={d.media.lead}
        body={d.media.body}
        description={pageSeo.media.description[lang]}
        image={heroImages.yogi}
        links={[
          ...(media.some((m) => m.video) ? [{ label: d.media.heroLinks.videos, href: "/media#videos" }] : []),
          { label: d.media.heroLinks.photos, href: "/media#photos" },
          ...(publishedUpdates().length > 0 ? [{ label: d.media.heroLinks.updates, href: "/updates" }] : []),
        ]}
      />
      <div className="section shell">
        <MediaGallery lang={lang} items={media} categories={categories} copy={d.media} />
      </div>
      <SocialSection lang={lang} />
      <JsonLd
        data={media
          .filter((m) => m.video)
          .map((m) => ({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: tr(m.title ?? m.caption, lang),
            description: tr(m.description ?? m.caption, lang),
            thumbnailUrl: absoluteUrl(m.src),
            contentUrl: absoluteUrl(m.video!.src),
            // The video is published with the update that carries its date; no date is guessed.
            ...(videoDate(m.id) ? { uploadDate: videoDate(m.id) } : {}),
            inLanguage: lang === "hi" ? "hi-IN" : "en-IN",
          }))}
      />
    </>
  );
}
