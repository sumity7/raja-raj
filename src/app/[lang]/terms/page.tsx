import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { terms } from "@/content/legal";
import { getDict } from "@/content/ui";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

const PATH = "/terms";

const description = (lang: "en" | "hi") =>
  lang === "hi"
    ? "इस वेबसाइट के उपयोग की शर्तें।"
    : "Terms for using this website.";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  return buildMetadata({ lang, path: PATH, title: getDict(lang).legal.terms, description: description(lang) });
}

export default async function TermsPage({ params }: LangParams) {
  const lang = await getLang(params);
  return (
    <LegalPage
      lang={lang}
      path={PATH}
      title={getDict(lang).legal.terms}
      description={description(lang)}
      content={terms}
    />
  );
}
