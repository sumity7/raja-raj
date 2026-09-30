import type { L } from "@/lib/i18n";

/**
 * Photographs used in the inner-page heroes. They are the same files that are already
 * published elsewhere on the site; nothing new is added to /public.
 */
export type HeroImage = {
  src: string;
  width: number;
  height: number;
  alt: L;
  position?: string;
};

export const heroImages = {
  portrait: {
    src: "/images/profile/portrait-head.webp",
    width: 1100,
    height: 1075,
    alt: {
      en: "Portrait of Raja Raj Rajeshwar Singh in a red waistcoat and white kurta",
      hi: "लाल जैकेट और सफ़ेद कुर्ते में राजा राज राजेश्वर सिंह का चित्र",
    },
  },
  publicLife: {
    src: "/images/updates/jasnagar-flood-visit-3.webp",
    width: 590,
    height: 332,
    alt: {
      en: "A relief kit being handed over to a villager while residents stand around",
      hi: "एक ग्रामीण को राहत किट सौंपी जा रही है, आसपास स्थानीय लोग खड़े हैं",
    },
  },
  yogi: {
    src: "/images/meetings/meeting-2.webp",
    width: 1152,
    height: 720,
    alt: {
      en: "Raja Raj Rajeshwar Singh in a meeting with Hon'ble Chief Minister Shri Yogi Adityanath Ji",
      hi: "माननीय मुख्यमंत्री श्री योगी आदित्यनाथ जी के साथ भेंट के दौरान राजा राज राजेश्वर सिंह",
    },
  },
} satisfies Record<string, HeroImage>;
