import Image from "next/image";
import Link from "next/link";
import { localePath, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

/** The approved logo: lotus and name in one horizontal mark. */
export function Logo({ lang }: { lang: Lang }) {
  const name = site.name[lang];
  return (
    <Link
      href={localePath(lang)}
      aria-label={`${name} – ${lang === "hi" ? "मुख्य पृष्ठ" : "home"}`}
      className="block shrink-0"
    >
      <Image
        src="/images/logo/logo.webp"
        alt={name}
        width={1575}
        height={394}
        sizes="(min-width: 1024px) 240px, 190px"
        loading="eager"
        className="h-11 w-auto transition-[height] duration-300 lg:h-[3.7rem] lg:group-data-[scrolled=true]/header:h-12"
      />
    </Link>
  );
}
