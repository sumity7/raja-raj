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

        {/* Digital experience partner: a rounded partner badge, not a full-width box. */}
        <div className="mt-14 flex sm:justify-end">
          <a
            href={site.praib.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full max-w-md items-center justify-between gap-4 rounded-full border border-white/25 bg-white/[0.03] py-3 pl-6 pr-3 transition-[border-color,background-color] duration-300 hover:border-saffron/70 hover:bg-white/[0.07] sm:w-auto sm:min-w-[24rem] sm:gap-10 sm:pl-9"
          >
            <span className="min-w-0">
              <span className="block text-[0.8125rem] font-semibold uppercase tracked text-white/60">
                {d.footer.creditLabel}
              </span>
              <span className="mt-1 block whitespace-nowrap text-[1.1rem] font-bold leading-tight text-white min-[380px]:text-xl sm:text-[1.6rem]">
                {site.praib.name}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-saffron min-[380px]:h-14 min-[380px]:w-14 text-saffron transition-[background-color,color,transform] duration-300 group-hover:rotate-12 group-hover:scale-105 group-hover:bg-saffron group-hover:text-ink sm:h-16 sm:w-16"
            >
              <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:-rotate-12 sm:h-7 sm:w-7" />
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

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
