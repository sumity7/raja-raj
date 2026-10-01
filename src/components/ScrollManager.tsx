"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * A new page always opens at the top. Exceptions, on purpose:
 *  - links that carry a #hash: the browser/Next scrolls to that section;
 *  - browser back/forward: the browser's own scroll restoration is left alone.
 *
 * A link to the page you are already on (Home while on Home, the logo, a footer link) does not
 * change the route, so nothing above would run. A click listener handles that case and takes the
 * visitor to the top.
 *
 * The reset runs in a layout effect, before the browser paints, so there is no
 * visible jump. `behavior: "instant"` bypasses the site's smooth scrolling.
 */
export function ScrollManager() {
  const pathname = usePathname();
  const first = useRef(true);
  const lastPop = useRef(-Infinity);

  useEffect(() => {
    const onPop = () => {
      lastPop.current = performance.now();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.hash) return;
      if (url.pathname.replace(/\/$/, "") !== window.location.pathname.replace(/\/$/, "")) return;
      const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, left: 0, behavior: calm ? "instant" : "smooth" });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (performance.now() - lastPop.current < 1500) return; // back / forward
    if (window.location.hash) return; // deep link to a section
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
