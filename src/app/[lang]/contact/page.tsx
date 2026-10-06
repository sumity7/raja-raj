import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { HeroContactPanel, PageHero } from "@/components/PageHero";
import { pageSeo } from "@/content/seo";
import { getDict } from "@/content/ui";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

const PATH = "/contact";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  return buildMetadata({
    lang,
    path: PATH,
    absoluteTitle: true,
    title: pageSeo.contact.title[lang],
    description: pageSeo.contact.description[lang],
  });
}

export default async function ContactPage({ params }: LangParams) {
  const lang = await getLang(params);
  const d = getDict(lang);
  return (
    <>
      <PageHero
        lang={lang}
        path={PATH}
        title={d.contact.heroTitle}
        lead={d.contact.lead}
        visual={<HeroContactPanel />}
        description={pageSeo.contact.description[lang]}
        crumbs={[{ name: d.contact.title, path: PATH }]}
      />
      <ContactSection lang={lang} compact />
    </>
  );
}
