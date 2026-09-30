import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getDict } from "@/content/ui";
import { localePath, type Lang } from "@/lib/i18n";
import { buildNav } from "@/lib/nav";
import { site } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { socialIcons } from "./icons";

export function Footer({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const nav = buildNav(d);
  const links = nav.flatMap((item) => {
    if (!item.children) return item.href && item.href !== "/" ? [{ label: item.label, href: item.href }] : [];
    const pages = item.children.filter((c) => !c.href.includes("#") && c.href !== item.href);
    return [{ label: item.label, href: item.href ?? item.children[0].href.split("#")[0] }, ...pages];
  });
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-ink text-white/80">
      <div className="tricolour" aria-hidden="true" />
      <div className="shell pb-28 pt-16 sm:pb-24 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-3xl font-bold leading-tight text-white">
              {site.name[lang]}
            </p>
            <p className="mt-1 text-lg text-saffron">{site.alias[lang]}</p>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed">{d.footer.tagline}</p>
          </div>

          <nav aria-label={d.footer.explore} className="lg:col-span-3">
            <h2 className="label on-dark">{d.footer.explore}</h2>
            <ul className="mt-6 space-y-3 text-[0.95rem]">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={localePath(lang, l.href)} className="hover:text-saffron">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="label on-dark">{d.footer.connect}</h2>
            <ul className="mt-6 space-y-3 text-[0.95rem]">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.id as keyof typeof socialIcons];
                return (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 hover:text-saffron"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                      <span>
                        {s.label}
                        <span className="ml-2 text-white/50 group-hover:text-saffron/80">
                          {s.handle}
                        </span>
                      </span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 flex items-center gap-4">
              <span className="text-sm text-white/50">{d.language}</span>
              <LanguageSwitcher lang={lang} label={d.switchTo} variant="dark" />
            </div>
          </div>
        </div>

        <a
          href={site.praib.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-14 flex items-center justify-between gap-6 border border-white/20 px-6 py-6 transition-[border-color,background-color] duration-300 hover:border-saffron/70 hover:bg-white/[0.04] sm:px-8 sm:py-7"
        >
          <span className="min-w-0">
            <span className="block text-[0.8125rem] font-semibold uppercase tracked text-white/60">
              {d.footer.creditLabel}
            </span>
            <span className="mt-2 block text-2xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-saffron sm:text-3xl">
              {site.praib.name}
            </span>
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="h-7 w-7 shrink-0 text-saffron transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-8 sm:w-8"
          />
          <span className="sr-only">(opens in a new tab)</span>
        </a>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2 text-sm text-white/60">
            <p>
              © {year} {site.name[lang]}. {d.footer.rights}
            </p>
            <p className="flex gap-5">
              <Link href={localePath(lang, "/privacy")} className="hover:text-white">
                {d.legal.privacy}
              </Link>
              <Link href={localePath(lang, "/terms")} className="hover:text-white">
                {d.legal.terms}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
