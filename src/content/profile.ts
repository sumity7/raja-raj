import type { L } from "@/lib/i18n";

/**
 * Verified facts about Raja Raj Rajeshwar Singh himself.
 * Nothing about his father or ancestors belongs in this file.
 */

export const introduction: L = {
  en: "Raja Raj Rajeshwar Singh belongs to the Jhandi Raj family of Kheri district. He trained as a mechanical engineer, chose farming as his main occupation, and is active in the Bharatiya Janata Party.",
  hi: "राजा राज राजेश्वर सिंह खीरी जनपद के झंडी राज परिवार से हैं। उन्होंने मैकेनिकल इंजीनियरिंग की पढ़ाई की, खेती को अपना मुख्य व्यवसाय बनाया और भारतीय जनता पार्टी में सक्रिय हैं।",
};

export const quickFacts: { label: L; value: L }[] = [
  {
    label: { en: "Home", hi: "निवास" },
    value: {
      en: "Jhandi Raj, Nighasan, District Kheri",
      hi: "झंडी राज, निघासन, जनपद खीरी",
    },
  },
  {
    label: { en: "Education", hi: "शिक्षा" },
    value: {
      en: "Mechanical Engineering, B.I.T. Ranchi",
      hi: "मैकेनिकल इंजीनियरिंग, बी.आई.टी. रांची",
    },
  },
  {
    label: { en: "Occupation", hi: "व्यवसाय" },
    value: { en: "Agriculture", hi: "कृषि" },
  },
  {
    label: { en: "Party", hi: "दल" },
    value: { en: "Bharatiya Janata Party", hi: "भारतीय जनता पार्टी" },
  },
];

export const biography: { id: string; title: L; body: L[] }[] = [
  {
    id: "profile",
    title: { en: "Personal profile", hi: "व्यक्तिगत परिचय" },
    body: [
      {
        en: "Raja Raj Rajeshwar Singh is known in his home region as Jhandi-Raj. He lives at Jhandi Raj, in the Nighasan area of Kheri district, the place from which his family takes its name.",
        hi: "राजा राज राजेश्वर सिंह अपने क्षेत्र में झंडी-राज के नाम से जाने जाते हैं। वे खीरी जनपद के निघासन क्षेत्र में स्थित झंडी राज में रहते हैं, जिस स्थान से उनके परिवार का नाम जुड़ा है।",
      },
      {
        en: "He comes from a family with a long public record in Awadh, and the family's printed profile presents his public work as a continuation of the service that earlier generations were known for.",
        hi: "वे अवध के एक ऐसे परिवार से हैं जिसकी सार्वजनिक भूमिका का लंबा इतिहास रहा है। परिवार के मुद्रित परिचय में उनके सार्वजनिक कार्य को पूर्वजों की सेवा-परंपरा के विस्तार के रूप में प्रस्तुत किया गया है।",
      },
    ],
  },
  {
    id: "education",
    title: { en: "Education and occupation", hi: "शिक्षा और व्यवसाय" },
    body: [
      {
        en: "He studied mechanical engineering at B.I.T. Ranchi. After his studies he made agriculture his principal occupation.",
        hi: "उन्होंने बी.आई.टी. रांची से मैकेनिकल इंजीनियरिंग की शिक्षा प्राप्त की। पढ़ाई के बाद उन्होंने कृषि को अपना मुख्य व्यवसाय बनाया।",
      },
      {
        en: "He has also worked in the education sector of the district, holding different positions on the managing committees of several schools and a degree college.",
        hi: "शिक्षा के क्षेत्र में भी उन्होंने योगदान दिया है। जनपद के कई विद्यालयों और एक डिग्री कॉलेज की प्रबंध समिति में वे विभिन्न पदों पर रहे हैं।",
      },
    ],
  },
  {
    id: "public-engagement",
    title: { en: "Public engagement", hi: "जनसंपर्क और सामाजिक कार्य" },
    body: [
      {
        en: "Through social work he has stayed in direct contact with people in the region, and he is an active member of the Bharatiya Janata Party.",
        hi: "सामाजिक कार्यों के माध्यम से वे क्षेत्र की जनता से सीधे जुड़े रहे हैं और भारतीय जनता पार्टी में सक्रिय हैं।",
      },
    ],
  },
];
