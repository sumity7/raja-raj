import { knowledge } from "@/content/assistant";
import { gifts, heritageIntro, highlights, origins, raghubar, fort, succession } from "@/content/heritage";
import { father, milestones, ownJourney, ownRoles } from "@/content/journey";
import { publishedUpdates, updateCategories } from "@/content/updates";
import type { Lang } from "./i18n";
import { site } from "./site";
import { latestVideos } from "./youtube";

/**
 * Everything the AI assistant is allowed to know, as plain text in the visitor's language. It is
 * assembled from the same content files that build the website, so the assistant and the pages
 * can never disagree, and nothing here is invented.
 */
export async function assistantFacts(lang: Lang): Promise<string> {
  const out: string[] = [];
  const add = (title: string, lines: (string | undefined)[]) => {
    const body = lines.filter(Boolean).join("\n");
    if (body) out.push(`## ${title}\n${body}`);
  };

  add("Summary answers", knowledge().map((e) => `- ${e.answer[lang]}`));

  add("Own public journey", [
    ...ownJourney.map((p) => p[lang]),
    ...ownRoles.map((r) => `- ${r.title[lang]}: ${r.body[lang]}`),
  ]);

  add("His father", [
    `${father.name[lang]} (${father.relation[lang]}). ${father.intro[lang]}`,
    ...father.points.map((p) => `- ${p.year}: ${p.title[lang]}. ${p.body[lang]}`),
  ]);

  add("Family milestones", milestones.map((m) => `- ${m.year}: ${m.title[lang]}. ${m.body[lang]}`));

  add("Family and heritage", [
    heritageIntro[lang],
    ...origins.map((o) => `- ${o.title[lang]}: ${o.body[lang]}`),
    `${raghubar.name[lang]} (${raghubar.lifespan[lang]}), ${raghubar.relation[lang]}.`,
    ...raghubar.paragraphs.map((p) => p[lang]),
    ...gifts.map(
      (g) => `- ${g.title[lang]}: ${g.body[lang]}${g.items ? ` (${g.items.map((i) => i[lang]).join("; ")})` : ""}`,
    ),
    fort[lang],
    succession[lang],
    ...highlights.map((h) => `- ${h.figure[lang]} ${h.title[lang]}: ${h.body[lang]}`),
  ]);

  add(
    "Updates (latest first)",
    publishedUpdates().map((u) =>
      [
        `### ${u.title[lang]}`,
        `Category: ${updateCategories[u.category][lang]}. ${u.date ? `Date: ${u.date}.` : "No date is recorded."}${u.location ? ` Place: ${u.location[lang]}.` : ""}`,
        u.summary[lang],
        ...u.body.map((b) => b[lang]),
      ].join("\n"),
    ),
  );

  const videos = await latestVideos(5);
  add(
    "Latest YouTube videos",
    videos.map((v) => `- ${v.published.slice(0, 10)}: ${v.title}`),
  );

  add("Contact and social media", [
    `Place: ${site.place[lang]}.`,
    "Enquiries can be sent through the contact form on this website.",
    ...site.socials.map((s) => `- ${s.label}: ${s.handle} (${s.href})`),
  ]);

  return out.join("\n\n");
}
