import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Upload, 
  Download, 
  CheckCircle2, 
  Calendar, 
  HardDrive, 
  ExternalLink, 
  Eye, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const AdminResume: React.FC = () => {
  const { resumeData, updateResumeData, uploadResumeFile } = useCMS();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setIsUploading(true);
    try {
      await uploadResumeFile(file);
    } finally {
      setIsUploading(false);
    }
  };

  const handleTogglePublish = async () => {
    await updateResumeData({ is_published: !resumeData.is_published });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-2 border border-cyan-500/20">
            <FileText className="w-3.5 h-3.5" />
            <span>Document Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Resume & CV Management
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Upload, update, and manage your downloadable PDF resume file for recruiters and hiring managers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Current Active Resume */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Active Resume Record</span>
              </h3>

              <button
                onClick={handleTogglePublish}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition ${
                  resumeData.is_published
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}
              >
                {resumeData.is_published ? '● Published on Portfolio' : '○ Draft / Hidden'}
              </button>
            </div>

            {/* Document Details Card */}
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">
                    {resumeData.filename || 'Kavisri_A_Resume.pdf'}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{resumeData.upload_date || 'Current Version'}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <HardDrive className="w-3 h-3 text-slate-500" />
                      <span>{resumeData.size || '133 KB'}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <a
                  href={resumeData.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={resumeData.filename || 'Kavisri_A_Resume.pdf'}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* Upload New Document Box */}
            <div className="p-6 rounded-xl border-2 border-dashed border-slate-800 hover:border-cyan-500/40 bg-slate-900/40 flex flex-col items-center justify-center text-center space-y-3 transition">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <span className="text-sm font-bold text-white block">
                  Upload Updated Resume PDF
                </span>
                <span className="text-xs text-slate-400 mt-0.5 block">
                  Files are saved directly and made available instantly for public download.
                </span>
              </div>

              <label className="cursor-pointer px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-2 transition">
                <span>{isUploading ? 'Uploading Document...' : 'Select PDF File'}</span>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>

              <span className="text-[10px] font-mono text-slate-500">
                PDF format up to 10MB supported
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Information & Guidelines */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-3 text-xs text-slate-300 leading-relaxed">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80 pb-2">
              Recruiter Best Practices
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                <span>Keep resume filenames clean and standardized (e.g. <code>Kavisri_A_Resume.pdf</code>).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                <span>Keep the 8.33/10 CGPA, project details, and technical skills aligned with the attached resume.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                <span>Verify that links inside the PDF match your GitHub (<code>github.com/kavisri005</code>) and LinkedIn.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
