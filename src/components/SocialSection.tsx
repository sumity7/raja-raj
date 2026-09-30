import { ArrowUpRight } from "lucide-react";
import { getDict } from "@/content/ui";
import type { Lang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { socialIcons } from "./icons";

export function SocialSection({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <section
      aria-labelledby="social-title"
      className="section on-saffron bg-saffron text-ink"
    >
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            id="social-title"
            title={d.sections.socialTitle}
            lead={d.sections.socialLead}
            leadClassName="text-ink"
          />
        </Reveal>

        <ul className="border-t border-ink lg:col-span-7">
          {site.socials.map((s, i) => {
            const Icon = socialIcons[s.id as keyof typeof socialIcons];
            return (
              <Reveal as="li" key={s.id} delay={i * 0.08} className="border-b border-ink/30">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 py-6 transition-colors hover:bg-white/25 sm:px-3"
                >
                  <span className="flex items-center gap-4">
                    <Icon className="h-6 w-6" />
                    <span>
                      <span className="block font-display text-xl font-bold">{s.label}</span>
                      <span className="block text-sm">{s.handle}</span>
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
