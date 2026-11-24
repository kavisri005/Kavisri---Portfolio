import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  User, 
  Code2, 
  Sparkles, 
  FolderGit2, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Trophy, 
  Mail, 
  ArrowUp,
  Compass,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SectionItem {
  id: string;
  name: string;
  short: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const SECTIONS: SectionItem[] = [
  { id: 'hero', name: 'Home', short: 'Hero', icon: Home, tag: 'Intro' },
  { id: 'about', name: 'About', short: 'Bio', icon: User, tag: 'Profile' },
  { id: 'skills', name: 'Skills', short: 'Tech', icon: Code2, tag: 'Stack' },
  { id: 'exploring', name: 'Exploring', short: 'R&D', icon: Sparkles, tag: 'AI & Next' },
  { id: 'projects', name: 'Projects', short: 'Apps', icon: FolderGit2, tag: 'Projects' },
  { id: 'experience', name: 'Experience', short: 'Exp', icon: Briefcase, tag: 'Internships' },
  { id: 'education', name: 'Education', short: 'Edu', icon: GraduationCap, tag: 'Academics' },
  { id: 'certifications', name: 'Certifications', short: 'Certs', icon: Award, tag: 'Verified' },
  { id: 'achievements', name: 'Achievements', short: 'Honors', icon: Trophy, tag: 'Awards' },
  { id: 'contact', name: 'Contact', short: 'Reach', icon: Mail, tag: 'Connect' },
];

export const ScrollSelectionDock: React.FC = () => {
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [isHoveredRail, setIsHoveredRail] = useState<boolean>(false);
  const [hoveredSectionId, setHoveredSectionId] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const progress = totalScroll > 0 ? Math.min(Math.max((currentScroll / totalScroll) * 100, 0), 100) : 0;
          setScrollProgress(progress);

          // Fast scroll spy calculation
          const scrollPosition = currentScroll + window.innerHeight * 0.35;
          for (let i = SECTIONS.length - 1; i >= 0; i--) {
            const el = document.getElementById(SECTIONS[i].id);
            if (el && el.offsetTop <= scrollPosition) {
              setActiveSection(SECTIONS[i].id);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const navOffset = 65;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentSectionItem = SECTIONS.find(s => s.id === activeSection) || SECTIONS[0];
  const CurrentIcon = currentSectionItem.icon;

  return (
    <>
      {/* 1. Fast Immersive Top Reading Progress Beam */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-300 shadow-[0_0_8px_#38bdf8] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Non-Intrusive Micro-Rail Dock (Desktop & Tablet) */}
      <nav
        aria-label="Section Navigation"
        className="fixed right-2 sm:right-3.5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none"
        onMouseEnter={() => setIsHoveredRail(true)}
        onMouseLeave={() => {
          setIsHoveredRail(false);
          setHoveredSectionId(null);
        }}
      >
        {/* Sleek Slim Glass Spine */}
        <motion.div 
          layout
          className={`flex flex-col items-center gap-1.5 p-1.5 rounded-full transition-all duration-200 ${
            isHoveredRail
              ? 'bg-[#07090e]/80 dark:bg-[#07090e]/85 backdrop-blur-xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 px-2'
              : 'bg-black/20 dark:bg-black/30 backdrop-blur-md border border-white/10 hover:border-white/20'
          }`}
        >
          {SECTIONS.map((section, idx) => {
            const isActive = activeSection === section.id;
            const isHovered = hoveredSectionId === section.id;
            const Icon = section.icon;

            return (
              <div 
                key={section.id} 
                className="relative flex items-center justify-center group"
                onMouseEnter={() => setHoveredSectionId(section.id)}
                onMouseLeave={() => setHoveredSectionId(null)}
              >
                {/* Instant Floating Tooltip on Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 8, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="absolute right-full mr-3 px-2.5 py-1 rounded-xl glass-panel border border-cyan-500/40 bg-[#07090e]/90 text-white shadow-xl pointer-events-none flex items-center gap-2 whitespace-nowrap z-50"
                    >
                      <span className="text-[10px] font-mono font-bold text-cyan-400">0{idx + 1}</span>
                      <span className="text-xs font-semibold text-slate-100">{section.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">({section.tag})</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Minimalist Micro Interactive Indicator */}
                <button
                  onClick={() => scrollToSection(section.id)}
                  aria-label={`Jump to ${section.name}`}
                  className="relative p-1 rounded-full transition-all duration-150 flex items-center justify-center cursor-pointer group-hover:scale-125 focus:outline-none"
                >
                  {isActive ? (
                    <motion.div
                      layoutId="activeDockDot"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-tr from-cyan-400 to-sky-400 flex items-center justify-center text-slate-950 shadow-[0_0_10px_#38bdf8]"
                    >
                      <Icon className="w-2.5 h-2.5 text-slate-950" />
                    </motion.div>
                  ) : (
                    <div 
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        isHoveredRail
                          ? 'bg-slate-400 hover:bg-cyan-300 hover:scale-125'
                          : 'bg-slate-500/60 hover:bg-cyan-400'
                      }`} 
                    />
                  )}
                </button>
              </div>
            );
          })}

          {/* Quick Scroll To Top Button (Snappy & Discreet) */}
          {scrollProgress > 6 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              title="Scroll to Top"
              className="mt-1 w-6 h-6 rounded-full glass-panel hover:border-cyan-500/50 flex items-center justify-center text-slate-300 hover:text-cyan-300 cursor-pointer shadow-md"
            >
              <ArrowUp className="w-3 h-3 text-cyan-400" />
            </motion.button>
          )}
        </motion.div>
      </nav>

      {/* 3. Ultra-Compact Mobile Quick-Jump FAB (Sits unobtrusively in bottom-left corner) */}
      <div className="fixed bottom-4 left-4 z-40 md:hidden select-none">
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              className="mb-2 p-2.5 rounded-2xl glass-panel shadow-2xl border border-cyan-500/30 bg-[#07090e]/95 w-48 max-h-64 overflow-y-auto space-y-1 backdrop-blur-2xl"
            >
              <div className="text-[10px] font-mono text-slate-400 uppercase px-2 py-0.5 border-b border-white/10 flex items-center justify-between">
                <span>Sections</span>
                <span className="text-cyan-400 font-bold">{Math.round(scrollProgress)}%</span>
              </div>
              {SECTIONS.map((sec, idx) => {
                const isActive = activeSection === sec.id;
                const Icon = sec.icon;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      scrollToSection(sec.id);
                      setIsMobileOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                        : 'text-slate-300 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{sec.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">0{idx + 1}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Mini Action Dial */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle section menu"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-cyan-500/40 text-xs font-semibold text-white shadow-xl backdrop-blur-xl bg-[#07090e]/85"
        >
          <CurrentIcon className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-[11px] font-mono text-cyan-300">{currentSectionItem.short}</span>
          <span className="text-[9px] font-mono text-slate-400">{Math.round(scrollProgress)}%</span>
        </motion.button>
      </div>
    </>
  );
};
