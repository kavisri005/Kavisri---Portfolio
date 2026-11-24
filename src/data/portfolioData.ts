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
  title: 'Software Developer',
  positioning: 'Full-Stack Web Development | APIs | Database Systems',
  headline: 'I build responsive web apps, database systems and AI-powered tools.',
  short_bio: 'Computer Science and Engineering undergraduate with hands-on experience in full-stack web development using React.js, JavaScript, Python, Flask, and SQL. Experienced in responsive applications, REST APIs, database-driven systems, and AI-powered tools. Seeking a Software Developer role to contribute to real-world applications and grow as a developer.',
  detailed_bio: [
    'I am a Computer Science and Engineering undergraduate at M.A.M. College of Engineering and Technology, with hands-on experience building full-stack web applications using React.js, JavaScript, Python, Flask, and SQL.',
    'I have developed responsive websites, REST APIs, database-driven systems, and AI-powered tools through internships and practical projects. I enjoy solving problems, learning quickly, and working with teams to deliver useful software.',
    'I am seeking a Software Developer role where I can contribute to real-world applications and continue growing as a developer.'
  ],
  location: 'Salem, India',
  email: 'a.kavisrii@gmail.com',
  phone: '8667589833',
  linkedin_url: 'https://linkedin.com/in/kavisri-a-6a14a328a',
  linkedin_display: 'linkedin.com/in/kavisri-a-6a14a328a',
  github_url: 'https://github.com/kavisri005',
  github_display: 'github.com/kavisri005',
  resume_url: '/KAVISRI_A_Resume_2026.pdf',
  profile_image_url: '/profile-kavisri.png',
  updated_at: new Date().toISOString(),
  education_brief: {
    degree: 'B.E. Computer Science and Engineering',
    cgpa: '8.33 / 10',
    location: 'Trichy, India',
    focus: 'Full-Stack Web Development',
    exploring: 'Generative AI • Prompt Engineering • APIs'
  }
};

export const initialSkills: Skill[] = [
  // Software Development
  { id: 'skill-python', category: 'Software Development', name: 'Python', display_order: 1, is_published: true },
  { id: 'skill-javascript', category: 'Software Development', name: 'JavaScript', display_order: 2, is_published: true },
  { id: 'skill-html5', category: 'Software Development', name: 'HTML', display_order: 3, is_published: true },
  { id: 'skill-css', category: 'Software Development', name: 'CSS', display_order: 4, is_published: true },
  { id: 'skill-react', category: 'Software Development', name: 'React.js', display_order: 5, is_published: true },
  { id: 'skill-flask', category: 'Software Development', name: 'Flask', display_order: 6, is_published: true },

  // Database
  { id: 'skill-mysql', category: 'Database', name: 'MySQL', display_order: 7, is_published: true },
  { id: 'skill-postgresql', category: 'Database', name: 'PostgreSQL', display_order: 8, is_published: true },
  { id: 'skill-supabase', category: 'Database', name: 'Supabase', display_order: 9, is_published: true },

  // Data & Analytics
  { id: 'skill-git', category: 'Tools & Platforms', name: 'Git', display_order: 10, is_published: true },
  { id: 'skill-github', category: 'Tools & Platforms', name: 'GitHub', display_order: 11, is_published: true },
  { id: 'skill-vscode', category: 'Tools & Platforms', name: 'VS Code', display_order: 12, is_published: true },
  { id: 'skill-colab', category: 'Tools & Platforms', name: 'Google Colab', display_order: 13, is_published: true },

  // AI / Emerging Technologies
  { id: 'skill-genai', category: 'AI / Emerging Technologies', name: 'Generative AI', display_order: 14, is_published: true },
  { id: 'skill-prompt-eng', category: 'AI / Emerging Technologies', name: 'Prompt Engineering', display_order: 15, is_published: true },
  { id: 'skill-apis', category: 'AI / Emerging Technologies', name: 'REST APIs', display_order: 16, is_published: true },
  { id: 'skill-vercel', category: 'Tools & Platforms', name: 'Vercel', display_order: 17, is_published: true },
  { id: 'skill-excel', category: 'Tools & Platforms', name: 'Microsoft Excel', display_order: 18, is_published: true },
  { id: 'skill-soft', category: 'Professional Skills', name: 'Problem Solving', display_order: 19, is_published: true },
  { id: 'skill-critical', category: 'Professional Skills', name: 'Critical Thinking', display_order: 20, is_published: true },
  { id: 'skill-decision-making', category: 'Professional Skills', name: 'Decision Making', display_order: 21, is_published: true },
  { id: 'skill-teamwork', category: 'Professional Skills', name: 'Teamwork', display_order: 22, is_published: true },
  { id: 'skill-adaptability', category: 'Professional Skills', name: 'Adaptability', display_order: 23, is_published: true },
  { id: 'skill-quick-learner', category: 'Professional Skills', name: 'Quick Learner', display_order: 24, is_published: true }
];

export const initialProjects: Project[] = [
  {
    id: 'pulsetask', title: 'PulseTask', subtitle: 'Task Management Web Application', category: 'Web Applications',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    description: 'A responsive web application for creating, organizing, and managing daily tasks efficiently.',
    detailed_description: 'PulseTask provides a user-friendly interface for task tracking, with interactive components that make it easier to organize daily work and maintain productivity.',
    solution: 'Built a responsive task management experience with clear organization and interactive task controls.',
    features: ['Create and organize daily tasks', 'Track tasks through an intuitive interface', 'Responsive layouts for mobile and desktop'],
    key_contributions: ['Developed the task management application', 'Designed a responsive interface', 'Implemented interactive task organization components'],
    demo_url: 'https://pulsetask-puce.vercel.app', mockup_type: 'generic', featured: true, is_published: true, display_order: 1
  },
  {
    id: 'parambariyam-cashews', title: 'Parambariyam Cashews', subtitle: 'Premium E-commerce Platform', category: 'Web Applications',
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Supabase', 'SQLite', 'REST APIs', 'Vercel'],
    description: 'A responsive premium e-commerce platform with dynamic product catalogues and WhatsApp-based customer enquiries.',
    detailed_description: 'Integrated Supabase and REST APIs for product management, enquiry processing, and admin dashboard operations. Added privacy-focused analytics, an XML sitemap, and SEO structured data.',
    solution: 'Built a responsive storefront and connected product and enquiry workflows to Supabase and REST APIs.',
    features: ['Dynamic product catalogues', 'WhatsApp-based customer enquiries', 'Product management and enquiry processing', 'Admin dashboard', 'Privacy-focused analytics and SEO structured data'],
    key_contributions: ['Developed the e-commerce platform', 'Integrated Supabase and REST APIs', 'Implemented admin operations and enquiry processing', 'Added XML sitemap and SEO structured data'],
    demo_url: 'https://www.parambariyamcashews.com', mockup_type: 'generic', featured: true, is_published: true, display_order: 2
  },
  {
    id: 'md-engineers', title: 'MD Engineers', subtitle: 'Business Website & Enquiry Management System', category: 'Web Applications',
    technologies: ['React.js', 'Vite', 'Flask', 'Python', 'PostgreSQL', 'Supabase', 'REST APIs', 'Gmail SMTP', 'Vercel'],
    description: 'A responsive business website with enquiry management, a protected admin dashboard, and automated email notifications.',
    detailed_description: 'Implemented Supabase webhooks for asynchronous email processing and optimized PostgreSQL with atomic CTE queries and connection reuse. Reduced measured enquiry API response time from about 4.6-5.2 seconds to about 200 ms in warm local testing.',
    solution: 'Connected the public enquiry flow to a protected admin dashboard, email notifications, and optimized database and asynchronous processing.',
    features: ['Business website and enquiry management', 'Protected admin dashboard', 'Automated email notifications', 'Supabase webhook email processing', 'Optimized PostgreSQL operations'],
    key_contributions: ['Built the business website and REST APIs', 'Implemented admin dashboard and email workflows', 'Optimized database and asynchronous processing', 'Measured enquiry API improvements in warm local testing'],
    demo_url: 'https://md-engineers.vercel.app', mockup_type: 'generic', featured: true, is_published: true, display_order: 3
  },
  {
    id: 'sri-parasakthi-digitals', title: 'Sri Parasakthi Digitals', subtitle: 'Premium Photography Studio Website', category: 'Web Applications',
    technologies: ['React', 'TypeScript', 'CSS', 'Framer Motion', 'GSAP', 'React Bits', 'Vercel'],
    description: 'A cinematic, responsive photography studio website with a premium editorial interface.',
    detailed_description: 'Designed interactive 3D and parallax photography galleries with scroll-based animations, optimizing responsive layouts, reusable React components, animation performance, and overall user experience.',
    solution: 'Created a visual editorial experience with interactive photography galleries and scroll-based motion.',
    features: ['Interactive 3D and parallax galleries', 'Scroll-based animations', 'Responsive layouts', 'Reusable React components'],
    key_contributions: ['Designed and developed the studio website', 'Implemented interactive galleries and animations', 'Optimized responsive layouts and animation performance'],
    demo_url: 'https://sri-parasakthi-digitals.vercel.app', mockup_type: 'generic', featured: true, is_published: true, display_order: 4
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
    id: 'exp-thamizhan-2025',
    year: '2025',
    role: 'Database Intern',
    company: 'Thamizhan Skills',
    location: 'Madipakkam',
    type: 'internship',
    responsibilities: [
      'Worked with MySQL and MongoDB for database management',
      'Performed CRUD operations, joins, and SQL queries',
      'Completed practical assignments in database design and management'
    ],
    display_order: 2,
    is_published: true
  },
  {
    id: 'exp-nirmaan-2026',
    year: '2026',
    role: 'AIML Intern',
    company: 'Nirmaan WAISE',
    location: 'Thambaram',
    type: 'internship',
    responsibilities: [
      'Learned AI and Machine Learning fundamentals through practical training',
      'Performed data preprocessing and analysis using Python',
      'Worked on basic machine learning models and mini-projects'
    ],
    display_order: 3,
    is_published: true
  },
  {
    id: 'exp-prcbo-2026',
    year: '2026',
    role: 'Software Developer Intern',
    company: 'Prcbo Tech',
    location: 'Madurai',
    type: 'internship',
    responsibilities: [
      'Developed responsive web applications using React.js, JavaScript, Python, and Flask',
      'Built the MD Engineers business website with REST APIs, PostgreSQL/Supabase, an admin dashboard, and automated email workflows',
      'Improved enquiry submission performance through database and asynchronous processing optimization'
    ],
    display_order: 4,
    is_published: true
  }
];

export const initialEducation: Education[] = [
  {
    id: 'edu-be-cse',
    degree: 'B.E. - Computer Science and Engineering',
    institution: 'M.A.M. College of Engineering and Technology',
    location: 'Trichy',
    period: '2023 - Present',
    start_year: '2023',
    status: 'In Progress',
    cgpa: '8.33 / 10',
    score: '8.33 / 10',
    score_label: 'CGPA',
    description: 'Computer Science and Engineering undergraduate degree in progress.',
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
    is_published: false
  }
];

export const initialCertifications: Certification[] = [
  { id: 'cert-python', title: 'Python Programming', name: 'Python Programming', issuer: 'Great Learning', display_order: 1, is_published: true },
  { id: 'cert-java', title: 'Java Programming', name: 'Java Programming', issuer: 'Great Learning', display_order: 2, is_published: true },
  { id: 'cert-html-css', title: 'HTML & CSS', name: 'HTML & CSS', display_order: 3, is_published: true },
  { id: 'cert-javascript', title: 'JavaScript', name: 'JavaScript', display_order: 4, is_published: true },
  { id: 'cert-sql', title: 'SQL & Database Management', name: 'SQL & Database Management', issuer: 'Thamizhan Skills', display_order: 5, is_published: true },
  { id: 'cert-prompt', title: 'Prompt Engineering', name: 'Prompt Engineering', issuer: 'GUVI', display_order: 6, is_published: true },
  { id: 'cert-ai-fund', title: 'AI Fundamentals: Foundations for Understanding AI', name: 'AI Fundamentals: Foundations for Understanding AI', issuer: 'IBM', display_order: 7, is_published: true },
  { id: 'cert-prof-skills', title: 'Lifelong Professional Skills', name: 'Lifelong Professional Skills', issuer: 'IBM', display_order: 8, is_published: true }
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
    url: 'mailto:a.kavisrii@gmail.com',
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
  filename: 'KAVISRI_A_Resume_2026.pdf',
  file_name: 'KAVISRI_A_Resume_2026.pdf',
  url: '/KAVISRI_A_Resume_2026.pdf',
  file_url: '/KAVISRI_A_Resume_2026.pdf',
  upload_date: '2026-11-24',
  is_published: true,
  size: '133 KB'
};

// Aliases for backwards compatibility with any component imports
export const personalInfo = {
  name: initialProfile.name,
  title: 'Software Developer',
  positioning: 'Full-Stack Web Development | APIs | Database Systems',
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
    title: 'Programming Languages',
    skills: [
      { name: 'Python' },
      { name: 'JavaScript' }
    ]
  },
  {
    title: 'Web Development',
    skills: [
      { name: 'HTML' },
      { name: 'CSS' }
    ]
  },
  {
    title: 'Frameworks',
    skills: [
      { name: 'React.js' },
      { name: 'Flask' }
    ]
  },
  {
    title: 'Database',
    skills: [
      { name: 'MySQL' },
      { name: 'PostgreSQL' },
      { name: 'Supabase' }
    ]
  },
  {
    title: 'AI & APIs',
    skills: [
      { name: 'Generative AI' },
      { name: 'Prompt Engineering' },
      { name: 'REST APIs' }
    ]
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'VS Code' },
      { name: 'Google Colab' },
      { name: 'Vercel' },
      { name: 'Microsoft Excel' }
    ]
  },
  {
    title: 'Professional Skills',
    skills: [
      { name: 'Problem Solving' },
      { name: 'Critical Thinking' },
      { name: 'Decision Making' },
      { name: 'Teamwork' },
      { name: 'Adaptability' },
      { name: 'Quick Learner' }
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
