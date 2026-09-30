"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSyncExternalStore } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { X } from "lucide-react";
import type { MediaItem } from "@/content/media";
import { otherLang, type Lang } from "@/lib/i18n";

/** Modal player. The <video> is only mounted while open, so it stops when closed. */
export function VideoDialog({
  item,
  lang,
  open,
  onClose,
  closeLabel,
}: {
  item: MediaItem;
  lang: Lang;
  open: boolean;
  onClose: () => void;
  closeLabel: string;
}) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const closeRef = useRef<HTMLButtonElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!mounted || !item.video) return null;
  const other = otherLang(lang);

  return createPortal(
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={item.title?.[lang] ?? item.caption[lang]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-ink/[0.97] p-3 sm:p-8"
            onClick={onClose}
          >
            <div
              className="relative my-auto w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex justify-end">
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label={closeLabel}
                  className="flex h-11 w-11 items-center justify-center border border-white/30 text-white hover:bg-white hover:text-ink"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>

              <div className="aspect-video w-full bg-black">
                <video
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  poster={item.src}
                  className="h-full w-full"
                  onError={() => setFailed(true)}
                >
                  <source src={item.video.src} type={item.video.type} />
                </video>
              </div>
              {failed && (
                <p role="alert" className="mt-3 text-sm text-white/80">
                  {lang === "hi"
                    ? "यह वीडियो अभी चलाया नहीं जा सका।"
                    : "This video could not be played right now."}
                </p>
              )}

              <div className="mt-5 max-w-3xl text-white">
                <p className="label on-dark">{item.topic?.[lang]}</p>
                <h2 className="mt-3 font-display text-xl font-bold leading-snug sm:text-2xl">
                  {item.title?.[lang]}
                </h2>
                <p lang={other} className="mt-2 text-[0.95rem] leading-snug text-white/65">
                  {item.title?.[other]}
                </p>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>,
    document.body,
  );
}
