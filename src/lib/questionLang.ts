import type { Lang } from "./i18n";

/** The language a visitor is writing in: Devanagari means Hindi, anything else English. */
export const questionLang = (text: string): Lang => (/[\u0900-\u097F]/.test(text) ? "hi" : "en");
