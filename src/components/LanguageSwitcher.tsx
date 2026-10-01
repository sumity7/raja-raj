"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Lang } from "@/lib/i18n";

const labels: Record<Lang, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  hi: { short: "हिं", full: "हिन्दी" },
};

/** Swaps the language segment of the current path, so the visitor stays on the same page. */
export function LanguageSwitcher({
  lang,
  label,
  variant = "light",
}: {
  lang: Lang;
  label: string;
  variant?: "light" | "dark";
}) {
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/(en|hi)(?=\/|$)/, "");

  return (
    <nav aria-label={label} className="flex items-center text-sm font-bold">
      {locales.map((l, i) => {
        const active = l === lang;
        return (
          <span key={l} className="flex items-center">
            {i > 0 && (
              <span aria-hidden="true" className={variant === "dark" ? "text-white/30" : "text-line"}>
                |
              </span>
            )}
            <Link
              href={`/${l}${rest}`}
              hrefLang={l}
              lang={l}
              aria-current={active ? "true" : undefined}
              className={`flex min-h-11 items-center px-3 transition-colors ${
                active
                  ? variant === "dark"
                    ? "text-saffron"
                    : "text-saffron-deep"
                  : variant === "dark"
                    ? "text-white/70 hover:text-white"
                    : "text-muted hover:text-ink"
              }`}
            >
              <span className="sm:hidden">{labels[l].short}</span>
              <span className="hidden sm:inline">{labels[l].full}</span>
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
