import type { MetadataRoute } from "next";
import { updates } from "@/content/updates";
import { locales, localePath } from "@/lib/i18n";
import { allRoutes } from "@/lib/nav";
import { absoluteUrl } from "@/lib/site";

/**
 * lastModified is only given where a real date exists (an update's own date, and the newest
 * update for the pages that list updates). A build-time "now" would claim every page changed on
 * every deploy, and search engines learn to ignore such dates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const dated = updates.filter((u) => u.date).map((u) => u.date as string).sort();
  const newest = dated.at(-1);
  const modified = (route: string) => {
    const slug = route.startsWith("/updates/") ? route.slice("/updates/".length) : null;
    if (slug) return updates.find((u) => u.slug === slug)?.date;
    return ["", "/updates", "/media", "/public-life"].includes(route) ? newest : undefined;
  };

  return allRoutes().flatMap((route) =>
    locales.map((lang) => {
      const lastModified = modified(route);
      return {
        url: absoluteUrl(localePath(lang, route)),
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: route === "" || route === "/updates" ? ("weekly" as const) : ("monthly" as const),
        priority: route === "" ? 1 : route.split("/").length > 2 ? 0.7 : 0.8,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(localePath(l, route))])),
        },
      };
    }),
  );
}
