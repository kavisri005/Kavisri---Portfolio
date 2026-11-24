import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, MapPin, Target, Sparkles, Terminal, BookOpen, User, CheckCircle2, Code2, Database, Laptop } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { profile } = useCMS();
  const { t, language } = useLanguage();

  const detailedBio = profile.detailed_bio && profile.detailed_bio.length > 0
    ? profile.detailed_bio
    : [
        "I am a Computer Science and Engineering student driven by building software solutions that solve real problems. My journey began with core programming logic in Python and Java, expanding into full-stack web architectures, relational database management, and modern data analytics.",
        "Through practical internships and hands-on projects, I have developed functional applications like CampusFind and Smart IoT Agriculture management, and performed analytics on industrial datasets like smart-home energy consumption and e-commerce return behaviors.",
        "I thrive on writing clean, maintainable code, understanding system architectures, and continuously mastering emerging AI technologies, prompt workflows, and automated pipelines to build impactful digital tools."
      ];

  const eduBrief = profile.education_brief || {
    degree: 'B.E. Computer Science and Engineering',
    institution: 'M.A.M. College of Engineering and Technology',
    cgpa: '8.33',
    location: 'Trichy, Tamil Nadu',
    focus: 'Software Engineering • Data • AI/ML',
    exploring: 'LLM Prompt Engineering, Applied AI & Cloud Workflows'
  };

  return (
    <section id="about" className="py-14 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-cyan-300 text-[11px] font-mono tracking-wider uppercase mb-2.5 border border-cyan-500/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Background &amp; Profile</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t('about.title')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 font-medium">
            {t('about.subtitle')}
          </p>
          <div className="w-10 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full mt-2.5"></div>
        </div>

        {/* Two-Column Merged Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Professional Narrative */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {detailedBio.map((paragraph, pIdx) => (
                <p 
                  key={pIdx}
                  className={pIdx === 0 
                    ? "glass-panel p-4 sm:p-5 rounded-2xl text-slate-200 text-sm sm:text-base border border-cyan-500/20" 
                    : "text-slate-300 leading-relaxed pl-1"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Pillars Indicator */}
            <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-white/10 text-xs font-mono">
              <div className="p-2.5 rounded-xl glass-card text-center hover:border-cyan-500/40 transition">
                <span className="text-cyan-300 block font-bold text-xs mb-0.5">Code</span>
                <span className="text-slate-400 text-[10px]">Web &amp; Logic</span>
              </div>
              <div className="p-2.5 rounded-xl glass-card text-center hover:border-sky-500/40 transition">
                <span className="text-sky-300 block font-bold text-xs mb-0.5">Data</span>
                <span className="text-slate-400 text-[10px]">Analytics &amp; SQL</span>
              </div>
              <div className="p-2.5 rounded-xl glass-card text-center hover:border-purple-500/40 transition">
                <span className="text-purple-300 block font-bold text-xs mb-0.5">AI/ML</span>
                <span className="text-slate-400 text-[10px]">Models &amp; Prompts</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Unified Academic & Engineering Credentials Card */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="h-full rounded-2xl glass-panel p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4 border border-cyan-500/20">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Academic &amp; Profile Summary</span>
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full glass-pill text-cyan-300 border border-cyan-500/30">
                  Class of 2027
                </span>
              </div>

              {/* Information Rows with Refined Typography */}
              <div className="space-y-2.5">
                {/* Education */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl glass-subcard border border-white/5">
                  <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-300 shrink-0 mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Undergraduate Degree</div>
                    <div className="text-xs sm:text-sm font-semibold text-white">{eduBrief.degree}</div>
                    <div className="text-[11px] text-slate-300">{eduBrief.institution}</div>
                  </div>
                </div>

                {/* CGPA */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl glass-subcard border border-white/5">
                  <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-300 shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Cumulative GPA</div>
                    <div className="text-xs sm:text-sm font-bold text-emerald-400">8.33 / 10.0 <span className="text-[10px] text-slate-400 font-normal ml-1">(Consistently Strong Performance)</span></div>
                  </div>
                </div>

                {/* Location & Availability */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl glass-subcard border border-white/5">
                  <div className="p-2 rounded-lg bg-sky-500/15 text-sky-300 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Base Location</div>
                    <div className="text-xs sm:text-sm font-semibold text-white">Trichy, Tamil Nadu, India</div>
                    <div className="text-[10px] text-slate-400">Open for on-site, hybrid, and remote roles</div>
                  </div>
                </div>

                {/* Focus Areas */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl glass-subcard border border-white/5">
                  <div className="p-2 rounded-lg bg-amber-500/15 text-amber-300 shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Engineering Focus</div>
                    <div className="text-xs sm:text-sm font-semibold text-white">Software Development • Data Analytics • GenAI</div>
                  </div>
                </div>
              </div>

              {/* Specialization Chips */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <div className="text-[10px] font-mono uppercase text-slate-400">Core Competencies</div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-mono">
                    Full-Stack Web
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-300 text-[10px] font-mono">
                    Python &amp; Java
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-mono">
                    SQL &amp; Analytics
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                    IoT &amp; AI
                  </span>
                </div>
              </div>

              {/* Card Footer Tag */}
              <div className="pt-2 text-center text-[10px] font-mono text-slate-400 border-t border-white/10 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                <span>Verified Undergraduate Profile • Anna University Affiliated</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
