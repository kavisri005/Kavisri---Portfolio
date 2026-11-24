import React, { useState, useEffect } from 'react';
import { 
  FolderGit2, 
  ArrowLeft, 
  Save, 
  Sparkles, 
  Plus, 
  X, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Layers, 
  Code, 
  Globe, 
  Github,
  Radio
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useRouter } from '../../context/RouterContext';
import { Project } from '../../types';

interface AdminProjectEditProps {
  projectId?: string;
}

export const AdminProjectEdit: React.FC<AdminProjectEditProps> = ({ projectId }) => {
  const { projects, saveProject } = useCMS();
  const { navigate } = useRouter();

  const isNew = !projectId || projectId === 'new';
  const existingProject = projects.find(p => p.id === projectId);

  const [formData, setFormData] = useState<Partial<Project>>({
    id: isNew ? `proj_${Date.now()}` : projectId,
    title: '',
    subtitle: '',
    category: 'Software Development',
    description: '',
    problemStatement: '',
    architecture: '',
    systemDesign: '',
    keyContributions: [''],
    technologies: [''],
    metrics: [''],
    mockupType: 'lost-and-found',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    is_published: true,
  });

  const [techInput, setTechInput] = useState('');
  const [metricInput, setMetricInput] = useState('');
  const [contributionInput, setContributionInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (existingProject) {
      setFormData({
        ...existingProject,
        keyContributions: existingProject.keyContributions || existingProject.key_contributions || [],
        technologies: existingProject.technologies || [],
        metrics: existingProject.metrics || [],
        mockupType: existingProject.mockupType || existingProject.mockup_type || 'lost-and-found',
      });
    }
  }, [existingProject]);

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      technologies: [...(prev.technologies || []), techInput.trim()]
    }));
    setTechInput('');
  };

  const handleRemoveTech = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: (prev.technologies || []).filter((_, i) => i !== idx)
    }));
  };

  const handleAddContribution = () => {
    if (!contributionInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      keyContributions: [...(prev.keyContributions || []), contributionInput.trim()]
    }));
    setContributionInput('');
  };

  const handleRemoveContribution = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      keyContributions: (prev.keyContributions || []).filter((_, i) => i !== idx)
    }));
  };

  const handleAddMetric = () => {
    if (!metricInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      metrics: [...(prev.metrics || []), metricInput.trim()]
    }));
    setMetricInput('');
  };

  const handleRemoveMetric = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      metrics: (prev.metrics || []).filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) return;

    setIsSaving(true);
    try {
      const projectPayload: Project = {
        id: formData.id || `proj_${Date.now()}`,
        title: formData.title || 'Untitled Project',
        subtitle: formData.subtitle || '',
        category: formData.category || 'Software Development',
        description: formData.description || '',
        problemStatement: formData.problemStatement || '',
        architecture: formData.architecture || '',
        systemDesign: formData.systemDesign || '',
        keyContributions: (formData.keyContributions || []).filter(c => c.trim().length > 0),
        technologies: (formData.technologies || []).filter(t => t.trim().length > 0),
        metrics: (formData.metrics || []).filter(m => m.trim().length > 0),
        mockupType: (formData.mockupType as any) || 'lost-and-found',
        liveUrl: formData.liveUrl || '',
        githubUrl: formData.githubUrl || '',
        featured: Boolean(formData.featured),
        is_published: formData.is_published !== undefined ? formData.is_published : true,
      };

      await saveProject(projectPayload);
      navigate('/admin/projects');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="text-[11px] font-mono text-cyan-400">
              {isNew ? 'NEW PROJECT' : `EDIT / ${formData.title || 'PROJECT'}`}
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              {isNew ? 'Create New Project' : formData.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : 'Save Project'}</span>
          </button>
        </div>
      </div>

      {/* Two Column Layout for Settings & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left main form */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* General info */}
          <div className="p-6 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-cyan-400">
              Basic Details
            </h2>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={formData.title || ''}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. CampusFind — Campus Lost & Found System"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Category
                </label>
                <select
                  value={formData.category || 'Software Development'}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                >
                  <option value="Software Development">Software Development</option>
                  <option value="Data & Analytics">Data & Analytics</option>
                  <option value="AI / ML">AI / ML</option>
                  <option value="Web Applications">Web Applications</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Subtitle / Role Tag
                </label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Full-Stack Web App"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Short Overview / Description
              </label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="High-level summary of what the system does and why it was built..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none resize-none"
              />
            </div>
          </div>

          {/* Architecture & Engineering Deep-Dive */}
          <div className="p-6 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-cyan-400">
              Technical Architecture &amp; System Design
            </h2>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Problem Statement
              </label>
              <textarea
                rows={2}
                value={formData.problemStatement || ''}
                onChange={e => setFormData({ ...formData, problemStatement: e.target.value })}
                placeholder="What challenges or inefficiencies did this project resolve?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                System Design &amp; Architecture
              </label>
              <textarea
                rows={3}
                value={formData.architecture || ''}
                onChange={e => setFormData({ ...formData, architecture: e.target.value })}
                placeholder="Describe component layering, state flow, API controllers, database relationships..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none resize-none font-mono"
              />
            </div>
          </div>

          {/* Key Contributions Builder */}
          <div className="p-6 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-cyan-400">
              Key Contributions &amp; Implementations
            </h2>

            <div className="space-y-2">
              {(formData.keyContributions || []).map((contrib, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs text-slate-200 flex-1">{contrib}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveContribution(idx)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={contributionInput}
                onChange={e => setContributionInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddContribution(); } }}
                placeholder="Add a key achievement / implementation point..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddContribution}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right sidebar options */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Publishing & Visibility Settings */}
          <div className="p-6 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-cyan-400">
              Visibility &amp; State
            </h2>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <span className="text-xs font-bold text-white block">Published</span>
                <span className="text-[11px] text-slate-400">Visible on public portfolio</span>
              </div>
              <input
                type="checkbox"
                checked={Boolean(formData.is_published)}
                onChange={e => setFormData({ ...formData, is_published: e.target.checked })}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <span className="text-xs font-bold text-white block">Featured</span>
                <span className="text-[11px] text-slate-400">Highlight with badge</span>
              </div>
              <input
                type="checkbox"
                checked={Boolean(formData.featured)}
                onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-700 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Interactive Mockup UI
              </label>
              <select
                value={formData.mockupType || 'lost-and-found'}
                onChange={e => setFormData({ ...formData, mockupType: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
              >
                <option value="lost-and-found">CampusFind (Lost & Found)</option>
                <option value="energy-dashboard">Energy Consumption Analytics</option>
                <option value="ecommerce-returns">E-Commerce Return Optimizer</option>
              </select>
            </div>
          </div>

          {/* Technologies Tag list */}
          <div className="p-6 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-cyan-400">
              Tech Stack
            </h2>

            <div className="flex flex-wrap gap-1.5 min-h-[40px]">
              {(formData.technologies || []).map((t, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-mono"
                >
                  <span>{t}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(idx)}
                    className="hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddTech(); } }}
                placeholder="e.g. Python, SQL..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-3 py-2 rounded-xl bg-slate-800 text-cyan-400 text-xs font-semibold"
              >
                Add
              </button>
            </div>
          </div>

          {/* External Links */}
          <div className="p-6 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-cyan-400">
              Repository &amp; Live Links
            </h2>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-slate-400" />
                <span>GitHub Repository</span>
              </label>
              <input
                type="url"
                value={formData.githubUrl || ''}
                onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/kavisri005/..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>Live Demo URL</span>
              </label>
              <input
                type="url"
                value={formData.liveUrl || ''}
                onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
              />
            </div>
          </div>

        </div>

      </div>
    </form>
  );
};
