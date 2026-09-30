import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { meetingPhotos, type MediaItem } from "@/content/media";
import { getDict } from "@/content/ui";
import { localePath, tr, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * Each meeting is one row: the photograph in its natural proportions on the left and its
 * title and description on the right, so the text uses the width beside the image.
 * The first story's photograph is wider; nothing is laid over the images.
 */
export function KeyMeetings({ lang }: { lang: Lang }) {
  const stories = meetingPhotos();
  if (stories.length === 0) return null;
  const d = getDict(lang);

  const story = (item: MediaItem, primary: boolean) => (
    <article className="grid items-center gap-6 lg:grid-cols-12 lg:gap-12">
      <Image
        src={item.src}
        alt={item.alt[lang]}
        width={item.width}
        height={item.height}
        sizes={primary ? "(min-width: 1024px) 58vw, 92vw" : "(min-width: 1024px) 44vw, 92vw"}
        className={`h-auto w-full ${primary ? "lg:col-span-7" : "lg:col-span-5"}`}
      />
      <div className={primary ? "lg:col-span-5" : "lg:col-span-7"}>
        <h3
          className={`font-display font-semibold leading-snug ${
            primary ? "text-[1.5rem] sm:text-[1.85rem]" : "text-[1.3rem] sm:text-[1.5rem]"
          }`}
        >
          {tr(item.title ?? item.caption, lang)}
        </h3>
        {item.description && (
          <p className="mt-4 leading-[1.85] text-ink-2 [text-wrap:pretty]">
            {tr(item.description, lang)}
          </p>
        )}
      </div>
    </article>
  );

  return (
    <section id="meetings" aria-labelledby="meetings-title" className="section bg-white">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="meetings-title"
            title={d.sections.meetings}
            lead={d.sections.meetingsLead}
          />
          <Link href={localePath(lang, "/media#photos")} className="link-arrow">
            {d.sections.viewMedia}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-12 space-y-16 lg:space-y-20">
          {stories.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              {story(item, i === 0)}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
