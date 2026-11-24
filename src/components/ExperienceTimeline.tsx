import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Building2, MapPin, Calendar, CheckCircle2, Milestone } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { ExperienceSkeleton } from './Skeletons';

export const ExperienceTimeline: React.FC = () => {
  const { experiences, isLoading } = useCMS();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Smooth perceived performance grace period for skeleton rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const publishedExperiences = experiences.filter(exp => exp.is_published !== false);
  const showSkeleton = isLoading || (isInitialLoad && publishedExperiences.length === 0);

  return (
    <section id="experience" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 border border-cyan-500/30">
            <Milestone className="w-3.5 h-3.5" />
            <span>Practical Exposure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experience &amp; Journey
          </h2>
          <p className="text-slate-300 mt-2 text-sm sm:text-base">
            Learning through internships, practical training and hands-on experience.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full mt-3 mx-auto"></div>
        </div>

        {/* Timeline Container or Glass Skeleton */}
        {showSkeleton ? (
          <ExperienceSkeleton count={4} />
        ) : (
          <div className="relative">
            
            {/* Vertical glowing center line (Desktop) / Left line (Mobile) */}
            <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-sky-500 to-indigo-500/30 opacity-70" />

            <div className="space-y-12 sm:space-y-16">
              {publishedExperiences.map((exp, index) => {
                const isEven = index % 2 === 0;
                const respList = exp.responsibilities || [];

                return (
                  <div key={exp.id || index} className="relative flex flex-col md:flex-row items-center">
                    
                    {/* Timeline Node Icon (Center on desktop, left on mobile) */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full glass-panel border border-cyan-400/60 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/20 z-20">
                      <Briefcase className="w-4 h-4" />
                    </div>

                    {/* Card wrapper: Left or Right for desktop */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -16 : 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.3, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-3xl glass-panel glass-panel-hover p-6 sm:p-8 shadow-xl"
                      >
                        {/* Top Year & Type Tag */}
                        <div className={`flex items-center gap-2 mb-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 shadow-sm">
                            <Calendar className="w-3 h-3" />
                            {exp.year}
                          </span>
                          <span className="px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider glass-pill text-slate-300">
                            {exp.type || 'Internship'}
                          </span>
                        </div>

                        {/* Role & Company */}
                        <h3 className="text-xl font-bold text-white mb-1">
                          {exp.role}
                        </h3>

                        <div className={`flex items-center gap-3 text-xs text-slate-400 mb-4 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                          <span className="flex items-center gap-1 text-cyan-300 font-medium">
                            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                            {exp.company}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {exp.location}
                          </span>
                        </div>

                        {/* Responsibilities list */}
                        <div className="space-y-2 text-xs sm:text-sm text-slate-300 text-left">
                          {respList.map((resp, rIdx) => (
                            <div key={rIdx} className="flex items-start gap-2 glass-subcard p-2.5 rounded-xl">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
