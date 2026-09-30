import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { localePath, type Lang } from "@/lib/i18n";
import type { Crumb } from "@/lib/seo";

export function Breadcrumbs({
  lang,
  crumbs,
  label,
}: {
  lang: Lang;
  crumbs: Crumb[];
  label: string;
}) {
  return (
    <nav aria-label={label} className="crumbs text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={`${i}-${crumb.path}`} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-semibold text-ink">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link href={localePath(lang, crumb.path)} className="hover:text-saffron-deep">
                    {crumb.name}
                  </Link>
                  <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
