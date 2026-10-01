import { HeroSlider } from "@/components/HeroSlider";
import type { Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

/** Home hero: a three-slide masthead. The slides themselves live in content/heroSlides.ts. */
export function Hero({ lang }: { lang: Lang }) {
  return <HeroSlider lang={lang} siteName={site.name[lang]} />;
}
