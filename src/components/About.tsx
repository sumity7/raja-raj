import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { biography } from "@/content/profile";
import { getDict } from "@/content/ui";
import { localePath, tr, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <section id="about" aria-labelledby="about-title" className="section bg-white">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[1/1.08] w-full max-w-md overflow-hidden bg-gradient-to-br from-[#f7822b] to-[#d85808] lg:max-w-none">
            <Image
              src="/images/profile/portrait-head.webp"
              alt={d.hero.portraitAlt.replace(/walking, /, "").replace(/चलते हुए /, "")}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-contain object-bottom"
            />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.08}>
          <SectionHeading id="about-title" title={d.sections.about} lead={d.sections.aboutLead} />
          <div className="prose-ed mt-6 text-ink-2">
            {biography[1].body.map((p) => (
              <p key={p.en}>{tr(p, lang)}</p>
            ))}
          </div>
          <Link href={localePath(lang, "/about")} className="link-arrow mt-8">
            {d.sections.readBiography}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
