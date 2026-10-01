import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { father, ownJourney, ownRoles } from "@/content/journey";
import { getDict } from "@/content/ui";
import { localePath, tr, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Timeline, TimelineItem } from "./Timeline";

/**
 * Two clearly separated tracks: his own roles, and his father's dated record.
 * `preview` adds the section heading and trims the copy for the home page.
 */
export function PoliticalJourney({
  lang,
  preview = false,
}: {
  lang: Lang;
  preview?: boolean;
}) {
  const d = getDict(lang);
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="section bg-sand/60"
    >
      <div className="shell">
        <Reveal className="mb-12">
          <SectionHeading
            id="journey-title"
            title={d.sections.journey}
            lead={preview ? d.sections.journeyLead : tr(ownJourney[0], lang)}
          />
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* His own record */}
          <Reveal>
            <p className="label">{d.journey.own}</p>
            <h3 className="h-card mt-2 text-[1.5rem]">{d.journey.ownLead}</h3>
            <ul className="mt-7 divide-y divide-line border-y border-line">
              {ownRoles.map((role) => (
                <li key={role.title.en} className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <p className="font-display text-lg font-semibold">{tr(role.title, lang)}</p>
                  <p className="text-ink-2">{tr(role.body, lang)}</p>
                </li>
              ))}
            </ul>
            {preview && (
              <Link href={localePath(lang, "/about#journey")} className="link-arrow mt-8">
                {d.sections.readJourney}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            )}
          </Reveal>

          {/* His father's record */}
          <Reveal delay={0.08} className="border border-line bg-white p-6 sm:p-8">
            <p className="label">{d.journey.fatherLabel}</p>
            <h3 className="h-card mt-2 text-[1.5rem]">{tr(father.name, lang)}</h3>
            <p className="mt-2 text-sm text-muted">{d.journey.fatherNote}</p>
            {!preview && <p className="mt-5 max-w-xl text-ink-2">{tr(father.intro, lang)}</p>}

            <div className="mt-7">
              <Timeline>
                {father.points.map((p, i) => (
                  <TimelineItem key={p.year} last={i === father.points.length - 1} className="pb-8">
                    <p className="font-display text-2xl font-bold text-saffron-deep">{p.year}</p>
                    <p className="mt-1 font-display text-lg font-semibold">{tr(p.title, lang)}</p>
                    <p className="mt-1 text-[0.95rem] text-ink-2">{tr(p.body, lang)}</p>
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
