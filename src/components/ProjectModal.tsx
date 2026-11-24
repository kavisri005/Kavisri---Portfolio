import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Layers, Cpu, Compass } from 'lucide-react';
import { Project } from '../types';
import { CampusFindMockup, EnergyDashboardMockup, EcommerceReturnsMockup } from './ProjectMockups';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const renderMockup = () => {
    switch (project.mockupType) {
      case 'lost-and-found':
        return <CampusFindMockup />;
      case 'energy-dashboard':
        return <EnergyDashboardMockup />;
      case 'ecommerce-returns':
        return <EcommerceReturnsMockup />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <div 
        id="project-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="project-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-9 shadow-2xl text-slate-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            id="close-project-modal-btn"
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-5 right-5 p-2.5 rounded-xl glass-pill text-slate-400 hover:text-white hover:border-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Title */}
          <div className="mb-4 pr-10">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 mb-2">
              {project.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono rounded-lg glass-pill text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Visual Mockup Preview */}
          <div className="mb-6">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" /> Interface Architecture &amp; Mockup
            </h4>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 p-2">
              {renderMockup()}
            </div>
          </div>

          {/* Description / Overview */}
          <div className="space-y-4 mb-6 text-sm text-slate-300 leading-relaxed">
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" /> Project Overview
              </h4>
              <p className="text-slate-200 glass-subcard p-4 rounded-xl">
                {project.description}
              </p>
            </div>

            {project.problem && (
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                  The Problem
                </h4>
                <p className="text-slate-300 glass-subcard p-4 rounded-xl">
                  {project.problem}
                </p>
              </div>
            )}

            {project.solution && (
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                  The Solution Approach
                </h4>
                <p className="text-slate-300 glass-subcard p-4 rounded-xl">
                  {project.solution}
                </p>
              </div>
            )}
          </div>

          {/* Key Contributions */}
          <div className="mb-6">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2.5 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Key Technical Contributions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.keyContributions.map((contribution, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl glass-subcard text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{contribution}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
            <span>Portfolio Project • Kavisri A</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl glass-pill hover:bg-white/[0.08] text-slate-200 font-medium transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
