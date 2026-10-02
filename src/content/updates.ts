import type { L } from "@/lib/i18n";

export type UpdateCategory =
  | "public-connect"
  | "public-activities"
  | "events"
  | "meetings"
  | "social-work"
  | "development"
  | "press"
  | "announcements";

export type UpdateImage = {
  src: string;
  width: number;
  height: number;
  alt: L;
  caption?: L;
  /** CSS object-position for the cropped card view, e.g. "40% 50%". */
  position?: string;
};

export type Update = {
  slug: string;
  /** Shown first on the home page and in the Updates list, with a "Featured" tag. */
  featured?: boolean;
  category: UpdateCategory;
  /** ISO yyyy-mm-dd. Left out when the date is not known; nothing is guessed. */
  date?: string;
  title: L;
  summary: L;
  /** Fuller description shown as the lead on the detail page; the card uses `summary`. */
  description?: L;
  body: L[];
  location?: L;
  /** Primary photograph, used on cards and at the top of the article. */
  image?: UpdateImage;
  /** Photograph for the top of the Updates page, when it should differ from `image`. */
  heroImage?: UpdateImage;
  /** Further photographs shown after the article text. */
  gallery?: UpdateImage[];
  /** Id of a video in content/media.ts that belongs to this update. */
  videoId?: string;
};

export const updateCategories: Record<UpdateCategory, L> = {
  "public-connect": { en: "Public Connect", hi: "जनसंपर्क" },
  "public-activities": { en: "Public Activities", hi: "जन-गतिविधियाँ" },
  events: { en: "Events", hi: "कार्यक्रम" },
  meetings: { en: "Meetings", hi: "बैठकें" },
  "social-work": { en: "Social Work", hi: "सामाजिक कार्य" },
  development: { en: "Development", hi: "विकास" },
  press: { en: "Press", hi: "प्रेस" },
  announcements: { en: "Announcements", hi: "घोषणाएँ" },
};

/**
 * Add verified updates here. While this list is empty the Updates section is
 * hidden from the navigation, the home page and the sitemap.
 */
export const updates: Update[] = [
  {
    slug: "jasnagar-flood-affected-areas-visit-relief-kit-distribution",
    category: "social-work",
    featured: true,
    videoId: "jasnagar-visit",
    title: {
      en: "Visit to Flood-Affected Areas, Inspection of River Erosion and Relief Kit Distribution",
      hi: "बाढ़ प्रभावित क्षेत्रों का भ्रमण, कटान का मुआयना एवं बाढ़ पीड़ित परिवारों को राहत सामग्री वितरण",
    },
    summary: {
      en: "Inspected river erosion and the flood situation at Jasnagar with the District Magistrate, the Nighasan Sub-Divisional Magistrate and Irrigation Department officials, and distributed relief kits among flood-affected families in Jhandi and Naya Pind.",
      hi: "जसनगर में जिलाधिकारी, उपजिलाधिकारी निघासन और सिंचाई विभाग के अधिकारियों के साथ मोहाना नदी के कटान एवं बाढ़ का मुआयना, तथा झण्डी और नया पिंड में बाढ़ प्रभावित परिवारों के बीच राहत किट वितरण।",
    },
    location: { en: "Jasnagar, Jhandi, Naya Pind", hi: "जसनगर, झण्डी, नया पिंड" },
    body: [
      {
        en: "Visited Jasnagar in the Nighasan Assembly area to assess the severe erosion caused by the Mohana River and review the flood situation on the ground, along with District Magistrate Shri Anjani Kumar Singh Ji, Nighasan Sub-Divisional Magistrate Shri Yaduveer Singh Ji and officials from the Irrigation Department. During the visit, the situation of families affected by flooding and river erosion was observed and their local concerns were discussed with the concerned officials.",
        hi: "निघासन विधानसभा क्षेत्र के जसनगर में मोहाना नदी से हो रहे भीषण कटान एवं बाढ़ की स्थिति का मौके पर पहुंचकर जिलाधिकारी श्री अंजनी कुमार सिंह जी, उपजिलाधिकारी निघासन श्री यदुवीर सिंह जी तथा सिंचाई विभाग के अधिकारियों के साथ मुआयना किया। इस दौरान बाढ़ एवं नदी कटान से प्रभावित ग्रामीणों की स्थिति को करीब से जाना तथा प्रभावित क्षेत्रों में उत्पन्न परिस्थितियों पर अधिकारियों के साथ चर्चा की।",
      },
      {
        en: "Relief kits were distributed among families displaced by the floods in the Jhandi area. Relief kits were also distributed among flood-affected families in Naya Pind village of Khairtiya.",
        hi: "बाढ़ के कारण विस्थापित हुए परिवारों तक राहत सामग्री पहुंचाने के क्रम में झण्डी क्षेत्र में पहुंचकर प्रभावित परिवारों के बीच राहत किट का वितरण किया गया। साथ ही खैरटिया के नया पिंड गाँव में भी बाढ़ से प्रभावित परिवारों के बीच राहत किट वितरित की गई।",
      },
      {
        en: "The situation and concerns of affected residents were heard directly, including difficulties related to shelter, food and other basic necessities. The administration was requested to ensure that families who have lost their homes or land due to flooding and river erosion are provided safe accommodation, food and essential basic facilities at the earliest.",
        hi: "इस दौरान बाढ़ एवं नदी कटान से प्रभावित ग्रामीणों की समस्याओं को सुना गया और उनके सामने उत्पन्न आवास, भोजन तथा अन्य बुनियादी आवश्यकताओं से जुड़ी परिस्थितियों को समझा गया। प्रशासन से आग्रह किया गया कि जिन ग्रामवासियों ने बाढ़ एवं कटान के कारण अपने घर और भूमि खोई है, उनके लिए शीघ्र सुरक्षित स्थानों पर आवास, भोजन तथा आवश्यक बुनियादी सुविधाओं की व्यवस्था सुनिश्चित की जाए।",
      },
      {
        en: "Relief distribution is an immediate response for affected families, while their safety, rehabilitation and access to essential facilities also require continued attention. Necessary administrative action and continued attention to the concerns of affected residents should remain a priority.",
        hi: "बाढ़ प्रभावित परिवारों तक राहत सामग्री पहुंचाना केवल तत्काल सहायता का विषय नहीं है, बल्कि प्रभावित परिवारों की सुरक्षा और पुनर्वास से जुड़ी आवश्यकताओं पर भी निरंतर ध्यान दिया जाना आवश्यक है। इस दिशा में प्रशासनिक स्तर पर आवश्यक कार्यवाही और प्रभावित ग्रामीणों की समस्याओं के समाधान के लिए लगातार प्रयास किए जाने की आवश्यकता है।",
      },
    ],
    image: {
        src: "/images/updates/jasnagar-flood-visit-1.webp",
        width: 590,
        height: 444,
        alt: {
          en: "Officials and villagers standing at the edge of a swollen river beside an eroded, damaged bank at Jasnagar",
          hi: "जसनगर में उफनती नदी के किनारे कटे हुए तट के पास खड़े अधिकारी और ग्रामीण",
        },
        caption: {
          en: "Inspecting river erosion and the flood situation on site.",
          hi: "मौके पर नदी कटान और बाढ़ की स्थिति का मुआयना।",
        },
        position: "50% 50%",
      },
    heroImage: {
        src: "/images/updates/jasnagar-flood-main.webp",
        width: 1180,
        height: 786,
        alt: {
          en: "Walking along a village lane with officials and police personnel during the visit",
          hi: "भ्रमण के दौरान गाँव की गली में अधिकारियों और पुलिसकर्मियों के साथ पैदल चलते हुए",
        },
        caption: {
          en: "On the visit to the affected area.",
          hi: "प्रभावित क्षेत्र के भ्रमण के दौरान।",
        },
        position: "50% 50%",
      },
    gallery: [
      {
        src: "/images/updates/jasnagar-flood-visit-2.webp",
        width: 590,
        height: 356,
        alt: {
          en: "Villagers standing beside sacks of relief supplies during the distribution of relief kits",
          hi: "राहत किट वितरण के दौरान राहत सामग्री के बोरों के पास खड़े ग्रामीण",
        },
        caption: {
          en: "Relief kits distributed among flood-affected families.",
          hi: "बाढ़ प्रभावित परिवारों के बीच राहत किट का वितरण।",
        },
      },
      {
        src: "/images/updates/jasnagar-flood-visit-3.webp",
        width: 590,
        height: 332,
        alt: {
          en: "A relief kit being handed over to a villager while a crowd of residents stands around",
          hi: "एक ग्रामीण को राहत किट सौंपी जा रही है, आसपास स्थानीय लोग खड़े हैं",
        },
        caption: {
          en: "Handing over a relief kit.",
          hi: "राहत किट सौंपते हुए।",
        },
      },
      {
        src: "/images/updates/jasnagar-flood-visit-4.webp",
        width: 590,
        height: 393,
        alt: {
          en: "Walking along a village lane with officials and police personnel during the visit",
          hi: "भ्रमण के दौरान गाँव की गली में अधिकारियों और पुलिसकर्मियों के साथ पैदल चलते हुए",
        },
        caption: {
          en: "On the visit to the affected area.",
          hi: "प्रभावित क्षेत्र के भ्रमण के दौरान।",
        },
      },
    ],
  },
  {
    slug: "meeting-affected-family-assuring-support-for-childs-treatment",
    category: "public-connect",
    date: "2026-09-08",
    title: {
      en: "Meeting with the Affected Family at the Medical College",
      hi: "मेडिकल कॉलेज में पीड़ित परिवार से भेंट",
    },
    summary: {
      en: "On 8 September 2026, met the family of the minor victim at the pediatric ward of the medical college and expressed solidarity with them.",
      hi: "8 सितंबर 2026 को मेडिकल कॉलेज के पीडियाट्रिक वार्ड में पीड़ित बच्ची के परिवार से भेंट कर अपनी संवेदना व्यक्त की।",
    },
    description: {
      en: "On 8 September 2026, met the family of the minor victim at the pediatric ward of the medical college and expressed solidarity with them. Spoke with the doctors involved in her treatment to understand her condition and requested continued monitoring and the best possible medical care. Immediate assistance was also extended to the family, along with an assurance of support in their pursuit of justice.",
      hi: "8 सितंबर 2026 को मेडिकल कॉलेज के पीडियाट्रिक वार्ड में दुष्कर्म की पीड़ित बच्ची के परिवार से भेंट कर अपनी संवेदना व्यक्त की। इस दौरान उपचार कर रहे चिकित्सकों से बच्ची के स्वास्थ्य की जानकारी ली और बेहतर उपचार एवं निरंतर निगरानी सुनिश्चित करने का आग्रह किया। पीड़ित परिवार को तत्काल आवश्यक सहयोग उपलब्ध कराया तथा उन्हें शीघ्र न्याय दिलाने के लिए हरसंभव सहयोग का आश्वासन दिया।",
    },
    body: [
      {
        en: "On 8 September 2026, I met the family of a minor girl receiving treatment in the Pediatric Ward of the Medical College following a serious incident. During this difficult and painful time for the family, I met the family members personally, expressed my condolences and enquired about their situation.",
        hi: "8 सितंबर 2026 को मेडिकल कॉलेज के पीडियाट्रिक वार्ड में गंभीर घटना से पीड़ित बच्ची के परिवार से भेंट की। इस कठिन और पीड़ादायक समय में परिवार के सदस्यों से आत्मीयता से मुलाकात कर उनकी स्थिति के बारे में जानकारी ली तथा उनके प्रति अपनी संवेदना व्यक्त की।",
      },
      {
        en: "During the interaction, I also sought an update regarding the child’s health and ongoing treatment. After understanding the concerns and difficulties being faced by the family, they were assured that every possible effort would be made to extend humanitarian support and assistance during this challenging period.",
        hi: "परिवार से बातचीत के दौरान बच्ची के स्वास्थ्य और चल रहे उपचार के संबंध में जानकारी प्राप्त की। परिवार की चिंता और परिस्थिति को समझते हुए उन्हें भरोसा दिलाया कि इस कठिन समय में उन्हें हरसंभव मानवीय सहयोग उपलब्ध कराने का प्रयास किया जाएगा।",
      },
      {
        en: "I subsequently met the doctors treating the child and enquired about her current health condition and progress of treatment. I requested the treating doctors to ensure that the child receives the best possible medical care, that all necessary medical facilities remain available and that her health continues to be monitored regularly throughout the course of treatment.",
        hi: "इसके पश्चात बच्ची का उपचार कर रहे चिकित्सकों से भी मुलाकात की और उसके स्वास्थ्य की वर्तमान स्थिति के बारे में जानकारी ली। चिकित्सकों से बच्ची को बेहतर से बेहतर उपचार उपलब्ध कराने, आवश्यक चिकित्सा सुविधाओं की निरंतर उपलब्धता सुनिश्चित करने तथा उसके स्वास्थ्य की लगातार निगरानी रखने का आग्रह किया, ताकि उपचार में किसी प्रकार की कमी न रहे।",
      },
      {
        en: "Keeping the family's immediate needs in mind, fruits and other immediate assistance were provided, along with financial support for their immediate requirements. The family was also assured that every possible effort would be made to support them during this difficult period.",
        hi: "पीड़ित परिवार की तत्कालिक आवश्यकताओं को ध्यान में रखते हुए उन्हें फल आदि उपलब्ध कराए गए तथा आवश्यक तत्कालिक व्यवस्था के लिए आर्थिक सहयोग भी किया गया। परिवार से बातचीत कर उन्हें इस कठिन परिस्थिति में हरसंभव सहायता और सहयोग का भरोसा दिलाया गया।",
      },
      {
        en: "The family was further assured of all possible assistance and support in pursuing justice through the appropriate process. Standing with affected families during difficult circumstances, understanding their concerns and extending humanitarian assistance when needed is an important social responsibility.",
        hi: "साथ ही परिवार को न्याय की प्रक्रिया में आवश्यक सहयोग एवं उचित माध्यम से न्याय प्राप्त करने के लिए हरसंभव सहायता का आश्वासन दिया। ऐसे कठिन समय में पीड़ित परिवार के साथ खड़ा होना, उनकी पीड़ा को समझना और आवश्यकता के समय मानवीय सहयोग उपलब्ध कराना हमारी सामाजिक जिम्मेदारी है।",
      },
      {
        en: "I pray that the child makes a speedy recovery and regains her health soon. I also pray that the family receives strength to overcome this difficult period and that they receive justice through the appropriate legal process.",
        hi: "ईश्वर से प्रार्थना है कि बच्ची को शीघ्र स्वास्थ्य लाभ मिले, वह जल्द स्वस्थ होकर अपने परिवार के बीच लौटे तथा पीड़ित परिवार को इस कठिन परिस्थिति से उबरने की शक्ति मिले। साथ ही परिवार को उचित न्याय प्राप्त हो, यही मेरी प्रार्थना है।",
      },
      {
        en: "The visit was also reported by Dainik Bhaskar (Nighasan–Kheri bureau). According to the report, he described the incident as extremely serious and said that strict action under the law must be taken against the guilty, and the family thanked him for visiting them and for the financial support.",
        hi: "इस भेंट का समाचार दैनिक भास्कर (निघासन–खीरी ब्यूरो) में भी प्रकाशित हुआ। समाचार के अनुसार उन्होंने घटना को बेहद गंभीर बताते हुए कहा कि दोषी के विरुद्ध कानून के तहत कठोर कार्रवाई होनी चाहिए, तथा परिजनों ने अस्पताल पहुँचकर हाल जानने और आर्थिक मदद देने पर उनका आभार जताया।",
      },
    ],
    image: {
      src: "/images/updates/hospital-visit-1.webp",
      width: 1600,
      height: 1204,
      alt: {
        en: "Photograph from a meeting with the affected family at the medical college.",
        hi: "मेडिकल कॉलेज में पीड़ित परिवार से मुलाकात के दौरान की तस्वीर।",
      },
      caption: {
        en: "Meeting with the affected family at the medical college.",
        hi: "मेडिकल कॉलेज में पीड़ित परिवार से भेंट।",
      },
      position: "50% 40%",
    },
    gallery: [
      {
        src: "/images/updates/hospital-visit-2.webp",
        width: 1400,
        height: 630,
        alt: {
          en: "Photograph from the pediatric ward of the medical college during the meeting with the affected family.",
          hi: "मेडिकल कॉलेज के पीडियाट्रिक वार्ड में पीड़ित परिवार से भेंट के दौरान की तस्वीर।",
        },
        caption: {
          en: "Meeting with the affected family at the pediatric ward.",
          hi: "पीडियाट्रिक वार्ड में पीड़ित परिवार से भेंट।",
        },
      },
    ],
  },
  {
    slug: "khairtiya-public-outreach-mohana-river-erosion",
    category: "public-connect",
    title: {
      en: "Public Outreach in Khairtiya: Discussion on Local Issues and Mohana River Erosion",
      hi: "खैरटिया में जनसंपर्क, स्थानीय समस्याओं एवं मोहाना नदी के कटान को लेकर संवाद",
    },
    summary: {
      en: "A discussion with Gram Pradhan Shri Pargat Singh Ji on local issues and erosion by the Mohana River, followed by an interaction with the party's sector coordinator and workers.",
      hi: "ग्राम प्रधान श्री परगट सिंह जी से स्थानीय समस्याओं और मोहाना नदी के कटान पर चर्चा, तथा पार्टी के सेक्टर संयोजक एवं कार्यकर्ताओं से संवाद।",
    },
    location: { en: "Khairtiya", hi: "खैरटिया" },
    body: [
      {
        en: "During a public outreach visit in Khairtiya, I met with Gram Pradhan Shri Pargat Singh Ji and held a detailed discussion on various local issues affecting the area. A particular focus was placed on the erosion caused by the Mohana River and the need to explore permanent and effective measures to address the issue and its impact on the surrounding area.",
        hi: "खैरटिया में जनसंपर्क के दौरान ग्राम प्रधान श्री परगट सिंह जी से आत्मीय भेंट कर क्षेत्र की विभिन्न स्थानीय समस्याओं पर विस्तार से चर्चा की। विशेष रूप से मोहाना नदी के लगातार हो रहे कटान को रोकने तथा प्रभावित क्षेत्र के लिए स्थायी एवं प्रभावी उपायों की आवश्यकता पर विचार-विमर्श किया गया।",
      },
      {
        en: "Following this interaction, I visited the residence of Shri Indresh Kumar Ji, where I had a cordial meeting over tea with party sector coordinator Shri Rahul Gupta Ji, along with Shri Ambika Rai Ji, Shri Shivkumar Ji, Shri Rohit Sharma Ji, Shri Dharmendra Singh Ji, Shri Khushiram Lodhi Ji and other party workers.",
        hi: "इसके पश्चात श्री इंद्रेश कुमार जी के आवास पर पार्टी के सेक्टर संयोजक श्री राहुल गुप्ता जी, श्री अंबिका राय जी, श्री शिवकुमार जी, श्री रोहित शर्मा जी, श्री धमेन्द्र सिंह जी एवं श्री खुशीराम लोधी जी सहित अन्य कार्यकर्ताओं से चाय पर आत्मीय संवाद हुआ।",
      },
      {
        en: "The interaction provided an opportunity to discuss local concerns, issues affecting the area and matters related to the organisation. Such direct conversations with local representatives and workers help in understanding ground-level concerns and maintaining regular public engagement.",
        hi: "इस दौरान क्षेत्र से जुड़े स्थानीय विषयों, जनसमस्याओं एवं संगठन से संबंधित विषयों पर सार्थक चर्चा हुई। कार्यकर्ताओं और स्थानीय नागरिकों से सीधे संवाद के माध्यम से क्षेत्र की परिस्थितियों को समझने और जनसरोकार से जुड़े विषयों पर चर्चा का अवसर मिला।",
      },
    ],
    image: {
      src: "/images/updates/khairtiya-outreach-1.webp",
      width: 1646,
      height: 956,
      alt: {
        en: "Party workers and local residents seated together on a veranda during the interaction in Khairtiya",
        hi: "खैरटिया में संवाद के दौरान बरामदे में एक साथ बैठे कार्यकर्ता और स्थानीय लोग",
      },
      caption: {
        en: "Interaction with party workers and local residents, Khairtiya.",
        hi: "खैरटिया में कार्यकर्ताओं और स्थानीय लोगों के साथ संवाद।",
      },
      position: "50% 40%",
    },
  },
];

/**
 * Featured updates first, then newest first. Updates without a date keep their
 * listed order after the dated ones.
 */
export const publishedUpdates = () =>
  [...updates].sort(
    (a, b) =>
      Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
      (b.date ?? "").localeCompare(a.date ?? ""),
  );
