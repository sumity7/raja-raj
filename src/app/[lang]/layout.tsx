import type { Metadata, Viewport } from "next";
import { Eczar, Karma } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDict } from "@/content/ui";
import { isLang, locales, type Lang } from "@/lib/i18n";
import { homeSeo } from "@/content/seo";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { personLd, websiteLd } from "@/lib/seo";
import { TopStrip } from "@/components/TopStrip";
import { Navbar } from "@/components/Navbar";
import { SocialRail } from "@/components/SocialRail";
import { Footer } from "@/components/Footer";
import { AssistantLoader } from "@/components/AssistantLoader";
import { ScrollManager } from "@/components/ScrollManager";
import { reloadToTopScript } from "@/lib/scrollScript";

// Eczar for headings, Karma for everything else. Both cover Latin and Devanagari,
// so English and Hindi use the same two families.
const eczar = Eczar({
  subsets: ["latin", "devanagari"],
  variable: "--font-eczar",
  display: "swap",
  weight: ["500", "600", "700"],
});
const karma = Karma({
  subsets: ["latin", "devanagari"],
  variable: "--font-karma",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const name = site.name[lang];
  return {
    metadataBase: new URL(site.url),
    title: {
      default: homeSeo.title[lang],
      template: `%s | ${name}`,
    },
    description: homeSeo.description[lang],
    applicationName: name,
    authors: [{ name }],
    robots: { index: true, follow: true },
    // Set GOOGLE_SITE_VERIFICATION to the token Search Console gives for the "HTML tag" method.
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
      : {}),
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#faf6ef",
  width: "device-width",
  initialScale: 1,
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const d = getDict(lang);

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${eczar.variable} ${karma.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: reloadToTopScript }} />
        <ScrollManager />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          {d.skip}
        </a>
        <TopStrip lang={lang} />
        <Navbar lang={lang} />
        <SocialRail />
        <main id="main" className="page-in">
          {children}
        </main>
        <Footer lang={lang} />
        <AssistantLoader lang={lang} />
        <JsonLd data={[websiteLd(lang, homeSeo.description[lang]), personLd(lang, d.biography.lead)]} />
      </body>
    </html>
  );
}
