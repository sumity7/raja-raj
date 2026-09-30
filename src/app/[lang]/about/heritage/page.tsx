import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { fort, gifts, heritageIntro, highlights, origins, raghubar, sourceNote, succession } from "@/content/heritage";
import { getDict } from "@/content/ui";
import { tr } from "@/lib/i18n";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

const PATH = "/about/heritage";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const d = getDict(lang);
  return buildMetadata({ lang, path: PATH, title: d.heritage.title, description: d.heritage.description });
}

export default async function HeritagePage({ params }: LangParams) {
  const lang = await getLang(params);
  const d = getDict(lang);
  const h = d.heritage;

  return (
    <>
      <PageHeader
        lang={lang}
        path={PATH}
        title={h.title}
        lead={tr(heritageIntro, lang)}
        description={h.description}
        crumbs={[
          { name: d.nav.about, path: "/about" },
          { name: h.title, path: PATH },
        ]}
        visual={
          <dl className="bg-white">
            {highlights.slice(0, 3).map((f) => (
              <div key={f.title.en} className="border-b border-line px-6 py-4">
                <dt className="label">{tr(f.title, lang)}</dt>
                <dd className="mt-0.5 text-2xl font-display">{tr(f.figure, lang)}</dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* Origins */}
      <section aria-labelledby="origins-title" className="section bg-paper">
        <div className="shell">
          <Reveal>
            <h2 id="origins-title" className="h-section max-w-3xl">
              {lang === "hi" ? "चौहान वंश से खीरी तक" : "From the Chauhans to Kheri"}
            </h2>
          </Reveal>
          <ol className="mt-10 grid border-t border-line lg:grid-cols-3">
            {origins.map((o, i) => (
              <Reveal
                as="li"
                key={o.title.en}
                delay={i * 0.08}
                className="border-b border-line py-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"
              >
                <h3 className="h-card">{tr(o.title, lang)}</h3>
                <p className="mt-3 text-ink-2">{tr(o.body, lang)}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Raja Raghubar Singh */}
      <section aria-labelledby="raghubar-title" className="section on-dark bg-ink text-white">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <h2 id="raghubar-title" className="display text-[clamp(2.2rem,4.6vw,3.6rem)]">
              {tr(raghubar.name, lang)}
            </h2>
            <p className="mt-4 font-display text-3xl font-bold text-saffron">
              {tr(raghubar.lifespan, lang)}
            </p>
            <p className="mt-4 max-w-xs text-white/70">{tr(raghubar.relation, lang)}</p>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.08}>
            <div className="prose-ed space-y-0 text-[1.0625rem] leading-relaxed text-white/85">
              {raghubar.paragraphs.map((p) => (
                <p key={p.en}>{tr(p, lang)}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gifts of land */}
      <section id="gifts" aria-labelledby="gifts-title" className="section bg-paper">
        <div className="shell">
          <Reveal>
            <h2 id="gifts-title" className="h-section max-w-3xl">
              {d.sections.heritageTitle}
            </h2>
            <p className="lead mt-6 max-w-2xl text-ink-2">{h.gifts_lead}</p>
          </Reveal>

          <div className="mt-14 divide-y divide-line border-y border-line">
            {gifts.map((g) => (
              <Reveal key={g.id}>
                <article
                  id={g.id}
                  className="grid gap-4 py-10 lg:grid-cols-12 lg:gap-16"
                >
                  <h3 className="h-card text-2xl lg:col-span-5">{tr(g.title, lang)}</h3>
                  <div className="lg:col-span-7">
                    <p className="max-w-2xl text-ink-2">{tr(g.body, lang)}</p>
                    {g.items && (
                      <ul className="mt-5 grid max-w-2xl gap-x-8 gap-y-2 sm:grid-cols-1">
                        {g.items.map((item) => (
                          <li key={item.en} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-saffron"
                            />
                            <span>{tr(item, lang)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* After Raghubar Singh, the fort, sources */}
      <section aria-labelledby="after-title" className="section bg-sand/60">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 id="after-title" className="label">
              {h.after}
            </h2>
            <p className="mt-6 max-w-xl text-ink-2">{tr(succession, lang)}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="label">{h.fort}</h2>
            <p className="mt-6 max-w-xl text-ink-2">{tr(fort, lang)}</p>
            <p className="mt-10 border-t border-line pt-5 text-sm text-muted">
              <span className="font-bold text-ink">{h.sourcesLabel}: </span>
              {tr(sourceNote, lang)}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
