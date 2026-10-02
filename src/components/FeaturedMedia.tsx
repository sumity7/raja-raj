import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredVideo } from "@/content/media";
import { getDict } from "@/content/ui";
import { localePath, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { VideoCard } from "./VideoCard";

/** Featured video on the home page. Renders nothing unless a featured video exists. */
export function FeaturedMedia({ lang }: { lang: Lang }) {
  const item = featuredVideo();
  if (!item) return null;
  const d = getDict(lang);
  return (
    <section
      id="media"
      aria-labelledby="recent-title"
      className="section on-dark bg-ink text-white"
    >
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="recent-title" title={d.sections.recentTitle} />
          <Link href={localePath(lang, "/media#videos")} className="link-arrow">
            {d.sections.viewMedia}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal className="mt-8" delay={0.08}>
          <VideoCard
            item={item}
            lang={lang}
            variant="feature"
            dark
            playLabel={d.media.play}
            closeLabel={d.media.close}
          />
        </Reveal>
      </div>
    </section>
  );
}
