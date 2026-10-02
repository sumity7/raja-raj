import { getDict } from "@/content/ui";
import type { Lang } from "@/lib/i18n";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SocialLinks } from "./SocialLinks";

/**
 * Enquiry section, used on the home page and on /contact. On /contact the social links already sit
 * in the hero above, so the compact version is just the form and its note.
 */
export function ContactSection({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const d = getDict(lang);

  if (compact) {
    return (
      <section id="contact" aria-label={d.contact.title} className="section bg-paper">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <div className="border border-line bg-white p-5 sm:p-8">
              <ContactForm copy={d.contact.form} />
            </div>
            <p className="mt-4 text-sm text-muted">{d.contact.note}</p>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section bg-paper">
      <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            id="contact-title"
            title={d.sections.contactTitle}
            lead={d.sections.contactLead}
          />

          <div className="mt-6 border-t border-line pt-5">
            <p className="label">{d.contact.social}</p>
            <div className="-ml-2 mt-1">
              <SocialLinks iconClassName="h-5 w-5" linkClassName="text-ink" />
            </div>
          </div>
          <p className="mt-4 text-sm text-muted">{d.contact.note}</p>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.08}>
          <div className="border border-line bg-white p-5 sm:p-8">
            <ContactForm copy={d.contact.form} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
