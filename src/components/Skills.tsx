import React from 'react';
import { motion } from 'motion/react';
import { Code, Globe, Database, BarChart2, Sparkles, Cpu } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { SkillIcon } from './SkillIcon';

const getCategoryIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('programming') || t.includes('language')) {
    return <Code className="w-5 h-5 text-cyan-400" />;
  }
  if (t.includes('web') || t.includes('frontend') || t.includes('fullstack')) {
    return <Globe className="w-5 h-5 text-sky-400" />;
  }
  if (t.includes('database') || t.includes('sql')) {
    return <Database className="w-5 h-5 text-indigo-400" />;
  }
  if (t.includes('data') || t.includes('analytics') || t.includes('power bi')) {
    return <BarChart2 className="w-5 h-5 text-amber-400" />;
  }
  if (t.includes('ai') || t.includes('machine learning') || t.includes('emerging')) {
    return <Sparkles className="w-5 h-5 text-purple-400" />;
  }
  return <Cpu className="w-5 h-5 text-cyan-400" />;
};

export const Skills: React.FC = () => {
  const { skillCategories = [] } = useCMS();

  // Filter out any unpublished categories or empty ones
  const publishedCategories = (skillCategories || []).filter(cat => cat && cat.is_published !== false);

  return (
    <section id="skills" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 border border-cyan-500/30">
            <Cpu className="w-3.5 h-3.5" />
            <span>Core Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Skills
          </h2>
          <p className="text-slate-300 mt-2 max-w-2xl text-sm sm:text-base">
            Structured skill areas developed through coursework, practical internships, and software development projects.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full mt-3"></div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedCategories.map((category, index) => {
            const isAI = category.title.includes('AI') || category.title.includes('Emerging');
            const skillsList = (category.skills || []).filter(s => s.is_published !== false);

            return (
              <motion.div
                key={category.id || category.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.28, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-2xl p-6 transition-colors duration-200 glass-panel glass-panel-hover flex flex-col justify-between ${
                  isAI ? 'md:col-span-2 lg:col-span-2 border-purple-500/30 bg-purple-950/20' : ''
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl glass-subcard">
                        {getCategoryIcon(category.title)}
                      </div>
                      <h3 className="font-bold text-white text-base sm:text-lg">
                        {category.title}
                      </h3>
                    </div>
                    {isAI && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wide bg-purple-500/20 text-purple-200 border border-purple-500/40 animate-pulse">
                        EXPLORING AREA
                      </span>
                    )}
                  </div>

                  {/* Skills Tag Pills */}
                  <div className="flex flex-wrap gap-2.5">
                    {skillsList.map((skill) => (
                      <motion.div
                        key={skill.name}
                        whileHover={{ scale: 1.04, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                        className={`group px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition flex items-center gap-2 cursor-default ${
                          skill.isExploring
                            ? 'bg-purple-900/30 text-purple-200 border border-purple-500/30 hover:border-purple-400 backdrop-blur-sm shadow-sm shadow-purple-500/10'
                            : 'glass-pill text-slate-200 hover:border-cyan-400/50 hover:text-white hover:bg-white/[0.08] shadow-sm'
                        }`}
                      >
                        <div className="p-0.5 rounded flex items-center justify-center shrink-0">
                          <SkillIcon name={skill.name} className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110 drop-shadow-sm" />
                        </div>
                        <span className="tracking-tight">{skill.name}</span>
                        {skill.isExploring && (
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-500/25 text-purple-200 ml-0.5 border border-purple-400/30">
                            New
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Subtext info */}
                <div className="mt-6 pt-3.5 border-t border-white/[0.08] text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>{skillsList.length} core items</span>
                  <span className="text-slate-400">{isAI ? 'Active Learning Horizon' : 'Hands-on Tested'}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
