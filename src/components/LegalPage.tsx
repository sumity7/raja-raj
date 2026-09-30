import { legalUpdated } from "@/content/legal";
import type { L, Lang } from "@/lib/i18n";
import { tr } from "@/lib/i18n";
import { getDict } from "@/content/ui";
import { PageHeader } from "./PageHeader";
import { formatDate } from "./UpdateCard";

export function LegalPage({
  lang,
  path,
  title,
  description,
  content,
}: {
  lang: Lang;
  path: string;
  title: string;
  description: string;
  content: { intro: L; sections: { title: L; body: L }[] };
}) {
  const d = getDict(lang);
  return (
    <>
      <PageHeader
        lang={lang}
        path={path}
        title={title}
        lead={tr(content.intro, lang)}
        description={description}
        crumbs={[{ name: title, path }]}
      />
      <div className="section shell">
        <div className="max-w-3xl divide-y divide-line border-y border-line">
          {content.sections.map((s) => (
            <section key={s.title.en} className="grid gap-2 py-7 sm:grid-cols-[18rem_1fr] sm:gap-10">
              <h2 className="h-card">{tr(s.title, lang)}</h2>
              <p className="text-ink-2">{tr(s.body, lang)}</p>
            </section>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          {d.legal.updated}: {formatDate(legalUpdated, lang)}
        </p>
      </div>
    </>
  );
}
