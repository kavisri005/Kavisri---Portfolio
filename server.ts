import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';
import { initialProfile, initialSkills, initialProjects, initialExperiences, initialEducation, initialCertifications, initialAchievements, initialExploring, initialSocialLinks, initialResumeData } from './src/data/portfolioData';

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

// Initial default portfolio state is sourced from the verified portfolio data.
const defaultPortfolioData = {
  profile: initialProfile,
  skills: initialSkills,
  projects: initialProjects,
  experiences: initialExperiences,
  education: initialEducation,
  certifications: initialCertifications,
  achievements: initialAchievements,
  exploring: initialExploring,
  socialLinks: initialSocialLinks,
  resumeData: initialResumeData,
  lastUpdated: new Date().toISOString()
};

function getPortfolioData() {
  try {
    if (fs.existsSync(PORTFOLIO_DB_FILE)) {
      const content = fs.readFileSync(PORTFOLIO_DB_FILE, 'utf-8');
      const parsed = JSON.parse(content);
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

    if (inputHash !== authData.passwordHash) {
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

app.post('/api/auth/reset-password', requireAdminAuth, (req, res) => {
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
You are Detective Doggy, the portfolio assistant for Kavisri A. Answer clearly and only from the verified portfolio records below. Do not invent projects, achievements, dates, employers, skills, or metrics. If a detail is not listed, say so. Respond in the language used by the visitor when possible.

Profile:
- Name: ${portfolioData.profile.name}
- Role: ${portfolioData.profile.title || 'Software Developer'}
- Summary: ${portfolioData.profile.short_bio}
- Education: ${portfolioData.education.map((item: any) => [item.degree, item.institution, item.location, item.period, 'CGPA ' + (item.cgpa || item.score || 'not listed')].join(' - ')).join('; ')}
- Location: ${portfolioData.profile.location}
- Email: ${portfolioData.profile.email}
- Phone: ${portfolioData.profile.phone}
- LinkedIn: ${portfolioData.profile.linkedin_url}
- GitHub: ${portfolioData.profile.github_url}
- Skills: ${portfolioData.skills.map((item: any) => item.name).join(', ')}
- Internships: ${portfolioData.experiences.map((item: any) => [item.role + ' at ' + item.company, item.year, item.location, (item.responsibilities || []).join('; ')].join(' - ')).join('\n')}
- Projects: ${portfolioData.projects.map((item: any) => [item.title, item.description, (item.technologies || []).join(', '), item.demo_url || 'no demo listed'].join(' - ')).join('\n')}
- Certifications: ${portfolioData.certifications.map((item: any) => (item.title || item.name) + (item.issuer ? ' - ' + item.issuer : '')).join(', ')}
- Achievements: ${portfolioData.achievements.map((item: any) => item.title + ' - ' + item.description).join('; ')}
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
  const profile = data.profile || {};
  if (q.includes('project')) return (data.projects || []).map((p: any) => '- ' + p.title + ': ' + p.description + ' (' + (p.technologies || []).join(', ') + ')').join('\n');
  if (q.includes('skill') || q.includes('tech stack')) return 'Skills: ' + (data.skills || []).map((item: any) => item.name).join(', ') + '.';
  if (q.includes('intern') || q.includes('experience') || q.includes('work history')) return (data.experiences || []).map((item: any) => '- ' + item.role + ' at ' + item.company + ', ' + item.year + ' (' + item.location + ')').join('\n');
  if (q.includes('education') || q.includes('college') || q.includes('cgpa')) return (data.education || []).map((item: any) => item.degree + ' at ' + item.institution + ', ' + item.location + '. CGPA: ' + (item.cgpa || item.score || 'not listed') + ' (' + item.period + ').').join('\n');
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire')) return 'Email: ' + profile.email + '. Phone: ' + profile.phone + '. Location: ' + profile.location + '. GitHub: ' + profile.github_url + '. LinkedIn: ' + profile.linkedin_url + '.';
  if (q.includes('cert')) return (data.certifications || []).map((item: any) => '- ' + (item.title || item.name) + (item.issuer ? ' - ' + item.issuer : '')).join('\n');
  return 'Kavisri A is a ' + (profile.title || 'Software Developer') + ' and Computer Science and Engineering undergraduate. Ask about her listed projects, skills, internships, education, or contact information.';
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
