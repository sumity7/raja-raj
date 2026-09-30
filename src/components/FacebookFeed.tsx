"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Facebook's own Page plugin: a scrolling panel of the page's latest posts, like the reference.
 * It is only loaded when it scrolls near the screen, and its width follows the column, because
 * the plugin renders at a fixed width.
 */
export function FacebookFeed({
  pageUrl,
  title,
  loading,
}: {
  pageUrl: string;
  title: string;
  loading: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => setWidth(Math.max(280, Math.min(500, Math.floor(el.clientWidth))));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && setVisible(true),
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const src =
    visible && width
      ? `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pageUrl)}&tabs=timeline&width=${width}&height=640&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=false`
      : undefined;

  return (
    <div ref={box} className="relative h-[40rem] w-full max-w-[500px] bg-white">
      {!ready && (
        <p className="absolute inset-0 flex items-center justify-center text-sm text-muted" aria-live="polite">
          {loading}
        </p>
      )}
      {src && (
        <iframe
          title={title}
          src={src}
          width={width}
          height={640}
          loading="lazy"
          allow="encrypted-media"
          referrerPolicy="origin-when-cross-origin"
          onLoad={() => setReady(true)}
          className="relative block h-full w-full border-0"
        />
      )}
    </div>
  );
}
