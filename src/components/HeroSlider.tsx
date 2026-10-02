"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { HeroScene, PersonHalo } from "@/components/HeroScene";
import { heroSlides } from "@/content/heroSlides";
import { localePath, tr, type Lang } from "@/lib/i18n";

const INTERVAL = 7000;

const text = {
  en: { prev: "Previous slide", next: "Next slide", pause: "Pause slideshow", play: "Play slideshow", go: "Go to slide", scroll: "Scroll to explore", meta: ["Kheri", "Public life", "Community", "Updates"], region: "Featured highlights" },
  hi: { prev: "पिछली स्लाइड", next: "अगली स्लाइड", pause: "स्लाइड रोकें", play: "स्लाइड चलाएँ", go: "स्लाइड पर जाएँ", scroll: "नीचे देखें", meta: ["खीरी", "सार्वजनिक जीवन", "समाज", "अपडेट"], region: "मुख्य झलकियाँ" },
};

const arrow =
  "absolute top-[66%] z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-ink/20 bg-paper/70 text-ink backdrop-blur-sm transition duration-200 hover:scale-105 hover:border-saffron-deep hover:bg-paper hover:text-saffron-deep lg:top-1/2";

/**
 * Home hero: three slides filling the first screen under the header. On wide screens the words sit
 * on the left and the portrait on the right, standing in the slide's own setting; on small screens
 * the words come first and the portrait takes the rest of the height. Autoplay pauses on hover and
 * focus, and is off for visitors who prefer reduced motion.
 */
export function HeroSlider({ lang, siteName }: { lang: Lang; siteName: string }) {
  const hi = lang === "hi";
  const t = text[lang];
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const [reduced, setReduced] = useState(false);
  const count = heroSlides.length;
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  const running = playing && !held && !reduced;
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [running, index, go]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(index - 1);
    else if (e.key === "ArrowRight") go(index + 1);
  };

  const caps = hi ? "" : "uppercase tracking-[0.22em]";
  const moving = playing && !reduced;

  const counter = (
    <>
      <span>
        <span className="text-saffron-deep">{heroSlides[index].number}</span> / {String(count).padStart(2, "0")}
      </span>
      <span aria-hidden="true" className="relative hidden h-px w-12 overflow-hidden bg-ink/20 sm:block">
        <span
          key={index}
          className="absolute inset-0 origin-left bg-saffron"
          style={
            moving
              ? { animation: `hero-progress ${INTERVAL}ms linear forwards`, animationPlayState: held ? "paused" : "running" }
              : { transform: "scaleX(1)" }
          }
        />
      </span>
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-label={moving ? t.pause : t.play}
        className="grid h-9 w-9 place-items-center rounded-full border border-ink/20 transition-colors hover:border-saffron-deep hover:text-saffron-deep lg:h-7 lg:w-7"
      >
        {moving ? <Pause className="h-3 w-3" aria-hidden="true" /> : <Play className="h-3 w-3" aria-hidden="true" />}
      </button>
    </>
  );

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-label={t.region}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node | null)) setHeld(false);
      }}
      // The header is 4.5rem tall on small screens and 7.5rem (strip + bar) from lg up.
      className="relative h-[calc(100svh-4.6rem)] min-h-[34rem] md:h-[calc(100svh-7.1rem)] overflow-hidden bg-paper lg:h-[calc(100svh-7.6rem)] lg:max-h-[62rem] lg:min-h-[32rem]"
    >
      <h1 className="sr-only">{siteName}</h1>

      {heroSlides.map((s, i) => {
        const state = i === index ? "active" : i < index ? "before" : "after";
        const active = state === "active";
        const title = s.title[lang];
        const wide = s.person.fit === "wide";
        return (
          <div
            key={s.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${count}`}
            aria-hidden={!active}
            inert={!active}
            data-state={state}
            className="group/s absolute inset-0 flex flex-col transition-[opacity,visibility] duration-[900ms] ease-out data-[state=after]:invisible data-[state=before]:invisible data-[state=after]:opacity-0 data-[state=before]:opacity-0 motion-reduce:duration-300 lg:block"
          >
            <HeroScene slide={s} />

            {/* Words */}
            <div className="relative z-10 shrink-0 px-5 pt-5 sm:px-10 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-[50%] lg:items-center lg:px-0 lg:pl-16 lg:pt-0 xl:pl-24 2xl:pl-[calc((100vw-90rem)/2+6rem)]">
              <div
                className={`max-w-[36rem] translate-y-5 opacity-0 transition-[opacity,transform] duration-[800ms] ease-out group-data-[state=active]/s:translate-y-0 group-data-[state=active]/s:opacity-100 motion-reduce:translate-y-0 ${
                  active ? "delay-150" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg font-semibold text-saffron-deep">{s.number}</span>
                  <p className={`text-xs font-semibold text-saffron-deep ${caps}`}>{tr(s.eyebrow, lang)}</p>
                </div>

                <h2
                  className={`display mt-3 text-ink lg:mt-5 ${
                    hi
                      ? "text-[clamp(2.3rem,10vw,3.4rem)] lg:text-[clamp(3.2rem,min(5vw,10svh),5.8rem)]"
                      : "uppercase text-[clamp(1.9rem,9vw,3rem)] lg:text-[clamp(3rem,min(4.8vw,9.5svh),5.6rem)] lg:leading-[1.02]"
                  }`}
                >
                  {title.map((line, n) => (
                    <span
                      key={line}
                      className="block max-w-full translate-y-3 opacity-0 transition-[opacity,transform] duration-[900ms] ease-out group-data-[state=active]/s:translate-y-0 group-data-[state=active]/s:opacity-100 motion-reduce:translate-y-0"
                      style={{ transitionDelay: active ? `${250 + n * 110}ms` : "0ms" }}
                    >
                      {line}
                    </span>
                  ))}
                </h2>
                {s.subtitle && (
                  <p className="mt-2 text-lg [@media(max-height:44rem)_and_(max-width:1023px)]:hidden font-medium text-ink-2 lg:mt-3 lg:text-[1.3rem]">{tr(s.subtitle, lang)}</p>
                )}
                <p className="mt-3 max-w-[27rem] text-base leading-relaxed text-ink-2 [@media(max-height:44rem)_and_(max-width:1023px)]:hidden lg:mt-5 lg:text-[1.0625rem]">
                  {tr(s.description, lang)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5 lg:mt-7 lg:gap-3">
                  <Link href={localePath(lang, s.primary.href)} className="btn btn-primary group/b rounded-sm !min-h-11 !px-4 sm:!px-6">
                    {tr(s.primary.label, lang)}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover/b:translate-x-1" />
                  </Link>
                  <Link href={localePath(lang, s.secondary.href)} className="btn btn-ghost group/b rounded-sm border-ink/40 !min-h-11 !px-4 sm:!px-6">
                    {tr(s.secondary.label, lang)}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover/b:translate-x-1" />
                  </Link>
                </div>
                <dl className={`mt-7 hidden border-t border-ink/20 pt-4 [@media(min-height:46rem)]:xl:block ${wide ? "max-w-[29rem]" : "max-w-[34rem]"}`}>
                  <dt className={`mb-3 text-[0.6875rem] font-semibold text-saffron-deep ${caps}`}>{tr(s.snapshot.title, lang)}</dt>
                  <dd className="grid grid-cols-3 gap-x-5">
                    {s.snapshot.rows.map((row) => (
                      <span key={row.k.en} className="block border-l border-saffron/60 pl-3">
                        <span className={`block text-[0.6875rem] font-semibold text-ink/60 ${caps}`}>{tr(row.k, lang)}</span>
                        <span className="mt-1 block text-[0.9rem] leading-snug text-ink">{tr(row.v, lang)}</span>
                      </span>
                    ))}
                  </dd>
                </dl>
              </div>
            </div>

            {/* Portrait */}
            <div
              className={`relative z-10 mt-1 flex min-h-0 flex-1 translate-x-[30px] items-end opacity-0 transition-[opacity,translate,transform] duration-[1100ms] ease-out group-data-[state=active]/s:translate-x-0 group-data-[state=active]/s:opacity-100 group-data-[state=before]/s:-translate-x-5 motion-reduce:translate-x-0 lg:absolute lg:mt-0 lg:flex-none ${
                active ? "delay-300 motion-reduce:delay-0" : ""
              } ${
                wide
                  ? "justify-end lg:bottom-[calc(3rem-4.5%)] lg:right-0 lg:h-[calc(100%-4.5rem+20%)] lg:max-h-[60rem] lg:w-[62%] 2xl:right-[max(0px,calc((100vw-90rem)/2-4rem))]"
                  : `justify-center ${s.id === "profile" ? "lg:bottom-[calc(3rem-30%)]" : "lg:bottom-[calc(3rem-20%)]"} lg:h-[calc(100%-4rem+20%)] lg:max-h-[60rem] lg:w-[38%] lg:justify-end lg:right-[2%] 2xl:right-[calc((100vw-90rem)/2+7rem)]`
              }`}
            >
              {wide ? (
                <Image
                  src={s.person.src}
                  alt={tr(s.person.alt, lang)}
                  width={s.person.width}
                  height={s.person.height}
                  loading="lazy"
                  sizes="(min-width: 1024px) 62vw, 100vw"
                  className="h-full w-full select-none object-cover object-[52%_bottom] lg:object-contain lg:object-right-bottom"
                />
              ) : (
                <div className="relative h-full max-w-full" style={{ aspectRatio: `${s.person.width} / ${s.person.height}` }}>
                  <PersonHalo id={s.id} />
                  <Image
                    src={s.person.src}
                    alt={tr(s.person.alt, lang)}
                    width={s.person.width}
                    height={s.person.height}
                    priority={i === 0}
                    loading={i === 0 ? "eager" : "lazy"}
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="relative h-full w-full select-none object-contain object-bottom drop-shadow-[0_14px_22px_rgba(45,30,15,0.18)]"
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Previous / next, centred on the hero */}
      <button type="button" onClick={() => go(index - 1)} aria-label={t.prev} className={`${arrow} left-2 sm:left-4`}>
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>
      <button type="button" onClick={() => go(index + 1)} aria-label={t.next} className={`${arrow} right-2 sm:right-4 md:right-16`}>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>

      {/* Vertical indicator, wide screens */}
      <ol className="absolute left-5 top-[16%] z-20 hidden flex-col items-center gap-2 lg:flex xl:left-8">
        {heroSlides.map((s, i) => (
          <li key={s.id} className="flex flex-col items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="h-6 w-px bg-ink/25" />}
            <button
              type="button"
              onClick={() => go(i)}
              aria-label={`${t.go} ${i + 1}`}
              aria-current={i === index}
              className={`flex flex-col items-center gap-1.5 text-xs font-semibold tabular-nums transition-colors ${
                i === index ? "text-saffron-deep" : "text-ink/45 hover:text-ink"
              }`}
            >
              {i === index && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-saffron" />}
              {s.number}
            </button>
          </li>
        ))}
      </ol>

      {/* Counter, progress and pause: top-right pill on small screens, part of the bottom bar on wide ones */}
      <div className="absolute right-4 top-3 z-20 flex items-center gap-3 rounded-full bg-paper/75 py-1.5 pl-4 pr-1.5 text-xs font-semibold tabular-nums text-ink backdrop-blur-sm sm:right-6 lg:hidden">
        {counter}
      </div>

      {/* Bottom bar: editorial meta line on the left, counter and scroll cue on the right */}
      <div className="absolute inset-x-0 bottom-0 z-20 hidden h-12 items-center justify-between border-t border-ink/20 bg-paper pl-16 pr-[14.5rem] lg:flex xl:pl-24 2xl:pl-[calc((100vw-90rem)/2+6rem)]">
        <ul className={`flex items-center gap-4 text-[0.6875rem] font-semibold text-ink/60 ${caps}`}>
          {t.meta.map((m, n) => (
            <li key={m} className="flex items-center gap-4">
              {n > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-saffron" />}
              {m}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 text-xs font-semibold tabular-nums text-ink">
          <a
            href="#after-hero"
            className={`inline-flex items-center gap-1.5 text-[0.6875rem] text-ink/60 transition-colors hover:text-saffron-deep ${caps}`}
          >
            {t.scroll}
            <ArrowDown className="h-3 w-3" aria-hidden="true" />
          </a>
          <span aria-hidden="true" className="h-3 w-px bg-ink/25" />
          {counter}
        </div>
      </div>
      <div id="after-hero" className="absolute bottom-0" aria-hidden="true" />
    </section>
  );
}
