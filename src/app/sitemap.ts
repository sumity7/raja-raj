import type { MetadataRoute } from "next";
import { locales, localePath } from "@/lib/i18n";
import { allRoutes } from "@/lib/nav";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return allRoutes().flatMap((route) =>
    locales.map((lang) => ({
      url: absoluteUrl(localePath(lang, route)),
      lastModified,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route.split("/").length > 2 ? 0.7 : 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(localePath(l, route))])),
      },
    })),
  );
}
