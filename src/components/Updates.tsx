import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { publishedUpdates } from "@/content/updates";
import { getDict } from "@/content/ui";
import { localePath, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { UpdateCard } from "./UpdateCard";

/**
 * Latest updates for the home page. A featured update leads in the large layout;
 * the rest follow as cards. Renders nothing until an update is published.
 */
export function Updates({ lang }: { lang: Lang }) {
  const latest = publishedUpdates().slice(0, 3);
  if (latest.length === 0) return null;
  const d = getDict(lang);
  const lead = latest[0].featured || latest.length === 1 ? latest[0] : null;
  const rest = lead ? latest.slice(1) : latest;
  return (
    <section id="updates" aria-labelledby="updates-title" className="section bg-paper">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="updates-title" title={d.sections.updates} />
          <Link href={localePath(lang, "/updates")} className="link-arrow">
            {d.sections.viewUpdates}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Reveal>

        {lead && (
          <Reveal className="mt-10">
            <UpdateCard
              update={lead}
              lang={lang}
              readMore={d.updates.readMore}
              variant="feature"
              featuredLabel={d.updates.featured}
            />
          </Reveal>
        )}

        {rest.length > 0 && (
          <div className={`grid gap-10 md:grid-cols-2 lg:grid-cols-3 ${lead ? "mt-14" : "mt-10"}`}>
            {rest.map((u) => (
              <Reveal key={u.slug}>
                <UpdateCard
                  update={u}
                  lang={lang}
                  readMore={d.updates.readMore}
                  featuredLabel={d.updates.featured}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
