export interface Profile {
  id?: string;
  name: string;
  title?: string;
  headline: string;
  positioning?: string;
  short_bio: string;
  detailed_bio: string[];
  location: string;
  email: string;
  phone: string;
  linkedin_url: string;
  linkedin_display?: string;
  github_url: string;
  github_display?: string;
  resume_url?: string;
  profile_image_url?: string;
  updated_at?: string;
  education_brief?: {
    degree: string;
    cgpa: string;
    location: string;
    focus: string;
    exploring: string;
  };
}

export type SkillCategoryType =
  | 'Software Development'
  | 'Database'
  | 'Data & Analytics'
  | 'AI / Emerging Technologies';

export interface Skill {
  id: string;
  category: SkillCategoryType | string;
  name: string;
  icon?: string;
  is_exploring?: boolean;
  isExploring?: boolean;
  display_order: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export type ProjectCategoryType = 'Software Development' | 'Data & Analytics' | 'AI / ML' | 'Web Applications' | string;

export type MockupType = 'lost-and-found' | 'energy-dashboard' | 'ecommerce-returns' | 'resume-analyzer' | 'generic';

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: ProjectCategoryType;
  description: string;
  detailed_description?: string;
  problem?: string;
  problemStatement?: string;
  problem_statement?: string;
  solution?: string;
  architecture?: string;
  systemDesign?: string;
  system_design?: string;
  features?: string[];
  key_contributions?: string[];
  keyContributions?: string[];
  technologies: string[];
  metrics?: string[];
  github_url?: string;
  githubUrl?: string;
  demo_url?: string;
  liveUrl?: string;
  image_url?: string;
  mockup_type?: MockupType;
  mockupType?: MockupType;
  featured: boolean;
  is_published: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Experience {
  id: string;
  year: string;
  role: string;
  company: string;
  location: string;
  type?: 'internship' | 'full-time' | 'contract';
  description?: string;
  responsibilities: string[];
  display_order?: number;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  start_year?: string;
  end_year?: string;
  period: string;
  status?: string;
  cgpa?: string;
  score?: string;
  score_label?: string;
  description?: string;
  display_order?: number;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Certification {
  id: string;
  title: string;
  name?: string; // alias for title
  issuer?: string;
  issue_date?: string;
  credential_id?: string;
  verification_url?: string;
  certificate_file_url?: string;
  icon?: string;
  display_order?: number;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  organization?: string;
  date?: string;
  tag?: string;
  image_url?: string;
  display_order?: number;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ExploringItem {
  id: string;
  title: string;
  name?: string; // alias for title
  description: string;
  tag?: string;
  icon?: string;
  display_order?: number;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon?: string;
  display_order?: number;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ResumeData {
  filename?: string;
  file_name?: string;
  url?: string;
  file_url?: string;
  upload_date?: string;
  is_published?: boolean;
  size?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  duration?: number;
}

// Backward compatibility types for legacy components
export type ExperienceItem = Experience;
export type EducationItem = Education;
export type CertificationItem = Certification;
export type AchievementItem = Achievement;
export interface SkillCategory {
  id?: string;
  title: string;
  is_published?: boolean;
  skills: { 
    id?: string;
    name: string; 
    category?: string;
    isExploring?: boolean;
    is_exploring?: boolean;
    is_published?: boolean;
    display_order?: number;
  }[];
}
