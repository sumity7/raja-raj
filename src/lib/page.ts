import { notFound } from "next/navigation";
import { isLang, type Lang } from "./i18n";

export type LangParams = { params: Promise<{ lang: string }> };

/** Resolve the `lang` route param, or 404 if it is not a supported language. */
export async function getLang(params: LangParams["params"]): Promise<Lang> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return lang;
}
