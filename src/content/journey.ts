import type { L } from "@/lib/i18n";

/** Political and public journey. "own" and "father" are kept strictly apart. */

export const ownJourney: L[] = [
  {
    en: "Raja Raj Rajeshwar Singh is an active member of the Bharatiya Janata Party. His entry into public life came through social work in the Jhandi Raj and Nighasan area, and he has served on the managing committees of several schools and a degree college in Kheri district.",
    hi: "राजा राज राजेश्वर सिंह भारतीय जनता पार्टी में सक्रिय हैं। सार्वजनिक जीवन में उनका आना झंडी राज और निघासन क्षेत्र में सामाजिक कार्यों के माध्यम से हुआ, और वे खीरी जनपद के कई विद्यालयों तथा एक डिग्री कॉलेज की प्रबंध समिति में रहे हैं।",
  },
];

export const ownRoles: { title: L; body: L }[] = [
  {
    title: { en: "Party", hi: "दल" },
    body: { en: "Active in the Bharatiya Janata Party.", hi: "भारतीय जनता पार्टी में सक्रिय।" },
  },
  {
    title: { en: "Education sector", hi: "शिक्षा क्षेत्र" },
    body: {
      en: "Positions on the managing committees of several schools and a degree college in the district.",
      hi: "जनपद के कई विद्यालयों और एक डिग्री कॉलेज की प्रबंध समितियों में विभिन्न पद।",
    },
  },
  {
    title: { en: "Social work", hi: "सामाजिक कार्य" },
    body: {
      en: "Direct contact with people of the region through social work.",
      hi: "सामाजिक कार्यों के माध्यम से क्षेत्र की जनता से प्रत्यक्ष संपर्क।",
    },
  },
];

export const father = {
  name: { en: "Raja Brajraj Singh", hi: "राजा ब्रजराज सिंह" } satisfies L,
  relation: {
    en: "Father of Raja Raj Rajeshwar Singh",
    hi: "राजा राज राजेश्वर सिंह के पिता",
  } satisfies L,
  intro: {
    en: "Raja Brajraj Singh twice represented the Srinagar assembly constituency as an MLA, first in 1974 on a Jana Sangh ticket and again in 1977 on a Janata Party ticket. He also helped establish the Jana Sangh, and later the BJP, in Kheri district.",
    hi: "राजा ब्रजराज सिंह दो बार श्रीनगर विधानसभा से विधायक रहे: पहली बार 1974 में जनसंघ से और दूसरी बार 1977 में जनता पार्टी से। जनसंघ और बाद में भाजपा को जनपद में स्थापित करने में भी उनका महत्वपूर्ण योगदान रहा।",
  } satisfies L,
  points: [
    {
      year: "1974",
      title: { en: "Elected MLA, Srinagar", hi: "श्रीनगर से विधायक" },
      body: {
        en: "Elected to the Srinagar assembly seat on a Jana Sangh ticket.",
        hi: "जनसंघ के टिकट पर श्रीनगर विधानसभा से निर्वाचित हुए।",
      },
    },
    {
      year: "1975",
      title: { en: "The Emergency", hi: "आपातकाल" },
      body: {
        en: "Took part in the struggle against the Emergency and was jailed.",
        hi: "आपातकाल के विरुद्ध संघर्ष में भाग लिया और जेल गए।",
      },
    },
    {
      year: "1977",
      title: { en: "Elected MLA again", hi: "पुनः विधायक" },
      body: {
        en: "Returned to the Srinagar seat, this time as a Janata Party candidate.",
        hi: "जनता पार्टी के प्रत्याशी के रूप में श्रीनगर सीट से दोबारा चुने गए।",
      },
    },
  ],
};

export type MilestoneKind = "family" | "father";

export const milestones: { year: string; kind: MilestoneKind; title: L; body: L }[] = [
  {
    year: "17th century",
    kind: "family",
    title: { en: "The family settles in Kheri", hi: "परिवार का खीरी में बसना" },
    body: {
      en: "Akhairaj Singh, a Chauhan from the Ajmer side, settles in Kheri in the time of Jahangir.",
      hi: "अजमेर की ओर से आए चौहान अखैराज सिंह जहाँगीर के समय खीरी में बसते हैं।",
    },
  },
  {
    year: "1876",
    kind: "family",
    title: { en: "Raja Raghubar Singh is born", hi: "राजा रघुबर सिंह का जन्म" },
    body: {
      en: "Raja Raghubar Singh of Jhandi Raj is born and raised at Jhandipurwa.",
      hi: "झंडी राज के राजा रघुबर सिंह का जन्म झंडीपुरवा में होता है और उनका पालन-पोषण वहीं होता है।",
    },
  },
  {
    year: "1925–30",
    kind: "family",
    title: { en: "Land for Antarved Ashram", hi: "अन्तर्वेद आश्रम को भूमि" },
    body: {
      en: "About 2,200 acres are given to the Antarved Ashram.",
      hi: "अन्तर्वेद आश्रम को लगभग 2,200 एकड़ भूमि दान की जाती है।",
    },
  },
  {
    year: "1932",
    kind: "family",
    title: { en: "Death of Raja Raghubar Singh", hi: "राजा रघुबर सिंह का निधन" },
    body: {
      en: "Raja Raghubar Singh dies on 24 October 1932.",
      hi: "24 अक्टूबर 1932 को राजा रघुबर सिंह का निधन होता है।",
    },
  },
  {
    year: "1936",
    kind: "family",
    title: { en: "Loss of the elder son", hi: "बड़े पुत्र का निधन" },
    body: {
      en: "Rajkumar Iqbal Bahadur Singh, Raja Raghubar Singh's elder son, dies at the age of seventeen.",
      hi: "राजा रघुबर सिंह के बड़े पुत्र राजकुमार इक़बाल बहादुर सिंह का सत्रह वर्ष की आयु में निधन।",
    },
  },
  {
    year: "1945",
    kind: "family",
    title: { en: "Death of Raja Raj Bahadur Singh", hi: "राजा राज बहादुर सिंह का निधन" },
    body: {
      en: "In June, Raja Raj Bahadur Singh dies; his widow takes over the estate's administration.",
      hi: "जून में राजा राज बहादुर सिंह का निधन; उनकी धर्मपत्नी रियासत का कार्यभार सँभालती हैं।",
    },
  },
  {
    year: "1974",
    kind: "father",
    title: { en: "Raja Brajraj Singh elected MLA", hi: "राजा ब्रजराज सिंह विधायक निर्वाचित" },
    body: {
      en: "Elected from the Srinagar assembly seat on a Jana Sangh ticket.",
      hi: "जनसंघ के टिकट पर श्रीनगर विधानसभा से निर्वाचित।",
    },
  },
  {
    year: "1975",
    kind: "father",
    title: { en: "The Emergency", hi: "आपातकाल" },
    body: {
      en: "Raja Brajraj Singh takes part in the struggle against the Emergency and is jailed.",
      hi: "राजा ब्रजराज सिंह आपातकाल के विरुद्ध संघर्ष में शामिल होते हैं और जेल जाते हैं।",
    },
  },
  {
    year: "1977",
    kind: "father",
    title: { en: "Elected MLA a second time", hi: "दूसरी बार विधायक" },
    body: {
      en: "Elected again from Srinagar, this time on a Janata Party ticket.",
      hi: "इस बार जनता पार्टी के टिकट पर श्रीनगर से पुनः निर्वाचित।",
    },
  },
  {
    year: "1989",
    kind: "father",
    title: { en: "The Bilraya sugar mill", hi: "बिलराया चीनी मिल" },
    body: {
      en: "When the mill closes with farmers' cane still standing, he takes the matter from the Cane Commissioner in Lucknow to the Sugar Federation in Delhi. The mill restarts about thirteen days later.",
      hi: "खेतों में गन्ना खड़ा होने पर मिल बंद हो जाती है; वे मामला लखनऊ में गन्ना आयुक्त से दिल्ली में शुगर फ़ेडरेशन तक ले जाते हैं। लगभग तेरह दिन बाद मिल दोबारा चल पड़ती है।",
    },
  },
  {
    year: "2000",
    kind: "family",
    title: { en: "Statue at Jhandi Park", hi: "झंडी पार्क में प्रतिमा" },
    body: {
      en: "On 24 October the Lucknow Municipal Corporation installs a statue of Raja Raghubar Singh in Jhandi Park.",
      hi: "24 अक्टूबर को लखनऊ नगर निगम झंडी पार्क में राजा रघुबर सिंह की प्रतिमा स्थापित करता है।",
    },
  },
];
