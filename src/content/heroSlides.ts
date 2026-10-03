import type { L } from "@/lib/i18n";

/**
 * The two slides of the Home hero. Everything the slider shows lives here; nothing else on the
 * site reads this file. Links are existing routes (without the language prefix). The setting behind
 * each portrait is drawn in CSS/SVG (see HeroScene); no photograph or generated image is used.
 */
export type HeroSlide = {
  id: string;
  number: string;
  eyebrow: L;
  label: L;
  title: { en: string[]; hi: string[] };
  subtitle?: L;
  description: L;
  snapshot: { title: L; rows: { k: L; v: L }[] };
  primary: { label: L; href: string };
  secondary: { label: L; href: string };
  /**
   * wide: a landscape scene. bust: an upper-body portrait shown at the same head size as the wide
   * scene and running off the bottom edge of the hero.
   */
  person: { src: string; width: number; height: number; alt: L; fit: "wide" | "bust" };
};

export const heroSlides: HeroSlide[] = [
  {
    id: "profile",
    number: "01",
    eyebrow: { en: "Official profile", hi: "आधिकारिक प्रोफ़ाइल" },
    label: { en: "Public profile", hi: "सार्वजनिक प्रोफ़ाइल" },
    title: {
      en: ["Raja Raj", "Rajeshwar", "Singh"],
      hi: ["राजा राज", "राजेश्वर सिंह"],
    },
    subtitle: { en: "(Jhandi-Raj)", hi: "(झंडी-राज)" },
    description: {
      en: "A closer look at his background, public journey and connection with Kheri.",
      hi: "उनकी पृष्ठभूमि, सार्वजनिक यात्रा और खीरी से जुड़ाव पर एक नज़र।",
    },
    snapshot: {
      title: { en: "Profile snapshot", hi: "प्रोफ़ाइल एक नज़र में" },
      rows: [
        { k: { en: "Background", hi: "पृष्ठभूमि" }, v: { en: "Mechanical engineering", hi: "मैकेनिकल इंजीनियरिंग" } },
        { k: { en: "Roots", hi: "जड़ें" }, v: { en: "Jhandi Raj, Kheri", hi: "झंडी राज, खीरी" } },
        { k: { en: "Public focus", hi: "सार्वजनिक कार्य" }, v: { en: "Community, public engagement", hi: "समाज, जन-संपर्क" } },
      ],
    },
    primary: { label: { en: "Explore profile", hi: "प्रोफ़ाइल देखें" }, href: "/about" },
    secondary: { label: { en: "About the journey", hi: "यात्रा के बारे में" }, href: "/about#journey" },
    person: {
      src: "/images/hero/slide-1-portrait.webp",
      width: 810,
      height: 925,
      fit: "bust",
      alt: {
        en: "Raja Raj Rajeshwar Singh in a red waistcoat and white kurta",
        hi: "लाल जैकेट और सफ़ेद कुर्ते में राजा राज राजेश्वर सिंह",
      },
    },
  },
  {
    id: "journey",
    number: "02",
    eyebrow: { en: "Journey", hi: "यात्रा" },
    label: { en: "Public life & journey", hi: "सार्वजनिक जीवन एवं यात्रा" },
    title: {
      en: ["A life of", "public service"],
      hi: ["सार्वजनिक सेवा", "का जीवन"],
    },
    subtitle: { en: "(Jhandi-Raj)", hi: "(झंडी-राज)" },
    description: {
      en: "Explore the journey, public engagements and moments that have shaped his public life.",
      hi: "उनकी यात्रा, जन-संपर्क और उन पड़ावों को देखें जिन्होंने उनके सार्वजनिक जीवन को आकार दिया।",
    },
    snapshot: {
      title: { en: "Journey in brief", hi: "यात्रा संक्षेप में" },
      rows: [
        { k: { en: "Studied", hi: "शिक्षा" }, v: { en: "Mechanical engineering", hi: "मैकेनिकल इंजीनियरिंग" } },
        { k: { en: "Occupation", hi: "व्यवसाय" }, v: { en: "Agriculture", hi: "कृषि" } },
        { k: { en: "Also", hi: "साथ ही" }, v: { en: "Education sector", hi: "शिक्षा क्षेत्र" } },
      ],
    },
    primary: { label: { en: "Explore journey", hi: "यात्रा देखें" }, href: "/about#journey" },
    secondary: { label: { en: "View timeline", hi: "समय-रेखा देखें" }, href: "/about#milestones" },
    person: {
      src: "/images/hero/slide-2.webp",
      width: 982,
      height: 671,
      fit: "wide",
      alt: {
        en: "Raja Raj Rajeshwar Singh seated at a desk in a navy waistcoat, writing in a notebook",
        hi: "नीली जैकेट में मेज़ पर बैठे, नोटबुक में लिखते हुए राजा राज राजेश्वर सिंह",
      },
    },
  },
];
