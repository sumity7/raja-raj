import type { Metadata } from "next";
import { About } from "@/components/About";
import { ContactSection } from "@/components/ContactSection";
import { FeaturedMedia } from "@/components/FeaturedMedia";
import { FactsBand } from "@/components/FactsBand";
import { Heritage } from "@/components/Heritage";
import { Hero } from "@/components/Hero";
import { KeyMeetings } from "@/components/KeyMeetings";
import { JsonLd } from "@/components/JsonLd";
import { PoliticalJourney } from "@/components/PoliticalJourney";
import { PublicLife } from "@/components/PublicLife";
import { SocialFeed } from "@/components/SocialFeed";
import { SocialSection } from "@/components/SocialSection";
import { Updates } from "@/components/Updates";
import { getLang, type LangParams } from "@/lib/page";
import { homeSeo } from "@/content/seo";
import { buildMetadata, profilePageLd } from "@/lib/seo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  return buildMetadata({
    lang,
    path: "",
    absoluteTitle: true,
    title: homeSeo.title[lang],
    description: homeSeo.description[lang],
  });
}

export default async function HomePage({ params }: LangParams) {
  const lang = await getLang(params);
  return (
    <>
      <Hero lang={lang} />
      <FactsBand lang={lang} />
      <About lang={lang} />
      <Heritage lang={lang} />
      <PoliticalJourney lang={lang} preview />
      <KeyMeetings lang={lang} />
      <PublicLife lang={lang} />
      <FeaturedMedia lang={lang} />
      <Updates lang={lang} />
      <SocialFeed lang={lang} />
      <SocialSection lang={lang} />
      <ContactSection lang={lang} />
      <JsonLd data={profilePageLd(lang, "", homeSeo.title[lang], homeSeo.description[lang])} />
    </>
  );
}
