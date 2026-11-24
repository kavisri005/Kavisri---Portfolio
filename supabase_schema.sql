-- ==============================================================================
-- KAVISRI A — PORTFOLIO CMS DATABASE SCHEMA (Supabase PostgreSQL + RLS)
-- ==============================================================================

-- 1. PROFILE TABLE
CREATE TABLE IF NOT EXISTS public.profile (
    id TEXT PRIMARY KEY DEFAULT 'kavisri-profile',
    name TEXT NOT NULL DEFAULT 'KAVISRI A',
    headline TEXT NOT NULL DEFAULT 'I build practical software solutions with code, data & AI.',
    short_bio TEXT NOT NULL DEFAULT 'Computer Science and Engineering student building practical solutions across software development, data analytics, and AI/ML.',
    detailed_bio JSONB NOT NULL DEFAULT '[]'::jsonb,
    location TEXT NOT NULL DEFAULT 'Trichy, India',
    email TEXT NOT NULL DEFAULT 'a.kavisrii@gmail.com',
    phone TEXT NOT NULL DEFAULT '8667589833',
    linkedin_url TEXT NOT NULL DEFAULT 'https://linkedin.com/in/kavisri-a-6a14a328a',
    linkedin_display TEXT DEFAULT 'linkedin.com/in/kavisri-a-6a14a328a',
    github_url TEXT NOT NULL DEFAULT 'https://github.com/kavisri005',
    github_display TEXT DEFAULT 'github.com/kavisri005',
    resume_url TEXT DEFAULT '',
    profile_image_url TEXT DEFAULT '',
    education_brief JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    icon TEXT,
    is_exploring BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    detailed_description TEXT,
    problem TEXT,
    solution TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    key_contributions JSONB DEFAULT '[]'::jsonb,
    technologies JSONB DEFAULT '[]'::jsonb,
    github_url TEXT,
    demo_url TEXT,
    image_url TEXT,
    mockup_type TEXT DEFAULT 'generic',
    featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. EXPERIENCE TABLE
CREATE TABLE IF NOT EXISTS public.experience (
    id TEXT PRIMARY KEY,
    year TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT DEFAULT 'internship',
    description TEXT,
    responsibilities JSONB DEFAULT '[]'::jsonb,
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
    id TEXT PRIMARY KEY,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    location TEXT NOT NULL,
    start_year TEXT,
    end_year TEXT,
    period TEXT NOT NULL,
    status TEXT,
    cgpa TEXT,
    score TEXT,
    score_label TEXT,
    description TEXT,
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.certifications (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    issuer TEXT,
    issue_date TEXT,
    credential_id TEXT,
    verification_url TEXT,
    certificate_file_url TEXT,
    icon TEXT,
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.achievements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    organization TEXT,
    date TEXT,
    tag TEXT,
    image_url TEXT,
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. EXPLORING TABLE
CREATE TABLE IF NOT EXISTS public.exploring (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tag TEXT,
    icon TEXT,
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. SOCIAL LINKS TABLE
CREATE TABLE IF NOT EXISTS public.social_links (
    id TEXT PRIMARY KEY,
    platform TEXT NOT NULL,
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT,
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. RESUME TABLE
CREATE TABLE IF NOT EXISTS public.resume (
    id TEXT PRIMARY KEY DEFAULT 'current-resume',
    filename TEXT NOT NULL,
    url TEXT NOT NULL,
    upload_date TEXT NOT NULL,
    size TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exploring ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume ENABLE ROW LEVEL SECURITY;

-- PUBLIC POLICIES: Anyone can read published items
CREATE POLICY "Public profile read" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Public skills read" ON public.skills FOR SELECT USING (is_published = true);
CREATE POLICY "Public projects read" ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public experience read" ON public.experience FOR SELECT USING (is_published = true);
CREATE POLICY "Public education read" ON public.education FOR SELECT USING (is_published = true);
CREATE POLICY "Public certifications read" ON public.certifications FOR SELECT USING (is_published = true);
CREATE POLICY "Public achievements read" ON public.achievements FOR SELECT USING (is_published = true);
CREATE POLICY "Public exploring read" ON public.exploring FOR SELECT USING (is_published = true);
CREATE POLICY "Public social_links read" ON public.social_links FOR SELECT USING (is_published = true);
CREATE POLICY "Public resume read" ON public.resume FOR SELECT USING (is_published = true);

-- AUTHENTICATED ADMIN POLICIES: Full CRUD for authenticated users
CREATE POLICY "Admin profile full access" ON public.profile FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin skills full access" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin projects full access" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin experience full access" ON public.experience FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin education full access" ON public.education FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin certifications full access" ON public.certifications FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin achievements full access" ON public.achievements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin exploring full access" ON public.exploring FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin social_links full access" ON public.social_links FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin resume full access" ON public.resume FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- STORAGE BUCKETS (Create in Supabase Storage dashboard: 'portfolio-media' and 'portfolio-resumes')
-- Storage policy example:
-- CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id IN ('portfolio-media', 'portfolio-resumes'));
-- CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('portfolio-media', 'portfolio-resumes'));
