import type { L } from "@/lib/i18n";

/** Short legal pages. Have them reviewed by a legal adviser before launch. */

export const legalUpdated = "2026-09-29";

type Section = { title: L; body: L };

export const privacy: { intro: L; sections: Section[] } = {
  intro: {
    en: "This page explains what happens to the information you send through this website.",
    hi: "यह पृष्ठ बताता है कि इस वेबसाइट के माध्यम से भेजी गई जानकारी का क्या होता है।",
  },
  sections: [
    {
      title: { en: "What we collect", hi: "हम क्या जानकारी लेते हैं" },
      body: {
        en: "Only what you type into the enquiry form: your name, mobile number, optional email address, the subject, the type of enquiry and your message.",
        hi: "केवल वही जो आप पूछताछ फ़ॉर्म में लिखते हैं: आपका नाम, मोबाइल नंबर, वैकल्पिक ईमेल पता, विषय, पूछताछ का प्रकार और आपका संदेश।",
      },
    },
    {
      title: { en: "How it is used", hi: "इसका उपयोग कैसे होता है" },
      body: {
        en: "Your enquiry is sent by email so that it can be answered. It is not stored in a database on this website and is not used for advertising.",
        hi: "आपकी पूछताछ ईमेल द्वारा भेजी जाती है ताकि उसका उत्तर दिया जा सके। यह इस वेबसाइट के किसी डेटाबेस में सुरक्षित नहीं रखी जाती और विज्ञापन के लिए उपयोग नहीं होती।",
      },
    },
    {
      title: { en: "Sharing", hi: "साझा करना" },
      body: {
        en: "The email is delivered through an email-sending service. Your details are not sold or shared for any other purpose.",
        hi: "ईमेल एक ईमेल-सेवा के माध्यम से पहुँचाई जाती है। आपकी जानकारी किसी अन्य उद्देश्य के लिए बेची या साझा नहीं की जाती।",
      },
    },
    {
      title: { en: "Cookies", hi: "कुकीज़" },
      body: {
        en: "This website does not set advertising or tracking cookies.",
        hi: "यह वेबसाइट विज्ञापन या ट्रैकिंग कुकीज़ नहीं लगाती।",
      },
    },
    {
      title: { en: "Questions", hi: "प्रश्न" },
      body: {
        en: "To ask about or request removal of an enquiry you sent, use the contact page.",
        hi: "आपके भेजे किसी संदेश के बारे में पूछने या उसे हटवाने के लिए संपर्क पृष्ठ का उपयोग करें।",
      },
    },
  ],
};

export const terms: { intro: L; sections: Section[] } = {
  intro: {
    en: "By using this website you agree to the following terms.",
    hi: "इस वेबसाइट का उपयोग करके आप निम्न शर्तों से सहमत होते हैं।",
  },
  sections: [
    {
      title: { en: "Purpose", hi: "उद्देश्य" },
      body: {
        en: "This is the official information website of Raja Raj Rajeshwar Singh. It is provided for general information about his background, family history and public life.",
        hi: "यह राजा राज राजेश्वर सिंह की आधिकारिक सूचना वेबसाइट है। यह उनकी पृष्ठभूमि, पारिवारिक इतिहास और सार्वजनिक जीवन की सामान्य जानकारी के लिए है।",
      },
    },
    {
      title: { en: "Accuracy of content", hi: "सामग्री की सटीकता" },
      body: {
        en: "Content is prepared from documents and records supplied for this website. Historical material about earlier generations is drawn from published accounts and family records and may vary between sources.",
        hi: "सामग्री इस वेबसाइट के लिए उपलब्ध कराए गए दस्तावेज़ों और अभिलेखों से तैयार की गई है। पूर्व पीढ़ियों से जुड़ी ऐतिहासिक सामग्री प्रकाशित विवरणों और पारिवारिक अभिलेखों पर आधारित है और स्रोतों के बीच भिन्न हो सकती है।",
      },
    },
    {
      title: { en: "Use of content", hi: "सामग्री का उपयोग" },
      body: {
        en: "Text, photographs and the logo may not be copied or republished without permission.",
        hi: "पाठ, छायाचित्र और लोगो को अनुमति के बिना कॉपी या पुनः प्रकाशित नहीं किया जा सकता।",
      },
    },
    {
      title: { en: "External links", hi: "बाहरी लिंक" },
      body: {
        en: "Links to social media and other external sites open in a new tab. We are not responsible for the content of those sites.",
        hi: "सोशल मीडिया और अन्य बाहरी साइटों के लिंक नए टैब में खुलते हैं। उन साइटों की सामग्री के लिए हम उत्तरदायी नहीं हैं।",
      },
    },
    {
      title: { en: "Assistant", hi: "सहायक" },
      body: {
        en: "The on-site assistant only repeats information already published on this website. It does not give opinions or political statements.",
        hi: "साइट का सहायक केवल इसी वेबसाइट पर पहले से प्रकाशित जानकारी दोहराता है। वह कोई राय या राजनीतिक वक्तव्य नहीं देता।",
      },
    },
  ],
};
