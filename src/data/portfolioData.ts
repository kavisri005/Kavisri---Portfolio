import { 
  Profile, 
  Skill, 
  Project, 
  Experience, 
  Education, 
  Certification, 
  Achievement, 
  ExploringItem, 
  SocialLink, 
  ResumeData 
} from '../types';

export const initialProfile: Profile = {
  id: 'kavisri-profile',
  name: 'KAVISRI A',
  headline: 'I build practical software solutions with code, data & AI.',
  short_bio: 'Computer Science and Engineering student building practical solutions across software development, data analytics, and AI/ML.',
  detailed_bio: [
    'I am a Computer Science and Engineering undergraduate with a CGPA of 8.33/10 and a strong interest in software development and problem-solving.',
    'My experience spans web development, data analysis, databases, and introductory AI/ML. I enjoy turning ideas into practical applications and learning new technologies through hands-on projects.',
    'Currently, I am exploring Generative AI, Prompt Engineering, and APIs while continuing to strengthen my software development skills.'
  ],
  location: 'Trichy, India',
  email: 'a.kavisri005@gmail.com',
  phone: '8667589833',
  linkedin_url: 'https://linkedin.com/in/kavisri-a-6a14a328a',
  linkedin_display: 'linkedin.com/in/kavisri-a-6a14a328a',
  github_url: 'https://github.com/kavisri005',
  github_display: 'github.com/kavisri005',
  resume_url: '',
  profile_image_url: '',
  updated_at: new Date().toISOString(),
  education_brief: {
    degree: 'B.E. Computer Science and Engineering',
    cgpa: '8.33 / 10',
    location: 'Trichy, India',
    focus: 'Software Development',
    exploring: 'Generative AI • Prompt Engineering • APIs'
  }
};

export const initialSkills: Skill[] = [
  // Software Development
  { id: 'skill-python', category: 'Software Development', name: 'Python', display_order: 1, is_published: true },
  { id: 'skill-java', category: 'Software Development', name: 'Java', display_order: 2, is_published: true },
  { id: 'skill-javascript', category: 'Software Development', name: 'JavaScript', display_order: 3, is_published: true },
  { id: 'skill-html5', category: 'Software Development', name: 'HTML5', display_order: 4, is_published: true },
  { id: 'skill-css', category: 'Software Development', name: 'CSS', display_order: 5, is_published: true },

  // Database
  { id: 'skill-mysql', category: 'Database', name: 'MySQL', display_order: 6, is_published: true },
  { id: 'skill-sql-queries', category: 'Database', name: 'SQL Queries', display_order: 7, is_published: true },
  { id: 'skill-schema-design', category: 'Database', name: 'Schema Design', display_order: 8, is_published: true },
  { id: 'skill-mongodb', category: 'Database', name: 'MongoDB', display_order: 9, is_published: true },

  // Data & Analytics
  { id: 'skill-pandas', category: 'Data & Analytics', name: 'Pandas', display_order: 10, is_published: true },
  { id: 'skill-numpy', category: 'Data & Analytics', name: 'NumPy', display_order: 11, is_published: true },
  { id: 'skill-matplotlib', category: 'Data & Analytics', name: 'Matplotlib', display_order: 12, is_published: true },
  { id: 'skill-powerbi', category: 'Data & Analytics', name: 'Power BI', display_order: 13, is_published: true },

  // AI / Emerging Technologies
  { id: 'skill-genai', category: 'AI / Emerging Technologies', name: 'Generative AI', is_exploring: true, display_order: 14, is_published: true },
  { id: 'skill-prompt-eng', category: 'AI / Emerging Technologies', name: 'Prompt Engineering', is_exploring: true, display_order: 15, is_published: true },
  { id: 'skill-apis', category: 'AI / Emerging Technologies', name: 'APIs', is_exploring: true, display_order: 16, is_published: true }
];

export const initialProjects: Project[] = [
  {
    id: 'campusfind',
    title: 'CampusFind',
    subtitle: 'Lost & Found Web Application',
    category: 'Web Development',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    description: 'A web application designed to manage lost and found items within a campus environment.',
    detailed_description: 'CampusFind solves the challenge of misplaced student items across university campus facilities by offering a unified portal for reporting, cataloging, and claiming found belongings.',
    problem: 'Campus communities frequently lose items across lecture halls, libraries, and cafeteria spaces without a centralized, accessible listing portal.',
    solution: 'Designed an intuitive, responsive lost-and-found interface enabling users to report missing items, browse recovered belongings, and quickly filter by category and location.',
    features: [
      'Post lost and found item listings',
      'Search and filter listings by category/location',
      'Manage active item status',
      'Fully responsive mobile and desktop interface'
    ],
    key_contributions: [
      'Developed functionality for posting lost and found items',
      'Implemented searching and managing item listings',
      'Designed a responsive interface',
      'Focused on user-friendly interaction'
    ],
    github_url: 'https://github.com/kavisri005/campusfind',
    mockup_type: 'lost-and-found',
    featured: true,
    is_published: true,
    display_order: 1
  },
  {
    id: 'ai-resume-analyzer',
    title: 'AI Resume Analyzer',
    subtitle: 'Resume Parsing & Skill Extraction Tool',
    category: 'AI / Python',
    technologies: ['Python'],
    description: 'A tool designed to process resumes, extract relevant skills and qualification sections, and summarize key candidate profile attributes.',
    detailed_description: 'An automated resume parsing and text processing project built in Python to evaluate resume text, extract technical skill competencies, and organize structured applicant summaries.',
    problem: 'Manual screening of resumes requires substantial time to identify specific technical keywords and experience highlights across varied document layouts.',
    solution: 'Engineered a clean Python-based resume analyzer that ingests resume content, parses structural sections, and isolates candidate skills for fast assessment.',
    features: [
      'Automated resume text parsing',
      'Extraction of technical competencies and skills',
      'Section-by-section profile breakdown',
      'Structured summary output for fast evaluation'
    ],
    key_contributions: [
      'Built parsing logic for text extraction from resume documents',
      'Implemented keyword matching algorithms for technical skill sets',
      'Designed structured summary output formats',
      'Focused on clean, maintainable Python code structure'
    ],
    github_url: 'https://github.com/kavisri005/ai-resume-analyzer',
    mockup_type: 'resume-analyzer',
    featured: true,
    is_published: true,
    display_order: 2
  },
  {
    id: 'renewable-energy',
    title: 'Renewable Energy Analytics Dashboard',
    subtitle: 'Energy Generation & Consumption Insights',
    category: 'Data Analytics',
    technologies: ['Power BI'],
    description: 'An interactive dashboard for analyzing renewable energy generation and consumption.',
    detailed_description: 'A comprehensive Power BI business intelligence dashboard modeling renewable power output (solar, wind, hydro) alongside consumer demand metrics.',
    problem: 'Clean energy transition requires clear visibility into solar, wind, and hydro generation patterns contrasted against peak grid demand periods.',
    solution: 'Built comprehensive Power BI KPI visual cards, energy trend line graphs, and comparative generation vs. consumption distribution metrics supporting sustainable planning.',
    features: [
      'KPI visualizations for generation capacity and load',
      'Time-series energy generation trend analysis',
      'Generation source breakdown (Solar, Wind, Hydro)',
      'Data-driven sustainability insights'
    ],
    key_contributions: [
      'Created KPI visualizations',
      'Analyzed energy trends',
      'Identified patterns in renewable energy data',
      'Generated insights supporting sustainable energy planning'
    ],
    github_url: 'https://github.com/kavisri005/Renewable-Energy-Dashboard',
    mockup_type: 'energy-dashboard',
    featured: true,
    is_published: true,
    display_order: 3
  },
  {
    id: 'ecommerce-returns',
    title: 'E-Commerce Return Rate Investigation',
    subtitle: 'Exploratory Data Analysis & Factor Investigation',
    category: 'Data Science',
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
    description: 'A data analysis project investigating factors influencing e-commerce product return rates.',
    detailed_description: 'Statistical investigation exploring underlying patterns in customer product returns across category, sizing, fulfillment speed, and customer feedback.',
    problem: 'High product return rates reduce e-commerce profitability and create operational logistics overhead across supply chain nodes.',
    solution: 'Applied statistical analysis and data cleaning on transaction records with Pandas and NumPy, visualizing key return drivers with Matplotlib charts.',
    features: [
      'Data cleaning and missing value handling',
      'Exploratory data analysis (EDA) across product categories',
      'Statistical correlation and return factor identification',
      'Matplotlib visual graphs for business decision-makers'
    ],
    key_contributions: [
      'Performed data cleaning',
      'Conducted exploratory data analysis',
      'Applied statistical analysis',
      'Identified factors associated with product returns',
      'Generated data-driven recommendations to reduce return rates'
    ],
    github_url: 'https://github.com/kavisri005/Ecommerce-Return-Rate-Investigation',
    mockup_type: 'ecommerce-returns',
    featured: true,
    is_published: true,
    display_order: 4
  }
];

export const initialExperiences: Experience[] = [
  {
    id: 'exp-swasti-2024',
    year: '2024',
    role: 'Web Developer Intern',
    company: 'Swasti Technologies',
    location: 'Trichy',
    type: 'internship',
    responsibilities: [
      'Developed responsive web pages using HTML, CSS and JavaScript',
      'Improved website performance',
      'Fixed UI issues',
      'Collaborated with the team to build user-friendly web interfaces'
    ],
    display_order: 1,
    is_published: true
  },
  {
    id: 'exp-artifai-2025',
    year: '2025',
    role: 'Data Science Intern',
    company: 'ArtifAI Tech',
    location: 'Trichy',
    type: 'internship',
    responsibilities: [
      'Performed data cleaning and analysis using Python',
      'Learned data visualization',
      'Learned basic Machine Learning concepts',
      'Completed hands-on exercises and mini-projects'
    ],
    display_order: 2,
    is_published: true
  },
  {
    id: 'exp-thamizhan-2026',
    year: '2026',
    role: 'Database Intern',
    company: 'Thamizhan Skills',
    location: 'Madipakkam, Chennai',
    type: 'internship',
    responsibilities: [
      'Worked with MySQL and MongoDB',
      'Performed CRUD operations',
      'Worked with joins and SQL queries',
      'Completed practical database design and management assignments'
    ],
    display_order: 3,
    is_published: true
  },
  {
    id: 'exp-nirmaan-2026',
    year: '2026',
    role: 'AIML Intern',
    company: 'Nirmaan WAISE',
    location: 'Thambaram, Chennai',
    type: 'internship',
    responsibilities: [
      'Learned AI and Machine Learning fundamentals',
      'Performed data preprocessing and analysis using Python',
      'Worked with basic machine learning models',
      'Completed mini-projects'
    ],
    display_order: 4,
    is_published: true
  }
];

export const initialEducation: Education[] = [
  {
    id: 'edu-be-cse',
    degree: 'B.E. — Computer Science and Engineering',
    institution: 'M.A.M. College of Engineering and Technology',
    location: 'Tiruchirappalli',
    period: '2023 – 2027',
    start_year: '2023',
    end_year: '2027',
    status: 'In Progress',
    cgpa: '8.33 / 10',
    score: '8.33 / 10',
    score_label: 'CGPA',
    description: 'Specialization in core computer science, software design, algorithms, database systems, and intelligent applications.',
    display_order: 1,
    is_published: true
  },
  {
    id: 'edu-hsc-xii',
    degree: 'HSC — Class XII',
    institution: 'Government Girls Higher Secondary School',
    location: 'Attur, Salem',
    period: '2022 – 2023',
    start_year: '2022',
    end_year: '2023',
    status: 'Completed',
    description: 'Higher secondary school curriculum with focus on science and mathematics.',
    display_order: 2,
    is_published: true
  }
];

export const initialCertifications: Certification[] = [
  { id: 'cert-python', title: 'Python Programming', name: 'Python Programming', display_order: 1, is_published: true },
  { id: 'cert-java', title: 'Java Programming', name: 'Java Programming', display_order: 2, is_published: true },
  { id: 'cert-html', title: 'HTML', name: 'HTML', display_order: 3, is_published: true },
  { id: 'cert-css', title: 'CSS', name: 'CSS', display_order: 4, is_published: true },
  { id: 'cert-javascript', title: 'JavaScript', name: 'JavaScript', display_order: 5, is_published: true },
  { id: 'cert-sql', title: 'SQL & Database Management', name: 'SQL & Database Management', display_order: 6, is_published: true },
  { id: 'cert-powerbi', title: 'Power BI Fundamentals', name: 'Power BI Fundamentals', display_order: 7, is_published: true },
  { id: 'cert-ai-lit', title: 'AI Literacy Course', name: 'AI Literacy Course', display_order: 8, is_published: true },
  { id: 'cert-ai-fund', title: 'AI Fundamentals', name: 'AI Fundamentals', display_order: 9, is_published: true },
  { id: 'cert-prof-skills', title: 'Lifelong Professional Skills', name: 'Lifelong Professional Skills', display_order: 10, is_published: true }
];

export const initialAchievements: Achievement[] = [
  {
    id: 'achieve-symposium',
    title: 'National Level Technical Symposium Recognition',
    description: 'Received recognition certificates at a National Level Technical Symposium for active contribution across multiple technical domains.',
    organization: 'National Level Technical Symposium',
    tag: 'Technical Recognition',
    display_order: 1,
    is_published: true
  },
  {
    id: 'achieve-intercollegiate',
    title: 'Inter-Collegiate Technical Events',
    description: 'Participated in inter-collegiate events including Paper Presentations, Problem Solving challenges, and Coding Competitions.',
    organization: 'Inter-Collegiate Technical Events',
    tag: 'Academic & Coding Events',
    display_order: 2,
    is_published: true
  }
];

export const initialExploring: ExploringItem[] = [
  {
    id: 'exploring-genai',
    title: 'Generative AI',
    name: 'Generative AI',
    description: 'Exploring practical applications of emerging AI technologies.',
    tag: 'Emerging Tech',
    display_order: 1,
    is_published: true
  },
  {
    id: 'exploring-prompt-eng',
    title: 'Prompt Engineering',
    name: 'Prompt Engineering',
    description: 'Exploring effective prompt design and AI interaction.',
    tag: 'AI Workflows',
    display_order: 2,
    is_published: true
  },
  {
    id: 'exploring-apis',
    title: 'APIs',
    name: 'APIs',
    description: 'Learning how applications communicate with external services.',
    tag: 'System Integration',
    display_order: 3,
    is_published: true
  }
];

export const initialSocialLinks: SocialLink[] = [
  {
    id: 'social-github',
    platform: 'github',
    label: 'GitHub',
    url: 'https://github.com/kavisri005',
    display_order: 1,
    is_published: true
  },
  {
    id: 'social-linkedin',
    platform: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/kavisri-a-6a14a328a',
    display_order: 2,
    is_published: true
  },
  {
    id: 'social-email',
    platform: 'email',
    label: 'Email',
    url: 'mailto:a.kavisri005@gmail.com',
    display_order: 3,
    is_published: true
  },
  {
    id: 'social-phone',
    platform: 'phone',
    label: 'Phone',
    url: 'tel:8667589833',
    display_order: 4,
    is_published: true
  }
];

export const initialResumeData: ResumeData = {
  filename: 'Kavisri_A_Software_Developer_Resume.pdf',
  url: '',
  upload_date: '2026-08-20',
  is_published: true,
  size: '142 KB'
};

// Aliases for backwards compatibility with any component imports
export const personalInfo = {
  name: initialProfile.name,
  title: 'Aspiring Software Developer',
  positioning: 'Software Development • Data • AI/ML',
  headline: initialProfile.headline,
  shortBio: initialProfile.short_bio,
  detailedBio: initialProfile.detailed_bio,
  educationBrief: initialProfile.education_brief!,
  contact: {
    email: initialProfile.email,
    phone: initialProfile.phone,
    location: initialProfile.location,
    linkedin: initialProfile.linkedin_url,
    linkedinDisplay: initialProfile.linkedin_display || 'linkedin.com/in/kavisri-a-6a14a328a',
    github: initialProfile.github_url,
    githubDisplay: initialProfile.github_display || 'github.com/kavisri005'
  }
};

export const skillCategories = [
  {
    title: 'Software Development',
    skills: [
      { name: 'Python' },
      { name: 'Java' },
      { name: 'JavaScript' },
      { name: 'HTML5' },
      { name: 'CSS' }
    ]
  },
  {
    title: 'Database',
    skills: [
      { name: 'MySQL' },
      { name: 'SQL Queries' },
      { name: 'Schema Design' },
      { name: 'MongoDB' }
    ]
  },
  {
    title: 'Data & Analytics',
    skills: [
      { name: 'Pandas' },
      { name: 'NumPy' },
      { name: 'Matplotlib' },
      { name: 'Power BI' }
    ]
  },
  {
    title: 'AI / Emerging Technologies',
    skills: [
      { name: 'Generative AI', isExploring: true },
      { name: 'Prompt Engineering', isExploring: true },
      { name: 'APIs', isExploring: true }
    ]
  }
];

export const currentlyExploring = initialExploring.map(e => ({
  name: e.title,
  description: e.description,
  tag: e.tag || 'Emerging Tech'
}));

export const projects = initialProjects;
export const experiences = initialExperiences;
export const educationHistory = initialEducation;
export const certifications = initialCertifications;
export const achievements = initialAchievements;
