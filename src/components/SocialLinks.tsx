import { site } from "@/lib/site";
import { socialIcons } from "./icons";

/** Inline row of official social icons. Only accounts listed in site.socials are shown. */
export function SocialLinks({
  className = "",
  iconClassName = "h-[18px] w-[18px]",
  linkClassName = "",
}: {
  className?: string;
  iconClassName?: string;
  linkClassName?: string;
}) {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {site.socials.map((s) => {
        const Icon = socialIcons[s.id as keyof typeof socialIcons];
        return (
          <li key={s.id}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.label} (opens in a new tab)`}
              className={`inline-flex h-11 w-11 items-center justify-center transition-colors hover:text-saffron ${linkClassName}`}
            >
              <Icon className={iconClassName} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
