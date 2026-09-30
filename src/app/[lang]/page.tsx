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
import { SocialSection } from "@/components/SocialSection";
import { Updates } from "@/components/Updates";
import { getDict } from "@/content/ui";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata, webPageLd } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  return buildMetadata({
    lang,
    path: "",
    absoluteTitle: true,
    title:
      lang === "hi"
        ? `${site.name.hi} (झंडी-राज) | आधिकारिक वेबसाइट`
        : `${site.name.en} (Jhandi-Raj) | Official Website`,
    description:
      lang === "hi"
        ? "खीरी जनपद के झंडी राज परिवार से राजा राज राजेश्वर सिंह की आधिकारिक प्रोफ़ाइल: जीवन परिचय, परिवार एवं विरासत, राजनीतिक यात्रा और सार्वजनिक जीवन।"
        : "Official profile of Raja Raj Rajeshwar Singh of the Jhandi Raj family, Kheri: biography, family and heritage, political journey and public life.",
  });
}

export default async function HomePage({ params }: LangParams) {
  const lang = await getLang(params);
  const d = getDict(lang);
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
      <SocialSection lang={lang} />
      <ContactSection lang={lang} />
      <JsonLd data={webPageLd(lang, "", site.name[lang], d.hero.lead)} />
    </>
  );
}
