import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { HeroImage } from "@/content/heroImages";
import { getDict } from "@/content/ui";
import { localePath, tr, type Lang } from "@/lib/i18n";
import { breadcrumbLd, webPageLd, type Crumb } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumbs } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import { socialIcons } from "./icons";

/**
 * Header for every inner page: breadcrumb, title and short text on the left, and on the right
 * a visual that belongs to the page (a photograph, a collage, a portrait, a contact panel or
 * a plain architectural motif). The visuals below are the only variations; the frame around
 * them, the spacing and the type are shared.
 */
export function PageHero({
  lang,
  path,
  crumbs,
  title,
  lead,
  body,
  description,
  eyebrow,
  meta,
  points,
  visual,
}: {
  lang: Lang;
  path: string;
  crumbs: Crumb[];
  title: string;
  lead?: string;
  /** A further paragraph under the lead. */
  body?: string;
  description: string;
  /** Short label above the title. */
  eyebrow?: string;
  /** Small factual line under the text, for example the place. */
  meta?: string;
  /** Short supporting points shown as a plain list under the text. */
  points?: string[];
  visual?: ReactNode;
}) {
  const d = getDict(lang);
  const all: Crumb[] = [{ name: d.home, path: "/" }, ...crumbs];
  return (
    <header className="border-b border-line bg-sand/50">
      <div className="shell pb-10 pt-7 lg:pb-14">
        <Breadcrumbs lang={lang} crumbs={all} label={d.breadcrumbs} />
        <div className="mt-8 grid items-center gap-10 lg:min-h-[22rem] lg:grid-cols-12 lg:gap-14">
          <div className={visual ? "min-w-0 lg:col-span-7" : "min-w-0 lg:col-span-12"}>
            {eyebrow && <p className="text-sm font-semibold text-saffron-deep">{eyebrow}</p>}
            <h1 className={`h-page max-w-3xl ${eyebrow ? "mt-2" : ""}`}>{title}</h1>
            {lead && <p className="lead mt-5 max-w-2xl text-ink-2">{lead}</p>}
            {body && <p className="mt-4 max-w-2xl leading-[1.8] text-ink-2 [text-wrap:pretty]">{body}</p>}
            {points && points.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-sm font-medium text-ink-2">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-1.5 w-1.5 bg-saffron" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
            {meta && <p className="mt-6 text-sm text-muted">{meta}</p>}
          </div>
          {visual && <div className="min-w-0 lg:col-span-5">{visual}</div>}
        </div>
      </div>
      <JsonLd data={[breadcrumbLd(lang, all), webPageLd(lang, path, title, description)]} />
    </header>
  );
}

/** Wrapper for every hero visual. It only contains the image; there is no border or overlay. */
function Framed({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`overflow-hidden ${className}`}>{children}</div>;
}

/** One photograph at its natural proportions. */
export function HeroPhoto({ image, lang, sizes }: { image: HeroImage; lang: Lang; sizes?: string }) {
  return (
    <Framed>
      {/* On tablet and phone the photo is capped in height so it does not fill the whole screen;
          on desktop it keeps its natural proportions. */}
      <Image
        src={image.src}
        alt={tr(image.alt, lang)}
        width={image.width}
        height={image.height}
        sizes={sizes ?? "(min-width: 1024px) 40vw, 92vw"}
        style={image.position ? { objectPosition: image.position } : undefined}
        loading="eager"
        className="block h-auto max-h-[26rem] w-full object-cover lg:max-h-none"
      />
    </Framed>
  );
}

/** The cut-out portrait on a soft ground. */
export function HeroPortrait({ image, lang }: { image: HeroImage; lang: Lang }) {
  return (
    <Framed className="mx-auto max-w-md lg:max-w-none">
      <div className="relative aspect-[16/11] bg-peach sm:aspect-[5/4]">
        <Image
          src={image.src}
          alt={tr(image.alt, lang)}
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          loading="eager"
          className="object-contain object-bottom"
        />
      </div>
    </Framed>
  );
}

/** Where to find the person, using details already on the site. */
export function HeroContactPanel() {
  return (
    <Framed>
      <div className="bg-white p-7 sm:p-8">
        <ul className="divide-y divide-line">
          {site.socials.map((s) => {
            const Icon = socialIcons[s.id as keyof typeof socialIcons];
            return (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-3.5 transition-colors hover:text-saffron-deep"
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{s.label}</span>
                  <span className="text-sm text-muted">{s.handle}</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </Framed>
  );
}

/**
 * Media page header. A large photograph on the left and, beside it, the title, a short
 * paragraph and links to the sections below. It is its own layout because the page is an archive
 * and the photograph is the point.
 */
export function MediaHero({
  lang,
  path,
  crumbs,
  title,
  lead,
  body,
  description,
  image,
  links,
}: {
  lang: Lang;
  path: string;
  crumbs: Crumb[];
  title: string;
  lead: string;
  body: string;
  description: string;
  image: HeroImage;
  links: { label: string; href: string }[];
}) {
  const d = getDict(lang);
  const all: Crumb[] = [{ name: d.home, path: "/" }, ...crumbs];
  return (
    <header className="border-b border-line bg-sand/50">
      <div className="shell pb-10 pt-7 lg:pb-14">
        <Breadcrumbs lang={lang} crumbs={all} label={d.breadcrumbs} />
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <Framed>
              <Image
                src={image.src}
                alt={tr(image.alt, lang)}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 58vw, 92vw"
                loading="eager"
                fetchPriority="high"
                className="block h-auto w-full"
              />
            </Framed>
          </div>
          <div className="min-w-0 lg:col-span-5">
            <h1 className="h-page">{title}</h1>
            <p className="lead mt-4 text-ink-2">{lead}</p>
            <p className="mt-4 leading-[1.8] text-ink-2 [text-wrap:pretty]">{body}</p>
            <nav aria-label={title} className="mt-6 flex flex-wrap gap-3">
              {links.map((l) => (
                <Link key={l.href} href={localePath(lang, l.href)} className="btn btn-ghost">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <JsonLd data={[breadcrumbLd(lang, all), webPageLd(lang, path, title, description)]} />
    </header>
  );
}
