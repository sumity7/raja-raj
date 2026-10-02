import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeritageTimeline } from "@/components/HeritageTimeline";
import { HeroPortrait, PageHero } from "@/components/PageHero";
import { PoliticalJourney } from "@/components/PoliticalJourney";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { heroImages } from "@/content/heroImages";
import { milestones } from "@/content/journey";
import { biography, quickFacts } from "@/content/profile";
import { getDict } from "@/content/ui";
import { localePath, tr } from "@/lib/i18n";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const PATH = "/about";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const d = getDict(lang);
  return buildMetadata({
    lang,
    path: PATH,
    title: d.nav.about,
    description: d.biography.description,
  });
}

/**
 * One continuous page: who he is, where he comes from, his background, his journey and
 * his public involvement. The old Biography, Political Journey and Milestones pages now
 * live here as sections and redirect to it.
 */
export default async function AboutPage({ params }: LangParams) {
  const lang = await getLang(params);
  const d = getDict(lang);
  const m = d.milestones;

  const entries = milestones.map((e) => ({
    year: e.year === "17th century" && lang === "hi" ? "17वीं सदी" : e.year,
    kind: e.kind,
    title: tr(e.title, lang),
    body: tr(e.body, lang),
  }));

  return (
    <>
      <PageHero
        lang={lang}
        path={PATH}
        crumbs={[{ name: d.nav.about, path: PATH }]}
        eyebrow={d.nav.about}
        title={site.name[lang]}
        lead={d.biography.lead}
        description={d.biography.description}
        meta={site.place[lang]}
        visual={<HeroPortrait image={heroImages.portrait} lang={lang} />}
      />

      {/* Who he is, his background and education */}
      <div
        id="biography"
        className="section shell grid gap-14 lg:grid-cols-12 lg:gap-20"
      >
        <div className="lg:col-span-8">
          {biography.map((section, i) => (
            <Reveal key={section.id} className={i > 0 ? "mt-14" : ""}>
              <section id={section.id} aria-labelledby={`${section.id}-title`}>
                <h2 id={`${section.id}-title`} className="h-section text-[clamp(1.75rem,3.4vw,2.5rem)]">
                  {tr(section.title, lang)}
                </h2>
                <div className="prose-ed mt-5 text-ink-2">
                  {section.body.map((p) => (
                    <p key={p.en}>{tr(p, lang)}</p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <aside className="lg:col-span-4" aria-label={d.biography.title}>
          <div className="border-t border-line lg:sticky lg:top-32">
            <dl className="divide-y divide-line">
              {quickFacts.map((f) => (
                <div key={f.label.en} className="py-5">
                  <dt className="label">{tr(f.label, lang)}</dt>
                  <dd className="mt-1.5 text-lg">{tr(f.value, lang)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      {/* His journey */}
      <PoliticalJourney lang={lang} />

      {/* Dated milestones */}
      <section id="milestones" aria-labelledby="milestones-title" className="section bg-paper">
        <div className="shell">
          <SectionHeading id="milestones-title" title={m.title} lead={m.lead} />
          <div className="mt-12">
            <HeritageTimeline
              entries={entries}
              copy={{ all: m.all, family: m.family, father: m.father, filter: m.filter }}
            />
          </div>
        </div>
      </section>

      {/* Where to go next */}
      <section aria-label={d.biography.alsoSee} className="border-t border-line bg-white py-14">
        <div className="shell flex flex-wrap gap-x-12 gap-y-4">
          {[
            { href: "/about/heritage", label: d.nav.heritage },
            { href: "/public-life", label: d.nav.publicLife },
          ].map((l) => (
            <Link key={l.href} href={localePath(lang, l.href)} className="link-arrow">
              {l.label}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
