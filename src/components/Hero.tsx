import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  Database, 
  Sparkles, 
  Boxes, 
  Briefcase, 
  Award, 
  GraduationCap, 
  FolderGit2,
  CheckCircle2,
  Cpu,
  Terminal,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { ProfilePortrait } from './ProfilePortrait';

interface HeroProps {
  onOpenResume: () => void;
  onOpenAI?: () => void;
}

const DOMAIN_FLOW = [
  { label: 'CODE', icon: Code2, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
  { label: 'DATA', icon: Database, color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30' },
  { label: 'AI', icon: Sparkles, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  { label: 'BUILD', icon: Boxes, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
];

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenAI }) => {
  const { profile, socialLinks, experiences, projects, certifications } = useCMS();
  const { isDark } = useTheme();
  const { t, language } = useLanguage();
  const [currentDomainIdx, setCurrentDomainIdx] = useState(0);

  // Cycle signature domain animation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDomainIdx((prev) => (prev + 1) % DOMAIN_FLOW.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const githubLink = socialLinks.find(s => s.platform.toLowerCase().includes('github'))?.url || profile.github_url || 'https://github.com/kavisri005';
  const linkedinLink = socialLinks.find(s => s.platform.toLowerCase().includes('linkedin'))?.url || profile.linkedin_url || 'https://linkedin.com/in/kavisri-a';
  const emailVal = profile.email || 'a.kavisri005@gmail.com';

  const internshipCount = experiences.length > 0 ? experiences.length : 4;
  const projectCount = projects.length > 0 ? projects.length : 4;
  const certCount = certifications.length > 0 ? certifications.length : 10;
  const cgpaVal = profile.education_brief?.cgpa || '8.33';

  return (
    <section 
      id="hero" 
      className="relative min-h-[85vh] flex items-center pt-24 sm:pt-28 pb-14 overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Brand & Positioning */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-5"
          >
            {/* Live System Status & Domain Loop */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-pill text-[11px] font-mono tracking-wider text-cyan-400 border border-cyan-500/30 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>{t('hero.badge')}</span>
              </div>

              {/* Signature Domain flow */}
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full glass-pill text-[11px] font-mono">
                {DOMAIN_FLOW.map((domain, i) => {
                  const isActive = currentDomainIdx === i;
                  const Icon = domain.icon;
                  return (
                    <React.Fragment key={domain.label}>
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full transition-all duration-200 ${
                        isActive 
                          ? `${domain.bg} ${domain.color} font-bold shadow-sm border border-cyan-500/30 scale-105` 
                          : 'text-slate-400 opacity-60'
                      }`}>
                        <Icon className="w-3 h-3" />
                        <span>{domain.label}</span>
                      </span>
                      {i < DOMAIN_FLOW.length - 1 && <span className="text-slate-500 text-[9px]">→</span>}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2]">
              {language === 'en' ? (
                <>
                  I build practical software solutions with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-400">
                    code, data &amp; AI.
                  </span>
                </>
              ) : (
                <span>{t('hero.headline')}</span>
              )}
            </h1>

            {/* Sub-headline positioning */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md glass-pill font-mono text-cyan-400 text-[11px] border border-cyan-500/30">
                {profile.title || 'Aspiring Software Developer'}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">{t('hero.positioning')}</span>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <motion.a
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                id="hero-view-projects-btn"
                href="#projects"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition-colors cursor-pointer"
              >
                <span>{t('hero.viewProjects')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                id="hero-download-resume-btn"
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl glass-panel glass-panel-hover text-slate-200 hover:text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t('hero.downloadResume')}</span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                id="hero-contact-cta-btn"
                href="#contact"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl glass-pill hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                <span>{t('hero.contactMe')}</span>
              </motion.a>
            </div>

            {/* Social Links & Quick Contact Strip */}
            <div className="pt-2.5 border-t border-white/10 flex flex-wrap items-center gap-3.5 sm:gap-5 text-[11px] text-slate-400">
              <a
                href={githubLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition"
              >
                <Github className="w-3.5 h-3.5" />
                <span>github.com/kavisri005</span>
              </a>

              <a
                href={linkedinLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${emailVal}`}
                className="flex items-center gap-1.5 hover:text-cyan-400 transition text-cyan-400/90 font-mono"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{emailVal}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Prominent Developer Portrait & Credentials Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="lg:col-span-5 relative space-y-4"
          >
            {/* Main Portrait Showcase Frame */}
            <div className="rounded-3xl glass-panel p-3.5 sm:p-4 shadow-2xl relative overflow-hidden border border-cyan-500/30 group">
              
              {/* Glowing animated background rings */}
              <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-gradient-to-tr from-sky-500/20 to-teal-500/20 blur-3xl pointer-events-none" />

              {/* Large Visible Portrait Visual with Enhanced Top Length */}
              <div className="relative w-full aspect-[3/4] max-h-[420px] rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-slate-950">
                <ProfilePortrait 
                  className="w-full h-full object-cover" 
                  showBadge={true}
                  allowZoom={true} 
                />

                {/* Top Overlay Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/75 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[11px] font-mono shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Open to Roles</span>
                  </div>

                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/15 text-slate-300 text-[11px] font-mono shadow-lg">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>Trichy, IN</span>
                  </div>
                </div>
              </div>

              {/* Name & Academic Credentials Header */}
              <div className="pt-3.5 px-1.5 flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-extrabold text-white tracking-tight">
                      {profile.name || 'KAVISRI A'}
                    </h3>
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" title="Verified Portfolio" />
                  </div>
                  <p className="text-xs text-cyan-300 font-mono">
                    B.E. Computer Science &amp; Engineering • 2023–2027
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block" title="M.A.M. College of Engineering and Technology">MAMCET</span>
                  <span className="text-xs font-bold text-amber-300 font-mono">8.33 CGPA</span>
                </div>
              </div>

              {/* 4 High-Impact Metrics Grid */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                <motion.div 
                  whileHover={{ y: -2 }}
                  className="p-2.5 rounded-xl glass-subcard text-center border border-white/10 hover:border-cyan-500/40 transition"
                >
                  <div className="text-xs font-mono text-cyan-400 font-bold">8.33</div>
                  <div className="text-[10px] text-slate-400 leading-tight mt-0.5">CGPA</div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -2 }}
                  className="p-2.5 rounded-xl glass-subcard text-center border border-white/10 hover:border-sky-500/40 transition"
                >
                  <div className="text-xs font-mono text-sky-400 font-bold">{internshipCount}</div>
                  <div className="text-[10px] text-slate-400 leading-tight mt-0.5">Internships</div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -2 }}
                  className="p-2.5 rounded-xl glass-subcard text-center border border-white/10 hover:border-emerald-500/40 transition"
                >
                  <div className="text-xs font-mono text-emerald-400 font-bold">{projectCount}+</div>
                  <div className="text-[10px] text-slate-400 leading-tight mt-0.5">Projects</div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -2 }}
                  className="p-2.5 rounded-xl glass-subcard text-center border border-white/10 hover:border-amber-500/40 transition"
                >
                  <div className="text-xs font-mono text-amber-400 font-bold">{certCount}+</div>
                  <div className="text-[10px] text-slate-400 leading-tight mt-0.5">Certs</div>
                </motion.div>
              </div>

              {/* Core Engineering Disciplines */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg glass-pill text-[11px] font-medium text-slate-200 border border-white/10">
                  <Code2 className="w-3 h-3 text-cyan-400" />
                  Software Dev
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg glass-pill text-[11px] font-medium text-slate-200 border border-white/10">
                  <Database className="w-3 h-3 text-sky-400" />
                  SQL &amp; Data
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg glass-pill text-[11px] font-medium text-slate-200 border border-white/10">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  GenAI &amp; APIs
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
