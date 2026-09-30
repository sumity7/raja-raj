import type { L } from "@/lib/i18n";

/**
 * Family history of the Jhandi Raj house. This is ancestral material;
 * it is presented as family heritage, never as Raja Raj Rajeshwar Singh's own achievement.
 */

export const heritageIntro: L = {
  en: "Jhandi Raj is the seat of an old Rajput family of Kheri district in Awadh. The family's history runs from a Chauhan ancestor who settled in the region under the Mughals to Raja Raghubar Singh, whose gifts of land in the first half of the twentieth century are still remembered in Lucknow.",
  hi: "झंडी राज अवध के खीरी जनपद का एक पुराना राजपूत राज-परिवार है। इसका इतिहास उस चौहान पूर्वज से शुरू होता है जो मुग़ल काल में इस क्षेत्र में आ बसे और बीसवीं सदी के पूर्वार्ध में राजा रघुबर सिंह तक पहुँचता है, जिनके भूमि-दान लखनऊ में आज भी याद किए जाते हैं।",
};

export const origins: { title: L; body: L }[] = [
  {
    title: { en: "The Chauhan line", hi: "चौहान वंश" },
    body: {
      en: "The family is a branch of the Songarha Chauhans, a name that goes back to the fort of Sohangarh in Jalwar, Marwar. Because of their later home in Kheri they became known as the Jangra Chauhans.",
      hi: "यह परिवार सोनगरा चौहानों की एक शाखा है, जिसका नाम मारवाड़ के जालवर स्थित सोहनगढ़ के किले से जुड़ा है। खीरी में बसने के बाद यह परिवार जंगरा चौहान के नाम से जाना गया।",
    },
  },
  {
    title: { en: "Settlement in Kheri", hi: "खीरी में बसावट" },
    body: {
      en: "The first ancestor of the estate, Akhairaj Singh, a Chauhan from the Ajmer side, settled in Kheri during the reign of Jahangir. Either he or his grandson Chaturbhuj Singh distinguished himself in war in the Deccan and was rewarded with land and the title Jangangez Khakani Raja, from which the name Jangra is said to derive.",
      hi: "इस रियासत के पहले पूर्वज अखैराज सिंह अजमेर की ओर से आए चौहान थे और जहाँगीर के समय खीरी में बसे। उनके या उनके पौत्र चतुर्भुज सिंह के दक्कन के युद्ध में पराक्रम दिखाने पर उन्हें भूमि और ‘जंगजेज़ खाकानी राजा’ की उपाधि मिली, जिससे ‘जंगरा’ नाम प्रचलित होना बताया जाता है।",
    },
  },
  {
    title: { en: "From Lalpur to Jhandi Raj", hi: "लालपुर से झंडी राज तक" },
    body: {
      en: "Raja Lalta Singh, son of Raja Ranjeet Singh, lived at Lalpur, about three kilometres from Jhandi, where he held a mansion and lands. He founded the Jhandi Raj and Majgai estates. His three sons were Raj Debi Baksh Singh, Raj Raghubar Singh and Raj Mangal Singh, and Raghubar Singh became the Raja of Jhandi Raj.",
      hi: "राजा रणजीत सिंह के पुत्र राजा लालता सिंह झंडी से लगभग तीन किलोमीटर दूर लालपुर में रहते थे, जहाँ उनकी कोठी और ज़मींदारी थी। उन्होंने झंडी राज और मजगई रियासतों की स्थापना की। उनके तीन पुत्र थे: राज देवी बख़्श सिंह, राज रघुबर सिंह और राज मंगल सिंह। इनमें रघुबर सिंह झंडी राज के राजा बने।",
    },
  },
];

export const raghubar = {
  name: { en: "Raja Raghubar Singh", hi: "राजा रघुबर सिंह" } satisfies L,
  lifespan: { en: "1876 – 1932", hi: "1876 – 1932" } satisfies L,
  relation: {
    en: "Great-grandfather of Raja Raj Rajeshwar Singh",
    hi: "राजा राज राजेश्वर सिंह के परदादा",
  } satisfies L,
  paragraphs: [
    {
      en: "Raghubar Singh was born in 1876 and raised in the Rajput manner at Jhandipurwa. He learned Persian and Sanskrit at home and was later sent to the Government High School at Lakhimpur, where he studied English.",
      hi: "रघुबर सिंह का जन्म 1876 में हुआ। उनका पालन-पोषण झंडीपुरवा में राजपूती परंपरा के अनुसार हुआ। घर पर उन्होंने फ़ारसी और संस्कृत सीखी और बाद में अंग्रेज़ी पढ़ने के लिए उन्हें लखीमपुर के सरकारी हाई स्कूल भेजा गया।",
    },
    {
      en: "Family affairs soon drew him away from study. A civil suit had been filed against the whole estate by Rani Parbati Kunwar, wife of Raja Debi Bakhsh Singh of Mallanpur, who claimed to be the heir of her father, Raj Milap Singh. The case went up to the Judicial Committee of the Privy Council and was finally decided in his favour.",
      hi: "पारिवारिक ज़िम्मेदारियों ने जल्द ही उन्हें पढ़ाई से हटाकर संपत्ति के मुक़दमे की ओर मोड़ दिया। मल्लानपुर के राजा देवी बख़्श सिंह की पत्नी रानी पार्वती कुँवर ने अपने पिता राज मिलाप सिंह की उत्तराधिकारी होने का दावा करते हुए पूरी रियासत के विरुद्ध दीवानी वाद दायर किया था। मामला प्रिवी काउंसिल की न्यायिक समिति तक पहुँचा और अंततः उनके पक्ष में तय हुआ।",
    },
    {
      en: "The colonial government made him an Honorary Magistrate, recognised his title of “Raj”, and gave him a seat in Durbar as his family's representative. He was also connected by marriage and kinship to several Rajput houses, among them the Kachwaha Sirdars of Tanira and the Keonthal family of the Simla Hills.",
      hi: "तत्कालीन सरकार ने उन्हें ऑनरेरी मजिस्ट्रेट के अधिकार दिए, ‘राज’ की उपाधि को मान्यता दी और परिवार के प्रतिनिधि के रूप में दरबार में स्थान दिया। तनिरा के कछवाहा सरदारों और शिमला की पहाड़ियों के केओंथल परिवार समेत कई राजपूत घरानों से उनके वैवाहिक और पारिवारिक संबंध थे।",
    },
  ] satisfies L[],
};

export const gifts: { id: string; title: L; body: L; items?: L[] }[] = [
  {
    id: "temples",
    title: { en: "Temples", hi: "मंदिर" },
    body: {
      en: "The family built temples in its own area and in other districts, and gave hundreds of acres of land to them. The temples named in the family record are:",
      hi: "परिवार ने अपने क्षेत्र और उसके बाहर अन्य जनपदों में भी मंदिर बनवाए और इन मंदिरों को सैकड़ों एकड़ भूमि दान की। पारिवारिक विवरण में जिन मंदिरों का नाम आता है, वे हैं:",
    },
    items: [
      { en: "Antarved, near Bairiya", hi: "अन्तर्वेद, बैरिया के निकट" },
      { en: "Janglinath, near Lakhahi", hi: "जंगलीनाथ, लखाही के निकट" },
      { en: "Shiv-Parvati, Tharwarnganj, Lakhimpur", hi: "शिव-पार्वती, थरवरनगंज, लखीमपुर" },
      { en: "Ramjanki, near Aliganj Crossing, Gola Gokarannath", hi: "रामजानकी, अलीगंज क्रॉसिंग के निकट, गोला गोकर्णनाथ" },
      { en: "Bhroon Mandir, near Ramdhar, Ayodhya", hi: "भ्रूण मंदिर, रामधार के निकट, अयोध्या" },
    ],
  },
  {
    id: "antarved",
    title: { en: "Antarved Ashram", hi: "अन्तर्वेद आश्रम" },
    body: {
      en: "Around 1925–30 Raja Raghubar Singh gave roughly 2,200 acres of land to the Antarved Ashram.",
      hi: "लगभग 1925–30 के बीच राजा रघुबर सिंह ने अन्तर्वेद आश्रम को क़रीब 2,200 एकड़ भूमि दान में दी।",
    },
  },
  {
    id: "jhandi-park",
    title: { en: "Jhandi Park, Lucknow", hi: "झंडी पार्क, लखनऊ" },
    body: {
      en: "Raja Raghubar Singh gave a large plot of land opposite Lalbagh in Lucknow to the city's municipal corporation for public use, so that people coming to that part of the city would have a place to sit. It is still known as Jhandi Park. On 24 October 2000 the Lucknow Municipal Corporation installed a statue of Raja Raghubar Singh in the park.",
      hi: "राजा रघुबर सिंह ने राजधानी लखनऊ में लालबाग के सामने की एक बड़ी भूमि नगर निगम को जनहित में दान की, ताकि वहाँ आने वाले लोगों को बैठने की जगह मिल सके। यह स्थान आज भी ‘झंडी पार्क’ कहलाता है। 24 अक्टूबर 2000 को लखनऊ नगर निगम ने इस पार्क में राजा रघुबर सिंह की प्रतिमा स्थापित की।",
    },
  },
  {
    id: "shared-faiths",
    title: { en: "Land for other faiths", hi: "अन्य समुदायों के लिए भूमि" },
    body: {
      en: "Alongside the temples, the family also gave land for a mosque at Bazar Bagh in Jhandi Raj, for a Karbala at Harsinghpur, and for a gurudwara at Rani Farm, Govindpur-Ludhauri.",
      hi: "मंदिरों के साथ-साथ परिवार ने झंडी राज के बाज़ार बाग़ में मस्जिद के लिए, हरसिंहपुर में करबला के लिए और गोविंदपुर-लुधौरी के रानी फार्म में गुरुद्वारे के लिए भी भूमि दान की।",
    },
  },
];

export const fort: L = {
  en: "The fort of Jhandi Raj still stands at Jhandi in Kheri district, about five kilometres south of Nighasan tehsil. The place is now a small town.",
  hi: "झंडी राज का किला आज भी खीरी जनपद के झंडी में मौजूद है, जो निघासन तहसील से लगभग पाँच किलोमीटर दक्षिण में है। अब यह एक छोटा कस्बा रह गया है।",
};

export const succession: L = {
  en: "After Raja Raghubar Singh's death, his second son Kunwar Raj Bahadur Singh became Raja; the elder son, Rajkumar Iqbal Bahadur Singh, had died in 1936 at the age of seventeen. Raja Raj Bahadur Singh died in June 1945, and his widow then took over the administration of the estate.",
  hi: "राजा रघुबर सिंह के निधन के बाद उनके दूसरे पुत्र कुँवर राज बहादुर सिंह राजा बने। बड़े पुत्र राजकुमार इक़बाल बहादुर सिंह का निधन 1936 में सत्रह वर्ष की आयु में हो चुका था। राजा राज बहादुर सिंह का जून 1945 में निधन हुआ, जिसके बाद उनकी धर्मपत्नी ने रियासत का कार्यभार सँभाला।",
};

export const sourceNote: L = {
  en: "Drawn from a Hindi local-history book, an English account of the Talukdars of Oudh, and the family's own printed profile.",
  hi: "यह विवरण एक हिंदी स्थानीय इतिहास-पुस्तक, अवध के तालुक़दारों पर एक अंग्रेज़ी विवरण और परिवार के अपने मुद्रित परिचय पर आधारित है।",
};

/** Short figures for the home page. Each restates a fact given in full above. */
export const highlights: { figure: L; title: L; body: L }[] = [
  {
    figure: { en: "2,200 acres", hi: "2,200 एकड़" },
    title: { en: "Antarved Ashram", hi: "अन्तर्वेद आश्रम" },
    body: {
      en: "Land given by Raja Raghubar Singh to the ashram around 1925–30.",
      hi: "राजा रघुबर सिंह द्वारा लगभग 1925–30 में आश्रम को दी गई भूमि।",
    },
  },
  {
    figure: { en: "Lucknow", hi: "लखनऊ" },
    title: { en: "Jhandi Park", hi: "झंडी पार्क" },
    body: {
      en: "A large plot opposite Lalbagh, given to the city for public use.",
      hi: "लालबाग के सामने की एक बड़ी भूमि, जो नगर को जनहित में दी गई।",
    },
  },
  {
    figure: { en: "Temples", hi: "मंदिर" },
    title: { en: "Kheri and beyond", hi: "खीरी और उसके बाहर" },
    body: {
      en: "Built in the family's own area and in other districts, with hundreds of acres given to them.",
      hi: "परिवार के अपने क्षेत्र और अन्य जनपदों में बने, सैकड़ों एकड़ भूमि के साथ।",
    },
  },
  {
    figure: { en: "Three faiths", hi: "तीन समुदाय" },
    title: { en: "Mosque, Karbala, gurudwara", hi: "मस्जिद, करबला, गुरुद्वारा" },
    body: {
      en: "Land given for places of worship of Muslim and Sikh communities as well.",
      hi: "मुस्लिम और सिख समुदायों के धार्मिक स्थलों के लिए भी भूमि दी गई।",
    },
  },
];
