import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { heritageIntro, highlights } from "@/content/heritage";
import { milestones } from "@/content/journey";
import { getDict } from "@/content/ui";
import { localePath, tr, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/** Home-page teaser for Family & Heritage. The full history lives at /about/heritage. */
export function Heritage({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const keyYears = milestones.filter((m) => ["1876", "1925–30", "1932", "2000"].includes(m.year));
  return (
    <section
      id="heritage"
      aria-labelledby="heritage-title"
      className="section on-dark bg-ink text-white"
    >
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              id="heritage-title"
              label={d.sections.heritage}
              title={d.sections.heritageTitle}
            />
            <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-white/75">
              {tr(heritageIntro, lang)}
            </p>
            <Link href={localePath(lang, "/about/heritage")} className="link-arrow mt-8">
              {d.sections.readHeritage}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Reveal>

          <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7">
            {highlights.map((h, i) => (
              <Reveal
                as="li"
                key={h.title.en}
                delay={i * 0.07}
                className="border-t border-white/20 py-7"
              >
                <p className="font-display text-3xl font-bold text-saffron sm:text-4xl">
                  {tr(h.figure, lang)}
                </p>
                <p className="mt-3 font-display text-xl font-semibold">{tr(h.title, lang)}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-white/70">
                  {tr(h.body, lang)}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>

        <ol
          aria-label={lang === "hi" ? "प्रमुख वर्ष" : "Key years"}
          className="mt-14 grid grid-cols-2 border-t border-white/20 lg:grid-cols-4"
        >
          {keyYears.map((m, i) => (
            <Reveal
              as="li"
              key={m.year}
              delay={i * 0.06}
              className={`border-white/15 py-7 pr-4 ${i % 2 === 1 ? "border-l pl-5" : ""} ${
                i > 0 ? "lg:border-l lg:pl-8" : ""
              }`}
            >
              <p className="font-display text-3xl font-bold text-saffron">{m.year}</p>
              <p className="mt-2 text-[0.95rem] leading-snug text-white/80">{tr(m.title, lang)}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
