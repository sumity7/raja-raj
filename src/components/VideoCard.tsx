"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { MediaItem } from "@/content/media";
import { otherLang, type Lang } from "@/lib/i18n";
import { VideoDialog } from "./VideoDialog";

type Props = {
  item: MediaItem;
  lang: Lang;
  playLabel: string;
  closeLabel: string;
  /** "feature" places the text beside the poster on wide screens; "card" stacks them; "compact" shows only the poster and a one-line caption. */
  variant?: "card" | "feature" | "compact";
  dark?: boolean;
};

export function VideoCard({ item, lang, playLabel, closeLabel, variant = "card", dark = false }: Props) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus();
  }, []);
  const other = otherLang(lang);
  const title = item.title?.[lang] ?? item.caption[lang];
  const feature = variant === "feature";
  const compact = variant === "compact";

  return (
    <article
      className={feature ? "grid items-center gap-8 lg:grid-cols-12 lg:gap-14" : "flex flex-col"}
    >
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${playLabel}: ${item.caption[lang]}`}
        className={`group relative block overflow-hidden bg-ink ${feature ? "lg:col-span-7" : ""}`}
        style={{ aspectRatio: `${item.width} / ${item.height}` }}
      >
        <Image
          src={item.src}
          alt={item.alt[lang]}
          fill
          sizes={feature ? "(min-width: 1024px) 58vw, 92vw" : "(min-width: 1024px) 45vw, 92vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-saffron text-ink shadow-[0_12px_30px_-8px_rgba(0,0,0,0.6)] ring-8 ring-white/25 transition-transform duration-300 group-hover:scale-110">
            <Play aria-hidden="true" className="ml-1 h-8 w-8" fill="currentColor" />
          </span>
        </span>
        <span className="absolute bottom-4 left-4 bg-ink/85 px-3 py-1.5 text-sm font-semibold text-white">
          {playLabel}
        </span>
      </button>

      {compact ? (
        <p className="mt-3 text-sm text-muted">{item.caption[lang]}</p>
      ) : (
      <div className={feature ? "lg:col-span-5" : "mt-5"}>
        {item.topic && (
          <p className={`label ${dark ? "on-dark" : ""}`}>{item.topic[lang]}</p>
        )}
        <h3
          className={`mt-4 font-display font-bold leading-snug ${
            feature ? "text-2xl sm:text-[1.65rem]" : "text-xl"
          }`}
        >
          {title}
        </h3>
        {item.title && (
          <p lang={other} className={`mt-2 text-[0.95rem] leading-snug ${dark ? "text-white/60" : "text-muted"}`}>
            {item.title[other]}
          </p>
        )}
        {item.description && (
          <p className={`mt-4 leading-relaxed ${dark ? "text-white/80" : "text-ink-2"}`}>
            {item.description[lang]}
          </p>
        )}
        {item.location && (
          <p className={`mt-4 text-sm font-semibold ${dark ? "text-saffron" : "text-saffron-deep"}`}>
            {item.location[lang]}
          </p>
        )}
      </div>
      )}

      <VideoDialog item={item} lang={lang} open={open} onClose={close} closeLabel={closeLabel} />
    </article>
  );
}
