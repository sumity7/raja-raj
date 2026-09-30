import type { Metadata } from "next";
import { locales, localePath, type L, type Lang } from "./i18n";
import { absoluteUrl, site } from "./site";

const ogLocale: Record<Lang, string> = { en: "en_IN", hi: "hi_IN" };

type PageMeta = {
  lang: Lang;
  /** Route without language prefix, e.g. "/about/heritage". "" is home. */
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  /** Use the title as-is instead of applying the "%s | Name" template. */
  absoluteTitle?: boolean;
  publishedTime?: string;
};

/** Shortens text at a word boundary so titles and descriptions are not cut off in search results. */
function clip(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const at = cut.lastIndexOf(" ");
  return (at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[\s,;:–-]+$/, "") + "…";
}

export function buildMetadata({
  lang,
  path,
  title,
  description,
  image = "/images/og/og-default.jpg",
  type = "website",
  absoluteTitle = false,
  publishedTime,
}: PageMeta): Metadata {
  // The page template adds the person's name to titles, so leave room for it.
  title = clip(title, absoluteTitle ? 70 : 44);
  description = clip(description, 158);
  const canonical = localePath(lang, path);
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, localePath(l, path)]),
  );
  languages["x-default"] = localePath("en", path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name[lang],
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: image, width: 1200, height: 630, alt: site.name[lang] }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbLd(lang: Lang, crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(localePath(lang, crumb.path)),
    })),
  };
}

export function webPageLd(lang: Lang, path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(localePath(lang, path))}#webpage`,
    url: absoluteUrl(localePath(lang, path)),
    name,
    description,
    inLanguage: lang === "hi" ? "hi-IN" : "en-IN",
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#person` },
  };
}

export function websiteLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: absoluteUrl(localePath(lang)),
    name: site.name[lang],
    inLanguage: ["en-IN", "hi-IN"],
    publisher: { "@id": `${site.url}/#person` },
  };
}

export function personLd(lang: Lang, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name[lang],
    alternateName: [site.name.en, site.name.hi, site.alias.en, site.alias.hi, ...site.otherNames],
    url: absoluteUrl(localePath(lang)),
    image: absoluteUrl("/images/profile/portrait-head.webp"),
    description,
    alumniOf: { "@type": "CollegeOrUniversity", name: "B.I.T., Ranchi" },
    memberOf: { "@type": "Organization", name: "Bharatiya Janata Party" },
    homeLocation: {
      "@type": "Place",
      name: "Jhandi Raj, Nighasan, Kheri, Uttar Pradesh, India",
    },
    sameAs: site.socials.map((s) => s.href),
  };
}

export function articleLd(opts: {
  lang: Lang;
  path: string;
  headline: L;
  description: L;
  date?: string;
  image?: string;
}) {
  const { lang, path, headline, description, date, image } = opts;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: headline[lang],
    description: description[lang],
    ...(date ? { datePublished: date } : {}),
    inLanguage: lang === "hi" ? "hi-IN" : "en-IN",
    mainEntityOfPage: absoluteUrl(localePath(lang, path)),
    author: { "@id": `${site.url}/#person` },
    publisher: { "@id": `${site.url}/#person` },
    image: absoluteUrl(image ?? "/images/og/og-default.jpg"),
  };
}
