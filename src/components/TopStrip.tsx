import { getDict } from "@/content/ui";
import type { Lang } from "@/lib/i18n";
import { SocialLinks } from "./SocialLinks";

export function TopStrip({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <div className="hidden bg-ink text-white/85 md:block">
      <div className="shell flex h-10 items-center justify-between text-[0.8125rem]">
        <p className="tracking-wide">{d.topStrip}</p>
        <SocialLinks iconClassName="h-4 w-4" linkClassName="!h-9 !w-9 text-white/80" />
      </div>
    </div>
  );
}
