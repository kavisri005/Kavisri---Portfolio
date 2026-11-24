import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'tanglish' | 'ta';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.certifications': 'Certifications',
    'nav.achievements': 'Honors',
    'nav.contact': 'Contact',
    'nav.resume': 'Resume',
    'nav.askAI': 'Ask AI',

    // Hero
    'hero.status': 'Available for Software Internships & Full-Time Roles',
    'hero.greeting': "Hi, I'm",
    'hero.role': 'Aspiring Software Developer & CSE Student',
    'hero.tagline': 'Building performant software, intelligent data systems, and human-centric digital experiences.',
    'hero.viewProjects': 'View My Projects',
    'hero.downloadResume': 'Download Resume',
    'hero.contactMe': 'Contact Me',
    'hero.chatWithAI': 'Chat with AI Agent',
    'hero.quickStats': 'Quick Overview',
    'hero.cgpa': '8.33 CGPA',
    'hero.gradYear': 'Class of 2027',
    'hero.location': 'Trichy, Tamil Nadu',

    // About
    'about.title': 'About Me',
    'about.subtitle': 'Undergraduate Computer Science & Engineering student with a passion for software craft and data systems.',
    'about.story': 'I am an engineering student at M.A.M. College of Engineering and Technology with an 8.33 CGPA. I specialize in core software development, Python/Java programming, relational databases, data analytics, and generative AI systems.',
    'about.cardTitle': 'Developer Identity',
    'about.activeStudent': 'Active Student',

    // Skills
    'skills.title': 'Technical Arsenal',
    'skills.subtitle': 'Core programming languages, frameworks, databases, and analytical tools.',

    // Projects
    'projects.title': 'Featured Engineering Works',
    'projects.subtitle': 'Selected software systems, IoT solutions, and applications.',
    'projects.viewLive': 'Live Demo',
    'projects.viewGithub': 'View Source Code',
    'projects.details': 'Explore Architecture',

    // Experience
    'experience.title': 'Professional Journey',
    'experience.subtitle': 'Internships, technical development roles, and project leadership.',

    // Education
    'education.title': 'Academic Foundation',
    'education.subtitle': 'Computer Science & Engineering education and scholastic milestones.',

    // Certifications
    'certifications.title': 'Certifications & Credentials',
    'certifications.subtitle': 'Verified skill assessments and industry credentials.',

    // Contact
    'contact.title': "Let's Build Something",
    'contact.subtitle': 'Have an opportunity, technical question, or project idea? Send a direct message and it will be delivered straight to my email inbox.',
    'contact.sendMsg': 'Send Direct Message',
    'contact.delivering': 'Delivering to Inbox...',
    'contact.yourName': 'Your Name',
    'contact.yourEmail': 'Your Email',
    'contact.subject': 'Subject / Topic',
    'contact.message': 'Your Message',

    // AI Agent
    'ai.title': 'Kavi AI Assistant',
    'ai.subtitle': 'Ask anything about Kavisri in English, Tanglish, or Tamil',
    'ai.placeholder': 'Ask in English, Tanglish, or தமிழ் (e.g., "Kavisri pathi sollu")...',
    'ai.online': 'AI Agent Online',
    'ai.suggested': 'Quick Prompts:',
    'ai.welcome': "👋 Hello! I am Kavisri's Portfolio AI Agent. You can ask me anything about her projects, skills, education, internships, or how to contact her. You can type in English, Tanglish, or Tamil!",
    'ai.clear': 'Clear Chat',
    'ai.send': 'Send',
  },
  tanglish: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About Enna Pathi',
    'nav.skills': 'Skills & Tech',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.certifications': 'Certifications',
    'nav.achievements': 'Achievements',
    'nav.contact': 'Contact Me',
    'nav.resume': 'Resume Paaru',
    'nav.askAI': 'AI kitta Kelu',

    // Hero
    'hero.status': 'Software Roles & Internships-ku Ready!',
    'hero.greeting': 'Vanakkam, Naan',
    'hero.role': 'Aspiring Software Developer & CSE Student',
    'hero.tagline': 'Fast-ana Software, Data systems, and Modern AI tech build panradhu enoda passion.',
    'hero.viewProjects': 'Projects Paaru',
    'hero.downloadResume': 'Resume Download Pannu',
    'hero.contactMe': 'Contact Pannu',
    'hero.chatWithAI': 'AI Agent kitta Pesu',
    'hero.quickStats': 'Oru Quick Look',
    'hero.cgpa': '8.33 CGPA',
    'hero.gradYear': '2027 Batch',
    'hero.location': 'Trichy, TN',

    // About
    'about.title': 'Enna Pathi (About Me)',
    'about.subtitle': 'M.A.M. College-la B.E. Computer Science padikira student, software and data-la sema interest.',
    'about.story': 'Naan M.A.M. College of Engineering and Technology-la CSE padikiren (CGPA 8.33). Python, Java, React, SQL, Data Analytics, and Generative AI-la practical projects neraya panniruken.',
    'about.cardTitle': 'Developer Identity',
    'about.activeStudent': 'Active CSE Student',

    // Skills
    'skills.title': 'Technical Arsenal (En Skills)',
    'skills.subtitle': 'Programming languages, Web frameworks, Databases, and Modern AI Tools.',

    // Projects
    'projects.title': 'Top Engineering Projects',
    'projects.subtitle': 'IoT Smart Agriculture, Job Tracker, AI Studio mathiri naan pannina main projects.',
    'projects.viewLive': 'Live Demo Paaru',
    'projects.viewGithub': 'GitHub Code Paaru',
    'projects.details': 'Full Details',

    // Experience
    'experience.title': 'Experience & Journey',
    'experience.subtitle': 'CodeAlpha software internship and web development works.',

    // Education
    'education.title': 'Education Details',
    'education.subtitle': 'M.A.M. College of Engineering and Technology B.E. CSE (2023-2027).',

    // Certifications
    'certifications.title': 'Certifications & Courses',
    'certifications.subtitle': 'Python, Java, Cloud, and AI verified certificates.',

    // Contact
    'contact.title': 'Pesalam Vanga! (Get In Touch)',
    'contact.subtitle': 'Kooda work panna or questions irundha msg anupunga, straight-ah en mail inbox-ku vandhudum!',
    'contact.sendMsg': 'Direct Message Anupu',
    'contact.delivering': 'Mail send aaguthu...',
    'contact.yourName': 'Ungal Peyar (Name)',
    'contact.yourEmail': 'Ungal Email',
    'contact.subject': 'Subject / Topic',
    'contact.message': 'Message type pannunga',

    // AI Agent
    'ai.title': 'Kavi AI Assistant',
    'ai.subtitle': 'Tanglish, Tamil or English-la edhavadhu kelunga!',
    'ai.placeholder': 'Tanglish-la kelunga (e.g. "Kavisri pathi sollu", "Top projects enna?")...',
    'ai.online': 'AI Agent Active-ah Irukku',
    'ai.suggested': 'Quick Questions:',
    'ai.welcome': 'Vanakkam! Naan Kavisri oda Portfolio AI Assistant. Kavisri oda projects, tech stack, CGPA, or contact pathi edhavadhu therinjukanuma? Tanglish, English, or Tamil-la kelunga, naan explain panren!',
    'ai.clear': 'Chat Clear Pannu',
    'ai.send': 'Anupu',
  },
  ta: {
    // Nav
    'nav.home': 'முகப்பு',
    'nav.about': 'சுயவிவரம்',
    'nav.skills': 'திறன்கள்',
    'nav.projects': 'திட்டங்கள்',
    'nav.experience': 'அனுபவம்',
    'nav.education': 'கல்வி',
    'nav.certifications': 'சான்றிதழ்கள்',
    'nav.achievements': 'சாதனைகள்',
    'nav.contact': 'தொடர்புக்கு',
    'nav.resume': 'விவரக்குறிப்பு',
    'nav.askAI': 'செயற்கை நுண்ணறிவு',

    // Hero
    'hero.status': 'மென்பொருள் பணிகளுக்கு தயார் நிலையில்',
    'hero.greeting': 'வணக்கம், நான்',
    'hero.role': 'கணினி அறிவியல் பொறியியல் மாணவி & மென்பொருள் உருவாக்குநர்',
    'hero.tagline': 'திறமையான மென்பொருட்கள், தரவு அமைப்புகள் மற்றும் நவீன AI தொழில்நுட்பங்களை உருவாக்குவதில் ஆர்வமுள்ளவர்.',
    'hero.viewProjects': 'திட்டங்களைப் பார்க்க',
    'hero.downloadResume': 'விவரக்குறிப்பு பதிவிறக்கம்',
    'hero.contactMe': 'தொடர்பு கொள்ள',
    'hero.chatWithAI': 'AI உதவியாளருடன் உரையாட',
    'hero.quickStats': 'சுருக்கமான பார்வை',
    'hero.cgpa': '8.33 CGPA',
    'hero.gradYear': '2027 தொகுதி',
    'hero.location': 'திருச்சி, தமிழ்நாடு',

    // About
    'about.title': 'என்னைப் பற்றி',
    'about.subtitle': 'M.A.M. பொறியியல் மற்றும் தொழில்நுட்பக் கல்லூரியில் கணினி அறிவியல் பயிலும் மாணவி.',
    'about.story': 'நான் M.A.M. பொறியியல் மற்றும் தொழில்நுட்பக் கல்லூரியில் கணினி அறிவியல் (B.E. CSE) பயில்கிறேன் (மதிப்பெண்: 8.33 CGPA, 2023-2027). பைதான், ஜாவா, இணையதள உருவாக்கம், தரவு பகுப்பாய்வு மற்றும் AI தொழில்நுட்பங்களில் தீவிர ஆர்வம் கொண்டுள்ளேன்.',
    'about.cardTitle': 'டெவலப்பர் அடையாளம்',
    'about.activeStudent': 'மாணவி',

    // Skills
    'skills.title': 'தொழில்நுட்பத் திறன்கள்',
    'skills.subtitle': 'நிரலாக்க மொழிகள், இணைய கருவிகள் மற்றும் தரவுத்தளங்கள்.',

    // Projects
    'projects.title': 'முக்கிய திட்டங்கள்',
    'projects.subtitle': 'ஸ்மார்ட் விவசாயம், வேலைவாய்ப்பு கண்காணிப்பு மற்றும் பிற மென்பொருள் படைப்புகள்.',
    'projects.viewLive': 'நேரடி மாதிரி',
    'projects.viewGithub': 'மூலக் குறியீடு',
    'projects.details': 'முழு விவரங்கள்',

    // Experience
    'experience.title': 'பணி அனுபவம்',
    'experience.subtitle': 'கோட்ஆல்ஃபா மென்பொருள் பயிற்சி மற்றும் இணைய வளர்ச்சி பணிகள்.',

    // Education
    'education.title': 'கல்வி தகுதி',
    'education.subtitle': 'M.A.M. பொறியியல் மற்றும் தொழில்நுட்பக் கல்லூரி (2023-2027).',

    // Certifications
    'certifications.title': 'சான்றிதழ்கள்',
    'certifications.subtitle': 'சரிபார்க்கப்பட்ட சான்றிதழ்கள் மற்றும் பயிற்சிகள்.',

    // Contact
    'contact.title': 'தொடர்பு கொள்க',
    'contact.subtitle': 'வாய்ப்புகள் அல்லது திட்டங்களுக்கு செய்தி அனுப்புங்கள், அது நேரடியாக எனது மின்னஞ்சலுக்கு வந்து சேரும்.',
    'contact.sendMsg': 'செய்தி அனுப்புக',
    'contact.delivering': 'மின்னஞ்சல் அனுப்பப்படுகிறது...',
    'contact.yourName': 'உங்கள் பெயர்',
    'contact.yourEmail': 'உங்கள் மின்னஞ்சல்',
    'contact.subject': 'பொருள் / தலைப்பு',
    'contact.message': 'உங்கள் செய்தி',

    // AI Agent
    'ai.title': 'கவி AI உதவியாளர்',
    'ai.subtitle': 'தமிழ், தங்கிலீஷ் அல்லது ஆங்கிலத்தில் எதையும் கேளுங்கள்',
    'ai.placeholder': 'தமிழிலோ அல்லது Tanglish-லோ கேளுங்கள்...',
    'ai.online': 'AI உதவியாளர் இணைப்பில் உள்ளது',
    'ai.suggested': 'விரைவு வினாக்கள்:',
    'ai.welcome': 'வணக்கம்! நான் கவிஸ்ரீயின் AI உதவியாளர். கவிஸ்ரீயின் திட்டங்கள், திறன்கள், கல்வி அல்லது தொடர்பு விவரங்கள் பற்றி என்னிடம் கேளுங்கள்!',
    'ai.clear': 'அழிக்குக',
    'ai.send': 'அனுப்புக',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('kavi_portfolio_lang');
      if (saved === 'en' || saved === 'tanglish' || saved === 'ta') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('kavi_portfolio_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
