import { site } from "@/lib/site";
import { socialIcons } from "./icons";

/** Slim vertical rail of official social links, desktop only. */
export function SocialRail() {
  return (
    <aside
      aria-label="Social media"
      className="fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 min-[1400px]:block"
    >
      <ul className="flex flex-col bg-ink py-2">
        {site.socials.map((s) => {
          const Icon = socialIcons[s.id as keyof typeof socialIcons];
          return (
            <li key={s.id}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} (opens in a new tab)`}
                className="flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-saffron"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
