import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Award, Presentation, Code, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const Achievements: React.FC = () => {
  const { achievements } = useCMS();

  const publishedAchievements = achievements.filter(ach => ach.is_published !== false);

  return (
    <section id="achievements" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 border border-cyan-500/30">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors &amp; Participation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Achievements &amp; Activities
          </h2>
          <p className="text-slate-300 mt-2 max-w-2xl text-sm sm:text-base">
            Active engagement in national symposiums, technical presentations, and inter-collegiate coding challenges.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full mt-3"></div>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publishedAchievements.map((achievement, index) => {
            const isSymposium = index === 0 || achievement.tag?.toLowerCase().includes('symposium');
            const tagVal = achievement.tag || (isSymposium ? 'National Symposium' : 'Technical Events');

            return (
              <motion.div
                key={achievement.id || achievement.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.15 }}
                className="rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xl relative overflow-hidden group glass-panel glass-panel-hover"
              >
                {/* Top Icon & Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 shadow-sm">
                    {isSymposium ? <Award className="w-6 h-6" /> : <Presentation className="w-6 h-6" />}
                  </div>
                  <span className="text-xs font-mono px-3.5 py-1 rounded-full glass-pill text-cyan-300 border border-cyan-500/30">
                    {tagVal}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {achievement.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed glass-subcard p-4.5 rounded-2xl mb-4">
                  {achievement.description}
                </p>

                {/* Key takeaways */}
                <div className="flex flex-wrap gap-2 text-xs text-slate-300 pt-2 border-t border-white/[0.08] font-mono">
                  {isSymposium ? (
                    <>
                      <span className="flex items-center gap-1.5 glass-pill px-2.5 py-1 rounded-lg text-slate-300"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Multi-Domain Contribution</span>
                      <span className="flex items-center gap-1.5 glass-pill px-2.5 py-1 rounded-lg text-slate-300"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Technical Symposium</span>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center gap-1.5 glass-pill px-2.5 py-1 rounded-lg text-slate-300"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Paper Presentations</span>
                      <span className="flex items-center gap-1.5 glass-pill px-2.5 py-1 rounded-lg text-slate-300"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Coding Competitions</span>
                      <span className="flex items-center gap-1.5 glass-pill px-2.5 py-1 rounded-lg text-slate-300"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Problem Solving</span>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
