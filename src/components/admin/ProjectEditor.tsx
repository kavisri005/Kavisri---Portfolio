import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  FolderGit2, 
  ArrowLeft, 
  Save, 
  Upload, 
  Plus, 
  Trash2, 
  Eye, 
  Github, 
  ExternalLink, 
  Sparkles,
  CheckCircle2,
  X,
  Layers,
  Code
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useRouter } from '../../context/RouterContext';
import { Project, ProjectCategoryType, MockupType } from '../../types';

export const ProjectEditor: React.FC<{ projectId?: string }> = ({ projectId }) => {
  const { projects, addProject, updateProject, uploadImage } = useCMS();
  const { navigate } = useRouter();

  const isNew = !projectId || projectId === 'new';
  const existingProject = !isNew ? projects.find(p => p.id === projectId) : null;

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<ProjectCategoryType>('Software Development');
  const [description, setDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [newTechInput, setNewTechInput] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [keyContributions, setKeyContributions] = useState<string[]>([]);
  const [newContribInput, setNewContribInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [mockupType, setMockupType] = useState<MockupType>('generic');
  const [featured, setFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImg, setIsUploadingImg] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    if (existingProject) {
      setTitle(existingProject.title);
      setSubtitle(existingProject.subtitle || '');
      setCategory(existingProject.category);
      setDescription(existingProject.description);
      setDetailedDescription(existingProject.detailed_description || '');
      setProblem(existingProject.problem || '');
      setSolution(existingProject.solution || '');
      setTechnologies(existingProject.technologies || []);
      setFeatures(existingProject.features || []);
      setKeyContributions(existingProject.key_contributions || []);
      setGithubUrl(existingProject.github_url || '');
      setDemoUrl(existingProject.demo_url || '');
      setImageUrl(existingProject.image_url || '');
      setMockupType(existingProject.mockup_type || 'generic');
      setFeatured(Boolean(existingProject.featured));
      setIsPublished(Boolean(existingProject.is_published));
    }
  }, [existingProject]);

  const handleAddTech = (e?: React.KeyboardEvent | React.MouseEvent) => {
    if (e && 'key' in e && e.key !== 'Enter') return;
    if (e) e.preventDefault();
    const val = newTechInput.trim();
    if (val && !technologies.includes(val)) {
      setTechnologies([...technologies, val]);
      setNewTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  const handleAddFeature = () => {
    if (newFeatureInput.trim()) {
      setFeatures([...features, newFeatureInput.trim()]);
      setNewFeatureInput('');
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const handleAddContrib = () => {
    if (newContribInput.trim()) {
      setKeyContributions([...keyContributions, newContribInput.trim()]);
      setNewContribInput('');
    }
  };

  const handleRemoveContrib = (idx: number) => {
    setKeyContributions(keyContributions.filter((_, i) => i !== idx));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    setIsUploadingImg(true);
    try {
      const res = await uploadImage(e.target.files[0], 'portfolio-media');
      if (res.success && res.url) {
        setImageUrl(res.url);
      }
    } finally {
      setIsUploadingImg(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSaving(true);
    const payload = {
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      category,
      description: description.trim(),
      detailed_description: detailedDescription.trim() || undefined,
      problem: problem.trim() || undefined,
      solution: solution.trim() || undefined,
      technologies,
      features,
      key_contributions: keyContributions,
      github_url: githubUrl.trim() || undefined,
      demo_url: demoUrl.trim() || undefined,
      image_url: imageUrl.trim() || undefined,
      mockup_type: mockupType,
      featured,
      is_published: isPublished,
      display_order: existingProject?.display_order || projects.length + 1,
    };

    try {
      if (isNew) {
        await addProject(payload);
      } else if (projectId) {
        await updateProject(projectId, payload);
      }
      navigate('/admin/projects');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/projects')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-white transition"
            title="Back to projects"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 text-[11px] font-mono border border-cyan-500/20">
              <FolderGit2 className="w-3 h-3" />
              <span>{isNew ? 'New Project Record' : `Editing: ${title || 'Project'}`}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
              {isNew ? 'Create New Project' : 'Edit Project Details'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Card Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main 2-col form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Basic Info */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80 pb-2">
                1. Project Identity
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5" htmlFor="proj-title">
                    Project Title *
                  </label>
                  <input
                    id="proj-title"
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. AI Resume Analyzer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white font-bold focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5" htmlFor="proj-subtitle">
                    Subtitle / Tagline
                  </label>
                  <input
                    id="proj-subtitle"
                    type="text"
                    value={subtitle}
                    onChange={e => setSubtitle(e.target.value)}
                    placeholder="e.g. Intelligent ATS Scoring & Match System"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5" htmlFor="proj-cat">
                    Category *
                  </label>
                  <select
                    id="proj-cat"
                    value={category}
                    onChange={e => setCategory(e.target.value as ProjectCategoryType)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:border-cyan-500 outline-none cursor-pointer"
                  >
                    <option value="Software Development">Software Development</option>
                    <option value="Data & Analytics">Data & Analytics</option>
                    <option value="AI / ML">AI / ML</option>
                    <option value="Web Applications">Web Applications</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5" htmlFor="proj-mockup">
                    Visual Archetype / Mockup Type
                  </label>
                  <select
                    id="proj-mockup"
                    value={mockupType}
                    onChange={e => setMockupType(e.target.value as MockupType)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:border-cyan-500 outline-none cursor-pointer"
                  >
                    <option value="resume">Resume Analyzer Mockup</option>
                    <option value="car">Car Sales Analytics Dashboard</option>
                    <option value="movie">Movie Ticket Booking Engine</option>
                    <option value="generic">Generic Software Terminal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5" htmlFor="proj-desc">
                  Short Description (Card Summary) *
                </label>
                <textarea
                  id="proj-desc"
                  rows={2}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Concise overview of what this project does and why it was built..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:border-cyan-500 outline-none resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5" htmlFor="proj-detailed">
                  Detailed Description (Modal / Case Study)
                </label>
                <textarea
                  id="proj-detailed"
                  rows={3}
                  value={detailedDescription}
                  onChange={e => setDetailedDescription(e.target.value)}
                  placeholder="In-depth technical architecture breakdown, implementation highlights, and logic..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:border-cyan-500 outline-none resize-y leading-relaxed"
                />
              </div>
            </div>

            {/* Problem & Solution */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80 pb-2">
                2. Problem & Solution Statement
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5" htmlFor="proj-problem">
                    The Problem
                  </label>
                  <textarea
                    id="proj-problem"
                    rows={3}
                    value={problem}
                    onChange={e => setProblem(e.target.value)}
                    placeholder="What challenge or inefficiency did this project address?"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5" htmlFor="proj-solution">
                    The Solution
                  </label>
                  <textarea
                    id="proj-solution"
                    rows={3}
                    value={solution}
                    onChange={e => setSolution(e.target.value)}
                    placeholder="How does your architecture solve that problem effectively?"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Key Contributions & Features */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80 pb-2">
                3. Key Contributions & Feature Bullets
              </h3>

              {/* Contributions */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Key Technical Contributions
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newContribInput}
                    onChange={e => setNewContribInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddContrib())}
                    placeholder="e.g. Architected ATS compatibility scoring pipeline"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddContrib}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {keyContributions.map((contrib, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300">
                      <span className="flex-1">{contrib}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveContrib(i)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right sidebar settings */}
          <div className="space-y-6">
            
            {/* Publishing & Visibility */}
            <div className="p-5 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80 pb-2">
                Visibility & Flags
              </h3>

              <div className="space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={e => setIsPublished(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-900 border-slate-800 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span className="font-semibold">Publish on Public Portfolio</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={e => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-900 border-slate-800 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span>Mark as Featured Project</span>
                </label>
              </div>
            </div>

            {/* Technologies */}
            <div className="p-5 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80 pb-2">
                Tech Stack Tags
              </h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTechInput}
                  onChange={e => setNewTechInput(e.target.value)}
                  onKeyDown={handleAddTech}
                  placeholder="e.g. Python, React..."
                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleAddTech()}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {technologies.map(tech => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Links & Repository */}
            <div className="p-5 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80 pb-2">
                External URLs
              </h3>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1" htmlFor="proj-github">
                  GitHub Repository URL
                </label>
                <div className="relative">
                  <Github className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    id="proj-github"
                    type="url"
                    value={githubUrl}
                    onChange={e => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1" htmlFor="proj-demo">
                  Live Demo URL (Optional)
                </label>
                <div className="relative">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    id="proj-demo"
                    type="url"
                    value={demoUrl}
                    onChange={e => setDemoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Project Image */}
            <div className="p-5 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80 pb-2">
                Custom Preview Banner
              </h3>

              {imageUrl ? (
                <div className="relative group rounded-xl overflow-hidden border border-slate-800 h-28">
                  <img
                    src={imageUrl}
                    alt="Project banner"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-rose-400 text-xs font-semibold transition"
                  >
                    Remove Image
                  </button>
                </div>
              ) : null}

              <label className="cursor-pointer w-full py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition">
                <Upload className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isUploadingImg ? 'Uploading...' : 'Upload Image Banner'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Save Buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition"
              >
                {isSaving ? (
                  <span>Saving Project...</span>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{isNew ? 'Create & Save Project' : 'Update Project'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/projects')}
                className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold transition text-center"
              >
                Cancel
              </button>
            </div>

          </div>

        </div>
      </form>

      {/* Card Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#0e131d] border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Card Preview
              </h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#090c12] border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                  {category}
                </span>
                {featured && (
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                    Featured
                  </span>
                )}
              </div>
              <h4 className="text-base font-bold text-white">{title || 'Untitled Project'}</h4>
              {subtitle && <p className="text-xs text-cyan-300/90 font-medium">{subtitle}</p>}
              <p className="text-xs text-slate-400 leading-relaxed">{description || 'No description entered yet.'}</p>
              
              <div className="flex flex-wrap gap-1 pt-2">
                {technologies.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
