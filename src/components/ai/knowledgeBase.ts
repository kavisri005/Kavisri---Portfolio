export interface KnowledgeResponse {
  en: string;
  tanglish: string;
  ta: string;
  hi?: string;
  action?: {
    label: { en: string; tanglish: string; ta: string; hi?: string };
    type: 'scroll' | 'modal' | 'external';
    target: string;
  };
  relatedSuggestions?: string[];
}

export const KNOWLEDGE_BASE: Record<string, KnowledgeResponse> = {
  about: {
    en: "Kavisri A is an aspiring Software Developer and Computer Science Engineering student (Batch 2023–2027) at M.A.M. College of Engineering and Technology, Tiruchirappalli, maintaining an academic record of 8.33 CGPA.\n\nHer core technical expertise spans Python, Java, modern Full-Stack Web Development with React and Tailwind CSS, Relational Databases with MySQL, Data Analytics, and Applied Generative AI.",
    tanglish: "Kavisri A M.A.M. College of Engineering and Technology (MAMCET), Trichy-la Computer Science Engineering (Batch 2023–2027) padikiraanga. Avanga academic score 8.33 CGPA.\n\nPython, Java, React, SQL, Data Analytics, and Generative AI-la hands-on projects create panni practical software solutions develop pandraanga.",
    ta: "கவிஸ்ரீ A திருச்சி M.A.M. பொறியியல் மற்றும் தொழில்நுட்பக் கல்லூரியில் கணினி அறிவியல் (B.E. CSE, 2023-2027) பயிலும் மாணவி ஆவார். இவரது கல்வித்திறன் 8.33 CGPA ஆகும்.\n\nபைதான், ஜாவா, React, தரவுத்தளங்கள் மற்றும் நவீன AI தொழில்நுட்பங்களில் பல நடைமுறை திட்டங்களை வெற்றிகரமாக உருவாக்கியுள்ளார்.",
    hi: "कवीश्री ए (Kavisri A) एम.ए.एम. कॉलेज ऑफ इंजीनियरिंग एंड टेक्नोलॉजी, त्रिची से कंप्यूटर साइंस इंजीनियरिंग (2023-2027) की छात्रा हैं। उनका शैक्षणिक स्कोर 8.33 CGPA है।\n\nवे Python, Java, React, SQL, Data Analytics और Generative AI में दक्ष हैं।",
    action: {
      label: { en: 'Read Full Bio', tanglish: 'About Me Paaru', ta: 'சுயவிவரம் காண்க', hi: 'पूरा बायो देखें' },
      type: 'scroll',
      target: '#about',
    },
    relatedSuggestions: ['What are her top projects?', 'What is her tech stack?', 'How to contact Kavisri?'],
  },
  projects: {
    en: "Kavisri has engineered multiple impactful software and hardware projects. Her flagship work includes a Smart Soil and Crop Monitoring IoT System that automates irrigation based on sensor telemetry and saves over 40% water.\n\nShe has also developed a Secure Online Voting Platform with role-based cryptographic verification, a Dynamic Portfolio and CMS Platform with real-time multi-device sync, and a Machine Learning Customer Churn Analytics model achieving 86% accuracy.",
    tanglish: "Kavisri multiple engineering projects develop pannirukaanga. Main-ah IoT Smart Soil and Crop Monitoring System create panni automatic irrigation moolama 40% water save panna system build pannanga.\n\nAdhoda Secure Online Voting Platform, Dynamic Portfolio CMS with real-time sync, and 86% accuracy ulla Customer Churn ML model build pannirukaanga.",
    ta: "கவிஸ்ரீ பல பயனுள்ள தொழில்நுட்ப திட்டங்களை உருவாக்கியுள்ளார். அவற்றில் முதன்மையானது 40% வரை தண்ணீரை சேமிக்கும் IoT ஸ்மார்ட் விவசாய மண் கண்காணிப்பு திட்டமாகும்.\n\nமேலும் பாதுகாப்பான இணைய வாக்களிப்பு தளம், நிகழ்நேர போர்ட்ஃபோலியோ CMS மற்றும் இயந்திர கற்றல் அடிப்படையிலான வாடிக்கையாளர் பகுப்பாய்வு மாதிரிகளையும் உருவாக்கியுள்ளார்.",
    hi: "कवीश्री ने कई प्रभावशाली प्रोजेक्ट्स बनाए हैं। इनमें IoT आधारित स्मार्ट मृदा व फसल निगरानी प्रणाली प्रमुख है जो 40% से अधिक पानी की बचत करती है।\n\nइसके अलावा उन्होंने सुरक्षित ऑनलाइन वोटिंग सिस्टम, डायनामिक पोर्टफोलियो CMS और मशीन लर्निंग मॉडल विकसित किए हैं।",
    action: {
      label: { en: 'View Projects', tanglish: 'Projects Paaru', ta: 'திட்டங்கள் காண்க', hi: 'प्रोजेक्ट्स देखें' },
      type: 'scroll',
      target: '#projects',
    },
    relatedSuggestions: ['Tell me about IoT Agriculture', 'What technologies did she use?', 'Download resume'],
  },
  skills: {
    en: "Kavisri's technical toolkit includes core programming in Python, Java, JavaScript, and SQL. In web architecture, she develops responsive interfaces using React, Tailwind CSS, and RESTful APIs.\n\nHer data and analytics capabilities include Pandas, NumPy, Matplotlib, and Power BI, alongside active exploration of Generative AI, Prompt Engineering, and modern API integrations.",
    tanglish: "Kavisri-oda technical skillset-la Python, Java, JavaScript, and SQL programming languages irukku. Web development-la React, Tailwind CSS, and REST APIs use panraanga.\n\nData analytics-la Pandas, NumPy, Power BI, and modern Generative AI prompt engineering-la practical knowledge irukku.",
    ta: "கவிஸ்ரீயின் தொழில்நுட்ப திறன்களில் பைதான், ஜாவா, ஜாவாஸ்கிரிப்ட் மற்றும் SQL முதன்மையானவை. இணையதள வடிவமைப்பில் React மற்றும் Tailwind CSS பயன்படுத்துகிறார்.\n\nதரவு பகுப்பாய்வில் Pandas, NumPy, Power BI மற்றும் நவீன ஜெனரேட்டிவ் AI தொழில்நுட்பங்களில் சிறந்த நடைமுறை அறிவு பெற்றுள்ளார்.",
    hi: "कवीश्री के तकनीकी कौशल में Python, Java, JavaScript और SQL शामिल हैं। वेब विकास में वे React, Tailwind CSS और REST APIs का उपयोग करती हैं।\n\nडेटा एनालिटिक्स में Pandas, NumPy, Power BI और Generative AI में उनका व्यावहारिक अनुभव है।",
    action: {
      label: { en: 'Inspect Skills', tanglish: 'Skills Paaru', ta: 'திறன்கள் காண்க', hi: 'स्किल्स देखें' },
      type: 'scroll',
      target: '#skills',
    },
    relatedSuggestions: ['What certifications does she have?', 'Can she code in Python?', 'Show her projects'],
  },
  education: {
    en: "Kavisri is pursuing her Bachelor of Engineering in Computer Science and Engineering (Batch 2023–2027) at M.A.M. College of Engineering and Technology, Tiruchirappalli, affiliated with Anna University.\n\nShe maintains a cumulative grade point average of 8.33 out of 10.0, with focused coursework in Data Structures, Object-Oriented Programming, Database Management Systems, and Web Engineering.",
    tanglish: "Kavisri M.A.M. College of Engineering and Technology (MAMCET), Trichy-la B.E. Computer Science and Engineering (2023 – 2027) padikiraanga. Avanga CGPA score 8.33 / 10.0.\n\nData Structures, Database Management, Java, Python, and Software Architecture-la strong theoretical and practical knowledge irukku.",
    ta: "கவிஸ்ரீ திருச்சி M.A.M. பொறியியல் மற்றும் தொழில்நுட்பக் கல்லூரியில் அண்ணா பல்கலைக்கழக பாடத்திட்டத்தின் கீழ் B.E. கணினி அறிவியல் (2023-2027) பயில்கிறார். இவரது கல்வி மதிப்பெண் 8.33 CGPA ஆகும்.",
    hi: "कवीश्री एम.ए.एम. कॉलेज ऑफ इंजीनियरिंग एंड टेक्नोलॉजी, त्रिची से बी.ई. कंप्यूटर साइंस एंड इंजीनियरिंग (2023–2027) कर रही हैं। उनका कुल स्कोर 8.33 / 10.0 CGPA है।",
    action: {
      label: { en: 'View Education', tanglish: 'Education Paaru', ta: 'கல்வி விவரம்', hi: 'शिक्षा देखें' },
      type: 'scroll',
      target: '#education',
    },
    relatedSuggestions: ['Where did she intern?', 'What is her CGPA?', 'How to contact Kavisri?'],
  },
  experience: {
    en: "Kavisri has completed four industry internships across specialized technical domains. Her background includes working as an AI and Data Intern at Nirmaan Organization, a Full-Stack Web Development Intern at Thamizhan Soft Tech, a Web Developer Intern at Slash Mark, and a Python and Data Analytics Intern at CodSoft.\n\nAcross these roles, she built automated data extraction tools, integrated RESTful APIs, and delivered production-ready user interfaces.",
    tanglish: "Kavisri 4 industry internships mudichurukaanga. Nirmaan Organization-la AI and Data Intern, Thamizhan Soft Tech-la Full-Stack Web Developer, Slash Mark-la Web Developer, and CodSoft-la Python and Data Analytics Intern-ah work pannirukaanga.\n\nIndha internships moolama practical application development and real-time problem-solving experience gain pannirukaanga.",
    ta: "கவிஸ்ரீ 4 தொழில்முறை இன்டர்ன்ஷிப்களை வெற்றிகரமாக முடித்துள்ளார். நிர்மான் நிறுவனத்தில் AI & டேட்டா இன்டர்ன், தமிழன் சாப்ட் டெக் நிறுவனத்தில் ஃபுல்-ஸ்டாக் வெப் டெவலப்பர், ஸ்லாஷ் மார்க் மற்றும் கோட்சாப்ட் நிறுவனங்களில் பயிற்சி பெற்றுள்ளார்.",
    hi: "कवीश्री ने 4 इंडस्ट्री इंटर्नशिप्स पूरी की हैं, जिनमें निर्माण ऑर्गनाइजेशन में AI व डेटा इंटर्न, तमिलन सॉफ्ट टेक में फुल-स्टैक वेब इंटर्न, स्लैश मार्क और कोडसॉफ्ट शामिल हैं।",
    action: {
      label: { en: 'Career Journey', tanglish: 'Experience Paaru', ta: 'அனுபவம் காண்க', hi: 'अनुभव देखें' },
      type: 'scroll',
      target: '#experience',
    },
    relatedSuggestions: ['What projects did she build?', 'Download resume', 'How to contact her?'],
  },
  contact: {
    en: "You can reach Kavisri directly via email at a.kavisri005@gmail.com or by phone at +91 86675 89833. She is based in Tiruchirappalli, Tamil Nadu, India.\n\nYou can also explore her code repositories on GitHub at github.com/kavisri005 and connect professionally on LinkedIn at linkedin.com/in/kavisri-a-6a14a328a.",
    tanglish: "Kavisri-kitta direct-ah contact panna a.kavisri005@gmail.com email or +91 86675 89833 phone number use pannalaam. Avanga Trichy, Tamil Nadu-la irukaanga.\n\nGitHub repo github.com/kavisri005 and LinkedIn profile linkedin.com/in/kavisri-a-6a14a328a moolama kooda connect pannalaam.",
    ta: "கவிஸ்ரீயை நேரடியாக தொடர்பு கொள்ள a.kavisri005@gmail.com என்ற மின்னஞ்சல் அல்லது +91 86675 89833 என்ற தொலைபேசி எண்ணைப் பயன்படுத்தலாம். திருச்சி, தமிழ்நாட்டில் வசிக்கிறார்.",
    hi: "कवीश्री से सीधे a.kavisri005@gmail.com ईमेल या +91 86675 89833 फोन नंबर के माध्यम से संपर्क किया जा सकता है। वे त्रिची, तमिलनाडु में स्थित हैं।",
    action: {
      label: { en: 'Dispatch Email', tanglish: 'Mail Anupu', ta: 'மின்னஞ்சல் அனுப்புக', hi: 'ईमेल भेजें' },
      type: 'scroll',
      target: '#contact',
    },
    relatedSuggestions: ['Is she available for hire?', 'Download resume', 'What are her skills?'],
  },
  resume: {
    en: "Kavisri's official resume provides comprehensive documentation of her 8.33 CGPA, technical skills, engineering projects, and internship history. You can review the verified document directly in the interactive viewer or download the PDF copy.",
    tanglish: "Kavisri-oda official resume-la 8.33 CGPA, technical skills, project architectures, and 4 internships details irukku. Indha portfolio-la direct-ah viewer open panni PDF download-um pannalaam.",
    ta: "கவிஸ்ரீயின் விரிவான சுயவிவரக் குறிப்பை (Resume) இந்த இணையதளத்தில் உள்ள பிரத்யேக பார்வையாளரில் நேரடியாகப் பார்க்கலாம் மற்றும் PDF வடிவில் பதிவிறக்கம் செய்து கொள்ளலாம்.",
    hi: "कवीश्री का आधिकारिक रिज्यूमे इस पोर्टफोलियो पर उपलब्ध है। आप इसे सीधे इंटरैक्टिव व्यूअर में देख सकते हैं या PDF डाउनलोड कर सकते हैं।",
    action: {
      label: { en: 'Open Resume Viewer', tanglish: 'Resume Open Pannu', ta: 'விவரக்குறிப்பைத் திற', hi: 'रिज्यूमे खोलें' },
      type: 'modal',
      target: 'resume',
    },
    relatedSuggestions: ['What are her skills?', 'Tell me about her projects', 'How to contact her?'],
  },
  hire: {
    en: "Kavisri is actively open to Software Engineering, Full-Stack Web Development, Data Analytics, and AI/ML internship or full-time opportunities. She brings strong algorithmic fundamentals, an 8.33 CGPA, and proven hands-on project execution.",
    tanglish: "Kavisri ippo Software Development, Full-Stack, Data Analytics, and AI/ML roles-ku available-ah irukaanga. 8.33 CGPA and continuous learning mindset irukku.",
    ta: "கவிஸ்ரீ மென்பொருள் பொறியாளர், ஃபுல்-ஸ்டாக் வெப் டெவலப்மென்ட் மற்றும் AI/ML பணிகளை ஏற்க தயாராக உள்ளார். 8.33 CGPA மற்றும் நடைமுறை திட்ட அனுபவம் பெற்றுள்ளார்.",
    hi: "कवीश्री सॉफ्टवेयर इंजीनियरिंग, फुल-स्टैक और AI/ML रोल्स के लिए उपलब्ध हैं। 8.33 CGPA के साथ वे तुरंत योगदान देने के लिए तत्पर हैं।",
    action: {
      label: { en: 'Hire / Connect', tanglish: 'Connect Pannu', ta: 'தொடர்பு கொள்க', hi: 'संपर्क करें' },
      type: 'scroll',
      target: '#contact',
    },
    relatedSuggestions: ['Download her resume', 'What is her email?', 'What projects did she build?'],
  },
  agriculture: {
    en: "The Smart Soil and Crop Monitoring System is an IoT-based agricultural solution developed by Kavisri. It integrates soil moisture and temperature sensors with automated irrigation controls and a real-time web dashboard, conserving over 40% water while delivering data-driven crop recommendations.",
    tanglish: "Smart Soil and Crop Monitoring System Kavisri build panna IoT project. Soil moisture and temperature sensors use panni automatic pump controller and live dashboard create pannirukaanga. Idhula 40% water save aagum.",
    ta: "ஸ்மார்ட் விவசாய மேலாண்மை திட்டம் என்பது மண் ஈரப்பதம் மற்றும் வெப்பநிலை சென்சார்கள் மூலம் தானாக நீர் பாய்ச்சும் IoT அமைப்பாகும். இது 40% வரை தண்ணீரை சேமிக்க உதவுகிறது.",
    hi: "स्मार्ट मृदा व फसल निगरानी प्रणाली कवीश्री द्वारा विकसित एक IoT प्रोजेक्ट है, जो स्वचालित सिंचाई और लाइव डैशबोर्ड के माध्यम से 40% पानी की बचत करता है।",
    action: {
      label: { en: 'Inspect Project', tanglish: 'Project Paaru', ta: 'திட்டம் காண்க', hi: 'प्रोजेक्ट देखें' },
      type: 'scroll',
      target: '#projects',
    },
    relatedSuggestions: ['What other projects did she build?', 'What are her skills?', 'How to contact her?'],
  },
};

export const QUICK_CLUES = [
  'Top Projects',
  'Technical Skills',
  '8.33 CGPA & College',
  'Internship Journey',
  'Contact Details',
  'Resume Document',
];

