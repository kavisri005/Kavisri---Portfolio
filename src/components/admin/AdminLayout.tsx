import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  User, 
  Code2, 
  FolderGit2, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Trophy, 
  Compass, 
  Share2, 
  FileText, 
  Settings, 
  ExternalLink, 
  LogOut, 
  Menu, 
  X, 
  Radio, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useRouter } from '../../context/RouterContext';
import { ToastContainer } from './ToastContainer';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { profile, logout, lastUpdated, isSupabaseConnected } = useCMS();
  const { currentPath, navigate, activeAdminTab } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scrolling on mobile when sidebar drawer is open
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

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', path: '/admin/profile', icon: User },
    { id: 'skills', label: 'Skills', path: '/admin/skills', icon: Code2 },
    { id: 'projects', label: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { id: 'experience', label: 'Experience', path: '/admin/experience', icon: Briefcase },
    { id: 'education', label: 'Education', path: '/admin/education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', path: '/admin/certifications', icon: Award },
    { id: 'achievements', label: 'Achievements', path: '/admin/achievements', icon: Trophy },
    { id: 'exploring', label: 'Currently Exploring', path: '/admin/exploring', icon: Compass },
    { id: 'social', label: 'Social Links', path: '/admin/social', icon: Share2 },
    { id: 'resume', label: 'Resume', path: '/admin/resume', icon: FileText },
    { id: 'settings', label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const formatLastUpdated = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Just now';
    }
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col lg:flex-row relative">
      {/* Ambient background light orbs for admin */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Toast Notification Mount */}
      <ToastContainer />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 glass-panel border-r border-white/10 sticky top-0 h-screen z-30 justify-between">
        <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar p-4">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3 px-3.5 py-3 mb-4 rounded-2xl glass-panel">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-sky-400 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shadow-cyan-500/20">
              K
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-white text-sm tracking-tight block truncate">
                {profile.name}
              </span>
              <span className="text-[10px] font-mono text-cyan-300 block truncate">
                CMS DASHBOARD
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeAdminTab === item.id || (item.id === 'projects' && currentPath.startsWith('/admin/projects'));

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/15'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.06] border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2 glass-panel">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl glass-pill hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-mono transition group"
          >
            <span className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>View Portfolio</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition" />
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl hover:bg-rose-500/15 text-slate-400 hover:text-rose-300 text-xs font-semibold transition border border-transparent hover:border-rose-500/20"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-400" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Topbar */}
        <header className="h-16 glass-panel border-b border-white/10 sticky top-0 z-20 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl glass-pill text-slate-400 hover:text-white transition"
              aria-label="Toggle admin menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 hidden sm:inline">
                KAVISRI CMS /
              </span>
              <h2 className="text-sm sm:text-base font-bold text-white capitalize tracking-tight">
                {activeAdminTab === 'dashboard' ? 'Overview' : activeAdminTab.replace('-', ' ')}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live</span>
            </div>

            {/* Last Updated Indicator */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-slate-300 text-[11px] font-mono">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Updated {formatLastUpdated(lastUpdated)}</span>
            </div>

            {/* View Live button */}
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-xl glass-pill hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition"
              title="View Public Portfolio"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Full-Height Responsive Slide-In Mobile Admin Navigation Drawer */}
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

              {/* Slide-In Drawer Container */}
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="fixed top-0 left-0 bottom-0 w-[290px] max-w-[85vw] h-[100dvh] bg-[#090e18]/98 border-r border-white/10 backdrop-blur-2xl z-50 flex flex-col justify-between overflow-y-auto custom-scrollbar p-4 shadow-2xl lg:hidden"
              >
                {/* Header & Logo */}
                <div>
                  <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-sky-400 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shadow-cyan-500/20">
                        K
                      </div>
                      <div className="min-w-0">
                        <span className="font-extrabold text-white text-sm tracking-tight block truncate">
                          {profile.name || 'Kavisri A'}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-300 block truncate">
                          CMS DASHBOARD
                        </span>
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

                  {/* Vertically Scrollable Navigation Items */}
                  <nav className="space-y-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeAdminTab === item.id || (item.id === 'projects' && currentPath.startsWith('/admin/projects'));
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.path)}
                          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition text-left ${
                            isActive
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                              : 'text-slate-400 hover:text-white hover:bg-white/[0.06] border border-transparent'
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Drawer Footer Actions */}
                <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
                  <button
                    onClick={() => handleNavClick('/')}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl glass-pill hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-mono transition"
                  >
                    <span className="flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span>View Portfolio</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl hover:bg-rose-500/15 text-slate-400 hover:text-rose-300 text-xs font-semibold transition border border-transparent hover:border-rose-500/20"
                  >
                    <LogOut className="w-3.5 h-3.5 text-slate-400" />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Dynamic CMS View Mount */}
        <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
