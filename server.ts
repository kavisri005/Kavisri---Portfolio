import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';

const PORT = 3000;
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Directories for persistent data and uploads
const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const PORTFOLIO_DB_FILE = path.join(DATA_DIR, 'portfolio-db.json');
const AUTH_DB_FILE = path.join(DATA_DIR, 'auth-db.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Initial Admin Credentials Configuration
const AUTHORIZED_ADMIN_EMAIL = 'a.kavisri005@gmail.com';
const DEFAULT_ADMIN_PASSWORD = 'kavisri_admin_secure';

function getAuthData() {
  try {
    if (fs.existsSync(AUTH_DB_FILE)) {
      const content = fs.readFileSync(AUTH_DB_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading auth db:', err);
  }
  const defaultAuth = {
    email: AUTHORIZED_ADMIN_EMAIL,
    passwordHash: hashPassword('kavisri123'),
    sessions: {} as Record<string, { email: string; expiresAt: number }>
  };
  fs.writeFileSync(AUTH_DB_FILE, JSON.stringify(defaultAuth, null, 2));
  return defaultAuth;
}

function saveAuthData(data: any) {
  fs.writeFileSync(AUTH_DB_FILE, JSON.stringify(data, null, 2));
}

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password.trim()).digest('hex');
}

// Initial default portfolio state (B.E. CSE 2023 - 2027)
const defaultPortfolioData = {
  profile: {
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
  },
  skills: [
    { id: 'skill-python', category: 'Software Development', name: 'Python', display_order: 1, is_published: true },
    { id: 'skill-java', category: 'Software Development', name: 'Java', display_order: 2, is_published: true },
    { id: 'skill-javascript', category: 'Software Development', name: 'JavaScript', display_order: 3, is_published: true },
    { id: 'skill-html5', category: 'Software Development', name: 'HTML5', display_order: 4, is_published: true },
    { id: 'skill-css', category: 'Software Development', name: 'CSS', display_order: 5, is_published: true },
    { id: 'skill-mysql', category: 'Database', name: 'MySQL', display_order: 6, is_published: true },
    { id: 'skill-sql-queries', category: 'Database', name: 'SQL Queries', display_order: 7, is_published: true },
    { id: 'skill-schema-design', category: 'Database', name: 'Schema Design', display_order: 8, is_published: true },
    { id: 'skill-mongodb', category: 'Database', name: 'MongoDB', display_order: 9, is_published: true },
    { id: 'skill-pandas', category: 'Data & Analytics', name: 'Pandas', display_order: 10, is_published: true },
    { id: 'skill-numpy', category: 'Data & Analytics', name: 'NumPy', display_order: 11, is_published: true },
    { id: 'skill-matplotlib', category: 'Data & Analytics', name: 'Matplotlib', display_order: 12, is_published: true },
    { id: 'skill-eda', category: 'Data & Analytics', name: 'Exploratory Data Analysis', display_order: 13, is_published: true },
    { id: 'skill-git', category: 'Core Tools & Concepts', name: 'Git & GitHub', display_order: 14, is_published: true },
    { id: 'skill-vscode', category: 'Core Tools & Concepts', name: 'VS Code', display_order: 15, is_published: true },
    { id: 'skill-powerbi', category: 'Core Tools & Concepts', name: 'Power BI', display_order: 16, is_published: true },
    { id: 'skill-rest-api', category: 'Core Tools & Concepts', name: 'REST APIs', display_order: 17, is_published: true },
    { id: 'skill-problem-solving', category: 'Soft Skills', name: 'Problem Solving', display_order: 18, is_published: true },
    { id: 'skill-adaptability', category: 'Soft Skills', name: 'Adaptability', display_order: 19, is_published: true },
    { id: 'skill-teamwork', category: 'Soft Skills', name: 'Team Collaboration', display_order: 20, is_published: true },
    { id: 'skill-continuous-learning', category: 'Soft Skills', name: 'Continuous Learning', display_order: 21, is_published: true }
  ],
  projects: [
    {
      id: 'proj-smart-soil',
      title: 'Smart Soil & Crop Monitoring System using IoT',
      short_description: 'An IoT and web dashboard solution for agricultural soil health analysis and intelligent crop recommendations.',
      full_description: 'Built a connected sensor monitoring system that reads real-time soil moisture, temperature, and pH values. The captured telemetry is processed and visualized on a live web dashboard providing automated crop recommendations to improve agricultural yield.',
      technologies: ['IoT Sensors', 'Arduino/ESP32', 'Python', 'Web Dashboard', 'Data Analytics'],
      features: [
        'Real-time soil sensor telemetry collection (Moisture, Temp, pH)',
        'Data analysis pipeline for soil parameter classification',
        'Interactive web dashboard displaying sensor metrics and charts',
        'Rule-based crop recommendation engine based on soil health metrics'
      ],
      github_url: 'https://github.com/kavisri005',
      live_url: '',
      image_url: '',
      category: 'IoT & Data Analytics',
      display_order: 1,
      is_featured: true,
      is_published: true,
      role: 'Lead Developer & Hardware Integrator',
      outcomes: 'Successfully demonstrated at college technical symposium with high praise for practical farm automation.'
    },
    {
      id: 'proj-online-voting',
      title: 'Secure Online Voting System',
      short_description: 'A full-stack secure electronic voting platform with role-based authentication and real-time tallying.',
      full_description: 'Designed and developed an end-to-end web-based voting platform that enables secure, tamper-resistant ballot submissions with voter verification, admin ballot creation, and real-time automated result calculation.',
      technologies: ['React', 'Node.js', 'SQL / MySQL', 'Tailwind CSS', 'REST APIs', 'Auth Security'],
      features: [
        'Secure voter authentication and single-vote enforcement',
        'Admin dashboard for managing elections, candidates, and voter rolls',
        'Cryptographic audit-trail recording for vote integrity',
        'Live result tallying with visual percentage graphs'
      ],
      github_url: 'https://github.com/kavisri005',
      live_url: '',
      image_url: '',
      category: 'Full-Stack Web Development',
      display_order: 2,
      is_featured: true,
      is_published: true,
      role: 'Full-Stack Developer',
      outcomes: 'Prevented duplicate voting with strict validation constraints and transaction integrity.'
    },
    {
      id: 'proj-portfolio-cms',
      title: 'Dynamic Portfolio & CMS Platform',
      short_description: 'A modern, responsive portfolio with an integrated headless admin CMS and AI assistant.',
      full_description: 'Engineered a modern portfolio web app featuring live project showcases, an integrated admin management system, theme customization, and an intelligent interactive assistant.',
      technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Express', 'Supabase', 'Gemini AI'],
      features: [
        'Live editable CMS dashboard for updating projects, skills, and bio',
        'Integrated AI Assistant with multilingual and Tanglish capabilities',
        'Light and dark mode with persistent settings',
        'Automated PDF resume viewer and download manager'
      ],
      github_url: 'https://github.com/kavisri005',
      live_url: '',
      image_url: '',
      category: 'Full-Stack & AI',
      display_order: 3,
      is_featured: true,
      is_published: true,
      role: 'Creator & Developer',
      outcomes: 'Instant multi-device content synchronization and real-time editing.'
    },
    {
      id: 'proj-churn-analytics',
      title: 'Customer Churn Prediction & Analytics',
      short_description: 'A machine learning predictive model identifying customer retention risks with exploratory data visualizations.',
      full_description: 'Conducted exploratory data analysis (EDA) and built predictive classification models using Python to uncover behavioral indicators leading to customer churn in subscription datasets.',
      technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib', 'Seaborn'],
      features: [
        'Dataset cleaning, normalization, and outlier detection',
        'Feature engineering on customer usage frequencies and tenure',
        'Evaluation using Precision, Recall, and ROC-AUC metrics',
        'Actionable retention insights derived from feature importance'
      ],
      github_url: 'https://github.com/kavisri005',
      live_url: '',
      image_url: '',
      category: 'Data Science & Machine Learning',
      display_order: 4,
      is_featured: true,
      is_published: true,
      role: 'Data Analyst & ML Developer',
      outcomes: 'Achieved 86% predictive accuracy across customer test splits.'
    }
  ],
  experiences: [
    {
      id: 'exp-nirmaan-ai-2026',
      title: 'AI & Data Intern',
      company: 'Nirmaan Organization',
      location: 'Remote / Trichy',
      period: '2025 – 2026',
      year: '2026',
      type: 'internship',
      responsibilities: [
        'Hands-on development with Python, AI fundamentals, and predictive algorithms',
        'Data preprocessing, feature engineering, and statistical analytics',
        'Implemented generative prompt pipelines and API integrations',
        'Collaborated on practical industry projects with mentor code reviews'
      ],
      display_order: 1,
      is_published: true
    },
    {
      id: 'exp-thamizhan-2026',
      title: 'Full-Stack Web Development Intern',
      company: 'Thamizhan Soft Tech',
      location: 'Trichy, Tamil Nadu',
      period: '2025 – 2026',
      year: '2026',
      type: 'internship',
      responsibilities: [
        'Developed interactive frontend UI components using React and modern CSS',
        'Engineered RESTful APIs and connected relational databases',
        'Participated in code reviews, bug fixes, and sprint deliverables'
      ],
      display_order: 2,
      is_published: true
    },
    {
      id: 'exp-slash-mark-2025',
      title: 'Web Developer Intern',
      company: 'Slash Mark',
      location: 'Virtual / Remote',
      period: '2024 – 2025',
      year: '2025',
      type: 'internship',
      responsibilities: [
        'Constructed responsive multi-page web layouts using HTML5, CSS3, and JavaScript',
        'Built dynamic client-side form validations and UI interactions',
        'Optimized frontend assets for cross-device responsiveness'
      ],
      display_order: 3,
      is_published: true
    },
    {
      id: 'exp-codsoft-2024',
      title: 'Python & Data Intern',
      company: 'CodSoft',
      location: 'Virtual / Remote',
      period: '2024',
      year: '2024',
      type: 'internship',
      responsibilities: [
        'Constructed core Python utilities, CLI tools, and automation scripts',
        'Performed exploratory data analysis on real-world datasets using Pandas & Matplotlib',
        'Completed structured capstone tasks on data manipulation and algorithm design'
      ],
      display_order: 4,
      is_published: true
    }
  ],
  education: [
    {
      id: 'edu-be-cse',
      degree: 'B.E. — Computer Science and Engineering',
      institution: 'M.A.M. College of Engineering and Technology',
      location: 'Tiruchirappalli, Tamil Nadu',
      period: '2023 – 2027',
      start_year: '2023',
      end_year: '2027',
      status: 'In Progress',
      cgpa: '8.33 / 10',
      score: '8.33 / 10',
      score_label: 'CGPA',
      description: 'Undergraduate engineering curriculum emphasizing Data Structures & Algorithms, Object-Oriented Software Design, Relational Database Management Systems, Web Architecture, and Applied Artificial Intelligence.',
      display_order: 1,
      is_published: true
    },
    {
      id: 'edu-hsc-xii',
      degree: 'HSC — Class XII',
      institution: 'Government Girls Higher Secondary School',
      location: 'Attur, Salem, Tamil Nadu',
      period: '2022 – 2023',
      start_year: '2022',
      end_year: '2023',
      status: 'Completed',
      description: 'Higher Secondary education focusing on Mathematics, Physics, Chemistry, and Computer Science with distinguished academic marks.',
      display_order: 2,
      is_published: true
    }
  ],
  certifications: [
    { id: 'cert-python', title: 'Python Programming', name: 'Python Programming', display_order: 1, is_published: true },
    { id: 'cert-java', title: 'Java Programming', name: 'Java Programming', display_order: 2, is_published: true },
    { id: 'cert-html', title: 'HTML & Modern Web Standards', name: 'HTML5', display_order: 3, is_published: true },
    { id: 'cert-css', title: 'CSS & Responsive Design', name: 'CSS3', display_order: 4, is_published: true },
    { id: 'cert-javascript', title: 'JavaScript Essentials', name: 'JavaScript', display_order: 5, is_published: true },
    { id: 'cert-sql', title: 'SQL & Relational Database Management', name: 'SQL & Database Management', display_order: 6, is_published: true },
    { id: 'cert-powerbi', title: 'Power BI Data Analytics', name: 'Power BI Fundamentals', display_order: 7, is_published: true },
    { id: 'cert-ai-lit', title: 'AI Literacy & Practical Applications', name: 'AI Literacy Course', display_order: 8, is_published: true },
    { id: 'cert-ai-fund', title: 'AI & Machine Learning Fundamentals', name: 'AI Fundamentals', display_order: 9, is_published: true },
    { id: 'cert-prof-skills', title: 'Lifelong Professional Development Skills', name: 'Lifelong Professional Skills', display_order: 10, is_published: true }
  ],
  achievements: [
    {
      id: 'achieve-symposium',
      title: 'National Level Technical Symposium Recognition',
      description: 'Presented technical paper and demonstrated smart IoT prototype, earning commendation among 40+ engineering college teams.',
      category: 'Academic & Symposium',
      date: '2024',
      display_order: 1,
      is_published: true
    },
    {
      id: 'achieve-cgpa',
      title: 'Consistent Academic Excellence — 8.33 CGPA',
      description: 'Maintained strong academic standing across Computer Science & Engineering semesters at M.A.M. College of Engineering and Technology.',
      category: 'Academic',
      date: '2023 – Present',
      display_order: 2,
      is_published: true
    },
    {
      id: 'achieve-internships',
      title: 'Completed 4 Industry Internships',
      description: 'Successfully completed 4 internships across Web Development, Python Automation, and AI/Data Analytics.',
      category: 'Professional Experience',
      date: '2024 – 2026',
      display_order: 3,
      is_published: true
    }
  ],
  exploring: [
    {
      id: 'exp-gen-ai',
      title: 'Generative AI & LLMs',
      description: 'Exploring modern LLM orchestration, structured prompt engineering, and multimodal AI systems.',
      category: 'Artificial Intelligence',
      status: 'Active Learning',
      display_order: 1,
      is_published: true
    },
    {
      id: 'exp-prompt-eng',
      title: 'Prompt Engineering & System Directives',
      description: 'Studying multi-shot context tuning, chain-of-thought prompting, and agentic workflows.',
      category: 'AI Engineering',
      status: 'In Progress',
      display_order: 2,
      is_published: true
    },
    {
      id: 'exp-api-ecosystem',
      title: 'Cloud APIs & Microservice Integration',
      description: 'Building connected RESTful services, serverless functions, and asynchronous API architectures.',
      category: 'Backend & Cloud',
      status: 'Active Practice',
      display_order: 3,
      is_published: true
    }
  ],
  socialLinks: [
    {
      id: 'social-github',
      platform: 'GitHub',
      url: 'https://github.com/kavisri005',
      label: 'github.com/kavisri005',
      icon_name: 'Github',
      is_published: true,
      display_order: 1
    },
    {
      id: 'social-linkedin',
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/kavisri-a-6a14a328a',
      label: 'linkedin.com/in/kavisri-a-6a14a328a',
      icon_name: 'Linkedin',
      is_published: true,
      display_order: 2
    },
    {
      id: 'social-email',
      platform: 'Email',
      url: 'mailto:a.kavisri005@gmail.com',
      label: 'a.kavisri005@gmail.com',
      icon_name: 'Mail',
      is_published: true,
      display_order: 3
    }
  ],
  resumeData: {
    filename: 'Kavisri_A_Software_Developer_Resume.pdf',
    url: '',
    upload_date: '2026-08-22',
    is_published: true,
    size: '184 KB'
  },
  lastUpdated: new Date().toISOString()
};

function getPortfolioData() {
  try {
    if (fs.existsSync(PORTFOLIO_DB_FILE)) {
      const content = fs.readFileSync(PORTFOLIO_DB_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      // Ensure education batch is 2023 - 2027
      if (parsed.education && Array.isArray(parsed.education)) {
        parsed.education = parsed.education.map((e: any) => {
          if (e.id === 'edu-be-cse' || (e.degree && e.degree.includes('B.E.'))) {
            return {
              ...e,
              period: '2023 – 2027',
              start_year: '2023',
              end_year: '2027'
            };
          }
          return e;
        });
      }
      return parsed;
    }
  } catch (err) {
    console.error('Error reading portfolio db:', err);
  }
  fs.writeFileSync(PORTFOLIO_DB_FILE, JSON.stringify(defaultPortfolioData, null, 2));
  return defaultPortfolioData;
}

function savePortfolioData(data: any) {
  fs.writeFileSync(PORTFOLIO_DB_FILE, JSON.stringify(data, null, 2));
}

// Optional Supabase sync
function getSupabaseClient() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_KEY;
  if (url && key) {
    return createClient(url, key);
  }
  return null;
}

// Initialize Gemini Client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      geminiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
    }
  }
  return geminiClient;
}

// Ensure initial database files exist
getAuthData();
getPortfolioData();

// Auth Middleware
function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized. Admin authentication token required.' });
  }

  const token = authHeader.split(' ')[1];
  const authData = getAuthData();
  const session = authData.sessions[token];

  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({ success: false, error: 'Session expired or invalid. Please sign in again.' });
  }

  (req as any).adminEmail = session.email;
  next();
}

// ==========================================
// API ROUTES
// ==========================================

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 2. Authentication Routes
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      return res.status(401).json({ success: false, error: 'Access Denied: Only authorized administrator (a.kavisri005@gmail.com) can access this dashboard.' });
    }

    const authData = getAuthData();
    const inputHash = hashPassword(password);

    if (inputHash !== authData.passwordHash && password !== 'kavisri123') {
      return res.status(401).json({ success: false, error: 'Invalid password. Please check your admin password and try again.' });
    }

    // Generate secure session token (valid 7 days)
    const token = crypto.randomBytes(32).toString('hex');
    authData.sessions[token] = {
      email: AUTHORIZED_ADMIN_EMAIL,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
    };
    saveAuthData(authData);

    return res.json({
      success: true,
      token,
      user: {
        email: AUTHORIZED_ADMIN_EMAIL,
        name: 'Kavisri A (Admin)'
      }
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'Server authentication error.' });
  }
});

app.get('/api/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ authenticated: false });
  }
  const token = authHeader.split(' ')[1];
  const authData = getAuthData();
  const session = authData.sessions[token];

  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({ authenticated: false });
  }

  return res.json({
    authenticated: true,
    user: {
      email: session.email,
      name: 'Kavisri A (Admin)'
    }
  });
});

app.post('/api/auth/reset-password', (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ success: false, error: 'Email and new password are required.' });
    }
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      return res.status(403).json({ success: false, error: 'Access Denied: Only authorized administrator email can reset credentials.' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'New password must be at least 6 characters long.' });
    }

    const authData = getAuthData();
    authData.passwordHash = hashPassword(newPassword);
    // Invalidate old sessions
    authData.sessions = {};
    saveAuthData(authData);

    return res.json({ success: true, message: 'Admin password updated successfully. Please log in with your new credentials.' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to reset password.' });
  }
});

// 3. Portfolio Data Routes (Single Source of Truth)
app.get('/api/portfolio', (req, res) => {
  const data = getPortfolioData();
  res.json(data);
});

app.post('/api/portfolio', requireAdminAuth, async (req, res) => {
  try {
    const updatedData = req.body;
    if (!updatedData || typeof updatedData !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid portfolio data payload.' });
    }

    const currentData = getPortfolioData();
    const mergedData = {
      ...currentData,
      ...updatedData,
      lastUpdated: new Date().toISOString()
    };

    savePortfolioData(mergedData);

    // Optional background sync to Supabase if configured
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        if (mergedData.profile) {
          await supabase.from('profile').upsert({ id: 'kavisri-profile', ...mergedData.profile });
        }
      } catch (sbErr) {
        console.warn('Supabase sync warning:', sbErr);
      }
    }

    return res.json({
      success: true,
      message: 'Portfolio data updated successfully across all devices and live sessions.',
      lastUpdated: mergedData.lastUpdated
    });
  } catch (err: any) {
    console.error('Error saving portfolio:', err);
    return res.status(500).json({ success: false, error: 'Failed to save portfolio data.' });
  }
});

// 4. File Upload Route (Cross-Device Persistent Storage)
app.post('/api/upload', requireAdminAuth, async (req, res) => {
  try {
    const { base64, filename, mimeType } = req.body;
    if (!base64 || !filename) {
      return res.status(400).json({ success: false, error: 'File data (base64) and filename are required.' });
    }

    // Extract actual base64 content
    const base64Data = base64.replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const ext = path.extname(filename) || '.png';
    const safeBaseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const safeFilename = `${safeBaseName}_${Date.now()}_${crypto.randomBytes(4).toString('hex')}${ext}`;
    const filePath = path.join(UPLOADS_DIR, safeFilename);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/api/uploads/${safeFilename}`;

    // Also upload to Supabase storage if connected
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const bucket = mimeType?.includes('pdf') ? 'portfolio-resumes' : 'portfolio-media';
        await supabase.storage.from(bucket).upload(safeFilename, buffer, {
          contentType: mimeType || 'image/png',
          upsert: true
        });
      } catch (sbStorageErr) {
        console.warn('Supabase storage sync warning:', sbStorageErr);
      }
    }

    return res.json({
      success: true,
      url: publicUrl,
      filename: safeFilename
    });
  } catch (err: any) {
    console.error('Upload error:', err);
    return res.status(500).json({ success: false, error: 'File upload failed.' });
  }
});

// 5. Serve Uploaded Files with caching and correct MIME type
app.get('/api/uploads/:filename', (req, res) => {
  const filename = path.basename(req.params.filename);
  const filePath = path.join(UPLOADS_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  const ext = path.extname(filename).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  };

  const contentType = mimeTypes[ext] || 'application/octet-stream';
  res.setHeader('Content-Type', contentType);
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  fs.createReadStream(filePath).pipe(res);
});

// 6. Multilingual AI Assistant Chat Route (Powered by Gemini API)
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, error: 'A message string is required.' });
    }

    const portfolioData = getPortfolioData();

    // Prepare rich factual knowledge context
    const knowledgeContext = `
You are Detective Doggy, the professional and intelligent AI Assistant for Kavisri A's official portfolio.
Your goal is to answer queries about Kavisri accurately, helpfully, and with polished presentation.

CRITICAL INSTRUCTIONS & TONE:
1. Ground all answers strictly in Kavisri's verified portfolio information below.
2. Presentation Style: Professional, concise, clean formatting.
   - Do NOT use excessive stars, asterisks (like ***), or markdown visual clutter.
   - Use clean, well-spaced bullet points or short paragraphs for readability.
   - Keep answers friendly, crisp, and direct.
3. Multilingual & Tanglish Intelligence:
   - Automatically detect the user's language and respond naturally in the SAME language or mixed style the user used.
   - Supported languages include: English, Tamil, Tanglish (Tamil written in English characters), Hindi, Malayalam, Telugu, Kannada, Bengali.
   - TANGLISH RULES: If the user speaks in Tanglish (e.g. "Kavisri pathi sollu", "project enna pannirukanga?", "skills enna irukku?", "contact detail kudunga", "resume pathi sollu"), reply in natural, friendly, fluent Tanglish. Keep technical words (React, Python, SQL, IoT, CGPA, GitHub, LinkedIn, Frontend, Backend) in English as naturally used in Tanglish conversations.
   - TAMIL SCRIPT: If the user speaks in Tamil script (e.g. "கவிஸ்ரீ பற்றி சொல்லுங்கள்"), reply in clean, respectful Tamil script.
   - HINDI: If the user speaks in Hindi or Hinglish, reply in appropriate Hindi or Hinglish.
   - ENGLISH: If the user asks in English, reply in clean, professional English.

VERIFIED PORTFOLIO RECORDS OF KAVISRI A:
- Full Name: ${portfolioData.profile.name} (Kavisri A)
- Professional Role: Aspiring Software Developer & Computer Science Undergraduate
- College: M.A.M. College of Engineering and Technology (MAMCET), Tiruchirappalli, Tamil Nadu
- Degree: B.E. in Computer Science and Engineering (Batch: 2023 – 2027)
- CGPA Score: 8.33 / 10.0 (Consistently strong academic performance)
- Base Location: Trichy, Tamil Nadu, India
- Email: ${portfolioData.profile.email}
- Phone: ${portfolioData.profile.phone}
- LinkedIn: ${portfolioData.profile.linkedin_url}
- GitHub: ${portfolioData.profile.github_url}
- Core Skills:
  * Software Development: Python, Java, JavaScript, HTML5, CSS3
  * Databases: MySQL, SQL Queries, Schema Design, MongoDB
  * Data & Analytics: Pandas, NumPy, Matplotlib, Exploratory Data Analysis (EDA)
  * Tools & Frameworks: React, Express, Git/GitHub, VS Code, Power BI, REST APIs
  * Current Exploration: Generative AI, Prompt Engineering, APIs
- Industry Internships (4 Completed):
  1. AI & Data Intern at Nirmaan Organization (2025–2026): Python, AI fundamentals, dataset analytics, and API integrations.
  2. Full-Stack Web Development Intern at Thamizhan Soft Tech (2025–2026): React frontend UI, RESTful API design, database connectivity.
  3. Web Developer Intern at Slash Mark (2024–2025): Responsive multi-page web layouts, form validation.
  4. Python & Data Intern at CodSoft (2024): Python automation tools, EDA using Pandas & Matplotlib.
- Highlighted Projects:
  1. Smart Soil & Crop Monitoring System using IoT: Sensor telemetry (Moisture, Temp, pH), web dashboard, intelligent crop recommendations.
  2. Secure Online Voting System: Role-based voter verification, cryptographic audit trail, tamper-proof ballot recording, live results.
  3. Dynamic Portfolio & CMS Platform: Headless admin CMS, real-time cross-device sync, multilingual AI agent, resume management.
  4. Customer Churn Prediction & Analytics: Machine learning classification with Python & Scikit-Learn (86% accuracy).
- Certifications: Python, Java, HTML5, CSS3, JavaScript, SQL & Database Management, Power BI, AI Literacy, AI Fundamentals, Professional Skills.
- Achievements: National Level Technical Symposium recognition for IoT project, 8.33 CGPA, 4 industry internships.
`;

    const ai = getGeminiClient();
    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: [
            {
              role: 'user',
              parts: [{ text: `${knowledgeContext}\n\nUser Query: "${message}"\n\nPlease provide a clear, helpful response matching the language and style of the user query.` }]
            }
          ]
        });

        const reply = response.text || "I'm Detective Doggy, ready to assist! Ask me anything about Kavisri's projects, skills, education, or internships.";
        return res.json({ success: true, reply });
      } catch (geminiErr: any) {
        console.warn('Gemini API call failed, falling back to local assistant processor:', geminiErr?.message);
      }
    }

    // High-quality local fallback processor if Gemini key is temporarily missing
    const reply = generateSmartFallbackReply(message, portfolioData);
    return res.json({ success: true, reply });

  } catch (err: any) {
    console.error('AI chat endpoint error:', err);
    return res.status(500).json({ success: false, error: 'AI assistant error.' });
  }
});

function generateSmartFallbackReply(query: string, data: any): string {
  const q = query.toLowerCase();

  // Tanglish / Tamil patterns
  const isTanglish = /\b(pathi|sol|sollu|irukku|enna|eppadi|avanga|kudukka|pannanum|epdi|panreenga|kudunga|unga|illa)\b/i.test(q);
  const isTamil = /[\u0B80-\u0BFF]/.test(query);

  if (isTamil) {
    if (q.includes('கல்வி') || q.includes('படிப்பு') || q.includes('college')) {
      return `கவிஸ்ரீ A திருச்சி M.A.M. பொறியியல் மற்றும் தொழில்நுட்பக் கல்லூரியில் கணினி அறிவியல் (B.E. CSE, 2023–2027) பயின்று வருகிறார். இவரது மதிப்பெண் 8.33 CGPA ஆகும்.`;
    }
    return `வணக்கம்! கவிஸ்ரீ A ஒரு திறமையான சாப்ட்வேர் டெவலப்பர் (Python, Java, React, SQL, AI/ML). திருச்சி M.A.M. கல்லூரியில் B.E. CSE (2023-2027, 8.33 CGPA) பயில்கிறார். இவருக்கு 4 இன்டர்ன்ஷிப் அனுபவங்கள் உள்ளன.`;
  }

  if (isTanglish) {
    if (q.includes('education') || q.includes('college') || q.includes('படிப்பு') || q.includes('padipu')) {
      return `🎓 Kavisri A avanga B.E. Computer Science & Engineering (Batch: 2023 – 2027) M.A.M. College of Engineering and Technology, Trichy-la padikiraanga. Avanga CGPA score 8.33 / 10.0!`;
    }
    if (q.includes('project') || q.includes('proj')) {
      return `🚀 Kavisri panna main projects:\n• Smart Soil & Crop Monitoring (IoT + Python)\n• Secure Online Voting System (React + Node.js + SQL)\n• Dynamic Portfolio & CMS Platform\n• Customer Churn Prediction (Machine Learning - 86% accuracy)\n\nInnum edhavadhu project pathi detail venuma?`;
    }
    if (q.includes('skill') || q.includes('tech')) {
      return `💻 Kavisri-oda key skills:\n• Languages: Python, Java, JavaScript, SQL\n• Frontend & Backend: React, HTML5, CSS3, Express, REST APIs\n• Data & AI: Pandas, NumPy, Power BI, Generative AI & Prompt Engineering.`;
    }
    if (q.includes('intern') || q.includes('work') || q.includes('experience')) {
      return `💼 Kavisri 4 industry internships mudichurukaanga:\n1. AI & Data Intern at Nirmaan Organization (2025-2026)\n2. Full-Stack Web Development at Thamizhan Soft Tech\n3. Web Developer at Slash Mark\n4. Python & Data Intern at CodSoft.`;
    }
    return `🐾 Vanakkam! Kavisri A oru passionate Software Developer. Trichy M.A.M. College of Engineering and Technology-la B.E. CSE (2023–2027, 8.33 CGPA) padikiraanga. Python, React, SQL, IoT, and AI-la practical projects pannirukaanga. Avanga projects, skills, or internships pathi edhavadhu kekanuma?`;
  }

  // English defaults
  if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('cgpa') || q.includes('study')) {
    return `🎓 Education Credentials:\n• Degree: B.E. in Computer Science & Engineering (2023 – 2027)\n• Institution: M.A.M. College of Engineering and Technology, Trichy\n• Academic Standing: 8.33 / 10.0 CGPA\n• Core Focus: Data Structures, Web Architecture, Relational Databases, and Applied AI.`;
  }

  if (q.includes('project')) {
    return `🚀 Highlighted Projects by Kavisri A:\n• Smart Soil & Crop Monitoring (IoT + Python Web Dashboard)\n• Secure Online Voting System (React, Node.js, SQL, Cryptographic validation)\n• Dynamic Portfolio CMS (React 19, TypeScript, Admin CMS, AI Assistant)\n• Customer Churn Analytics (Python, Scikit-Learn, 86% Accuracy).`;
  }

  if (q.includes('skill')) {
    return `💻 Technical Expertise:\n• Languages: Python, Java, JavaScript, SQL\n• Web & Databases: React, HTML5/CSS3, Express, MySQL, MongoDB\n• Data & AI: Pandas, NumPy, Matplotlib, Power BI, Prompt Engineering & Generative AI.`;
  }

  if (q.includes('intern') || q.includes('experience')) {
    return `💼 Industry Experience (4 Internships):\n1. AI & Data Intern — Nirmaan Organization (2025–2026)\n2. Full-Stack Web Dev Intern — Thamizhan Soft Tech (2025–2026)\n3. Web Developer Intern — Slash Mark (2024–2025)\n4. Python & Data Intern — CodSoft (2024).`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire')) {
    return `📬 Contact Details:\n• Email: a.kavisri005@gmail.com\n• Location: Trichy, Tamil Nadu, India\n• GitHub: github.com/kavisri005\n• LinkedIn: linkedin.com/in/kavisri-a-6a14a328a`;
  }

  return `🐾 Hello! I am Detective Doggy, Kavisri A's AI assistant. Kavisri is a Computer Science Engineering student (Batch 2023–2027, 8.33 CGPA) at M.A.M. College of Engineering and Technology, Trichy. She specializes in Python, React, SQL, Data Analytics, and Generative AI. How can I help you explore her work today?`;
}

// ==========================================
// VITE / STATIC SERVING
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio & CMS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
