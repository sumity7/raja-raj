import type { L } from "@/lib/i18n";
import { publishedUpdates } from "./updates";

/**
 * The assistant answers only from these entries. Each one restates content that
 * is already published on the website. Questions on politics (elections, posts, statements and
 * so on) are answered with what the profile does record, and anything that matches no entry gets
 * the general overview rather than a refusal.
 */

export type KnowledgeEntry = {
  id: string;
  /** Lower-case keywords in English, Hinglish and Devanagari. */
  keywords: string[];
  answer: L;
  link?: { href: string; label: L };
};

const updatesAnswer = (): L => {
  const latest = publishedUpdates()[0];
  return latest
    ? {
        en: `The latest update on the official profile is “${latest.title.en}”. More are listed on the Updates page.`,
        hi: `आधिकारिक प्रोफ़ाइल पर सबसे ताज़ा समाचार “${latest.title.hi}” है। और समाचार ‘समाचार’ पृष्ठ पर हैं।`,
      }
    : {
        en: "No updates have been published on the official profile yet.",
        hi: "आधिकारिक प्रोफ़ाइल पर अभी तक कोई समाचार प्रकाशित नहीं हुआ है।",
      };
};

export const knowledge = (): KnowledgeEntry[] => [
  {
    id: "who",
    keywords: ["who is", "who", "about him", "introduce", "kaun", "profile", "कौन", "परिचय", "जीवन परिचय"],
    answer: {
      en: "Raja Raj Rajeshwar Singh, known as Jhandi-Raj, belongs to the Jhandi Raj family of Kheri district. He trained as a mechanical engineer at B.I.T. Ranchi, has made agriculture his main occupation, and is active in the Bharatiya Janata Party.",
      hi: "राजा राज राजेश्वर सिंह, जो झंडी-राज के नाम से जाने जाते हैं, खीरी जनपद के झंडी राज परिवार से हैं। उन्होंने बी.आई.टी. रांची से मैकेनिकल इंजीनियरिंग की, कृषि को अपना मुख्य व्यवसाय बनाया और भारतीय जनता पार्टी में सक्रिय हैं।",
    },
    link: { href: "/about", label: { en: "Read the biography", hi: "जीवन परिचय पढ़ें" } },
  },
  {
    id: "background",
    keywords: ["background", "education", "study", "studied", "engineer", "engineering", "farming", "farmer", "agriculture", "occupation", "school", "college", "शिक्षा", "पृष्ठभूमि", "इंजीनियर", "कृषि", "खेती", "किसान", "व्यवसाय", "विद्यालय", "कॉलेज"],
    answer: {
      en: "He studied mechanical engineering at B.I.T. Ranchi and made agriculture his principal occupation. He has also held positions on the managing committees of several schools and a degree college in the district.",
      hi: "उन्होंने बी.आई.टी. रांची से मैकेनिकल इंजीनियरिंग की शिक्षा प्राप्त की और कृषि को अपना मुख्य व्यवसाय बनाया। जनपद के कई विद्यालयों और एक डिग्री कॉलेज की प्रबंध समिति में भी वे विभिन्न पदों पर रहे हैं।",
    },
    link: { href: "/about#education", label: { en: "Education & work", hi: "शिक्षा और कार्य" } },
  },
  {
    id: "political",
    keywords: ["political", "politics", "party", "bjp", "journey", "bharatiya", "राजनीति", "राजनीतिक", "भाजपा", "पार्टी", "यात्रा", "भारतीय जनता"],
    answer: {
      en: "He is active in the Bharatiya Janata Party and came into public life through social work in his home region. The official profile does not record party posts, election results or dates for him.",
      hi: "वे भारतीय जनता पार्टी में सक्रिय हैं और अपने क्षेत्र में सामाजिक कार्यों के माध्यम से सार्वजनिक जीवन में आए। आधिकारिक प्रोफ़ाइल में उनके लिए कोई दलीय पद, चुनाव-परिणाम या तिथि दर्ज नहीं है।",
    },
    link: { href: "/about#journey", label: { en: "Political journey", hi: "राजनीतिक यात्रा" } },
  },
  {
    id: "records",
    keywords: [
      "election", "elections", "vote", "votes", "voting", "constituency", "candidate", "minister", "salary",
      "wealth", "property", "criminal", "court case", "controversy", "opinion", "statement", "quote", "award",
      "party post", "position", "contest", "seat", "ticket",
      "चुनाव", "वोट", "मतदान", "उम्मीदवार", "प्रत्याशी", "मंत्री", "संपत्ति", "विवाद", "पुरस्कार", "बयान", "पद", "टिकट", "सीट",
    ],
    answer: {
      en: "The official profile does not record election results, constituency, party posts, ministerial office, awards, statements or personal finances for him, so there is nothing reliable to report on those. What is recorded is that he is active in the Bharatiya Janata Party and in public and social work around Jhandi Raj and Nighasan; his father, Raja Brajraj Singh, was twice an MLA from Srinagar (1974 and 1977).",
      hi: "आधिकारिक प्रोफ़ाइल में उनके चुनाव-परिणाम, निर्वाचन क्षेत्र, दलीय पद, मंत्री पद, पुरस्कार, बयान या निजी वित्त का कोई विवरण दर्ज नहीं है, इसलिए इन पर कोई प्रामाणिक जानकारी नहीं दी जा सकती। जो दर्ज है: वे भारतीय जनता पार्टी में सक्रिय हैं और झंडी राज व निघासन क्षेत्र में सार्वजनिक व सामाजिक कार्य करते हैं; उनके पिता राजा ब्रजराज सिंह श्रीनगर से दो बार (1974 और 1977) विधायक रहे।",
    },
    link: { href: "/about#journey", label: { en: "Political journey", hi: "राजनीतिक यात्रा" } },
  },
  {
    id: "public-work",
    keywords: ["public work", "documented", "social work", "social", "service", "work", "जनसेवा", "सामाजिक", "कार्य", "सेवा"],
    answer: {
      en: "The documented public work is social work in the Jhandi Raj and Nighasan area, service on school and degree-college managing committees, and farming. The regional issues on record, such as the Bilraya sugar mill in 1989, are those his father took up. The Updates and Media pages also record a public outreach visit in Khairtiya and a visit to flood-affected areas in Jasnagar.",
      hi: "दर्ज सार्वजनिक कार्य में झंडी राज और निघासन क्षेत्र में सामाजिक कार्य, विद्यालयों और डिग्री कॉलेज की प्रबंध समितियों में सेवा, तथा कृषि शामिल हैं। बिलराया चीनी मिल (1989) जैसे क्षेत्रीय मुद्दे उनके पिता ने उठाए थे। समाचार और मीडिया पृष्ठ पर खैरटिया में जनसंपर्क और जसनगर में बाढ़ प्रभावित क्षेत्रों के भ्रमण का भी विवरण है।",
    },
    link: { href: "/public-life", label: { en: "Public life", hi: "सार्वजनिक जीवन" } },
  },
  {
    id: "father",
    keywords: ["father", "brajraj", "mla", "emergency", "jana sangh", "jansangh", "janata", "srinagar", "पिता", "ब्रजराज", "विधायक", "आपातकाल", "जनसंघ", "श्रीनगर"],
    answer: {
      en: "His father, Raja Brajraj Singh, was twice an MLA from the Srinagar assembly seat, in 1974 on a Jana Sangh ticket and in 1977 on a Janata Party ticket. He was jailed during the Emergency of 1975 and helped establish the Jana Sangh and later the BJP in the district.",
      hi: "उनके पिता राजा ब्रजराज सिंह श्रीनगर विधानसभा से दो बार विधायक रहे: 1974 में जनसंघ से और 1977 में जनता पार्टी से। 1975 के आपातकाल में वे जेल गए और जनपद में जनसंघ तथा बाद में भाजपा को स्थापित करने में उनका योगदान रहा।",
    },
    link: { href: "/about#journey", label: { en: "His father's record", hi: "पिता का अभिलेख" } },
  },
  {
    id: "mill",
    keywords: ["sugar", "mill", "cane", "bilraya", "tehsil", "palia", "adalabad", "farmers", "regional", "issues", "चीनी", "मिल", "गन्ना", "बिलराया", "तहसील", "पलिया", "अदलाबाद", "किसानों", "क्षेत्रीय", "मुद्दे"],
    answer: {
      en: "In 1989 the Bilraya sugar mill closed with farmers' cane still standing; his father pressed the case from the Cane Commissioner in Lucknow to the Sugar Federation in Delhi, and the mill restarted about thirteen days later. He also took up the Adalabad land-erosion case and was part of the movement against shifting Nighasan tehsil to Palia.",
      hi: "1989 में बिलराया चीनी मिल खेतों में गन्ना खड़ा होने पर बंद हो गई; उनके पिता ने लखनऊ में गन्ना आयुक्त से दिल्ली में शुगर फ़ेडरेशन तक मामला उठाया और लगभग तेरह दिन बाद मिल दोबारा चली। उन्होंने अदलाबाद कटान का मामला भी उठाया और निघासन तहसील को पलिया ले जाने के विरुद्ध आंदोलन में शामिल रहे।",
    },
    link: { href: "/public-life#regional-issues", label: { en: "Regional issues", hi: "क्षेत्रीय मुद्दे" } },
  },
  {
    id: "heritage",
    keywords: ["heritage", "family", "ancestor", "ancestors", "history", "raghubar", "chauhan", "jhandi raj", "fort", "raja", "विरासत", "परिवार", "पूर्वज", "इतिहास", "रघुबर", "चौहान", "किला", "राज परिवार"],
    answer: {
      en: "The Jhandi Raj house is an old Rajput family of Kheri, descended from Chauhans who settled there in Jahangir's time. Its best-known figure in the record is Raja Raghubar Singh (1876–1932), his great-grandfather, remembered for gifts of land, including Jhandi Park in Lucknow.",
      hi: "झंडी राज खीरी का एक पुराना राजपूत परिवार है, जिसके पूर्वज जहाँगीर के समय वहाँ बसे चौहान थे। अभिलेख में सबसे प्रसिद्ध नाम उनके परदादा राजा रघुबर सिंह (1876–1932) का है, जिन्हें लखनऊ के झंडी पार्क सहित भूमि-दान के लिए याद किया जाता है।",
    },
    link: { href: "/about/heritage", label: { en: "Family & heritage", hi: "परिवार एवं विरासत" } },
  },
  {
    id: "donations",
    keywords: ["park", "jhandi park", "temple", "temples", "donated", "donation", "mosque", "gurudwara", "karbala", "antarved", "acres", "दान", "मंदिर", "पार्क", "झंडी पार्क", "मस्जिद", "गुरुद्वारा", "करबला", "अन्तर्वेद", "एकड़"],
    answer: {
      en: "The family built temples in Kheri and other districts and gave them hundreds of acres. Raja Raghubar Singh gave about 2,200 acres to the Antarved Ashram (c. 1925–30) and land in Lucknow that became Jhandi Park. The family also gave land for a mosque, a Karbala and a gurudwara.",
      hi: "परिवार ने खीरी और अन्य जनपदों में मंदिर बनवाए और उन्हें सैकड़ों एकड़ भूमि दी। राजा रघुबर सिंह ने अन्तर्वेद आश्रम को लगभग 2,200 एकड़ (लगभग 1925–30) और लखनऊ में वह भूमि दी जो झंडी पार्क बनी। परिवार ने मस्जिद, करबला और गुरुद्वारे के लिए भी भूमि दी।",
    },
    link: { href: "/about/heritage#gifts", label: { en: "Gifts of land", hi: "भूमि-दान" } },
  },
  {
    id: "contact",
    keywords: ["contact", "touch", "phone", "number", "call", "email", "meeting", "reach", "संपर्क", "फोन", "फ़ोन", "नंबर", "मोबाइल", "कार्यालय", "भेंट", "मिलना"],
    answer: {
      en: "You can get in touch by sending an enquiry through the contact form, or through the official Facebook and Instagram pages.",
      hi: "आप संपर्क फ़ॉर्म से पूछताछ भेजकर या आधिकारिक फ़ेसबुक और इंस्टाग्राम पेज के माध्यम से संपर्क कर सकते हैं।",
    },
    link: { href: "/contact", label: { en: "Contact page", hi: "संपर्क पृष्ठ" } },
  },
  {
    id: "updates",
    keywords: ["update", "updates", "news", "latest", "event", "events", "press", "speech", "समाचार", "ताज़ा", "ताजा", "कार्यक्रम", "प्रेस", "भाषण"],
    answer: updatesAnswer(),
    link: { href: "/updates", label: { en: "Updates", hi: "समाचार" } },
  },
  {
    id: "khairtiya",
    keywords: ["khairtiya", "khairatiya", "mohana", "erosion", "pargat", "pradhan", "outreach", "public connect", "sector", "खैरटिया", "मोहाना", "कटान", "परगट", "प्रधान", "जनसंपर्क", "संयोजक"],
    answer: {
      en: "During a public outreach visit in Khairtiya he met Gram Pradhan Shri Pargat Singh Ji and discussed local issues, in particular erosion by the Mohana River and the need for permanent and effective measures. He then met party sector coordinator Shri Rahul Gupta Ji and other party workers over tea at the residence of Shri Indresh Kumar Ji. No date is recorded for this visit.",
      hi: "खैरटिया में जनसंपर्क के दौरान उन्होंने ग्राम प्रधान श्री परगट सिंह जी से भेंट कर स्थानीय समस्याओं, विशेषकर मोहाना नदी के कटान और स्थायी एवं प्रभावी उपायों की आवश्यकता पर चर्चा की। इसके बाद श्री इंद्रेश कुमार जी के आवास पर पार्टी के सेक्टर संयोजक श्री राहुल गुप्ता जी और अन्य कार्यकर्ताओं से चाय पर संवाद हुआ। इस भेंट की कोई तिथि दर्ज नहीं है।",
    },
    link: { href: "/updates/khairtiya-public-outreach-mohana-river-erosion", label: { en: "Read the update", hi: "समाचार पढ़ें" } },
  },
  {
    id: "family-visit",
    keywords: ["hospital", "medical college", "pediatric", "child", "girl", "family", "doctors", "treatment", "condolence", "अस्पताल", "मेडिकल कॉलेज", "पीडियाट्रिक", "बच्ची", "परिवार से भेंट", "चिकित्सक", "उपचार", "संवेदना"],
    answer: {
      en: "The Updates page records a visit to the family of a child receiving treatment at a medical college. He expressed his condolences, asked the treating doctors to ensure the best possible continued care, provided immediate assistance to the family, and assured them of humanitarian support and help in pursuing justice through the appropriate process.",
      hi: "समाचार पृष्ठ पर एक मेडिकल कॉलेज में उपचाराधीन बच्ची के परिवार से भेंट का विवरण है। उन्होंने संवेदना व्यक्त की, उपचार कर रहे चिकित्सकों से बेहतर एवं निरंतर उपचार का आग्रह किया, परिवार को तत्काल सहायता उपलब्ध कराई और उन्हें मानवीय सहयोग तथा उचित माध्यम से न्याय प्राप्त करने में सहायता का आश्वासन दिया।",
    },
    link: { href: "/updates/meeting-affected-family-assuring-support-for-childs-treatment", label: { en: "Read the update", hi: "समाचार पढ़ें" } },
  },
  {
    id: "flood-relief",
    keywords: ["flood", "relief", "kit", "kits", "jasnagar", "irrigation", "magistrate", "displaced", "shelter", "विस्थापित", "बाढ़", "बाढ", "राहत", "किट", "जसनगर", "सिंचाई", "जिलाधिकारी", "उपजिलाधिकारी", "आवास"],
    answer: {
      en: "The Updates page records a visit to Jasnagar to inspect the erosion caused by the Mohana River and review the flood situation, together with the District Magistrate, the Nighasan Sub-Divisional Magistrate and Irrigation Department officials. Relief kits were distributed among flood-affected families in Jhandi and in Naya Pind village of Khairtiya, and the administration was asked to provide safe accommodation, food and basic facilities to families who lost homes or land. The Media page also has a video and photographs of this visit.",
      hi: "समाचार पृष्ठ पर जसनगर में मोहाना नदी के कटान और बाढ़ की स्थिति के मुआयने का विवरण है, जो जिलाधिकारी, उपजिलाधिकारी निघासन और सिंचाई विभाग के अधिकारियों के साथ किया गया। झण्डी क्षेत्र और खैरटिया के नया पिंड गाँव में बाढ़ प्रभावित परिवारों को राहत किट वितरित की गई, और प्रशासन से आग्रह किया गया कि जिन परिवारों ने घर या भूमि खोई है उनके लिए सुरक्षित आवास, भोजन और बुनियादी सुविधाओं की व्यवस्था हो। मीडिया पृष्ठ पर इस भ्रमण का वीडियो और छायाचित्र भी हैं।",
    },
    link: { href: "/updates/jasnagar-flood-affected-areas-visit-relief-kit-distribution", label: { en: "Read the update", hi: "समाचार पढ़ें" } },
  },
  {
    id: "video",
    keywords: ["video", "videos", "वीडियो"],
    answer: {
      en: "The Media page has a video titled “Jasnagar Visit”, showing a tour of flood-affected areas and the distribution of relief kits. No date is recorded for the video.",
      hi: "मीडिया पृष्ठ पर ‘जसनगर दौरा’ शीर्षक का एक वीडियो है, जिसमें बाढ़ प्रभावित क्षेत्रों का भ्रमण और राहत किट वितरण दिखाया गया है। वीडियो की कोई तिथि दर्ज नहीं है।",
    },
    link: { href: "/media", label: { en: "Watch on Media", hi: "मीडिया पर देखें" } },
  },
  {
    id: "photos",
    keywords: ["photo", "photos", "picture", "pictures", "image", "images", "gallery", "चित्र", "फोटो", "तस्वीर", "छायाचित्र"],
    answer: {
      en: "The Media page has his official portraits and photographs from the public outreach in Khairtiya. More event photographs will be added as they are published.",
      hi: "मीडिया पृष्ठ पर उनके आधिकारिक चित्र और खैरटिया में जनसंपर्क के छायाचित्र हैं। कार्यक्रमों के और छायाचित्र प्रकाशित होने पर जोड़े जाएँगे।",
    },
    link: { href: "/media", label: { en: "Media", hi: "मीडिया" } },
  },
  {
    id: "social",
    keywords: ["facebook", "instagram", "social media", "follow", "फेसबुक", "इंस्टाग्राम", "सोशल"],
    answer: {
      en: "His official pages are on Facebook (krRRSinghbjp) and Instagram (@rajarajrajeshwarsingh).",
      hi: "उनके आधिकारिक पेज फ़ेसबुक (krRRSinghbjp) और इंस्टाग्राम (@rajarajrajeshwarsingh) पर हैं।",
    },
    link: { href: "/contact", label: { en: "Contact & social", hi: "संपर्क और सोशल मीडिया" } },
  },
  {
    id: "place",
    keywords: ["where", "live", "lives", "home", "nighasan", "kheri", "residence", "कहाँ", "कहां", "निवास", "निघासन", "खीरी", "रहते"],
    answer: {
      en: "He lives at Jhandi Raj, in the Nighasan area of Kheri district. Jhandi Raj fort stands about five kilometres south of Nighasan tehsil.",
      hi: "वे खीरी जनपद के निघासन क्षेत्र में स्थित झंडी राज में रहते हैं। झंडी राज का किला निघासन तहसील से लगभग पाँच किलोमीटर दक्षिण में है।",
    },
  },
];

/** Used when a question matches nothing specific: the overview, so the assistant still answers. */
const overview = (): KnowledgeEntry => ({
  ...knowledge().find((e) => e.id === "who")!,
  id: "overview",
  answer: {
    en: "I don't have a specific answer to that on the official profile, but here is an overview. Raja Raj Rajeshwar Singh, known as Jhandi-Raj, belongs to the Jhandi Raj family of Kheri district. He trained as a mechanical engineer at B.I.T. Ranchi, has made agriculture his main occupation, and is active in the Bharatiya Janata Party and in public work around Jhandi Raj and Nighasan. You can also ask about his background, political journey, family, public work or latest updates.",
    hi: "इस बारे में आधिकारिक प्रोफ़ाइल में कोई विशेष जानकारी नहीं है, पर संक्षिप्त परिचय यह है। राजा राज राजेश्वर सिंह, जो झंडी-राज के नाम से जाने जाते हैं, खीरी जनपद के झंडी राज परिवार से हैं। उन्होंने बी.आई.टी. रांची से मैकेनिकल इंजीनियरिंग की, कृषि को अपना मुख्य व्यवसाय बनाया और भारतीय जनता पार्टी तथा झंडी राज व निघासन क्षेत्र के सार्वजनिक कार्यों में सक्रिय हैं। आप उनकी पृष्ठभूमि, राजनीतिक यात्रा, परिवार, सार्वजनिक कार्य या ताज़ा समाचार के बारे में भी पूछ सकते हैं।",
  },
});

export function answerQuestion(question: string): KnowledgeEntry {
  const q = question.toLowerCase();

  let best: KnowledgeEntry | null = null;
  let bestScore = 0;
  for (const entry of knowledge()) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (q.includes(keyword)) score += keyword.length > 4 ? 2 : 1;
    }
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }
  return best ?? overview();
}
