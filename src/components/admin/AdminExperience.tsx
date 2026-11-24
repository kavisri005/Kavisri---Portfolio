import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  MapPin, 
  Calendar, 
  Building, 
  X,
  Sparkles
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { Experience } from '../../types';
import { DeleteConfirmModal } from './ToastContainer';

export const AdminExperience: React.FC = () => {
  const { 
    experiences, 
    addExperience, 
    updateExperience, 
    deleteExperience, 
    reorderExperience, 
    togglePublishExperience 
  } = useCMS();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Form
  const [year, setYear] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [newRespInput, setNewRespInput] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const handleOpenAdd = () => {
    setYear('2024');
    setRole('Software Development Intern');
    setCompany('');
    setLocation('Trichy, India');
    setDescription('');
    setResponsibilities([]);
    setIsPublished(true);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (exp: Experience) => {
    setEditingExp(exp);
    setYear(exp.year);
    setRole(exp.role);
    setCompany(exp.company);
    setLocation(exp.location);
    setDescription(exp.description || '');
    setResponsibilities(exp.responsibilities || []);
    setIsPublished(Boolean(exp.is_published));
  };

  const handleAddResp = () => {
    if (newRespInput.trim()) {
      setResponsibilities([...responsibilities, newRespInput.trim()]);
      setNewRespInput('');
    }
  };

  const handleRemoveResp = (idx: number) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== idx));
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim() || !company.trim()) return;

    await addExperience({
      year: year.trim(),
      role: role.trim(),
      company: company.trim(),
      location: location.trim(),
      type: 'internship',
      description: description.trim() || undefined,
      responsibilities,
      display_order: experiences.length + 1,
      is_published: isPublished,
    });
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp || !role.trim() || !company.trim()) return;

    await updateExperience(editingExp.id, {
      year: year.trim(),
      role: role.trim(),
      company: company.trim(),
      location: location.trim(),
      description: description.trim() || undefined,
      responsibilities,
      is_published: isPublished,
    });
    setEditingExp(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteExperience(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-2 border border-cyan-500/20">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Work Experience & Internships
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage industry internships, developer roles, dates, and core technical responsibilities.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#0e131d] border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row items-start justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1 text-slate-500 font-mono text-xs pt-1">
                <span>#{exp.display_order || index + 1}</span>
                <button
                  onClick={() => reorderExperience(exp.id, 'up')}
                  className="hover:text-cyan-400 p-0.5"
                  title="Move up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => reorderExperience(exp.id, 'down')}
                  className="hover:text-cyan-400 p-0.5"
                  title="Move down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    {exp.year}
                  </span>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {exp.location}
                  </span>
                  <button
                    onClick={() => togglePublishExperience(exp.id)}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${
                      exp.is_published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {exp.is_published ? 'Published' : 'Draft'}
                  </button>
                </div>

                <h3 className="text-base font-bold text-white">{exp.role}</h3>
                <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <span>{exp.company}</span>
                </h4>

                {exp.description && (
                  <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                    {exp.description}
                  </p>
                )}

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="space-y-1 pt-1">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                        <span className="text-cyan-500 mt-0.5">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
              <button
                onClick={() => handleOpenEdit(exp)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeleteTargetId(exp.id)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {(isAddModalOpen || editingExp) && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg p-6 rounded-2xl bg-[#0e131d] border border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                {editingExp ? 'Edit Experience Entry' : 'Add Experience Entry'}
              </h3>
              <button
                onClick={() => { setIsAddModalOpen(false); setEditingExp(null); }}
                className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={editingExp ? handleSaveEdit : handleSaveAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="exp-role">
                    Role Title *
                  </label>
                  <input
                    id="exp-role"
                    type="text"
                    required
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    placeholder="e.g. Python Developer Intern"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="exp-company">
                    Company / Organization *
                  </label>
                  <input
                    id="exp-company"
                    type="text"
                    required
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="e.g. Gateway Software Solutions"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="exp-year">
                    Timeline Period *
                  </label>
                  <input
                    id="exp-year"
                    type="text"
                    required
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    placeholder="e.g. 2024"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="exp-location">
                    Location
                  </label>
                  <input
                    id="exp-location"
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Trichy, India"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="exp-desc">
                  Overview Summary
                </label>
                <textarea
                  id="exp-desc"
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Key scope of work and learning milestones..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none resize-none"
                />
              </div>

              {/* Responsibilities */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Key Responsibilities (Bullets)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newRespInput}
                    onChange={e => setNewRespInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddResp())}
                    placeholder="Add bullet point..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddResp}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {responsibilities.map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      <span className="flex-1 truncate">{r}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveResp(i)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={e => setIsPublished(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-800 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span>Publish live on public portfolio</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => { setIsAddModalOpen(false); setEditingExp(null); }}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20"
                >
                  {editingExp ? 'Save Changes' : 'Create Entry'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Experience Entry"
        message="Are you sure you want to delete this experience record?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
