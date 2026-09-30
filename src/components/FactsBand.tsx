import { quickFacts } from "@/content/profile";
import { getDict } from "@/content/ui";
import { tr, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/** Short introduction: four verified facts on a dark band directly under the hero. */
export function FactsBand({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <section aria-label={d.sections.introduction} className="on-dark bg-ink text-white">
      <div className="shell">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {quickFacts.map((fact, i) => (
            <Reveal
              key={fact.label.en}
              delay={i * 0.06}
              className={`border-white/15 py-8 pr-4 lg:px-8 lg:first:pl-0 ${
                i % 2 === 1 ? "border-l pl-5 sm:pl-8" : ""
              } ${i > 0 ? "lg:border-l" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""}`}
            >
              <dt className="label on-dark">{tr(fact.label, lang)}</dt>
              <dd className="mt-2.5 text-lg leading-snug sm:text-xl">
                {tr(fact.value, lang)}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
