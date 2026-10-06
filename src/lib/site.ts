import type { L } from "./i18n";

const PRODUCTION_URL = "https://www.rajarajrajeshwarsingh.in";

/**
 * Canonical origin for every absolute URL (canonical links, hreflang, Open Graph, sitemap, robots,
 * structured data). NEXT_PUBLIC_SITE_URL overrides it, but a production build never accepts a
 * localhost, plain-http or *.vercel.app value, so a missing or wrong env var cannot leak into search.
 */
function resolveSiteUrl() {
  const fromEnv = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim().replace(/\/$/, "");
  if (!fromEnv) return PRODUCTION_URL;
  if (process.env.NODE_ENV === "production" && !/^https:\/\/(?!localhost)(?!.*\.vercel\.app)/.test(fromEnv)) {
    return PRODUCTION_URL;
  }
  return fromEnv;
}

export const site = {
  url: resolveSiteUrl(),
  name: {
    en: "Raja Raj Rajeshwar Singh",
    hi: "राजा राज राजेश्वर सिंह",
  } satisfies L,
  alias: { en: "Jhandi-Raj", hi: "झंडी-राज" } satisfies L,
  otherNames: ["Kunwar Raj Rajeshwar Singh", "कुँवर राज राजेश्वर सिंह", "Raja Rajeshwar Singh", "Raj Rajeshwar Singh"],
  place: {
    en: "Jhandi Raj, Nighasan, District Kheri",
    hi: "झंडी राज, निघासन, जनपद खीरी",
  } satisfies L,
  socials: [
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/krRRSinghbjp/",
      handle: "krRRSinghbjp",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/rajarajrajeshwarsingh/",
      handle: "@rajarajrajeshwarsingh",
    },
    {
      id: "youtube",
      label: "YouTube",
      href: "https://www.youtube.com/@RajaRajRajeshwarSingh",
      handle: "@RajaRajRajeshwarSingh",
    },
  ],
  /** Used by the "Latest from social media" section. */
  feeds: {
    facebookPage: "https://www.facebook.com/krRRSinghbjp/",
    youtubeChannelId: "UCu7nmJaNLq1msJzRRzLBheQ",
  },
  praib: {
    name: "PRAIB Advisors LLP",
    href: "https://praibadvisors.com/",
  },
} as const;

export const absoluteUrl = (path: string) => `${site.url}${path}`;
