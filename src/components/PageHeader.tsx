import type { Crumb } from "@/lib/seo";
import type { Lang } from "@/lib/i18n";
import type { ReactNode } from "react";
import { PageHero } from "./PageHero";

/** Default inner-page header, for pages that have no photograph of their own. */
export function PageHeader({
  lang,
  path,
  crumbs,
  title,
  lead,
  description,
  eyebrow,
  visual,
}: {
  lang: Lang;
  path: string;
  crumbs: Crumb[];
  title: string;
  lead?: string;
  description: string;
  eyebrow?: string;
  visual?: ReactNode;
}) {
  return (
    <PageHero
      lang={lang}
      path={path}
      crumbs={crumbs}
      title={title}
      lead={lead}
      description={description}
      eyebrow={eyebrow}
      visual={visual}
    />
  );
}
