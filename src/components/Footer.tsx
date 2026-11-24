import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, Shield } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useRouter } from '../context/RouterContext';

export const Footer: React.FC = () => {
  const { profile, socialLinks } = useCMS();
  const { navigate } = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const githubLink = socialLinks.find(s => s.platform.toLowerCase().includes('github'))?.url || profile.github_url || 'https://github.com/kavisri005';
  const linkedinLink = socialLinks.find(s => s.platform.toLowerCase().includes('linkedin'))?.url || profile.linkedin_url || 'https://linkedin.com/in/kavisri-a';
  const emailVal = profile.email || 'a.kavisrii@gmail.com';

  return (
    <footer className="py-12 border-t border-white/10 glass-panel text-slate-400 text-xs mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand info */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="font-extrabold text-white text-base tracking-tight mb-0.5">
              {profile.name || 'Kavisri A'}
            </span>
            <span className="text-slate-400 text-xs font-mono">
              {profile.title || 'Software Developer'} • {profile.positioning || 'Full-Stack Web Development | APIs | Database Systems'}
            </span>
          </div>

          {/* Social & Admin icons */}
          <div className="flex items-center gap-3">
            <a
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-xl glass-pill text-slate-300 hover:text-white hover:border-cyan-400/50 transition shadow-sm"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={linkedinLink}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-xl glass-pill text-slate-300 hover:text-white hover:border-cyan-400/50 transition shadow-sm"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${emailVal}`}
              aria-label="Email"
              className="p-2.5 rounded-xl glass-pill text-slate-300 hover:text-white hover:border-cyan-400/50 transition shadow-sm"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={() => navigate('/admin')}
              aria-label="Admin Dashboard"
              title="Admin Dashboard Portal"
              className="p-2.5 rounded-xl glass-pill text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 transition shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline font-mono text-[11px]">Admin</span>
            </button>

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-2.5 rounded-xl glass-pill text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 transition shadow-sm cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

          {/* Copyright notice */}
          <div className="text-center sm:text-right font-mono text-slate-400 text-[11px]">
            © {new Date().getFullYear()} {profile.name || 'Kavisri A'}. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};


