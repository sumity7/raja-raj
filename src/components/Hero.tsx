import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDict } from "@/content/ui";
import { localePath, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

/**
 * Masthead. The name is one lockup in exactly two lines, "Raja Raj" over
 * "Rajeshwar Singh", set in one serif and one colour. The portrait stands on a soft
 * warm ground that continues the page colour, with no panel, rings or diagonals.
 */
export function Hero({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const hi = lang === "hi";
  const lines = hi ? ["राजा राज", "राजेश्वर सिंह"] : ["Raja Raj", "Rajeshwar Singh"];

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--paper)",
        backgroundImage:
          "linear-gradient(90deg, var(--paper) 0%, var(--paper) 46%, #f3e7d3 100%), radial-gradient(38rem 30rem at 80% 55%, rgba(255,255,255,0.7), rgba(255,255,255,0) 70%)",
        backgroundBlendMode: "normal",
      }}
    >
      <div className="shell relative grid items-end gap-0 lg:min-h-[40rem] lg:grid-cols-12 xl:min-h-[43rem]">
        <div className="min-w-0 pb-12 pt-12 sm:pt-16 lg:col-span-7 lg:pb-24 lg:pt-20">
          <p
            className={`rise text-sm font-semibold text-saffron-deep ${
              hi ? "" : "uppercase tracking-[0.2em]"
            }`}
          >
            {d.hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            aria-label={site.name[lang]}
            className={`display rise mt-5 text-saffron-deep ${
              hi
                ? "text-[clamp(2.3rem,13vw,3.6rem)] sm:text-[clamp(3.4rem,9vw,5.2rem)] lg:text-[clamp(3.4rem,5.4vw,5rem)]"
                : "uppercase text-[clamp(1.55rem,8.2vw,2.2rem)] sm:text-[clamp(2.3rem,6.4vw,3.7rem)] lg:text-[clamp(2.6rem,4.2vw,4rem)]"
            }`}
            style={{ "--d": "0.08s" } as React.CSSProperties}
          >
            {/* Two intentional lines. They may wrap on a very narrow screen, but never overflow. */}
            {lines.map((line) => (
              <span key={line} className="block max-w-full text-balance">
                {line}
              </span>
            ))}
          </h1>

          <p
            className="rise mt-4 text-[1.2rem] font-medium text-ink-2 sm:text-[1.35rem]"
            style={{ "--d": "0.18s" } as React.CSSProperties}
          >
            ({site.alias[lang]})
          </p>

          <p
            className="rise mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-ink-2 sm:text-lg"
            style={{ "--d": "0.26s" } as React.CSSProperties}
          >
            {d.hero.lead}
          </p>

          <div
            className="rise mt-8 flex flex-wrap gap-3"
            style={{ "--d": "0.34s" } as React.CSSProperties}
          >
            <Link href={localePath(lang, "/about")} className="btn btn-primary">
              {d.hero.cta}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link href={localePath(lang, "/contact")} className="btn btn-ghost">
              {d.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center lg:col-span-5">
          <Image
            src="/images/profile/portrait-full.webp"
            alt={d.hero.portraitAlt}
            width={1024}
            height={1536}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 34vw, 80vw"
            className="portrait-in relative z-10 h-[26rem] w-auto object-contain object-bottom drop-shadow-[0_18px_22px_rgba(60,30,10,0.22)] sm:h-[34rem] lg:h-[38rem] xl:h-[41rem]"
          />
        </div>
      </div>
      <div className="tricolour relative z-10" aria-hidden="true" />
    </section>
  );
}
