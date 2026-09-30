import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { getDict } from "@/content/ui";
import { type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { latestVideos } from "@/lib/youtube";
import { FacebookFeed } from "./FacebookFeed";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const date = (iso: string, lang: Lang) =>
  new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));

/** Latest posts from Facebook (its own scrolling panel) and latest videos from YouTube. */
export async function SocialFeed({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const videos = await latestVideos(5);
  const [first, ...rest] = videos;

  return (
    <section aria-labelledby="feed-title" className="section bg-white">
      <div className="shell">
        <Reveal>
          <SectionHeading id="feed-title" title={d.feed.title} lead={d.feed.lead} />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Facebook */}
          <Reveal className="lg:col-span-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="h-card">{d.feed.facebook}</h3>
              <a
                href={site.feeds.facebookPage}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow"
              >
                {d.feed.facebookOpen}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
            <div className="border border-line">
              <FacebookFeed
                pageUrl={site.feeds.facebookPage}
                title={`${d.feed.facebook} – ${site.name[lang]}`}
                loading={d.feed.facebookLoading}
              />
            </div>
            <p className="mt-3 text-sm text-muted">{d.feed.facebookNote}</p>
          </Reveal>

          {/* YouTube */}
          <Reveal className="lg:col-span-7" delay={0.08}>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="h-card">{d.feed.youtube}</h3>
              <a
                href={site.socials.find((s) => s.id === "youtube")?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow"
              >
                {d.feed.youtubeOpen}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>

            {first ? (
              <>
                <a
                  href={`https://www.youtube.com/watch?v=${first.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <span className="relative block aspect-video overflow-hidden bg-ink">
                    <Image
                      src={first.thumbnail}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 56vw, 92vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-saffron text-ink ring-8 ring-white/25 transition-transform duration-300 group-hover:scale-110">
                        <Play aria-hidden="true" className="ml-1 h-7 w-7" fill="currentColor" />
                      </span>
                    </span>
                  </span>
                  <span className="mt-4 block text-sm text-muted">{date(first.published, lang)}</span>
                  <span className="mt-1 block text-xl font-semibold leading-snug group-hover:text-saffron-deep">
                    {first.title}
                  </span>
                  <span className="sr-only">
                    {d.feed.watch} (opens in a new tab)
                  </span>
                </a>

                {rest.length > 0 && (
                  <ul className="mt-8 divide-y divide-line border-y border-line">
                    {rest.map((v) => (
                      <li key={v.id}>
                        <a
                          href={`https://www.youtube.com/watch?v=${v.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-4 py-4"
                        >
                          <span className="relative block aspect-video w-32 shrink-0 overflow-hidden bg-ink sm:w-40">
                            <Image
                              src={v.thumbnail}
                              alt=""
                              fill
                              sizes="160px"
                              className="object-cover"
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm text-muted">{date(v.published, lang)}</span>
                            <span className="mt-0.5 block font-semibold leading-snug group-hover:text-saffron-deep">
                              {v.title}
                            </span>
                            <span className="sr-only">(opens in a new tab)</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <p className="border border-line p-6 text-ink-2">{d.feed.empty}</p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
