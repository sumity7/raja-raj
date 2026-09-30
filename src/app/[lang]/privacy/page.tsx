import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacy } from "@/content/legal";
import { getDict } from "@/content/ui";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

const PATH = "/privacy";

const description = (lang: "en" | "hi") =>
  lang === "hi"
    ? "इस वेबसाइट पर भेजी गई जानकारी का उपयोग कैसे होता है।"
    : "How information sent through this website is used.";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  return buildMetadata({ lang, path: PATH, title: getDict(lang).legal.privacy, description: description(lang) });
}

export default async function PrivacyPage({ params }: LangParams) {
  const lang = await getLang(params);
  return (
    <LegalPage
      lang={lang}
      path={PATH}
      title={getDict(lang).legal.privacy}
      description={description(lang)}
      content={privacy}
    />
  );
}
