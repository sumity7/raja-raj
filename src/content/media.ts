import type { L } from "@/lib/i18n";

export type MediaCategory = "photo" | "video" | "speech" | "press" | "document";

export type MediaItem = {
  id: string;
  category: MediaCategory;
  /** Image, or the poster frame for a video. */
  src: string;
  width: number;
  height: number;
  alt: L;
  /** Short line for cards and captions. */
  caption: L;
  /** Full title, used for videos. */
  title?: L;
  topic?: L;
  description?: L;
  video?: { src: string; type: string };
  date?: L;
  event?: L;
  location?: L;
  featured?: boolean;
  /** Photographs of meetings, shown together in the Meetings & Interactions section. */
  group?: "meeting";
  tone?: "saffron" | "sand";
};

export const mediaCategories: { id: MediaCategory; label: L }[] = [
  { id: "photo", label: { en: "Photos", hi: "चित्र" } },
  { id: "video", label: { en: "Videos", hi: "वीडियो" } },
  { id: "speech", label: { en: "Speeches", hi: "भाषण" } },
  { id: "press", label: { en: "Press", hi: "प्रेस" } },
  { id: "document", label: { en: "Documents", hi: "दस्तावेज़" } },
];

/**
 * Add event photographs, videos and press items here as they are supplied.
 * Dates are left out of the video below because none was supplied.
 */
export const media: MediaItem[] = [
  {
    id: "jasnagar-visit",
    category: "video",
    src: "/images/media/jasnagar-visit-poster.webp",
    width: 1280,
    height: 720,
    alt: {
      en: "Still from the video: Raja Raj Rajeshwar Singh with a group of people at the edge of a swollen river during the Jasnagar visit",
      hi: "वीडियो का एक दृश्य: जसनगर दौरे के दौरान उफनती नदी के किनारे लोगों के साथ राजा राज राजेश्वर सिंह",
    },
    caption: {
      en: "Flood-Affected Areas Visit & Relief Kit Distribution — Jasnagar.",
      hi: "बाढ़ प्रभावित क्षेत्रों का भ्रमण एवं राहत किट वितरण — जसनगर।",
    },
    title: {
      en: "Jasnagar Visit: Tour of Flood-Affected Areas and Distribution of Relief Kits",
      hi: "जसनगर दौरा: बाढ़ प्रभावित क्षेत्रों का भ्रमण एवं राहत किट वितरण",
    },
    topic: {
      en: "Community Service / Public Service",
      hi: "सामुदायिक सेवा / जनसेवा",
    },
    description: {
      en: "A video of a visit to flood-affected areas and the distribution of relief kits, titled “Jasnagar Visit”.",
      hi: "बाढ़ प्रभावित क्षेत्रों के भ्रमण और राहत किट वितरण का वीडियो, जिसका शीर्षक ‘जसनगर दौरा’ है।",
    },
    location: { en: "Jasnagar", hi: "जसनगर" },
    video: { src: "/videos/jasnagar-visit.mp4", type: "video/mp4" },
    featured: true,
  },
  {
    id: "meeting-yogi",
    category: "photo",
    group: "meeting",
    src: "/images/meetings/meeting-2.webp",
    width: 1152,
    height: 720,
    alt: {
      en: "Raja Raj Rajeshwar Singh in a meeting with Hon'ble Chief Minister Shri Yogi Adityanath Ji",
      hi: "माननीय मुख्यमंत्री श्री योगी आदित्यनाथ जी के साथ भेंट के दौरान राजा राज राजेश्वर सिंह",
    },
    caption: {
      en: "Meeting with Hon'ble Chief Minister Shri Yogi Adityanath Ji",
      hi: "माननीय मुख्यमंत्री श्री योगी आदित्यनाथ जी से भेंट",
    },
    title: {
      en: "Meeting with Hon'ble Chief Minister Shri Yogi Adityanath Ji",
      hi: "माननीय मुख्यमंत्री श्री योगी आदित्यनाथ जी से भेंट",
    },
    description: {
      en: "Met Hon'ble Chief Minister Shri Yogi Adityanath Ji and discussed matters related to regional development, public welfare and the needs of the local community. Various issues concerning the people of the region were discussed, with emphasis on constructive action, development and addressing matters of public interest.",
      hi: "माननीय मुख्यमंत्री श्री योगी आदित्यनाथ जी से भेंट कर क्षेत्र के विकास, जनहित से जुड़े विषयों एवं स्थानीय आवश्यकताओं पर सार्थक चर्चा की। इस दौरान क्षेत्र की जनता से जुड़े विभिन्न विषयों को प्रमुखता से रखते हुए उनके समाधान तथा विकास कार्यों को लेकर विचार-विमर्श किया। जनहित से जुड़े विषयों को प्रभावी ढंग से आगे बढ़ाने और क्षेत्र के सर्वांगीण विकास के लिए आवश्यक प्रयासों पर भी चर्चा हुई।",
    },
    tone: "sand",
  },
  {
    id: "meeting-nadda",
    category: "photo",
    group: "meeting",
    src: "/images/meetings/meeting-1.webp",
    width: 1440,
    height: 1080,
    alt: {
      en: "Raja Raj Rajeshwar Singh in a meeting with Shri J. P. Nadda",
      hi: "श्री जे. पी. नड्डा जी के साथ भेंट के दौरान राजा राज राजेश्वर सिंह",
    },
    caption: {
      en: "Meeting with Shri J. P. Nadda",
      hi: "भाजपा के राष्ट्रीय अध्यक्ष श्री जे. पी. नड्डा जी से भेंट",
    },
    title: {
      en: "Meeting with Shri J. P. Nadda",
      hi: "भाजपा के राष्ट्रीय अध्यक्ष श्री जे. पी. नड्डा जी से भेंट",
    },
    description: {
      en: "Met Shri J. P. Nadda and discussed various matters related to the region and public welfare. The interaction also covered organizational matters, regional development and important issues concerning the local community, with a focus on taking matters of public interest forward.",
      hi: "भाजपा के राष्ट्रीय अध्यक्ष श्री जे. पी. नड्डा जी से भेंट कर क्षेत्र एवं जनहित से जुड़े विभिन्न विषयों पर चर्चा की। इस अवसर पर संगठनात्मक विषयों, क्षेत्र के विकास तथा जनता से जुड़े महत्वपूर्ण मुद्दों पर भी सार्थक संवाद हुआ। जनसेवा से जुड़े विषयों को प्रभावी रूप से आगे बढ़ाने तथा क्षेत्र की आवश्यकताओं को उचित मंच तक पहुंचाने को लेकर विचार-विमर्श किया गया।",
    },
    tone: "sand",
  },
  {
    id: "jasnagar-flood-visit-1",
    category: "photo",
    src: "/images/updates/jasnagar-flood-visit-1.webp",
    width: 590,
    height: 444,
    alt: {
      en: "Officials and villagers standing at the edge of a swollen river beside an eroded, damaged bank at Jasnagar",
      hi: "जसनगर में उफनती नदी के किनारे कटे हुए तट के पास खड़े अधिकारी और ग्रामीण",
    },
    caption: {
      en: "Inspecting river erosion and the flood situation",
      hi: "नदी कटान और बाढ़ की स्थिति का मुआयना",
    },
    event: { en: "Flood-affected areas visit", hi: "बाढ़ प्रभावित क्षेत्रों का भ्रमण" },
    tone: "sand",
  },
  {
    id: "jasnagar-flood-visit-2",
    category: "photo",
    src: "/images/updates/jasnagar-flood-visit-2.webp",
    width: 590,
    height: 356,
    alt: {
      en: "Villagers standing beside sacks of relief supplies during the distribution of relief kits",
      hi: "राहत किट वितरण के दौरान राहत सामग्री के बोरों के पास खड़े ग्रामीण",
    },
    caption: {
      en: "Relief kits distributed among flood-affected families",
      hi: "बाढ़ प्रभावित परिवारों के बीच राहत किट का वितरण",
    },
    event: { en: "Flood-affected areas visit", hi: "बाढ़ प्रभावित क्षेत्रों का भ्रमण" },
    tone: "sand",
  },
  {
    id: "jasnagar-flood-visit-3",
    category: "photo",
    src: "/images/updates/jasnagar-flood-visit-3.webp",
    width: 590,
    height: 332,
    alt: {
      en: "A relief kit being handed over to a villager while a crowd of residents stands around",
      hi: "एक ग्रामीण को राहत किट सौंपी जा रही है, आसपास स्थानीय लोग खड़े हैं",
    },
    caption: {
      en: "Handing over a relief kit",
      hi: "राहत किट सौंपते हुए",
    },
    event: { en: "Flood-affected areas visit", hi: "बाढ़ प्रभावित क्षेत्रों का भ्रमण" },
    tone: "sand",
  },
  {
    id: "jasnagar-flood-visit-4",
    category: "photo",
    src: "/images/updates/jasnagar-flood-visit-4.webp",
    width: 590,
    height: 393,
    alt: {
      en: "Walking along a village lane with officials and police personnel during the visit",
      hi: "भ्रमण के दौरान गाँव की गली में अधिकारियों और पुलिसकर्मियों के साथ पैदल चलते हुए",
    },
    caption: {
      en: "On the visit to the affected area",
      hi: "प्रभावित क्षेत्र के भ्रमण के दौरान",
    },
    event: { en: "Flood-affected areas visit", hi: "बाढ़ प्रभावित क्षेत्रों का भ्रमण" },
    tone: "sand",
  },
  {
    id: "khairtiya-outreach-1",
    category: "photo",
    src: "/images/updates/khairtiya-outreach-1.webp",
    width: 1646,
    height: 956,
    alt: {
      en: "A group discussion under a thatched-roof, open-sided shelter during the public outreach in Khairtiya",
      hi: "खैरटिया में जनसंपर्क के दौरान फूस की छत वाले खुले ढाँचे के नीचे समूह चर्चा",
    },
    caption: {
      en: "Discussion under a thatched-roof shelter",
      hi: "फूस की छत वाले ढाँचे के नीचे संवाद",
    },
    event: { en: "Public outreach", hi: "जनसंपर्क" },
    location: { en: "Khairtiya", hi: "खैरटिया" },
    tone: "sand",
  },
  {
    id: "portrait-head",
    category: "photo",
    src: "/images/profile/portrait-head.webp",
    width: 1100,
    height: 1075,
    alt: {
      en: "Portrait of Raja Raj Rajeshwar Singh in a red waistcoat and white kurta",
      hi: "लाल जैकेट और सफ़ेद कुर्ते में राजा राज राजेश्वर सिंह का चित्र",
    },
    caption: { en: "Official portrait", hi: "आधिकारिक चित्र" },
    tone: "saffron",
  },
  {
    id: "portrait-full",
    category: "photo",
    src: "/images/profile/portrait-full.webp",
    width: 1024,
    height: 1536,
    alt: {
      en: "Raja Raj Rajeshwar Singh walking, in a red waistcoat and white kurta pyjama",
      hi: "लाल जैकेट और सफ़ेद कुर्ता-पायजामा में चलते हुए राजा राज राजेश्वर सिंह",
    },
    caption: { en: "Official portrait, full length", hi: "आधिकारिक चित्र, पूर्ण लंबाई" },
    tone: "sand",
  },
];

export const featuredVideo = () => media.find((m) => m.video && m.featured);

export const meetingPhotos = () => media.filter((m) => m.group === "meeting");
