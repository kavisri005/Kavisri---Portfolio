import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderGit2, ArrowUpRight, CheckCircle2, Eye, Sparkles, ExternalLink, Code } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { Project } from '../types';
import { CampusFindMockup, EnergyDashboardMockup, EcommerceReturnsMockup } from './ProjectMockups';
import { ProjectModal } from './ProjectModal';
import { ProjectsSkeleton } from './Skeletons';

export const Projects: React.FC = () => {
  const { projects, isLoading } = useCMS();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Smooth perceived performance grace period for skeleton rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Filter only published projects
  const publishedProjects = projects.filter(p => p.is_published !== false);

  const renderCardMockup = (mockupType?: string, pTitle?: string) => {
    const type = mockupType || (pTitle?.toLowerCase().includes('campus') ? 'lost-and-found' : pTitle?.toLowerCase().includes('energy') ? 'energy-dashboard' : 'ecommerce-returns');
    switch (type) {
      case 'lost-and-found':
        return <CampusFindMockup />;
      case 'energy-dashboard':
        return <EnergyDashboardMockup />;
      case 'ecommerce-returns':
        return <EcommerceReturnsMockup />;
      default:
        return <CampusFindMockup />;
    }
  };

  const showSkeleton = isLoading || (isInitialLoad && publishedProjects.length === 0);

  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 border border-cyan-500/30">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Portfolio Highlights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="text-slate-300 mt-2 max-w-2xl text-sm sm:text-base">
            Practical projects built across software development, analytics and data.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full mt-3"></div>
        </div>

        {/* Project Cards Stack / Grid / Loading Skeleton */}
        {showSkeleton ? (
          <ProjectsSkeleton count={3} />
        ) : (
          <div className="space-y-12">
            {publishedProjects.map((project, index) => {
              const isReversed = index % 2 !== 0;
              const contributions = project.keyContributions || project.key_contributions || [];
              const technologies = project.technologies || [];

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="group rounded-3xl glass-panel glass-panel-hover p-6 sm:p-9 transition-colors duration-200 shadow-2xl"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                    
                    {/* Left Column: Project Details & Contributions */}
                    <div className={`lg:col-span-6 space-y-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                      
                      {/* Category pill & number indicator */}
                      <div className="flex items-center justify-between">
                        <span className="px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm">
                          {project.category}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          PROJECT 0{index + 1}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-mono rounded-lg glass-pill text-slate-200 hover:border-cyan-500/40 transition"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Key Contributions */}
                      {contributions.length > 0 && (
                        <div className="pt-2">
                          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                            Key Contributions:
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                            {contributions.map((contribution, cIdx) => (
                              <div key={cIdx} className="flex items-start gap-2 glass-subcard p-3 rounded-xl">
                                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                <span>{contribution}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      <div className="pt-3">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/60 font-semibold text-xs transition-all transform group-hover:translate-x-1 shadow-sm cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Project Architecture</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      </div>

                    </div>

                    {/* Right Column: Realistic Interactive Project Mockup */}
                    <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div 
                        onClick={() => setSelectedProject(project)}
                        className="cursor-pointer group/mockup rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md p-2 transition-all hover:border-cyan-500/40 hover:scale-[1.01] shadow-xl"
                      >
                        {renderCardMockup(project.mockupType || project.mockup_type, project.title)}
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
