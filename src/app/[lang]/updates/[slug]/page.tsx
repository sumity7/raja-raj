import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { formatDate } from "@/components/UpdateCard";
import { VideoCard } from "@/components/VideoCard";
import { media } from "@/content/media";
import { publishedUpdates, updateCategories, updates } from "@/content/updates";
import { getDict } from "@/content/ui";
import { locales, tr } from "@/lib/i18n";
import { getLang } from "@/lib/page";
import { articleLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: string; slug: string }> };

/** Keep small or tall photographs near their real size instead of stretching them across the column. */
const imageCap = (img: { width: number; height: number }) =>
  img.height > img.width * 1.4 ? 300 : img.width < 900 ? Math.round(img.width * 1.25) : undefined;

export function generateStaticParams() {
  return locales.flatMap((lang) => publishedUpdates().map((u) => ({ lang, slug: u.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lang = await getLang(params);
  const update = updates.find((u) => u.slug === slug);
  if (!update) return {};
  return buildMetadata({
    lang,
    path: `/updates/${slug}`,
    title: tr(update.title, lang),
    description: tr(update.summary, lang),
    type: "article",
    publishedTime: update.date,
    image: update.image?.src,
  });
}

export default async function UpdatePage({ params }: Props) {
  const { slug } = await params;
  const lang = await getLang(params);
  const update = updates.find((u) => u.slug === slug);
  if (!update) notFound();
  const d = getDict(lang);
  const path = `/updates/${slug}`;
  const video = update.videoId ? media.find((m) => m.id === update.videoId && m.video) : undefined;

  return (
    <>
      <PageHeader
        lang={lang}
        path={path}
        title={tr(update.title, lang)}
        lead={tr(update.description ?? update.summary, lang)}
        description={tr(update.summary, lang)}
        eyebrow={[
          tr(updateCategories[update.category], lang),
          update.date ? formatDate(update.date, lang) : null,
          update.location ? tr(update.location, lang) : null,
        ]
          .filter(Boolean)
          .join(" · ")}
        crumbs={[
          { name: d.updates.title, path: "/updates" },
          { name: tr(update.title, lang), path },
        ]}
      />
      <article className="section shell">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Photographs (and video) */}
          <div className="space-y-8 lg:col-span-7">
            {update.image && (
              <figure>
                <Image
                  src={update.image.src}
                  alt={tr(update.image.alt, lang)}
                  width={update.image.width}
                  height={update.image.height}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  loading="eager"
                  fetchPriority="high"
                  style={{ maxWidth: imageCap(update.image) }}
                  className="h-auto w-full"
                />
                {update.image.caption && (
                  <figcaption className="mt-3 text-sm text-muted">
                    {tr(update.image.caption, lang)}
                  </figcaption>
                )}
              </figure>
            )}

            {video && (
              <section aria-label={d.media.videos}>
                <VideoCard
                  item={video}
                  lang={lang}
                  variant="compact"
                  playLabel={d.media.play}
                  closeLabel={d.media.close}
                />
              </section>
            )}

            {update.gallery?.map((img) => (
              <figure key={img.src}>
                <Image
                  src={img.src}
                  alt={tr(img.alt, lang)}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  style={{ maxWidth: imageCap(img) }}
                  className="h-auto w-full"
                />
                {img.caption && (
                  <figcaption className="mt-3 text-sm text-muted">{tr(img.caption, lang)}</figcaption>
                )}
              </figure>
            ))}
          </div>

          {/* Text */}
          <div className="prose-ed fill text-[1.0625rem] leading-[1.9] text-ink-2 [text-wrap:pretty] lg:col-span-5">
            {update.body.map((p) => (
              <p key={p.en}>{tr(p, lang)}</p>
            ))}
          </div>
        </div>
      </article>
      <JsonLd
        data={articleLd({
          lang,
          path,
          headline: update.title,
          description: update.summary,
          date: update.date,
          image: update.image?.src,
        })}
      />
    </>
  );
}
