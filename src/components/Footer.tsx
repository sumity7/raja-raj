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
                        <span className="ml-2 text-white/70 group-hover:text-saffron">
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
              <span className="text-sm text-white/70">{d.language}</span>
              <LanguageSwitcher lang={lang} label={d.switchTo} variant="dark" />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/75">
            © {year} {site.name[lang]}. {d.footer.rights}
          </p>

          {/* Digital experience partner: a small rounded badge level with the copyright line. */}
          <a
            href={site.praib.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-fit items-center gap-4 rounded-full border border-white/25 bg-white/[0.03] py-1.5 pl-4 pr-1.5 transition-[border-color,background-color] duration-300 hover:border-saffron/70 hover:bg-white/[0.07]"
          >
            <span className="min-w-0">
              <span className="block text-[0.625rem] font-semibold uppercase tracked text-white/75">
                {d.footer.creditLabel}
              </span>
              <span className="block whitespace-nowrap text-sm font-bold leading-tight text-white">
                {site.praib.name}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-saffron text-saffron transition-[background-color,color] duration-300 group-hover:bg-saffron group-hover:text-ink"
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
