import React from 'react';
import { 
  LayoutDashboard, 
  FolderGit2, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Trophy, 
  Compass, 
  FileText, 
  ExternalLink, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Radio
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useRouter } from '../../context/RouterContext';

export const AdminDashboard: React.FC = () => {
  const { 
    profile, 
    projects, 
    skillCategories, 
    experiences, 
    education, 
    certifications, 
    achievements, 
    exploring, 
    resumeData, 
    isSupabaseConnected 
  } = useCMS();
  
  const { navigate } = useRouter();

  const safeSkillCats = skillCategories || [];
  const safeProjects = projects || [];
  const safeExp = experiences || [];
  const safeCert = certifications || [];
  const safeAch = achievements || [];
  const safeExploring = exploring || [];

  const totalSkills = safeSkillCats.reduce((acc, cat) => acc + (cat?.skills?.length || 0), 0);
  const publishedProjects = safeProjects.filter(p => p.is_published !== false);
  const draftProjects = safeProjects.filter(p => p.is_published === false);

  const stats = [
    { label: 'Projects', value: safeProjects.length, subtext: `${publishedProjects.length} live, ${draftProjects.length} drafts`, icon: FolderGit2, color: 'text-cyan-400', path: '/admin/projects' },
    { label: 'Skill Items', value: totalSkills, subtext: `${safeSkillCats.length} categories`, icon: Code2, color: 'text-sky-400', path: '/admin/skills' },
    { label: 'Experiences', value: safeExp.length, subtext: 'Internships & journey', icon: Briefcase, color: 'text-emerald-400', path: '/admin/experience' },
    { label: 'Certifications', value: safeCert.length, subtext: 'Verified credentials', icon: Award, color: 'text-amber-400', path: '/admin/certifications' },
    { label: 'Achievements', value: safeAch.length, subtext: 'Honors & activities', icon: Trophy, color: 'text-indigo-400', path: '/admin/achievements' },
    { label: 'Exploring', value: safeExploring.length, subtext: 'Forward-looking focus', icon: Compass, color: 'text-purple-400', path: '/admin/exploring' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0e1624] via-[#0b101a] to-[#090c12] border border-cyan-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-300 text-xs font-mono border border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CONTENT MANAGEMENT ENGINE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, {profile.name || 'Kavisri A'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Your portfolio CMS is fully synchronized. Manage your projects, skills, certifications, and live website visibility in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/admin/projects/new')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>

            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition"
            >
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <span>View Live Website</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              onClick={() => navigate(stat.path)}
              className="p-4 sm:p-5 rounded-2xl bg-[#0e131d] border border-slate-800 hover:border-cyan-500/40 transition cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mb-0.5 font-mono">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-300">{stat.label}</div>
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-3 truncate">
                {stat.subtext}
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout: Quick Actions & Status Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Recent Projects & Quick Editors */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Projects Quick Overview */}
          <div className="p-6 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-white text-sm">Featured Projects Catalog</h3>
              </div>
              <button
                onClick={() => navigate('/admin/projects')}
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>View All ({projects.length})</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {projects.slice(0, 4).map((proj, idx) => (
                <div
                  key={proj.id}
                  onClick={() => navigate(`/admin/projects/${proj.id}`)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition">
                        {proj.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {proj.category} • {(proj.technologies || []).slice(0, 3).join(', ')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      proj.is_published ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {proj.is_published ? 'Live' : 'Draft'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => navigate('/admin/profile')}
              className="p-5 rounded-2xl bg-[#0e131d] border border-slate-800 hover:border-cyan-500/40 transition cursor-pointer group"
            >
              <h4 className="font-bold text-white text-xs sm:text-sm mb-1 group-hover:text-cyan-300">Edit Profile &amp; Bio</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Update headlines, narrative, and contact details.</p>
            </div>

            <div
              onClick={() => navigate('/admin/skills')}
              className="p-5 rounded-2xl bg-[#0e131d] border border-slate-800 hover:border-cyan-500/40 transition cursor-pointer group"
            >
              <h4 className="font-bold text-white text-xs sm:text-sm mb-1 group-hover:text-cyan-300">Manage Skills</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Organize categories and technical skill pills.</p>
            </div>

            <div
              onClick={() => navigate('/admin/resume')}
              className="p-5 rounded-2xl bg-[#0e131d] border border-slate-800 hover:border-cyan-500/40 transition cursor-pointer group"
            >
              <h4 className="font-bold text-white text-xs sm:text-sm mb-1 group-hover:text-cyan-300">Resume &amp; PDF</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Manage resume downloads and attachments.</p>
            </div>
          </div>

        </div>

        {/* Right Column: Database & System Status */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Storage & Backend Status */}
          <div className="p-6 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                System Status
              </span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Operational</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Storage Driver</span>
                <span className="font-mono text-cyan-300 font-semibold">Supabase + LocalStore</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Database Connection</span>
                <span className="font-mono text-emerald-400">Active</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Draft Protection</span>
                <span className="font-mono text-slate-300">Enabled</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Resume Attachment</span>
                <span className="font-mono text-cyan-300 truncate max-w-[120px]">
                  {resumeData.file_name || 'Generated TXT/PDF'}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/admin/settings')}
              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono transition"
            >
              System &amp; Database Settings →
            </button>
          </div>

          {/* Quick Profile Summary */}
          <div className="p-6 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase font-mono tracking-wider text-cyan-400">
              Live Profile Header
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
              <div className="font-bold text-white">{profile.name}</div>
              <div className="text-cyan-400 font-mono text-[11px]">{profile.title}</div>
              <div className="text-slate-400 text-[11px]">{profile.email}</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
