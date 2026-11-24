import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, Mail, Phone, MapPin, Linkedin, Github, CheckCircle2, FileDown } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { SkillIcon } from './SkillIcon';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { 
    profile, 
    education, 
    experiences, 
    skillCategories, 
    projects, 
    certifications, 
    achievements, 
    socialLinks,
    resumeData 
  } = useCMS();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const safeSocialLinks = socialLinks || [];
  const safeProfile = profile || {};
  const githubLink = safeSocialLinks.find(s => s.platform.toLowerCase().includes('github'))?.url || safeProfile.github_url || 'https://github.com/kavisri005';
  const linkedinLink = safeSocialLinks.find(s => s.platform.toLowerCase().includes('linkedin'))?.url || safeProfile.linkedin_url || 'https://linkedin.com/in/kavisri-a';
  const emailVal = safeProfile.email || 'a.kavisrii@gmail.com';
  const phoneVal = safeProfile.phone || '+91 93617 83617';
  const locationVal = safeProfile.location || 'Salem, India';

  const publishedEducation = (education || []).filter(e => e.is_published !== false);
  const publishedExperiences = (experiences || []).filter(e => e.is_published !== false);
  const publishedSkills = (skillCategories || []).filter(c => c.is_published !== false);
  const publishedProjects = (projects || []).filter(p => p.is_published !== false);
  const publishedCertifications = (certifications || []).filter(c => c.is_published !== false);
  const publishedAchievements = (achievements || []).filter(a => a.is_published !== false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadUploadedFile = () => {
    if (resumeData.file_url) {
      window.open(resumeData.file_url, '_blank');
      return;
    }
    handleDownloadText();
  };

  const handleDownloadText = () => {
    const textContent = `=====================================================
${profile.name || 'KAVISRI A'} — ${profile.title || 'Software Developer'}
${profile.positioning || 'Full-Stack Web Development | APIs | Database Systems'}
=====================================================
Email: ${emailVal}
Phone: ${phoneVal}
Location: ${locationVal}
LinkedIn: ${linkedinLink}
GitHub: ${githubLink}

SUMMARY
-----------------------------------------------------
${profile.short_bio || 'Computer Science and Engineering undergraduate passionate about software development, problem-solving, data, and emerging AI technologies.'}

EDUCATION
-----------------------------------------------------
${publishedEducation.map(edu => `* ${edu.degree}
  ${edu.institution}, ${edu.location} (${edu.period})
  ${edu.score ? `Score: ${edu.score}` : ''}`).join('\n\n')}

INTERNSHIPS & EXPERIENCE
-----------------------------------------------------
${publishedExperiences.map(exp => `* ${exp.role} — ${exp.company}, ${exp.location} (${exp.year})
  ${(exp.responsibilities || []).map(r => `  - ${r}`).join('\n')}`).join('\n\n')}

TECHNICAL SKILLS
-----------------------------------------------------
${publishedSkills.map(cat => `* ${cat.title}: ${(cat.skills || []).map(s => s.name + (s.isExploring ? ' (Exploring)' : '')).join(', ')}`).join('\n')}

FEATURED PROJECTS
-----------------------------------------------------
${publishedProjects.map(p => `* ${p.title} [${p.category}]
  Tech: ${(p.technologies || []).join(', ')}
  Description: ${p.description}
  Key Contributions:
  ${(p.keyContributions || p.key_contributions || []).map(c => `  - ${c}`).join('\n')}`).join('\n\n')}

CERTIFICATIONS
-----------------------------------------------------
${publishedCertifications.map(c => `* ${c.title || c.name}`).join('\n')}

ACHIEVEMENTS & ACTIVITIES
-----------------------------------------------------
${publishedAchievements.map(a => `* ${a.title}: ${a.description}`).join('\n')}
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Kavisri_A_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div 
        id="resume-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="resume-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22 }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col glass-panel rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header Controls */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 glass-panel sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <h3 className="text-sm font-semibold text-white tracking-wide">
                {profile.name || 'Kavisri A'} — Professional Resume
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {resumeData.file_url ? (
                <button
                  onClick={handleDownloadUploadedFile}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-medium transition"
                  title="Download Attached PDF Resume"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download PDF ({resumeData.file_name || 'Resume.pdf'})</span>
                </button>
              ) : null}

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-pill text-xs text-slate-200 font-medium transition hover:border-white/20"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>
              <button
                onClick={handleDownloadText}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-medium transition"
                title="Download Plain Text Resume"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .txt</span>
              </button>
              <button
                onClick={onClose}
                aria-label="Close resume view"
                className="p-1.5 rounded-xl glass-pill text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Body */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-300 font-sans text-xs sm:text-sm">
            {/* Header Block */}
            <div className="border-b border-white/10 pb-5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                {profile.name || 'Kavisri A'}
              </h1>
              <p className="text-cyan-300 font-medium text-sm mb-3">
                {profile.title || 'Software Developer'} • {profile.positioning || 'Full-Stack Web Development | APIs | Database Systems'}
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-cyan-400" /> {emailVal}</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-cyan-400" /> {phoneVal}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-cyan-400" /> {locationVal}</span>
                <span className="flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5 text-cyan-400" /> {linkedinLink}</span>
                <span className="flex items-center gap-1.5"><Github className="w-3.5 h-3.5 text-cyan-400" /> {githubLink}</span>
              </div>
            </div>

            {/* Profile Summary */}
            <div>
              <h2 className="text-xs uppercase tracking-wider font-bold text-slate-400 border-b border-white/10 pb-1 mb-2.5">
                Summary
              </h2>
              <p className="text-slate-200 leading-relaxed text-xs sm:text-sm glass-subcard p-3.5 rounded-xl">
                {profile.short_bio || 'Computer Science and Engineering undergraduate passionate about software development, problem-solving, data, and emerging AI technologies.'}
              </p>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs uppercase tracking-wider font-bold text-slate-400 border-b border-white/10 pb-1 mb-2.5">
                Education
              </h2>
              <div className="space-y-3">
                {publishedEducation.map((edu, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 glass-subcard p-3 rounded-xl">
                    <div>
                      <div className="font-semibold text-white text-sm">{edu.degree}</div>
                      <div className="text-slate-400 text-xs">{edu.institution}, {edu.location}</div>
                    </div>
                    <div className="text-xs text-right">
                      <span className="text-slate-400">{edu.period}</span>
                      {edu.score && (
                        <div className="text-cyan-300 font-semibold">{edu.score_label || 'CGPA'}: {edu.score}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internship Experience */}
            <div>
              <h2 className="text-xs uppercase tracking-wider font-bold text-slate-400 border-b border-white/10 pb-1 mb-2.5">
                Internship Experience
              </h2>
              <div className="space-y-4">
                {publishedExperiences.map((exp, idx) => (
                  <div key={idx} className="space-y-1.5 glass-subcard p-3.5 rounded-xl">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5">
                      <div className="font-semibold text-white text-sm">{exp.role} — <span className="text-cyan-300">{exp.company}</span></div>
                      <div className="text-xs text-slate-400">{exp.location} | {exp.year}</div>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-1">
                      {(exp.responsibilities || []).map((resp, rIdx) => (
                        <li key={rIdx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-xs uppercase tracking-wider font-bold text-slate-400 border-b border-white/10 pb-1 mb-2.5">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {publishedSkills.map((cat, idx) => (
                  <div key={idx} className="glass-subcard p-3 rounded-xl">
                    <span className="font-semibold text-white block mb-2">{cat.title}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(cat.skills || []).map((s, sIdx) => (
                        <span key={sIdx} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-slate-200">
                          <SkillIcon name={s.name} className="w-3 h-3 shrink-0" />
                          <span>{s.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-xs uppercase tracking-wider font-bold text-slate-400 border-b border-white/10 pb-1 mb-2.5">
                Key Projects
              </h2>
              <div className="space-y-3">
                {publishedProjects.map((proj) => (
                  <div key={proj.id} className="space-y-1 glass-subcard p-3.5 rounded-xl">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                      <div className="font-semibold text-white text-sm">
                        {proj.title} <span className="text-xs text-cyan-300 font-normal">({proj.category})</span>
                      </div>
                      <div className="text-xs font-mono text-cyan-400/80">{(proj.technologies || []).join(', ')}</div>
                    </div>
                    <p className="text-xs text-slate-300">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Achievements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-subcard p-3.5 rounded-xl">
                <h2 className="text-xs uppercase tracking-wider font-bold text-slate-400 border-b border-white/10 pb-1 mb-2">
                  Certifications
                </h2>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {publishedCertifications.map((cert, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{cert.title || cert.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-subcard p-3.5 rounded-xl">
                <h2 className="text-xs uppercase tracking-wider font-bold text-slate-400 border-b border-white/10 pb-1 mb-2">
                  Achievements &amp; Activities
                </h2>
                <ul className="space-y-2 text-xs text-slate-300">
                  {publishedAchievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5"></span>
                      <span>{ach.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
