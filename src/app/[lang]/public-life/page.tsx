import type { Metadata } from "next";
import { HeroPhoto, PageHero } from "@/components/PageHero";
import { heroImages } from "@/content/heroImages";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { UpdateCard } from "@/components/UpdateCard";
import { communityFaith, publicConnect, publicWork, regionalIssues } from "@/content/publicLife";
import { updateCategories, updates } from "@/content/updates";
import { getDict } from "@/content/ui";
import { localePath, tr } from "@/lib/i18n";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PATH = "/public-life";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const d = getDict(lang);
  return buildMetadata({ lang, path: PATH, title: d.publicLife.title, description: d.publicLife.description });
}

export default async function PublicLifePage({ params }: LangParams) {
  const lang = await getLang(params);
  const d = getDict(lang);
  const p = d.publicLife;

  const connectUpdates = updates.filter((u) => u.category === "public-connect");
  const index = [
    { id: publicWork.id, title: publicWork.title },
    { id: regionalIssues.id, title: regionalIssues.title },
    { id: communityFaith.id, title: communityFaith.title },
    ...(connectUpdates.length > 0
      ? [{ id: publicConnect.id, title: updateCategories["public-connect"] }]
      : []),
  ];

  return (
    <>
      <PageHero
        lang={lang}
        meta={site.place[lang]}
        visual={<HeroPhoto image={heroImages.publicLife} lang={lang} />}
        path={PATH}
        title={p.title}
        lead={p.lead}
        description={p.description}
        crumbs={[{ name: p.title, path: PATH }]}
      />

      <div className="section shell grid gap-12 lg:grid-cols-12 lg:gap-20">
        <nav aria-label={p.onIndex} className="lg:col-span-3">
          <div className="border-t border-line lg:sticky lg:top-32">
            <p className="label pt-4">{p.onIndex}</p>
            <ul className="mt-3 space-y-3">
              {index.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="font-semibold hover:text-saffron-deep">
                    {tr(item.title, lang)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="space-y-20 lg:col-span-9">
          <Reveal>
            <section id={publicWork.id} aria-labelledby="pw-title">
              <h2 id="pw-title" className="h-section text-[clamp(1.75rem,3.4vw,2.5rem)]">
                {tr(publicWork.title, lang)}
              </h2>
              <div className="prose-ed mt-6 text-ink-2">
                {publicWork.body.map((t) => (
                  <p key={t.en}>{tr(t, lang)}</p>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section id={regionalIssues.id} aria-labelledby="ri-title">
              <h2 id="ri-title" className="h-section text-[clamp(1.75rem,3.4vw,2.5rem)]">
                {tr(regionalIssues.title, lang)}
              </h2>
              <p className="mt-6 max-w-2xl text-ink-2">{tr(regionalIssues.intro, lang)}</p>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {regionalIssues.issues.map((issue) => (
                  <li key={issue.title.en} className="grid gap-2 py-7 sm:grid-cols-[18rem_1fr] sm:gap-10">
                    <h3 className="h-card">{tr(issue.title, lang)}</h3>
                    <p className="text-ink-2">{tr(issue.body, lang)}</p>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section id={communityFaith.id} aria-labelledby="cf-title">
              <h2 id="cf-title" className="h-section text-[clamp(1.75rem,3.4vw,2.5rem)]">
                {tr(communityFaith.title, lang)}
              </h2>
              <p className="mt-6 max-w-2xl text-ink-2">{tr(communityFaith.body, lang)}</p>
              <Link href={localePath(lang, "/about/heritage#gifts")} className="link-arrow mt-6">
                {d.nav.heritage}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </section>
          </Reveal>

          {connectUpdates.length > 0 && (
            <Reveal>
              <section id={publicConnect.id} aria-labelledby="pcn-title">
                <h2 id="pcn-title" className="h-section text-[clamp(1.75rem,3.4vw,2.5rem)]">
                  {tr(updateCategories["public-connect"], lang)}
                </h2>
                <p className="mt-6 max-w-2xl text-ink-2">{tr(publicConnect.intro, lang)}</p>
                <div className="mt-10 grid gap-10">
                  {connectUpdates.map((u) => (
                    <UpdateCard
                      key={u.slug}
                      update={u}
                      lang={lang}
                      readMore={d.updates.readMore}
                      variant="feature"
                    />
                  ))}
                </div>
              </section>
            </Reveal>
          )}
        </div>
      </div>
    </>
  );
}
