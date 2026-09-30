"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * A new page always opens at the top. Exceptions, on purpose:
 *  - links that carry a #hash: the browser/Next scrolls to that section;
 *  - browser back/forward: the browser's own scroll restoration is left alone.
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
