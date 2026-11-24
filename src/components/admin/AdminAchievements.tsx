import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  X, 
  Sparkles,
  Tag
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { Achievement } from '../../types';
import { DeleteConfirmModal } from './ToastContainer';

export const AdminAchievements: React.FC = () => {
  const { 
    achievements, 
    addAchievement, 
    updateAchievement, 
    deleteAchievement, 
    reorderAchievements, 
    togglePublishAchievement 
  } = useCMS();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAch, setEditingAch] = useState<Achievement | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [organization, setOrganization] = useState('');
  const [tag, setTag] = useState('Competition');
  const [isPublished, setIsPublished] = useState(true);

  const handleOpenAdd = () => {
    setTitle('');
    setDescription('');
    setOrganization('');
    setTag('Technical Symposium');
    setIsPublished(true);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (ach: Achievement) => {
    setEditingAch(ach);
    setTitle(ach.title);
    setDescription(ach.description);
    setOrganization(ach.organization || '');
    setTag(ach.tag || 'Achievement');
    setIsPublished(Boolean(ach.is_published));
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    await addAchievement({
      title: title.trim(),
      description: description.trim(),
      organization: organization.trim() || undefined,
      tag: tag.trim() || undefined,
      display_order: achievements.length + 1,
      is_published: isPublished,
    });
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAch || !title.trim()) return;

    await updateAchievement(editingAch.id, {
      title: title.trim(),
      description: description.trim(),
      organization: organization.trim() || undefined,
      tag: tag.trim() || undefined,
      is_published: isPublished,
    });
    setEditingAch(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteAchievement(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-2 border border-cyan-500/20">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors & Recognitions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Key Achievements
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage symposium wins, coding competitions, and academic milestones.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      {/* Achievements List */}
      <div className="space-y-4">
        {achievements.map((ach, index) => (
          <div
            key={ach.id}
            className="p-5 rounded-2xl bg-[#0e131d] border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row items-start justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1 text-slate-500 font-mono text-xs pt-1">
                <span>#{ach.display_order || index + 1}</span>
                <button
                  onClick={() => reorderAchievements(ach.id, 'up')}
                  className="hover:text-cyan-400 p-0.5"
                  title="Move up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => reorderAchievements(ach.id, 'down')}
                  className="hover:text-cyan-400 p-0.5"
                  title="Move down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  {ach.tag && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {ach.tag}
                    </span>
                  )}
                  {ach.organization && (
                    <span className="text-xs font-mono text-slate-400">
                      • {ach.organization}
                    </span>
                  )}
                  <button
                    onClick={() => togglePublishAchievement(ach.id)}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${
                      ach.is_published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {ach.is_published ? 'Published' : 'Draft'}
                  </button>
                </div>

                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>{ach.title}</span>
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                  {ach.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
              <button
                onClick={() => handleOpenEdit(ach)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeleteTargetId(ach.id)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {(isAddModalOpen || editingAch) && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 rounded-2xl bg-[#0e131d] border border-slate-800 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                {editingAch ? 'Edit Achievement' : 'Add Achievement'}
              </h3>
              <button
                onClick={() => { setIsAddModalOpen(false); setEditingAch(null); }}
                className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={editingAch ? handleSaveEdit : handleSaveAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="ach-title">
                  Achievement Title *
                </label>
                <input
                  id="ach-title"
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. 1st Place - Web Design Symposium"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="ach-org">
                  Hosting College / Organization
                </label>
                <input
                  id="ach-org"
                  type="text"
                  value={organization}
                  onChange={e => setOrganization(e.target.value)}
                  placeholder="e.g. M.I.E.T. Engineering College"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="ach-tag">
                  Tag / Event Category
                </label>
                <input
                  id="ach-tag"
                  type="text"
                  value={tag}
                  onChange={e => setTag(e.target.value)}
                  placeholder="e.g. Technical Symposium"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="ach-desc">
                  Summary Description *
                </label>
                <textarea
                  id="ach-desc"
                  rows={3}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Details regarding the competition and project presented..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none resize-none"
                />
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
                  onClick={() => { setIsAddModalOpen(false); setEditingAch(null); }}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20"
                >
                  {editingAch ? 'Save Changes' : 'Create Record'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Achievement"
        message="Are you sure you want to delete this achievement record?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
