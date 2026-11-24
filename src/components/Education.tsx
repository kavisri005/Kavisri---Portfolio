import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, MapPin, Calendar, BookCheck, School } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const Education: React.FC = () => {
  const { education } = useCMS();

  const publishedEducation = education.filter(edu => edu.is_published !== false);

  return (
    <section id="education" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 border border-cyan-500/30">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education
          </h2>
          <p className="text-slate-300 mt-2 max-w-2xl text-sm sm:text-base">
            Formal foundations in Computer Science, engineering fundamentals, and high school academics.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full mt-3"></div>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {publishedEducation.map((item, index) => {
            const isCollege = index === 0 || item.degree.toLowerCase().includes('b.e.') || item.degree.toLowerCase().includes('engineering');
            const scoreVal = item.score || item.cgpa;
            const scoreLbl = item.score_label || 'CGPA';

            return (
              <motion.div
                key={item.id || item.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 glass-panel glass-panel-hover ${
                  isCollege ? 'border-cyan-500/30' : ''
                }`}
              >
                <div>
                  {/* Top Badge & Duration */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
                        {isCollege ? <GraduationCap className="w-5 h-5" /> : <School className="w-5 h-5" />}
                      </div>
                      <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider font-semibold">
                        {isCollege ? 'Undergraduate Degree' : 'Higher Secondary Schooling'}
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-mono glass-pill text-slate-300 flex items-center gap-1.5 shadow-sm">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.period}
                    </span>
                  </div>

                  {/* Degree Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {item.degree}
                  </h3>

                  {/* Institution & Location */}
                  <p className="text-slate-300 font-medium text-sm sm:text-base mb-1">
                    {item.institution}
                  </p>
                  
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Score / Status Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  {scoreVal ? (
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-slate-400 font-mono">Academic Standing:</span>
                      <span className="text-sm font-bold text-emerald-300 font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                        {scoreLbl} {scoreVal}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                      <BookCheck className="w-4 h-4 text-cyan-400" />
                      <span>{item.status || 'Higher Secondary Completed'}</span>
                    </div>
                  )}

                  <span className="text-[11px] font-mono text-slate-400">
                    {item.status || (isCollege ? 'Current' : 'Completed')}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
