"use client";

import { useState } from "react";
import type { MilestoneKind } from "@/content/journey";
import type { Lang } from "@/lib/i18n";
import { Timeline, TimelineItem } from "./Timeline";

type Entry = { year: string; kind: MilestoneKind; title: string; body: string };

/** Dated timeline of family and father milestones, with a simple filter. */
export function HeritageTimeline({
  entries,
  copy,
}: {
  lang?: Lang;
  entries: Entry[];
  copy: { all: string; family: string; father: string; filter: string };
}) {
  const [filter, setFilter] = useState<"all" | MilestoneKind>("all");
  const options: { id: "all" | MilestoneKind; label: string }[] = [
    { id: "all", label: copy.all },
    { id: "family", label: copy.family },
    { id: "father", label: copy.father },
  ];
  const shown = filter === "all" ? entries : entries.filter((e) => e.kind === filter);

  return (
    <div>
      <div role="group" aria-label={copy.filter} className="mb-8 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={filter === o.id}
            onClick={() => setFilter(o.id)}
            className={`min-h-11 border px-3.5 text-sm sm:px-5 font-semibold transition-colors ${
              filter === o.id
                ? "border-ink bg-ink text-white"
                : "border-line hover:border-saffron-deep hover:text-saffron-deep"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      <Timeline>
        {shown.map((entry, i) => (
          <TimelineItem
            key={`${entry.year}-${entry.title}`}
            last={i === shown.length - 1}
            tone={entry.kind === "father" ? "ink" : "saffron"}
            className="pb-8 sm:pb-10"
          >
            <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <p className="font-display text-3xl font-bold leading-tight text-saffron-deep">{entry.year}</p>
              <div>
                <p className="label">{entry.kind === "father" ? copy.father : copy.family}</p>
                <h3 className="h-card mt-1">{entry.title}</h3>
                <p className="mt-2 max-w-xl text-ink-2">{entry.body}</p>
              </div>
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
