import React from 'react';
import { motion } from 'motion/react';
import { 
  FolderGit2, 
  Code2, 
  Briefcase, 
  Award, 
  Trophy, 
  Compass, 
  ArrowUpRight, 
  Plus, 
  Radio, 
  Clock, 
  Sparkles, 
  FileText,
  Eye,
  Layers,
  Database,
  User,
  Settings
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useRouter } from '../../context/RouterContext';

export const AdminDashboardOverview: React.FC = () => {
  const { 
    profile, 
    projects, 
    skills, 
    experiences, 
    education, 
    certifications, 
    achievements, 
    exploring, 
    lastUpdated,
    isSupabaseConnected 
  } = useCMS();
  const { navigate } = useRouter();

  const safeProjects = projects || [];
  const safeSkills = skills || [];
  const safeExp = experiences || [];
  const safeCert = certifications || [];
  const safeAch = achievements || [];

  const publishedProjectsCount = safeProjects.filter(p => p.is_published).length;
  const publishedSkillsCount = safeSkills.filter(s => s.is_published).length;
  const publishedExpCount = safeExp.filter(e => e.is_published).length;
  const publishedCertCount = safeCert.filter(c => c.is_published).length;
  const publishedAchCount = safeAch.filter(a => a.is_published).length;

  const statCards = [
    {
      title: 'Published Projects',
      count: `${publishedProjectsCount} / ${safeProjects.length}`,
      subtext: `${safeProjects.filter(p => p.featured).length} Featured`,
      icon: FolderGit2,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
      link: '/admin/projects',
    },
    {
      title: 'Technical Skills',
      count: `${publishedSkillsCount}`,
      subtext: '4 Key Categories',
      icon: Code2,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20',
      link: '/admin/skills',
    },
    {
      title: 'Experience Entries',
      count: `${publishedExpCount}`,
      subtext: 'Internship Milestones',
      icon: Briefcase,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      link: '/admin/experience',
    },
    {
      title: 'Certifications',
      count: `${publishedCertCount}`,
      subtext: 'Verified Credentials',
      icon: Award,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      link: '/admin/certifications',
    },
    {
      title: 'Achievements',
      count: `${publishedAchCount}`,
      subtext: 'Symposiums & Events',
      icon: Trophy,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
      link: '/admin/achievements',
    },
  ];

  const formatTimestamp = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString(undefined, { 
        dateStyle: 'medium', 
        timeStyle: 'short' 
      });
    } catch {
      return 'Live Session';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-cyan-300 text-xs font-mono mb-3 border border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kavisri A CMS Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Portfolio Control Center
            </h1>
            <p className="text-slate-300 mt-1.5 text-xs sm:text-sm max-w-xl leading-relaxed">
              Manage projects, technical skills, certifications, timeline experiences, and profile metadata. Changes synchronize in real time with the live public portfolio.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <button
              onClick={() => navigate('/admin/projects/new')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-pill hover:border-cyan-500/40 text-slate-200 text-xs font-mono transition"
            >
              <Eye className="w-4 h-4 text-cyan-300" />
              <span>Preview Portfolio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Status Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Status */}
        <div className="p-4.5 rounded-2xl glass-panel flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Portfolio Status</span>
              <span className="text-sm font-bold text-emerald-300">● Live &amp; Published</span>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400">Public (/)</span>
        </div>

        {/* Last Updated */}
        <div className="p-4.5 rounded-2xl glass-panel flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Last Database Update</span>
              <span className="text-xs sm:text-sm font-semibold text-white truncate max-w-[180px] block">
                {formatTimestamp(lastUpdated)}
              </span>
            </div>
          </div>
        </div>

        {/* Database backend */}
        <div className="p-4.5 rounded-2xl glass-panel flex items-center justify-between sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Storage Engine</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-200">
                {isSupabaseConnected ? 'Supabase PostgreSQL' : 'Local CMS Sync Active'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div>
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
          Content Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                whileHover={{ y: -3 }}
                onClick={() => navigate(card.link)}
                className="p-5 sm:p-6 rounded-3xl glass-panel glass-panel-hover cursor-pointer group flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-2xl border ${card.bg}`}>
                    <Icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 transition" />
                </div>
                <div className="mt-4">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {card.count}
                  </span>
                  <span className="text-xs font-semibold text-slate-200 block mt-1">
                    {card.title}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                    {card.subtext}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Access Action Shortcuts */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-4">
          Quick Management Shortcuts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Profile Bio', path: '/admin/profile', icon: User },
            { label: 'Skills Grid', path: '/admin/skills', icon: Code2 },
            { label: 'Add Project', path: '/admin/projects/new', icon: FolderGit2 },
            { label: 'Certifications', path: '/admin/certifications', icon: Award },
            { label: 'Upload Resume', path: '/admin/resume', icon: FileText },
            { label: 'Settings', path: '/admin/settings', icon: Settings },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <button
                key={i}
                onClick={() => navigate(action.path)}
                className="p-4 rounded-2xl glass-subcard hover:border-cyan-500/40 text-slate-300 hover:text-white flex flex-col items-center justify-center gap-2 text-center transition group hover:-translate-y-0.5"
              >
                <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition" />
                <span className="text-xs font-semibold">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
