import type { L } from "./i18n";

export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  name: {
    en: "Raja Raj Rajeshwar Singh",
    hi: "राजा राज राजेश्वर सिंह",
  } satisfies L,
  alias: { en: "Jhandi-Raj", hi: "झंडी-राज" } satisfies L,
  otherNames: ["Kunwar Raj Rajeshwar Singh", "कुँवर राज राजेश्वर सिंह", "Raja Rajeshwar Singh", "Raj Rajeshwar Singh"],
  place: {
    en: "Jhandi Raj, Nighasan, District Kheri",
    hi: "झंडी राज, निघासन, जनपद खीरी",
  } satisfies L,
  socials: [
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/krRRSinghbjp/",
      handle: "krRRSinghbjp",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/rajarajrajeshwarsingh/",
      handle: "@rajarajrajeshwarsingh",
    },
  ],
  praib: {
    name: "PRAIB Advisors LLP",
    href: "https://praibadvisors.com/",
  },
} as const;

export const absoluteUrl = (path: string) => `${site.url}${path}`;
