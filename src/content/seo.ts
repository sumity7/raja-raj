import type { L } from "@/lib/i18n";

/**
 * Search-result titles and descriptions for the main pages. Each names the person first and says
 * what is on that page, so no two pages share a title. Everything stated here is already on the
 * page it describes. Titles are used as-is (no "| Name" suffix is added to them).
 */
type PageSeo = { title: L; description: L };

export const homeSeo: PageSeo = {
  title: {
    en: "Raja Raj Rajeshwar Singh | Jhandi Raj, Kheri | Official Website",
    hi: "राजा राज राजेश्वर सिंह | झंडी राज, खीरी | आधिकारिक वेबसाइट",
  },
  description: {
    en: "Official website of Raja Raj Rajeshwar Singh (Jhandi-Raj): his journey, public life, Jhandi Raj family heritage, media and updates from Kheri, Uttar Pradesh.",
    hi: "राजा राज राजेश्वर सिंह (झंडी-राज) की आधिकारिक वेबसाइट: उनकी यात्रा, सार्वजनिक जीवन, झंडी राज परिवार की विरासत, मीडिया और खीरी, उत्तर प्रदेश से ताज़ा जानकारी।",
  },
};

export const pageSeo = {
  about: {
    title: {
      en: "Raja Raj Rajeshwar Singh | Biography & Political Journey",
      hi: "राजा राज राजेश्वर सिंह | जीवन परिचय और राजनीतिक यात्रा",
    },
    description: {
      en: "Biography of Raja Raj Rajeshwar Singh (Jhandi-Raj) of Kheri: his background, education, occupation, political journey and dated milestones.",
      hi: "खीरी के राजा राज राजेश्वर सिंह (झंडी-राज) का जीवन परिचय: पृष्ठभूमि, शिक्षा, व्यवसाय, राजनीतिक यात्रा और प्रमुख पड़ाव।",
    },
  },
  heritage: {
    title: {
      en: "Raja Raj Rajeshwar Singh | Family, Heritage & Jhandi Raj",
      hi: "राजा राज राजेश्वर सिंह | परिवार, विरासत और झंडी राज",
    },
    description: {
      en: "The history of the Jhandi Raj family of Kheri, Awadh, to which Raja Raj Rajeshwar Singh belongs: Chauhan origins, Raja Raghubar Singh and gifts of land.",
      hi: "अवध के खीरी जनपद के झंडी राज परिवार का इतिहास, जिससे राजा राज राजेश्वर सिंह जुड़े हैं: चौहान मूल, राजा रघुबर सिंह और भूमि-दान।",
    },
  },
  publicLife: {
    title: {
      en: "Raja Raj Rajeshwar Singh | Public Life & Community Engagement",
      hi: "राजा राज राजेश्वर सिंह | सार्वजनिक जीवन और सामुदायिक सहभागिता",
    },
    description: {
      en: "Public work, regional issues and community contributions associated with Raja Raj Rajeshwar Singh and the Jhandi Raj family of Kheri.",
      hi: "राजा राज राजेश्वर सिंह और खीरी के झंडी राज परिवार से जुड़ी जनसेवा, क्षेत्रीय मुद्दे और सामुदायिक योगदान।",
    },
  },
  media: {
    title: {
      en: "Raja Raj Rajeshwar Singh | Photos, Videos & Media",
      hi: "राजा राज राजेश्वर सिंह | फ़ोटो, वीडियो और मीडिया",
    },
    description: {
      en: "Official photographs and videos of Raja Raj Rajeshwar Singh, including a flood-relief visit to Jasnagar. Speeches and press coverage will be added as published.",
      hi: "राजा राज राजेश्वर सिंह के आधिकारिक छायाचित्र और वीडियो, जिनमें जसनगर का बाढ़ राहत दौरा भी शामिल है। भाषण और प्रेस कवरेज प्रकाशित होने पर जोड़े जाएँगे।",
    },
  },
  updates: {
    title: {
      en: "Raja Raj Rajeshwar Singh | Latest Updates",
      hi: "राजा राज राजेश्वर सिंह | ताज़ा समाचार और गतिविधियाँ",
    },
    description: {
      en: "Latest updates on the public activity of Raja Raj Rajeshwar Singh: field visits, community interactions and public service in Kheri.",
      hi: "राजा राज राजेश्वर सिंह की सार्वजनिक गतिविधियों के ताज़ा समाचार: क्षेत्रीय दौरे, जनसंवाद और खीरी में जनसेवा।",
    },
  },
  contact: {
    title: {
      en: "Contact Raja Raj Rajeshwar Singh | Enquiries & Meetings",
      hi: "राजा राज राजेश्वर सिंह से संपर्क | पूछताछ और भेंट",
    },
    description: {
      en: "Send an enquiry to Raja Raj Rajeshwar Singh: general enquiries, media requests, public programmes and meeting requests.",
      hi: "राजा राज राजेश्वर सिंह को पूछताछ भेजें: सामान्य पूछताछ, मीडिया अनुरोध, सार्वजनिक कार्यक्रम और भेंट का अनुरोध।",
    },
  },
} satisfies Record<string, PageSeo>;
