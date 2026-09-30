import type { L } from "@/lib/i18n";

export const publicWork: { id: string; title: L; body: L[] } = {
  id: "public-work",
  title: { en: "Public work", hi: "जनसेवा" },
  body: [
    {
      en: "Raja Raj Rajeshwar Singh has worked with the people of the Jhandi Raj and Nighasan area through social work, and has served in different positions on the managing committees of several schools and a degree college in Kheri district.",
      hi: "राजा राज राजेश्वर सिंह झंडी राज और निघासन क्षेत्र की जनता से सामाजिक कार्यों के माध्यम से जुड़े रहे हैं और खीरी जनपद के कई विद्यालयों तथा एक डिग्री कॉलेज की प्रबंध समितियों में विभिन्न पदों पर कार्य कर चुके हैं।",
    },
    {
      en: "Farming remains his main occupation, which keeps him close to the concerns of the region's farmers.",
      hi: "खेती उनका मुख्य व्यवसाय है, जिससे वे क्षेत्र के किसानों की चिंताओं के निकट रहते हैं।",
    },
  ],
};

export const regionalIssues: {
  id: string;
  title: L;
  intro: L;
  issues: { title: L; body: L }[];
} = {
  id: "regional-issues",
  title: { en: "Regional issues", hi: "क्षेत्रीय मुद्दे" },
  intro: {
    en: "The record below concerns his father, Raja Brajraj Singh, and shows the kind of local questions the family has taken up. Whenever the people of the region faced difficulty, the family's account says, he was ready to help.",
    hi: "नीचे का विवरण उनके पिता राजा ब्रजराज सिंह से जुड़ा है और दिखाता है कि परिवार ने किस प्रकार के स्थानीय प्रश्न उठाए। परिवार के विवरण के अनुसार, क्षेत्र की जनता पर जब भी कोई विपत्ति आई, वे उसकी सहायता के लिए तत्पर रहे।",
  },
  issues: [
    {
      title: { en: "Bilraya sugar mill, 1989", hi: "बिलराया चीनी मिल, 1989" },
      body: {
        en: "In 1989 the Bilraya sugar mill shut down while a very large quantity of farmers' cane was still standing. He pressed the farmers' case from the Cane Commissioner in Lucknow to the Sugar Federation in Delhi. About thirteen days after the closure the mill started again and the remaining cane was crushed.",
        hi: "1989 में बिलराया चीनी मिल तब बंद हो गई जब किसानों का भारी मात्रा में गन्ना खड़ा था। उन्होंने किसानों के पक्ष में लखनऊ में गन्ना आयुक्त से लेकर दिल्ली में शुगर फ़ेडरेशन तक संघर्ष किया। बंदी के लगभग तेरह दिन बाद मिल दोबारा चली और बचा हुआ गन्ना पेरा गया।",
      },
    },
    {
      title: { en: "Adalabad land erosion", hi: "अदलाबाद कटान" },
      body: {
        en: "He took up the Adalabad land-erosion (katan) case on behalf of the affected villagers.",
        hi: "प्रभावित ग्रामीणों की ओर से उन्होंने अदलाबाद कटान के मामले को उठाया।",
      },
    },
    {
      title: { en: "Nighasan tehsil", hi: "निघासन तहसील" },
      body: {
        en: "He was part of the movement to stop Nighasan tehsil from being moved to Palia.",
        hi: "निघासन तहसील को पलिया ले जाए जाने से रोकने के आंदोलन में वे शामिल रहे।",
      },
    },
  ],
};

export const communityFaith: { id: string; title: L; body: L } = {
  id: "community-faith",
  title: { en: "Community and faith", hi: "समाज और आस्था" },
  body: {
    en: "The Jhandi Raj family is remembered for giving land to institutions of more than one community: temples, a public park in Lucknow, a mosque, a Karbala and a gurudwara. This is the record of earlier generations, set out in full under Family & Heritage.",
    hi: "झंडी राज परिवार को एक से अधिक समुदायों की संस्थाओं को भूमि देने के लिए याद किया जाता है: मंदिर, लखनऊ का एक सार्वजनिक पार्क, मस्जिद, करबला और गुरुद्वारा। यह पूर्व पीढ़ियों का विवरण है, जो ‘परिवार एवं विरासत’ में विस्तार से दिया गया है।",
  },
};

export const summaries: { id: string; title: L; text: L }[] = [
  {
    id: "public-work",
    title: publicWork.title,
    text: {
      en: "Social work in the Jhandi Raj and Nighasan area, service on school and college committees, and farming.",
      hi: "झंडी राज और निघासन क्षेत्र में सामाजिक कार्य, विद्यालय और कॉलेज की समितियों में सेवा, और कृषि।",
    },
  },
  {
    id: "regional-issues",
    title: regionalIssues.title,
    text: {
      en: "The Bilraya sugar mill in 1989, the Adalabad erosion case, and the Nighasan tehsil movement, taken up by his father.",
      hi: "उनके पिता द्वारा उठाए गए 1989 की बिलराया चीनी मिल, अदलाबाद कटान और निघासन तहसील आंदोलन के मामले।",
    },
  },
  {
    id: "community-faith",
    title: communityFaith.title,
    text: {
      en: "The family's gifts of land to temples, a public park, a mosque, a Karbala and a gurudwara.",
      hi: "मंदिरों, एक सार्वजनिक पार्क, मस्जिद, करबला और गुरुद्वारे के लिए परिवार के भूमि-दान।",
    },
  },
];

export const publicConnect: { id: string; intro: L; summary: L } = {
  id: "public-connect",
  intro: {
    en: "Recorded interactions with local representatives, party workers and residents.",
    hi: "स्थानीय जनप्रतिनिधियों, कार्यकर्ताओं और नागरिकों के साथ दर्ज संवाद।",
  },
  summary: {
    en: "Meetings with village representatives, party workers and residents on local issues.",
    hi: "स्थानीय मुद्दों पर ग्राम प्रतिनिधियों, कार्यकर्ताओं और नागरिकों के साथ संवाद।",
  },
};
