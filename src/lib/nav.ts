import type { Dict } from "@/content/ui";
import { media } from "@/content/media";
import { publishedUpdates, updates } from "@/content/updates";

export type NavChild = { label: string; href: string };
export type NavItem = { id: string; label: string; href?: string; children?: NavChild[] };

/**
 * Navigation is built only from pages that have real content behind them.
 * Updates appears once at least one verified update has been published.
 */
export function buildNav(d: Dict): NavItem[] {
  const n = d.nav;
  const hasPublicConnect = updates.some((u) => u.category === "public-connect");
  const mediaChildren: NavChild[] = [
    ...(media.some((m) => m.video) ? [{ label: n.videos, href: "/media#videos" }] : []),
    ...(media.some((m) => !m.video) ? [{ label: n.photos, href: "/media#photos" }] : []),
  ];
  const items: NavItem[] = [
    { id: "home", label: n.home, href: "/" },
    {
      id: "about",
      label: n.about,
      href: "/about",
      children: [
        { label: n.biography, href: "/about#biography" },
        { label: n.education, href: "/about#education" },
        { label: n.politicalJourney, href: "/about#journey" },
        { label: n.milestones, href: "/about#milestones" },
        { label: n.heritage, href: "/about/heritage" },
      ],
    },
    {
      id: "public-life",
      label: n.publicLife,
      href: "/public-life",
      children: [
        { label: n.publicWork, href: "/public-life#public-work" },
        { label: n.regionalIssues, href: "/public-life#regional-issues" },
        { label: n.communityFaith, href: "/public-life#community-faith" },
        ...(hasPublicConnect ? [{ label: n.publicConnect, href: "/public-life#public-connect" }] : []),
      ],
    },
    mediaChildren.length > 1
      ? { id: "media", label: n.media, href: "/media", children: mediaChildren }
      : { id: "media", label: n.media, href: "/media" },
  ];
  if (publishedUpdates().length > 0) {
    items.push({ id: "updates", label: n.updates, href: "/updates" });
  }
  items.push({ id: "contact", label: n.contact, href: "/contact" });
  return items;
}

/** Every indexable route, without the language prefix. Used by the sitemap. */
export function allRoutes(): string[] {
  const routes = [
    "",
    "/about",
    "/about/heritage",
    "/public-life",
    "/media",
    "/contact",
    "/privacy",
    "/terms",
  ];
  if (publishedUpdates().length > 0) {
    routes.push("/updates", ...publishedUpdates().map((u) => `/updates/${u.slug}`));
  }
  return routes;
}
