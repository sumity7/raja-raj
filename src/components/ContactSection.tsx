import { getDict } from "@/content/ui";
import type { Lang } from "@/lib/i18n";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SocialLinks } from "./SocialLinks";

/** Enquiry section, used on the home page and on /contact. */
export function ContactSection({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const d = getDict(lang);
  return (
    <section id="contact" aria-labelledby={compact ? undefined : "contact-title"} aria-label={compact ? d.contact.title : undefined} className="section bg-paper">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          {!compact && (
            <SectionHeading
              id="contact-title"
              title={d.sections.contactTitle}
              lead={d.sections.contactLead}
            />
          )}

          <div className={compact ? "" : "mt-8 border-t border-line pt-6"}>
            <p className="label">{d.contact.social}</p>
            <div className="-ml-2 mt-1">
              <SocialLinks iconClassName="h-5 w-5" linkClassName="text-ink" />
            </div>
          </div>
          <p className="mt-6 text-sm text-muted">{d.contact.note}</p>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.08}>
          <div className="border border-line bg-white p-6 sm:p-9">
            <ContactForm copy={d.contact.form} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
