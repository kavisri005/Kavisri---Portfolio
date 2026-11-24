import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  Shield, 
  Sun, 
  Moon, 
  Code2,
  Sparkles,
  Terminal,
  Bot,
  Languages
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCMS } from '../context/CMSContext';
import { useRouter } from '../context/RouterContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage, Language } from '../context/LanguageContext';
import { ProfilePortrait } from './ProfilePortrait';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenAI: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenAI }) => {
  const { profile, socialLinks, user } = useCMS();
  const { navigate } = useRouter();
  const { theme, isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: t('nav.home'), href: '#hero', id: 'hero' },
    { name: t('nav.about'), href: '#about', id: 'about' },
    { name: t('nav.skills'), href: '#skills', id: 'skills' },
    { name: t('nav.projects'), href: '#projects', id: 'projects' },
    { name: t('nav.experience'), href: '#experience', id: 'experience' },
    { name: t('nav.education'), href: '#education', id: 'education' },
    { name: t('nav.certifications'), href: '#certifications', id: 'certifications' },
    { name: t('nav.contact'), href: '#contact', id: 'contact' },
  ];

  const githubLink = socialLinks.find(s => s.platform.toLowerCase().includes('github'))?.url || 'https://github.com/kavisri005';
  const linkedinLink = socialLinks.find(s => s.platform.toLowerCase().includes('linkedin'))?.url || 'https://linkedin.com/in/kavisri-a';
  const emailVal = profile.email || 'a.kavisrii@gmail.com';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? isDark
            ? 'py-2.5 bg-[#07090e]/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40' 
            : 'py-2.5 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-md shadow-slate-900/5'
          : 'py-4 sm:py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo with Avatar */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex items-center gap-3 text-decoration-none cursor-pointer"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-cyan-400 via-sky-400 to-teal-400 shadow-md shadow-cyan-500/25 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                <ProfilePortrait className="w-full h-full object-cover" showBadge={false} allowZoom={false} />
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#07090e] rounded-full animate-pulse" title="Online" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-white text-base group-hover:text-cyan-400 transition-colors">
              {profile.name || 'KAVISRI A'}
            </span>
            <span className="text-[10px] text-slate-400 -mt-1 tracking-wider uppercase font-mono flex items-center gap-1">
              <span>{profile.title || 'Software Developer'}</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 p-1 rounded-full glass-panel">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-300 font-semibold bg-cyan-500/20 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Desktop Controls: Ask AI + Theme + Resume + Admin */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Ask AI Agent Trigger */}
          <button
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500/20 to-sky-500/20 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-500/30 transition shadow-sm cursor-pointer group"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform animate-pulse" />
            <span>{t('nav.askAI')}</span>
          </button>

          {/* Day / Night Mode Toggle Switch */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono glass-pill hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer group shadow-sm"
            title={`Switch to ${isDark ? 'Day (Light)' : 'Night (Dark)'} Mode`}
            aria-label="Toggle theme mode"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span
                  key="moon"
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5"
                >
                  <Moon className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
                  <span className="text-[11px] font-semibold">Night</span>
                </motion.span>
              ) : (
                <motion.span
                  key="sun"
                  initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5"
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-45 transition-transform" />
                  <span className="text-[11px] font-semibold">Day</span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Resume Button */}
          <button
            id="nav-resume-button"
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/60 backdrop-blur-md transition duration-200 shadow-sm cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t('nav.resume')}</span>
          </button>

          {/* Admin Dashboard Entry link */}
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono glass-pill hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 backdrop-blur-md transition cursor-pointer"
            title="Admin CMS Dashboard"
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>{user ? 'CMS' : 'Admin'}</span>
          </button>
        </div>

        {/* Mobile controls: AI Agent + Theme + Resume + Menu */}
        <div className="flex items-center gap-1.5 lg:hidden">
          {/* Mobile AI button */}
          <button
            onClick={onOpenAI}
            className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
            title="Ask AI"
          >
            <Bot className="w-4 h-4 animate-pulse" />
          </button>

          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl glass-pill text-slate-300 hover:text-cyan-300 transition"
            aria-label="Toggle theme mode"
          >
            {isDark ? (
              <Moon className="w-4 h-4 text-cyan-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
          </button>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 backdrop-blur-md"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('nav.resume')}</span>
          </button>

          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-xl glass-pill text-slate-300 hover:text-white backdrop-blur-md"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Full-Height Responsive Slide-Over Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 lg:hidden"
              aria-hidden="true"
            />

            {/* Slide-in Drawer Container */}
            <motion.div
              id="mobile-menu-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] max-w-[85vw] h-[100dvh] bg-[#07090e]/98 border-l border-white/10 backdrop-blur-2xl z-50 flex flex-col justify-between overflow-y-auto custom-scrollbar p-5 pb-8 shadow-2xl lg:hidden"
            >
              {/* Drawer Top Header */}
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-cyan-400 to-sky-400">
                      <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                        <ProfilePortrait className="w-full h-full object-cover" showBadge={false} allowZoom={false} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">{profile.name || 'Kavisri A'}</h4>
                      <p className="text-[10px] font-mono text-cyan-300">Navigation Menu</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg glass-pill text-slate-400 hover:text-white"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Vertical Scrollable Navigation Links */}
                <nav className="space-y-1.5">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                          isActive
                            ? 'text-cyan-300 bg-cyan-500/20 border border-cyan-500/40 shadow-sm'
                            : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-4 mt-6 border-t border-white/10 space-y-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAI();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-sky-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center justify-center gap-2 hover:bg-cyan-500/30 transition shadow-sm"
                >
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>{t('nav.askAI')}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenResume();
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{t('nav.resume')}</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/admin');
                    }}
                    className="py-2 px-3 rounded-xl glass-pill text-xs font-mono text-slate-300 flex items-center justify-center gap-1.5"
                    title="CMS Login"
                  >
                    <Shield className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{user ? 'CMS' : 'Admin'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
