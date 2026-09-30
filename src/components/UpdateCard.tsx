import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { updateCategories, type Update } from "@/content/updates";
import { localePath, tr, type Lang } from "@/lib/i18n";

export function formatDate(iso: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function UpdateCard({
  update,
  lang,
  readMore,
  variant = "card",
  featuredLabel,
  headingLevel = "h3",
}: {
  update: Update;
  lang: Lang;
  readMore: string;
  /** "feature" puts the photograph beside the text on wide screens. */
  variant?: "card" | "feature";
  /** When given, an update marked `featured` shows this tag. */
  featuredLabel?: string;
  /** Use "h2" where the card sits directly under the page's h1. */
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const href = localePath(lang, `/updates/${update.slug}`);
  const feature = variant === "feature";
  // Tall or very small photographs stay on the article page; they would look soft when stretched into a card.
  const cover =
    update.image && update.image.width >= 500 && update.image.height <= update.image.width * 1.4
      ? update.image
      : null;
  const split = feature && Boolean(cover);
  return (
    <article
      className={`group ${
        split
          ? "grid items-center gap-8 border-t border-ink/60 pt-8 lg:grid-cols-12 lg:gap-14"
          : feature
            ? "border-t border-ink/60 pt-8"
            : "flex h-full flex-col border-t border-ink/60 pt-5"
      }`}
    >
      {cover && (
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className={`block overflow-hidden bg-sand ${feature ? "lg:col-span-7" : "mb-5"}`}
        >
          <Image
            src={cover.src}
            alt=""
            width={cover.width}
            height={cover.height}
            sizes={feature ? "(min-width: 1024px) 58vw, 92vw" : "(min-width: 1024px) 30vw, 90vw"}
            style={cover.position ? { objectPosition: cover.position } : undefined}
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>
      )}
      <div className={split ? "lg:col-span-5" : feature ? "max-w-3xl" : "flex flex-1 flex-col"}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          {featuredLabel && update.featured && (
            <span className="bg-saffron px-2 py-0.5 text-[0.8125rem] font-semibold text-ink">
              {featuredLabel}
            </span>
          )}
          <span className="font-semibold text-saffron-deep">
            {tr(updateCategories[update.category], lang)}
          </span>
          {update.date && (
            <>
              <span aria-hidden="true" className="hidden text-line sm:inline">
                |
              </span>
              <time dateTime={update.date} className="text-muted">
                {formatDate(update.date, lang)}
              </time>
            </>
          )}
          {update.location && (
            <>
              <span aria-hidden="true" className="hidden text-line sm:inline">
                |
              </span>
              <span className="text-muted">{tr(update.location, lang)}</span>
            </>
          )}
        </p>
        <Heading className={`h-card mt-3 ${feature ? "text-[1.65rem] leading-snug" : ""}`}>
          <Link href={href} className="hover:text-saffron-deep">
            {tr(update.title, lang)}
          </Link>
        </Heading>
        <p className={`mt-3 leading-relaxed text-ink-2 ${feature ? "" : "flex-1"}`}>
          {tr(update.summary, lang)}
        </p>
        <Link href={href} className="link-arrow mt-6 self-start">
          {readMore}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
