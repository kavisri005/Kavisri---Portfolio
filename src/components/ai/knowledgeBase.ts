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
    en: "Kavisri A is a Computer Science and Engineering undergraduate at M.A.M. College of Engineering and Technology with an 8.33/10 CGPA. She has hands-on experience in full-stack web development using React.js, JavaScript, Python, Flask, SQL, REST APIs, and database-driven systems.",
    tanglish: "Kavisri A M.A.M. College of Engineering and Technology-la Computer Science and Engineering padikkiraanga; CGPA 8.33/10. React.js, JavaScript, Python, Flask, SQL, REST APIs and database systems-la hands-on experience irukku.",
    ta: "Kavisri A is a Computer Science and Engineering undergraduate at M.A.M. College of Engineering and Technology with an 8.33/10 CGPA. Her experience includes React.js, JavaScript, Python, Flask, SQL, REST APIs, and database-driven systems.",
    hi: "Kavisri is a CSE undergraduate at M.A.M. College of Engineering and Technology with 8.33/10 CGPA and hands-on React, JavaScript, Python, Flask, SQL, and REST API experience.",
    action: {
      label: { en: 'Read Full Bio', tanglish: 'About Me Paaru', ta: 'சுயவிவரம் காண்க', hi: 'पूरा बायो देखें' },
      type: 'scroll',
      target: '#about',
    },
    relatedSuggestions: ['What are her top projects?', 'What is her tech stack?', 'How to contact Kavisri?'],
  },
  projects: {
    en: "Her resume lists four projects: PulseTask, a task management web app; Parambariyam Cashews, a premium e-commerce platform; MD Engineers, a business website and enquiry management system; and Sri Parasakthi Digitals, a photography studio website. Each project includes a live demo link in the portfolio.",
    tanglish: "Resume-la naalu projects irukku: PulseTask task management app, Parambariyam Cashews e-commerce site, MD Engineers business and enquiry system, Sri Parasakthi Digitals photography studio website. Portfolio-la ovvoru project-ukkum live demo link irukku.",
    ta: "Kavisri's resume lists four projects: PulseTask task manager, Parambariyam Cashews e-commerce platform, MD Engineers business and enquiry system, and Sri Parasakthi Digitals photography studio website.",
    hi: "Her listed projects are PulseTask, Parambariyam Cashews, MD Engineers, and Sri Parasakthi Digitals.",
    action: {
      label: { en: 'View Projects', tanglish: 'Projects Paaru', ta: 'திட்டங்கள் காண்க', hi: 'प्रोजेक्ट्स देखें' },
      type: 'scroll',
      target: '#projects',
    },
    relatedSuggestions: ['Tell me about MD Engineers', 'What technologies did she use?', 'Open the live demos'],
  },
  skills: {
    en: "Her resume lists Python and JavaScript; HTML and CSS; React.js and Flask; MySQL, PostgreSQL, and Supabase; Generative AI, Prompt Engineering, and REST APIs; Git, GitHub, VS Code, Google Colab, Supabase, Vercel, and Microsoft Excel. Professional skills include problem solving, critical thinking, decision making, teamwork, adaptability, and quick learning.",
    tanglish: "Resume-la Python, JavaScript, HTML, CSS, React.js, Flask, MySQL, PostgreSQL, Supabase, Generative AI, Prompt Engineering, REST APIs, Git, GitHub, VS Code, Colab, Vercel, Excel list pannirukkaanga. Soft skills-la problem solving, teamwork, adaptability, quick learning irukku.",
    ta: "Listed skills include Python, JavaScript, HTML, CSS, React.js, Flask, MySQL, PostgreSQL, Supabase, Generative AI, Prompt Engineering, REST APIs, Git, GitHub, VS Code, Google Colab, Vercel, Microsoft Excel, problem solving, teamwork, adaptability, and quick learning.",
    hi: "Her listed skills include Python, JavaScript, HTML, CSS, React.js, Flask, MySQL, PostgreSQL, Supabase, REST APIs, Generative AI, and Prompt Engineering.",
    action: {
      label: { en: 'Inspect Skills', tanglish: 'Skills Paaru', ta: 'திறன்கள் காண்க', hi: 'स्किल्स देखें' },
      type: 'scroll',
      target: '#skills',
    },
    relatedSuggestions: ['What certifications does she have?', 'Can she code in Python?', 'Show her projects'],
  },
  education: {
    en: "Kavisri is pursuing a B.E. in Computer Science and Engineering at M.A.M. College of Engineering and Technology, Trichy. Her resume lists an 8.33/10 CGPA and a 2023 start date.",
    tanglish: "Kavisri M.A.M. College of Engineering and Technology, Trichy-la B.E. Computer Science and Engineering padikkiraanga. Resume-la 8.33/10 CGPA and 2023 start year irukku.",
    ta: "Kavisri is pursuing a B.E. in Computer Science and Engineering at M.A.M. College of Engineering and Technology, Trichy. The resume lists an 8.33/10 CGPA and a 2023 start date.",
    hi: "She is pursuing a B.E. in Computer Science and Engineering at M.A.M. College of Engineering and Technology in Trichy. Her CGPA is 8.33/10.",
    action: {
      label: { en: 'View Education', tanglish: 'Education Paaru', ta: 'கல்வி விவரம்', hi: 'शिक्षा देखें' },
      type: 'scroll',
      target: '#education',
    },
    relatedSuggestions: ['Where did she intern?', 'What is her CGPA?', 'How to contact Kavisri?'],
  },
  experience: {
    en: "Her resume lists four internships: Web Developer Intern at Swasti Technologies (2024, Trichy); Database Intern at Thamizhan Skills (2025, Madipakkam); AIML Intern at Nirmaan WAISE (2026, Thambaram); and Software Developer Intern at Prcbo Tech (2026, Madurai).",
    tanglish: "Resume-la naalu internships: Swasti Technologies-la Web Developer Intern (2024), Thamizhan Skills-la Database Intern (2025), Nirmaan WAISE-la AIML Intern (2026), Prcbo Tech-la Software Developer Intern (2026).",
    ta: "The resume lists internships at Swasti Technologies, Thamizhan Skills, Nirmaan WAISE, and Prcbo Tech in web development, databases, AI/ML, and software development.",
    hi: "Her resume lists internships at Swasti Technologies, Thamizhan Skills, Nirmaan WAISE, and Prcbo Tech in 2024, 2025, and 2026.",
    action: {
      label: { en: 'Career Journey', tanglish: 'Experience Paaru', ta: 'அனுபவம் காண்க', hi: 'अनुभव देखें' },
      type: 'scroll',
      target: '#experience',
    },
    relatedSuggestions: ['What projects did she build?', 'Download resume', 'How to contact her?'],
  },
  contact: {
    en: "Kavisri's resume lists email a.kavisrii@gmail.com and phone 8667589833. She is based in Salem, India. GitHub: github.com/kavisri005. LinkedIn: linkedin.com/in/kavisri-a-6a14a328a.",
    tanglish: "Contact: a.kavisrii@gmail.com, phone 8667589833. Salem, India-la irukkaanga. GitHub github.com/kavisri005; LinkedIn linkedin.com/in/kavisri-a-6a14a328a.",
    ta: "Contact Kavisri at a.kavisrii@gmail.com or 8667589833. She is based in Salem, India. GitHub is github.com/kavisri005 and LinkedIn is linkedin.com/in/kavisri-a-6a14a328a.",
    hi: "Contact Kavisri at a.kavisrii@gmail.com or 8667589833. She is based in Salem, India.",
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
    en: "Kavisri is seeking a Software Developer role where she can contribute to real-world applications and grow as a developer. Her resume highlights hands-on full-stack web development, REST APIs, database systems, and AI-powered tools.",
    tanglish: "Kavisri real-world applications-la contribute panni developer-aa grow aaga Software Developer role thedittu irukkaanga. Full-stack web development, REST APIs, database systems experience irukku.",
    ta: "Kavisri is seeking a Software Developer role. Her resume highlights full-stack web development, REST APIs, database systems, and AI-powered tools.",
    hi: "Kavisri is seeking a Software Developer role. Her resume highlights full-stack web development, REST APIs, and database-driven systems.",
    action: {
      label: { en: 'Hire / Connect', tanglish: 'Connect Pannu', ta: 'தொடர்பு கொள்க', hi: 'संपर्क करें' },
      type: 'scroll',
      target: '#contact',
    },
    relatedSuggestions: ['Download her resume', 'What is her email?', 'What projects did she build?'],
  },
  agriculture: {
    en: "Agriculture IoT work is not listed in Kavisri's attached resume. Her listed projects are PulseTask, Parambariyam Cashews, MD Engineers, and Sri Parasakthi Digitals.",
    tanglish: "Attached resume-la agriculture IoT project list pannala. Resume-la PulseTask, Parambariyam Cashews, MD Engineers, Sri Parasakthi Digitals projects irukku.",
    ta: "The attached resume does not list an agriculture IoT project. It lists PulseTask, Parambariyam Cashews, MD Engineers, and Sri Parasakthi Digitals.",
    hi: "The attached resume does not list an agriculture IoT project. Its listed projects are PulseTask, Parambariyam Cashews, MD Engineers, and Sri Parasakthi Digitals.",
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

