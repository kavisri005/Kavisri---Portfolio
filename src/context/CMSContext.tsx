import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Profile, 
  Skill, 
  SkillCategory,
  Project, 
  Experience, 
  Education, 
  Certification, 
  Achievement, 
  ExploringItem, 
  SocialLink, 
  ResumeData, 
  ToastMessage 
} from '../types';
import { 
  initialProfile, 
  initialSkills, 
  initialProjects, 
  initialExperiences, 
  initialEducation, 
  initialCertifications, 
  initialAchievements, 
  initialExploring, 
  initialSocialLinks, 
  initialResumeData 
} from '../data/portfolioData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

const STORAGE_KEYS = {
  PROFILE: 'kavisri_cms_profile_v3',
  SKILLS: 'kavisri_cms_skills_v3',
  PROJECTS: 'kavisri_cms_projects_v3',
  EXPERIENCE: 'kavisri_cms_experience_v3',
  EDUCATION: 'kavisri_cms_education_v3',
  CERTIFICATIONS: 'kavisri_cms_certifications_v3',
  ACHIEVEMENTS: 'kavisri_cms_achievements_v3',
  EXPLORING: 'kavisri_cms_exploring_v3',
  SOCIAL: 'kavisri_cms_social_v3',
  RESUME: 'kavisri_cms_resume_v3',
  LAST_UPDATED: 'kavisri_cms_last_updated_v3',
};

export const AUTHORIZED_ADMIN_EMAIL = 'a.kavisri005@gmail.com';

interface CMSContextType {
  // Data States
  profile: Profile;
  skills: Skill[];
  skillCategories: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
  exploring: ExploringItem[];
  socialLinks: SocialLink[];
  resumeData: ResumeData;
  lastUpdated: string;
  isLoading: boolean;
  isSyncing: boolean;
  isSupabaseConnected: boolean;

  // Profile
  updateProfile: (updated: Partial<Profile>) => Promise<boolean>;

  // Skills
  addSkill: (skill: Omit<Skill, 'id' | 'created_at' | 'updated_at'>) => Promise<boolean>;
  updateSkill: (id: string, skill: Partial<Skill>) => Promise<boolean>;
  deleteSkill: (id: string) => Promise<boolean>;
  reorderSkills: (id: string, direction: 'up' | 'down') => Promise<boolean>;
  togglePublishSkill: (id: string) => Promise<boolean>;

  // Projects
  addProject: (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => Promise<boolean>;
  updateProject: (id: string, project: Partial<Project>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  saveProject: (project: Project) => Promise<boolean>;
  duplicateProject: (id: string) => Promise<boolean>;
  reorderProjects: (id: string, direction: 'up' | 'down') => Promise<boolean>;
  togglePublishProject: (id: string) => Promise<boolean>;

  // Experience
  addExperience: (exp: Omit<Experience, 'id' | 'created_at' | 'updated_at'>) => Promise<boolean>;
  updateExperience: (id: string, exp: Partial<Experience>) => Promise<boolean>;
  deleteExperience: (id: string) => Promise<boolean>;
  reorderExperience: (id: string, direction: 'up' | 'down') => Promise<boolean>;
  togglePublishExperience: (id: string) => Promise<boolean>;

  // Education
  addEducation: (edu: Omit<Education, 'id' | 'created_at' | 'updated_at'>) => Promise<boolean>;
  updateEducation: (id: string, edu: Partial<Education>) => Promise<boolean>;
  deleteEducation: (id: string) => Promise<boolean>;
  reorderEducation: (id: string, direction: 'up' | 'down') => Promise<boolean>;
  togglePublishEducation: (id: string) => Promise<boolean>;

  // Certifications
  addCertification: (cert: Omit<Certification, 'id' | 'created_at' | 'updated_at'>) => Promise<boolean>;
  updateCertification: (id: string, cert: Partial<Certification>) => Promise<boolean>;
  deleteCertification: (id: string) => Promise<boolean>;
  reorderCertifications: (id: string, direction: 'up' | 'down') => Promise<boolean>;
  togglePublishCertification: (id: string) => Promise<boolean>;

  // Achievements
  addAchievement: (ach: Omit<Achievement, 'id' | 'created_at' | 'updated_at'>) => Promise<boolean>;
  updateAchievement: (id: string, ach: Partial<Achievement>) => Promise<boolean>;
  deleteAchievement: (id: string) => Promise<boolean>;
  reorderAchievements: (id: string, direction: 'up' | 'down') => Promise<boolean>;
  togglePublishAchievement: (id: string) => Promise<boolean>;

  // Exploring
  addExploring: (item: Omit<ExploringItem, 'id' | 'created_at' | 'updated_at'>) => Promise<boolean>;
  updateExploring: (id: string, item: Partial<ExploringItem>) => Promise<boolean>;
  deleteExploring: (id: string) => Promise<boolean>;
  reorderExploring: (id: string, direction: 'up' | 'down') => Promise<boolean>;
  togglePublishExploring: (id: string) => Promise<boolean>;

  // Social Links
  addSocialLink: (link: Omit<SocialLink, 'id' | 'created_at' | 'updated_at'>) => Promise<boolean>;
  updateSocialLink: (id: string, link: Partial<SocialLink>) => Promise<boolean>;
  deleteSocialLink: (id: string) => Promise<boolean>;
  togglePublishSocialLink: (id: string) => Promise<boolean>;

  // Resume
  updateResumeData: (data: Partial<ResumeData>) => Promise<boolean>;
  uploadResumeFile: (file: File) => Promise<{ success: boolean; url: string; filename: string }>;

  // Media (Persistent Cross-Device)
  uploadImage: (file: File, bucket?: string) => Promise<{ success: boolean; url: string }>;

  // Auth & Admin Security
  user: User | { email: string; id: string } | null;
  session: Session | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  adminEmail: string;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateAdminPassword: (newPass: string) => Promise<{ success: boolean; error?: string }>;

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning', title?: string) => void;
  removeToast: (id: string) => void;

  // Reset to verified initial defaults
  resetToDefaults: () => void;
}

const CMSContext = createContext<CMSContextType | null>(null);

function loadLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (parsed === null || parsed === undefined) return fallback;
    if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
}

function saveLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Failed saving to localStorage key "${key}":`, err);
  }
}

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialization
  const [profile, setProfile] = useState<Profile>(() => loadLocal(STORAGE_KEYS.PROFILE, initialProfile));
  const [skills, setSkills] = useState<Skill[]>(() => loadLocal(STORAGE_KEYS.SKILLS, initialSkills));
  const [projects, setProjects] = useState<Project[]>(() => loadLocal(STORAGE_KEYS.PROJECTS, initialProjects));
  const [experiences, setExperiences] = useState<Experience[]>(() => loadLocal(STORAGE_KEYS.EXPERIENCE, initialExperiences));
  const [education, setEducation] = useState<Education[]>(() => loadLocal(STORAGE_KEYS.EDUCATION, initialEducation));
  const [certifications, setCertifications] = useState<Certification[]>(() => loadLocal(STORAGE_KEYS.CERTIFICATIONS, initialCertifications));
  const [achievements, setAchievements] = useState<Achievement[]>(() => loadLocal(STORAGE_KEYS.ACHIEVEMENTS, initialAchievements));
  const [exploring, setExploring] = useState<ExploringItem[]>(() => loadLocal(STORAGE_KEYS.EXPLORING, initialExploring));
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => loadLocal(STORAGE_KEYS.SOCIAL, initialSocialLinks));
  const [resumeData, setResumeData] = useState<ResumeData>(() => loadLocal(STORAGE_KEYS.RESUME, initialResumeData));
  const [lastUpdated, setLastUpdated] = useState<string>(() => loadLocal(STORAGE_KEYS.LAST_UPDATED, new Date().toISOString()));

  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Auth State
  const [user, setUser] = useState<User | { email: string; id: string } | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isCheckingAuth] = useState(false);
  // Keep the admin token in memory only. A reload or a fresh visit must sign in again.
  const [authToken, setAuthToken] = useState<string | null>(null);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success', title?: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: ToastMessage = { id, message, type, title };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const touchLastUpdated = useCallback(() => {
    const now = new Date().toISOString();
    setLastUpdated(now);
    saveLocal(STORAGE_KEYS.LAST_UPDATED, now);
  }, []);

  // Save full state bundle to Server Single Source of Truth
  const syncBundleToServer = useCallback(async (overrides: Partial<any> = {}) => {
    try {
      const token = authToken;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const bundle = {
        profile: overrides.profile || profile,
        skills: overrides.skills || skills,
        projects: overrides.projects || projects,
        experiences: overrides.experiences || experiences,
        education: overrides.education || education,
        certifications: overrides.certifications || certifications,
        achievements: overrides.achievements || achievements,
        exploring: overrides.exploring || exploring,
        socialLinks: overrides.socialLinks || socialLinks,
        resumeData: overrides.resumeData || resumeData,
        lastUpdated: new Date().toISOString()
      };

      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers,
        body: JSON.stringify(bundle)
      });

      if (res.ok) {
        const json = await res.json();
        touchLastUpdated();
        return true;
      }
    } catch (err) {
      console.warn('Sync to server notice:', err);
    }
    return false;
  }, [profile, skills, projects, experiences, education, certifications, achievements, exploring, socialLinks, resumeData, touchLastUpdated, authToken]);

  // Load latest Single Source of Truth from Server on Mount
  useEffect(() => {
    let isMounted = true;

    async function fetchServerPortfolio() {
      setIsSyncing(true);
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data.profile) {
            setProfile(data.profile);
            saveLocal(STORAGE_KEYS.PROFILE, data.profile);
          }
          if (data.skills && Array.isArray(data.skills)) {
            setSkills(data.skills);
            saveLocal(STORAGE_KEYS.SKILLS, data.skills);
          }
          if (data.projects && Array.isArray(data.projects)) {
            setProjects(data.projects);
            saveLocal(STORAGE_KEYS.PROJECTS, data.projects);
          }
          if (data.experiences && Array.isArray(data.experiences)) {
            setExperiences(data.experiences);
            saveLocal(STORAGE_KEYS.EXPERIENCE, data.experiences);
          }
          if (data.education && Array.isArray(data.education)) {
            setEducation(data.education);
            saveLocal(STORAGE_KEYS.EDUCATION, data.education);
          }
          if (data.certifications && Array.isArray(data.certifications)) {
            setCertifications(data.certifications);
            saveLocal(STORAGE_KEYS.CERTIFICATIONS, data.certifications);
          }
          if (data.achievements && Array.isArray(data.achievements)) {
            setAchievements(data.achievements);
            saveLocal(STORAGE_KEYS.ACHIEVEMENTS, data.achievements);
          }
          if (data.exploring && Array.isArray(data.exploring)) {
            setExploring(data.exploring);
            saveLocal(STORAGE_KEYS.EXPLORING, data.exploring);
          }
          if (data.socialLinks && Array.isArray(data.socialLinks)) {
            setSocialLinks(data.socialLinks);
            saveLocal(STORAGE_KEYS.SOCIAL, data.socialLinks);
          }
          if (data.resumeData) {
            setResumeData(data.resumeData);
            saveLocal(STORAGE_KEYS.RESUME, data.resumeData);
          }
          if (data.lastUpdated) {
            setLastUpdated(data.lastUpdated);
            saveLocal(STORAGE_KEYS.LAST_UPDATED, data.lastUpdated);
          }
        }
      } catch (err) {
        console.warn('Initial server portfolio load fallback:', err);
      } finally {
        if (isMounted) setIsSyncing(false);
      }
    }

    fetchServerPortfolio();
    return () => {
      isMounted = false;
    };
  }, []);

  // Derived categorized skills
  const skillCategories: SkillCategory[] = useMemo(() => {
    const DEFAULT_CATEGORIES = [
      'Software Development',
      'Database',
      'Data & Analytics',
      'Core Tools & Concepts',
      'Soft Skills',
      'AI / Emerging Technologies',
    ];

    const map = new Map<string, SkillCategory>();

    for (const cat of DEFAULT_CATEGORIES) {
      map.set(cat, {
        id: `cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        title: cat,
        is_published: true,
        skills: [],
      });
    }

    const safeSkills = Array.isArray(skills) ? skills : [];
    for (const s of safeSkills) {
      const catTitle = s.category || 'Software Development';
      if (!map.has(catTitle)) {
        map.set(catTitle, {
          id: `cat-${catTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          title: catTitle,
          is_published: true,
          skills: [],
        });
      }
      const cat = map.get(catTitle)!;
      cat.skills.push({
        ...s,
        name: s.name,
        category: catTitle,
        isExploring: Boolean(s.is_exploring || s.isExploring),
        is_published: s.is_published !== false,
        display_order: s.display_order,
      });
    }

    return Array.from(map.values()).filter(c => c.skills.length > 0);
  }, [skills]);

  // Auth Methods
  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const normalizedEmail = email.trim().toLowerCase();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, password: pass })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAuthToken(data.token);
        setUser({ email: data.user.email, id: 'admin-kavisri' });
        addToast('Signed in to Admin Dashboard successfully.', 'success');
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Invalid credentials.' };
      }
    } catch {
      return { success: false, error: 'Connection failed. Please check your network and try again.' };
    }
  };

  const updateAdminPassword = async (newPass: string): Promise<{ success: boolean; error?: string }> => {
    if (!newPass || newPass.trim().length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }
    const cleanPass = newPass.trim();

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}) },
        body: JSON.stringify({ email: AUTHORIZED_ADMIN_EMAIL, newPassword: cleanPass })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        addToast('Admin password updated successfully.', 'success');
        setAuthToken(null);
        setUser(null);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Failed to update password.' };
      }
    } catch {
      return { success: false, error: 'Network error while updating password.' };
    }
  };

  const logout = async (): Promise<void> => {
    setAuthToken(null);
    setUser(null);
    setSession(null);
    addToast('Signed out of Admin CMS.', 'info');
  };

  // Cross-Device Persistent Image and Document Uploads
  const uploadImage = async (file: File): Promise<{ success: boolean; url: string }> => {
    try {
      const token = authToken;
      const reader = new FileReader();

      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const base64Data = await base64Promise;

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          base64: base64Data,
          filename: file.name,
          mimeType: file.type
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.url) {
          addToast('Image uploaded and synced across all devices.', 'success');
          return { success: true, url: data.url };
        }
      }

      // Fallback
      addToast('Image uploaded in local cache.', 'info');
      return { success: true, url: base64Data };
    } catch (err) {
      console.error('Image upload failed:', err);
      addToast('Image upload failed.', 'error');
      return { success: false, url: '' };
    }
  };

  const uploadResumeFile = async (file: File): Promise<{ success: boolean; url: string; filename: string }> => {
    try {
      const token = authToken;
      const reader = new FileReader();

      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const base64Data = await base64Promise;

      let fileUrl = '';
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          base64: base64Data,
          filename: file.name,
          mimeType: file.type || 'application/pdf'
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.url) {
          fileUrl = data.url;
        }
      }

      if (!fileUrl) {
        fileUrl = base64Data;
      }

      const formattedSize = `${(file.size / 1024).toFixed(0)} KB`;
      const newResumeData: ResumeData = {
        filename: file.name,
        url: fileUrl,
        upload_date: new Date().toISOString().split('T')[0],
        is_published: true,
        size: formattedSize,
      };

      setResumeData(newResumeData);
      saveLocal(STORAGE_KEYS.RESUME, newResumeData);
      syncBundleToServer({ resumeData: newResumeData });
      touchLastUpdated();

      addToast('Resume uploaded and published across all devices.', 'success');
      return { success: true, url: fileUrl, filename: file.name };
    } catch {
      addToast('Failed to upload resume.', 'error');
      return { success: false, url: '', filename: '' };
    }
  };

  // Profile CRUD
  const updateProfile = async (updated: Partial<Profile>): Promise<boolean> => {
    try {
      const newProfile = { ...profile, ...updated, updated_at: new Date().toISOString() };
      setProfile(newProfile);
      saveLocal(STORAGE_KEYS.PROFILE, newProfile);
      syncBundleToServer({ profile: newProfile });
      touchLastUpdated();
      addToast('Profile updated across all devices.', 'success');
      return true;
    } catch {
      addToast('Failed to update profile.', 'error');
      return false;
    }
  };

  // Skills CRUD
  const addSkill = async (skillData: Omit<Skill, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> => {
    try {
      const newSkill: Skill = {
        ...skillData,
        id: `skill-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const newSkills = [...skills, newSkill];
      setSkills(newSkills);
      saveLocal(STORAGE_KEYS.SKILLS, newSkills);
      syncBundleToServer({ skills: newSkills });
      touchLastUpdated();
      addToast('Skill added successfully.', 'success');
      return true;
    } catch {
      addToast('Failed to add skill.', 'error');
      return false;
    }
  };

  const updateSkill = async (id: string, updated: Partial<Skill>): Promise<boolean> => {
    try {
      const newSkills = skills.map(s => s.id === id ? { ...s, ...updated, updated_at: new Date().toISOString() } : s);
      setSkills(newSkills);
      saveLocal(STORAGE_KEYS.SKILLS, newSkills);
      syncBundleToServer({ skills: newSkills });
      touchLastUpdated();
      addToast('Skill updated.', 'success');
      return true;
    } catch {
      addToast('Failed to update skill.', 'error');
      return false;
    }
  };

  const deleteSkill = async (id: string): Promise<boolean> => {
    try {
      const updated = skills.filter(s => s.id !== id);
      setSkills(updated);
      saveLocal(STORAGE_KEYS.SKILLS, updated);
      syncBundleToServer({ skills: updated });
      touchLastUpdated();
      addToast('Skill deleted.', 'success');
      return true;
    } catch {
      addToast('Failed to delete skill.', 'error');
      return false;
    }
  };

  const reorderSkills = async (id: string, direction: 'up' | 'down'): Promise<boolean> => {
    const idx = skills.findIndex(s => s.id === id);
    if (idx === -1) return false;
    if (direction === 'up' && idx === 0) return false;
    if (direction === 'down' && idx === skills.length - 1) return false;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const reordered = [...skills];
    const [moved] = reordered.splice(idx, 1);
    reordered.splice(targetIdx, 0, moved);

    const updated = reordered.map((item, i) => ({ ...item, display_order: i + 1 }));
    setSkills(updated);
    saveLocal(STORAGE_KEYS.SKILLS, updated);
    syncBundleToServer({ skills: updated });
    touchLastUpdated();
    return true;
  };

  const togglePublishSkill = async (id: string): Promise<boolean> => {
    const item = skills.find(s => s.id === id);
    if (!item) return false;
    return updateSkill(id, { is_published: !item.is_published });
  };

  // Projects CRUD
  const addProject = async (projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> => {
    try {
      const newProject: Project = {
        ...projectData,
        id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const updated = [newProject, ...projects];
      setProjects(updated);
      saveLocal(STORAGE_KEYS.PROJECTS, updated);
      syncBundleToServer({ projects: updated });
      touchLastUpdated();
      addToast('Project added.', 'success');
      return true;
    } catch {
      addToast('Failed to add project.', 'error');
      return false;
    }
  };

  const updateProject = async (id: string, updated: Partial<Project>): Promise<boolean> => {
    try {
      const newProjects = projects.map(p => p.id === id ? { ...p, ...updated, updated_at: new Date().toISOString() } : p);
      setProjects(newProjects);
      saveLocal(STORAGE_KEYS.PROJECTS, newProjects);
      syncBundleToServer({ projects: newProjects });
      touchLastUpdated();
      addToast('Project updated.', 'success');
      return true;
    } catch {
      addToast('Failed to update project.', 'error');
      return false;
    }
  };

  const saveProject = async (project: Project): Promise<boolean> => {
    return updateProject(project.id, project);
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    try {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      saveLocal(STORAGE_KEYS.PROJECTS, updated);
      syncBundleToServer({ projects: updated });
      touchLastUpdated();
      addToast('Project deleted.', 'success');
      return true;
    } catch {
      addToast('Failed to delete project.', 'error');
      return false;
    }
  };

  const duplicateProject = async (id: string): Promise<boolean> => {
    const item = projects.find(p => p.id === id);
    if (!item) return false;
    const duplicated: Omit<Project, 'id' | 'created_at' | 'updated_at'> = {
      ...item,
      title: `${item.title} (Copy)`,
      display_order: (projects.length + 1)
    };
    return addProject(duplicated);
  };

  const reorderProjects = async (id: string, direction: 'up' | 'down'): Promise<boolean> => {
    const idx = projects.findIndex(p => p.id === id);
    if (idx === -1) return false;
    if (direction === 'up' && idx === 0) return false;
    if (direction === 'down' && idx === projects.length - 1) return false;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const reordered = [...projects];
    const [moved] = reordered.splice(idx, 1);
    reordered.splice(targetIdx, 0, moved);

    const updated = reordered.map((item, i) => ({ ...item, display_order: i + 1 }));
    setProjects(updated);
    saveLocal(STORAGE_KEYS.PROJECTS, updated);
    syncBundleToServer({ projects: updated });
    touchLastUpdated();
    return true;
  };

  const togglePublishProject = async (id: string): Promise<boolean> => {
    const item = projects.find(p => p.id === id);
    if (!item) return false;
    return updateProject(id, { is_published: !item.is_published });
  };

  // Experience CRUD
  const addExperience = async (expData: Omit<Experience, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> => {
    try {
      const newExp: Experience = {
        ...expData,
        id: `exp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const updated = [newExp, ...experiences];
      setExperiences(updated);
      saveLocal(STORAGE_KEYS.EXPERIENCE, updated);
      syncBundleToServer({ experiences: updated });
      touchLastUpdated();
      addToast('Experience added.', 'success');
      return true;
    } catch {
      addToast('Failed to add experience.', 'error');
      return false;
    }
  };

  const updateExperience = async (id: string, updated: Partial<Experience>): Promise<boolean> => {
    try {
      const newExps = experiences.map(e => e.id === id ? { ...e, ...updated, updated_at: new Date().toISOString() } : e);
      setExperiences(newExps);
      saveLocal(STORAGE_KEYS.EXPERIENCE, newExps);
      syncBundleToServer({ experiences: newExps });
      touchLastUpdated();
      addToast('Experience updated.', 'success');
      return true;
    } catch {
      addToast('Failed to update experience.', 'error');
      return false;
    }
  };

  const deleteExperience = async (id: string): Promise<boolean> => {
    try {
      const updated = experiences.filter(e => e.id !== id);
      setExperiences(updated);
      saveLocal(STORAGE_KEYS.EXPERIENCE, updated);
      syncBundleToServer({ experiences: updated });
      touchLastUpdated();
      addToast('Experience deleted.', 'success');
      return true;
    } catch {
      addToast('Failed to delete experience.', 'error');
      return false;
    }
  };

  const reorderExperience = async (id: string, direction: 'up' | 'down'): Promise<boolean> => {
    const idx = experiences.findIndex(e => e.id === id);
    if (idx === -1) return false;
    if (direction === 'up' && idx === 0) return false;
    if (direction === 'down' && idx === experiences.length - 1) return false;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const reordered = [...experiences];
    const [moved] = reordered.splice(idx, 1);
    reordered.splice(targetIdx, 0, moved);

    const updated = reordered.map((item, i) => ({ ...item, display_order: i + 1 }));
    setExperiences(updated);
    saveLocal(STORAGE_KEYS.EXPERIENCE, updated);
    syncBundleToServer({ experiences: updated });
    touchLastUpdated();
    return true;
  };

  const togglePublishExperience = async (id: string): Promise<boolean> => {
    const item = experiences.find(e => e.id === id);
    if (!item) return false;
    return updateExperience(id, { is_published: !item.is_published });
  };

  // Education CRUD
  const addEducation = async (eduData: Omit<Education, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> => {
    try {
      const newEdu: Education = {
        ...eduData,
        id: `edu-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const updated = [newEdu, ...education];
      setEducation(updated);
      saveLocal(STORAGE_KEYS.EDUCATION, updated);
      syncBundleToServer({ education: updated });
      touchLastUpdated();
      addToast('Education added.', 'success');
      return true;
    } catch {
      addToast('Failed to add education.', 'error');
      return false;
    }
  };

  const updateEducation = async (id: string, updated: Partial<Education>): Promise<boolean> => {
    try {
      const newEdu = education.map(e => e.id === id ? { ...e, ...updated, updated_at: new Date().toISOString() } : e);
      setEducation(newEdu);
      saveLocal(STORAGE_KEYS.EDUCATION, newEdu);
      syncBundleToServer({ education: newEdu });
      touchLastUpdated();
      addToast('Education updated.', 'success');
      return true;
    } catch {
      addToast('Failed to update education.', 'error');
      return false;
    }
  };

  const deleteEducation = async (id: string): Promise<boolean> => {
    try {
      const updated = education.filter(e => e.id !== id);
      setEducation(updated);
      saveLocal(STORAGE_KEYS.EDUCATION, updated);
      syncBundleToServer({ education: updated });
      touchLastUpdated();
      addToast('Education deleted.', 'success');
      return true;
    } catch {
      addToast('Failed to delete education.', 'error');
      return false;
    }
  };

  const reorderEducation = async (id: string, direction: 'up' | 'down'): Promise<boolean> => {
    const idx = education.findIndex(e => e.id === id);
    if (idx === -1) return false;
    if (direction === 'up' && idx === 0) return false;
    if (direction === 'down' && idx === education.length - 1) return false;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const reordered = [...education];
    const [moved] = reordered.splice(idx, 1);
    reordered.splice(targetIdx, 0, moved);

    const updated = reordered.map((item, i) => ({ ...item, display_order: i + 1 }));
    setEducation(updated);
    saveLocal(STORAGE_KEYS.EDUCATION, updated);
    syncBundleToServer({ education: updated });
    touchLastUpdated();
    return true;
  };

  const togglePublishEducation = async (id: string): Promise<boolean> => {
    const item = education.find(e => e.id === id);
    if (!item) return false;
    return updateEducation(id, { is_published: !item.is_published });
  };

  // Certifications CRUD
  const addCertification = async (certData: Omit<Certification, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> => {
    try {
      const newCert: Certification = {
        ...certData,
        title: certData.title || certData.name || '',
        name: certData.name || certData.title || '',
        id: `cert-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const updated = [...certifications, newCert];
      setCertifications(updated);
      saveLocal(STORAGE_KEYS.CERTIFICATIONS, updated);
      syncBundleToServer({ certifications: updated });
      touchLastUpdated();
      addToast('Certification added.', 'success');
      return true;
    } catch {
      addToast('Failed to add certification.', 'error');
      return false;
    }
  };

  const updateCertification = async (id: string, updated: Partial<Certification>): Promise<boolean> => {
    try {
      const newCerts = certifications.map(c => c.id === id ? { 
        ...c, 
        ...updated, 
        title: updated.title || updated.name || c.title,
        name: updated.name || updated.title || c.name,
        updated_at: new Date().toISOString() 
      } : c);
      setCertifications(newCerts);
      saveLocal(STORAGE_KEYS.CERTIFICATIONS, newCerts);
      syncBundleToServer({ certifications: newCerts });
      touchLastUpdated();
      addToast('Certification updated.', 'success');
      return true;
    } catch {
      addToast('Failed to update certification.', 'error');
      return false;
    }
  };

  const deleteCertification = async (id: string): Promise<boolean> => {
    try {
      const updated = certifications.filter(c => c.id !== id);
      setCertifications(updated);
      saveLocal(STORAGE_KEYS.CERTIFICATIONS, updated);
      syncBundleToServer({ certifications: updated });
      touchLastUpdated();
      addToast('Certification deleted.', 'success');
      return true;
    } catch {
      addToast('Failed to delete certification.', 'error');
      return false;
    }
  };

  const reorderCertifications = async (id: string, direction: 'up' | 'down'): Promise<boolean> => {
    const idx = certifications.findIndex(c => c.id === id);
    if (idx === -1) return false;
    if (direction === 'up' && idx === 0) return false;
    if (direction === 'down' && idx === certifications.length - 1) return false;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const reordered = [...certifications];
    const [moved] = reordered.splice(idx, 1);
    reordered.splice(targetIdx, 0, moved);

    const updated = reordered.map((item, i) => ({ ...item, display_order: i + 1 }));
    setCertifications(updated);
    saveLocal(STORAGE_KEYS.CERTIFICATIONS, updated);
    syncBundleToServer({ certifications: updated });
    touchLastUpdated();
    return true;
  };

  const togglePublishCertification = async (id: string): Promise<boolean> => {
    const item = certifications.find(c => c.id === id);
    if (!item) return false;
    return updateCertification(id, { is_published: !item.is_published });
  };

  // Achievements CRUD
  const addAchievement = async (achData: Omit<Achievement, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> => {
    try {
      const newAch: Achievement = {
        ...achData,
        id: `ach-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const updated = [...achievements, newAch];
      setAchievements(updated);
      saveLocal(STORAGE_KEYS.ACHIEVEMENTS, updated);
      syncBundleToServer({ achievements: updated });
      touchLastUpdated();
      addToast('Achievement added.', 'success');
      return true;
    } catch {
      addToast('Failed to add achievement.', 'error');
      return false;
    }
  };

  const updateAchievement = async (id: string, updated: Partial<Achievement>): Promise<boolean> => {
    try {
      const newAchs = achievements.map(a => a.id === id ? { ...a, ...updated, updated_at: new Date().toISOString() } : a);
      setAchievements(newAchs);
      saveLocal(STORAGE_KEYS.ACHIEVEMENTS, newAchs);
      syncBundleToServer({ achievements: newAchs });
      touchLastUpdated();
      addToast('Achievement updated.', 'success');
      return true;
    } catch {
      addToast('Failed to update achievement.', 'error');
      return false;
    }
  };

  const deleteAchievement = async (id: string): Promise<boolean> => {
    try {
      const updated = achievements.filter(a => a.id !== id);
      setAchievements(updated);
      saveLocal(STORAGE_KEYS.ACHIEVEMENTS, updated);
      syncBundleToServer({ achievements: updated });
      touchLastUpdated();
      addToast('Achievement deleted.', 'success');
      return true;
    } catch {
      addToast('Failed to delete achievement.', 'error');
      return false;
    }
  };

  const reorderAchievements = async (id: string, direction: 'up' | 'down'): Promise<boolean> => {
    const idx = achievements.findIndex(a => a.id === id);
    if (idx === -1) return false;
    if (direction === 'up' && idx === 0) return false;
    if (direction === 'down' && idx === achievements.length - 1) return false;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const reordered = [...achievements];
    const [moved] = reordered.splice(idx, 1);
    reordered.splice(targetIdx, 0, moved);

    const updated = reordered.map((item, i) => ({ ...item, display_order: i + 1 }));
    setAchievements(updated);
    saveLocal(STORAGE_KEYS.ACHIEVEMENTS, updated);
    syncBundleToServer({ achievements: updated });
    touchLastUpdated();
    return true;
  };

  const togglePublishAchievement = async (id: string): Promise<boolean> => {
    const item = achievements.find(a => a.id === id);
    if (!item) return false;
    return updateAchievement(id, { is_published: !item.is_published });
  };

  // Exploring CRUD
  const addExploring = async (itemData: Omit<ExploringItem, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> => {
    try {
      const newItem: ExploringItem = {
        ...itemData,
        id: `expitem-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const updated = [...exploring, newItem];
      setExploring(updated);
      saveLocal(STORAGE_KEYS.EXPLORING, updated);
      syncBundleToServer({ exploring: updated });
      touchLastUpdated();
      addToast('Topic added.', 'success');
      return true;
    } catch {
      addToast('Failed to add topic.', 'error');
      return false;
    }
  };

  const updateExploring = async (id: string, updated: Partial<ExploringItem>): Promise<boolean> => {
    try {
      const newItems = exploring.map(e => e.id === id ? { ...e, ...updated, updated_at: new Date().toISOString() } : e);
      setExploring(newItems);
      saveLocal(STORAGE_KEYS.EXPLORING, newItems);
      syncBundleToServer({ exploring: newItems });
      touchLastUpdated();
      addToast('Topic updated.', 'success');
      return true;
    } catch {
      addToast('Failed to update topic.', 'error');
      return false;
    }
  };

  const deleteExploring = async (id: string): Promise<boolean> => {
    try {
      const updated = exploring.filter(e => e.id !== id);
      setExploring(updated);
      saveLocal(STORAGE_KEYS.EXPLORING, updated);
      syncBundleToServer({ exploring: updated });
      touchLastUpdated();
      addToast('Topic deleted.', 'success');
      return true;
    } catch {
      addToast('Failed to delete topic.', 'error');
      return false;
    }
  };

  const reorderExploring = async (id: string, direction: 'up' | 'down'): Promise<boolean> => {
    const idx = exploring.findIndex(e => e.id === id);
    if (idx === -1) return false;
    if (direction === 'up' && idx === 0) return false;
    if (direction === 'down' && idx === exploring.length - 1) return false;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const reordered = [...exploring];
    const [moved] = reordered.splice(idx, 1);
    reordered.splice(targetIdx, 0, moved);

    const updated = reordered.map((item, i) => ({ ...item, display_order: i + 1 }));
    setExploring(updated);
    saveLocal(STORAGE_KEYS.EXPLORING, updated);
    syncBundleToServer({ exploring: updated });
    touchLastUpdated();
    return true;
  };

  const togglePublishExploring = async (id: string): Promise<boolean> => {
    const item = exploring.find(e => e.id === id);
    if (!item) return false;
    return updateExploring(id, { is_published: !item.is_published });
  };

  // Social Links CRUD
  const addSocialLink = async (linkData: Omit<SocialLink, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> => {
    try {
      const newLink: SocialLink = {
        ...linkData,
        id: `social-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const updated = [...socialLinks, newLink];
      setSocialLinks(updated);
      saveLocal(STORAGE_KEYS.SOCIAL, updated);
      syncBundleToServer({ socialLinks: updated });
      touchLastUpdated();
      addToast('Social link added.', 'success');
      return true;
    } catch {
      addToast('Failed to add social link.', 'error');
      return false;
    }
  };

  const updateSocialLink = async (id: string, updated: Partial<SocialLink>): Promise<boolean> => {
    try {
      const newLinks = socialLinks.map(s => s.id === id ? { ...s, ...updated, updated_at: new Date().toISOString() } : s);
      setSocialLinks(newLinks);
      saveLocal(STORAGE_KEYS.SOCIAL, newLinks);
      syncBundleToServer({ socialLinks: newLinks });
      touchLastUpdated();
      addToast('Social link updated.', 'success');
      return true;
    } catch {
      addToast('Failed to update link.', 'error');
      return false;
    }
  };

  const deleteSocialLink = async (id: string): Promise<boolean> => {
    try {
      const updated = socialLinks.filter(s => s.id !== id);
      setSocialLinks(updated);
      saveLocal(STORAGE_KEYS.SOCIAL, updated);
      syncBundleToServer({ socialLinks: updated });
      touchLastUpdated();
      addToast('Social link deleted.', 'success');
      return true;
    } catch {
      addToast('Failed to delete social link.', 'error');
      return false;
    }
  };

  const togglePublishSocialLink = async (id: string): Promise<boolean> => {
    const item = socialLinks.find(s => s.id === id);
    if (!item) return false;
    return updateSocialLink(id, { is_published: !item.is_published });
  };

  // Resume Management
  const updateResumeData = async (data: Partial<ResumeData>): Promise<boolean> => {
    try {
      const newResume = { ...resumeData, ...data };
      setResumeData(newResume);
      saveLocal(STORAGE_KEYS.RESUME, newResume);
      syncBundleToServer({ resumeData: newResume });
      touchLastUpdated();
      addToast('Resume details updated.', 'success');
      return true;
    } catch {
      addToast('Failed to update resume.', 'error');
      return false;
    }
  };

  // Reset to initial defaults
  const resetToDefaults = () => {
    setProfile(initialProfile);
    setSkills(initialSkills);
    setProjects(initialProjects);
    setExperiences(initialExperiences);
    setEducation(initialEducation);
    setCertifications(initialCertifications);
    setAchievements(initialAchievements);
    setExploring(initialExploring);
    setSocialLinks(initialSocialLinks);
    setResumeData(initialResumeData);

    saveLocal(STORAGE_KEYS.PROFILE, initialProfile);
    saveLocal(STORAGE_KEYS.SKILLS, initialSkills);
    saveLocal(STORAGE_KEYS.PROJECTS, initialProjects);
    saveLocal(STORAGE_KEYS.EXPERIENCE, initialExperiences);
    saveLocal(STORAGE_KEYS.EDUCATION, initialEducation);
    saveLocal(STORAGE_KEYS.CERTIFICATIONS, initialCertifications);
    saveLocal(STORAGE_KEYS.ACHIEVEMENTS, initialAchievements);
    saveLocal(STORAGE_KEYS.EXPLORING, initialExploring);
    saveLocal(STORAGE_KEYS.SOCIAL, initialSocialLinks);
    saveLocal(STORAGE_KEYS.RESUME, initialResumeData);

    syncBundleToServer({
      profile: initialProfile,
      skills: initialSkills,
      projects: initialProjects,
      experiences: initialExperiences,
      education: initialEducation,
      certifications: initialCertifications,
      achievements: initialAchievements,
      exploring: initialExploring,
      socialLinks: initialSocialLinks,
      resumeData: initialResumeData
    });

    touchLastUpdated();
    addToast('Reset content to initial defaults.', 'info');
  };

  return (
    <CMSContext.Provider
      value={{
        profile,
        skills,
        skillCategories,
        projects,
        experiences,
        education,
        certifications,
        achievements,
        exploring,
        socialLinks,
        resumeData,
        lastUpdated,
        isLoading,
        isSyncing,
        isSupabaseConnected: isSupabaseConfigured,

        updateProfile,

        addSkill,
        updateSkill,
        deleteSkill,
        reorderSkills,
        togglePublishSkill,

        addProject,
        updateProject,
        deleteProject,
        saveProject,
        duplicateProject,
        reorderProjects,
        togglePublishProject,

        addExperience,
        updateExperience,
        deleteExperience,
        reorderExperience,
        togglePublishExperience,

        addEducation,
        updateEducation,
        deleteEducation,
        reorderEducation,
        togglePublishEducation,

        addCertification,
        updateCertification,
        deleteCertification,
        reorderCertifications,
        togglePublishCertification,

        addAchievement,
        updateAchievement,
        deleteAchievement,
        reorderAchievements,
        togglePublishAchievement,

        addExploring,
        updateExploring,
        deleteExploring,
        reorderExploring,
        togglePublishExploring,

        addSocialLink,
        updateSocialLink,
        deleteSocialLink,
        togglePublishSocialLink,

        updateResumeData,
        uploadResumeFile,

        uploadImage,

        user,
        session,
        isAuthenticated: Boolean(user),
        isCheckingAuth,
        adminEmail: AUTHORIZED_ADMIN_EMAIL,
        login,
        logout,
        updateAdminPassword,

        toasts,
        addToast,
        removeToast,

        resetToDefaults,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
