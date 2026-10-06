import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/** Everything is crawlable (pages, images, CSS and JS) except the API routes. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
