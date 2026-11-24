import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Code2, 
  Database, 
  BarChart3, 
  Globe, 
  Sparkles, 
  Brain, 
  Cpu, 
  Layers, 
  Braces, 
  Terminal,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

const getCertIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('python')) return <Terminal className="w-4 h-4 text-cyan-400" />;
  if (n.includes('java') && !n.includes('script')) return <Code2 className="w-4 h-4 text-cyan-400" />;
  if (n.includes('html')) return <Globe className="w-4 h-4 text-sky-400" />;
  if (n.includes('css')) return <Layers className="w-4 h-4 text-teal-400" />;
  if (n.includes('javascript') || n.includes('js')) return <Braces className="w-4 h-4 text-amber-300" />;
  if (n.includes('sql') || n.includes('database')) return <Database className="w-4 h-4 text-indigo-400" />;
  if (n.includes('power bi') || n.includes('powerbi')) return <BarChart3 className="w-4 h-4 text-yellow-400" />;
  if (n.includes('literacy')) return <Brain className="w-4 h-4 text-cyan-300" />;
  if (n.includes('ai fundamentals') || n.includes('ai')) return <Cpu className="w-4 h-4 text-cyan-400" />;
  if (n.includes('lifelong') || n.includes('professional')) return <Sparkles className="w-4 h-4 text-emerald-400" />;
  return <Award className="w-4 h-4 text-cyan-400" />;
};

export const Certifications: React.FC = () => {
  const { certifications } = useCMS();

  const publishedCertifications = certifications.filter(cert => cert.is_published !== false);

  return (
    <section id="certifications" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 border border-cyan-500/30">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Knowledge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications ({publishedCertifications.length})
          </h2>
          <p className="text-slate-300 mt-2 max-w-2xl text-sm sm:text-base">
            Certificates in programming, web technologies, databases, prompt engineering, AI fundamentals, and professional skills.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full mt-3"></div>
        </div>

        {/* Certifications Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {publishedCertifications.map((cert, index) => {
            const certTitle = cert.title || cert.name || 'Certified Skill';
            const verifyUrl = cert.verification_url || cert.verificationUrl;

            return (
              <motion.div
                key={cert.id || certTitle}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="p-5 rounded-2xl glass-panel glass-panel-hover group flex flex-col justify-between h-full relative"
              >
                <div>
                  {/* Top Bar: Icon + Verification / Check status */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="p-2 rounded-xl glass-subcard text-slate-200 group-hover:scale-105 group-hover:border-cyan-500/40 transition-all duration-200">
                      {getCertIcon(certTitle)}
                    </div>
                    
                    {verifyUrl ? (
                      <a
                        href={verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Verify ${certTitle} certificate`}
                        className="p-1.5 rounded-lg glass-pill text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition"
                        title="Verify Certificate"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 group-hover:text-cyan-400/80 transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400/80" />
                      </div>
                    )}
                  </div>

                  {/* Certification Name */}
                  <h3 className="font-bold text-white text-sm leading-snug group-hover:text-cyan-300 transition-colors">
                    {certTitle}
                  </h3>

                  {cert.issuer && (
                    <span className="text-[11px] text-slate-400 font-mono block mt-1">
                      {cert.issuer}
                    </span>
                  )}
                </div>

                {/* Bottom Subtle Accent Bar */}
                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-[10px] tracking-wider uppercase text-slate-400 group-hover:text-slate-300 transition-colors">
                    Certified
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/70 group-hover:bg-cyan-400 transition-colors shadow-sm"></span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
