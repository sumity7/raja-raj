"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { MediaCategory, MediaItem } from "@/content/media";
import type { Dict } from "@/content/ui";
import type { Lang } from "@/lib/i18n";
import { VideoCard } from "./VideoCard";

type Props = {
  lang: Lang;
  items: MediaItem[];
  categories: { id: MediaCategory; label: string }[];
  copy: Dict["media"];
};

/**
 * Masonry gallery with a keyboard-accessible lightbox. Category filters only
 * appear when more than one category actually has items.
 */
export function MediaGallery({ lang, items, categories, copy }: Props) {
  const [filter, setFilter] = useState<MediaCategory | "all">("all");
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const shown = filter === "all" ? items : items.filter((i) => i.category === filter);
  const videos = shown.filter((i) => i.video);
  // The lightbox steps through still images only; videos open in their own player.
  const visible = shown.filter((i) => !i.video);
  const current = active !== null ? visible[active] : null;

  const close = useCallback(() => {
    setActive(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((i) => (i === null ? i : (i + dir + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      // Keep focus inside the dialog.
      if (e.key === "Tab") {
        const focusables = document.querySelectorAll<HTMLElement>("[data-lightbox] button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <LazyMotion features={domAnimation}>
      {categories.length > 1 && (
        <div role="group" aria-label={copy.filter} className="mb-10 flex flex-wrap gap-2">
          {[{ id: "all" as const, label: copy.all }, ...categories].map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={filter === c.id}
              onClick={() => setFilter(c.id)}
              className={`min-h-11 border px-5 text-sm font-semibold transition-colors ${
                filter === c.id
                  ? "border-ink bg-ink text-white"
                  : "border-line hover:border-saffron-deep hover:text-saffron-deep"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {videos.length > 0 && (
        <section id="videos" aria-label={copy.videos} className={visible.length > 0 ? "mb-16" : ""}>
          {visible.length > 0 && <h2 className="label mb-8">{copy.videos}</h2>}
          <div className={videos.length > 1 ? "grid gap-12 lg:grid-cols-2" : ""}>
            {videos.map((v) => (
              <VideoCard
                key={v.id}
                item={v}
                variant={videos.length === 1 ? "feature" : "card"}
                lang={lang}
                playLabel={copy.play}
                closeLabel={copy.close}
              />
            ))}
          </div>
        </section>
      )}

      {visible.length > 0 && (
        <section id="photos" aria-label={copy.photos}>
          {videos.length > 0 && <h2 className="label mb-8">{copy.photos}</h2>}
        <ul className={visible.length > 3 ? "masonry" : "grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3"}>
          {visible.map((item, i) => (
            <li key={item.id}>
              <figure>
                <button
                  type="button"
                  aria-label={`${copy.open}: ${item.caption[lang]}`}
                  onClick={(e) => {
                    lastFocus.current = e.currentTarget;
                    setActive(i);
                  }}
                  className={`group relative block w-full overflow-hidden ${
                    item.tone === "saffron"
                      ? "bg-gradient-to-br from-[#f9a75a] via-saffron to-[#d85808]"
                      : "bg-sand"
                  }`}
                  style={{ aspectRatio: `${item.width} / ${item.height}` }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt[lang]}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                    className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center bg-ink/80 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Expand aria-hidden="true" className="h-4 w-4" />
                  </span>
                </button>
                <figcaption className="mt-3 text-sm text-ink-2">
                  <span className="font-semibold">{item.caption[lang]}</span>
                  {[item.date?.[lang], item.event?.[lang], item.location?.[lang]]
                    .filter(Boolean)
                    .map((meta) => (
                      <span key={meta} className="text-muted">
                        {" · "}
                        {meta}
                      </span>
                    ))}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        </section>
      )}

      {mounted &&
        createPortal(
      <AnimatePresence>
        {current && (
          <m.div
            data-lightbox
            role="dialog"
            aria-modal="true"
            aria-label={current.caption[lang]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex flex-col bg-ink/[0.97] text-white"
            onClick={close}
          >
            <div className="flex items-center justify-between px-5 py-4" onClick={(e) => e.stopPropagation()}>
              <p className="text-sm text-white/70" aria-live="polite">
                {(active ?? 0) + 1} {copy.counter} {visible.length}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label={copy.close}
                className="flex h-11 w-11 items-center justify-center border border-white/30 hover:bg-white hover:text-ink"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
              {visible.length > 1 && (
                <button
                  type="button"
                  aria-label={copy.previous}
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center border border-white/30 bg-ink/60 hover:bg-white hover:text-ink sm:left-4"
                >
                  <ChevronLeft aria-hidden="true" className="h-6 w-6" />
                </button>
              )}
              <div
                className="relative h-full w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  key={current.id}
                  src={current.src}
                  alt={current.alt[lang]}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              {visible.length > 1 && (
                <button
                  type="button"
                  aria-label={copy.next}
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center border border-white/30 bg-ink/60 hover:bg-white hover:text-ink sm:right-4"
                >
                  <ChevronRight aria-hidden="true" className="h-6 w-6" />
                </button>
              )}
            </div>

            <p className="px-5 py-5 text-center text-sm text-white/85" onClick={(e) => e.stopPropagation()}>
              {current.caption[lang]}
              {[current.date?.[lang], current.event?.[lang], current.location?.[lang]]
                .filter(Boolean)
                .map((meta) => (
                  <span key={meta} className="text-white/55">
                    {" · "}
                    {meta}
                  </span>
                ))}
            </p>
          </m.div>
        )}
      </AnimatePresence>,
          document.body,
        )}
    </LazyMotion>
  );
}
