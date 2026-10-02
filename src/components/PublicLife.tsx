import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { publicConnect, summaries } from "@/content/publicLife";
import { updateCategories, updates } from "@/content/updates";
import { getDict } from "@/content/ui";
import { localePath, tr, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/** Plain ruled columns: no icons, no numbers, no boxes. */
export function PublicLife({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const items = updates.some((u) => u.category === "public-connect")
    ? [
        ...summaries,
        {
          id: publicConnect.id,
          title: updateCategories["public-connect"],
          text: publicConnect.summary,
        },
      ]
    : summaries;
  return (
    <section id="public-life" aria-labelledby="public-life-title" className="section bg-white">
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="public-life-title"
            title={d.sections.publicLife}
            lead={d.sections.publicLifeLead}
          />
        </Reveal>

        <ul
          className={`mt-8 grid gap-x-12 gap-y-8 border-t border-line pt-7 lg:mt-10 ${
            items.length > 3 ? "sm:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3"
          }`}
        >
          {items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.07}>
              <h3 className="h-card">{tr(item.title, lang)}</h3>
              <p className="mt-3 text-ink-2">{tr(item.text, lang)}</p>
              <Link
                href={`${localePath(lang, "/public-life")}#${item.id}`}
                className="link-arrow mt-5"
              >
                {d.sections.explore}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
