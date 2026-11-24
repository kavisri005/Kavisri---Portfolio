import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  X, 
  Sparkles, 
  Share2, 
  ExternalLink,
  Globe
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { ExploringItem, SocialLink } from '../../types';
import { DeleteConfirmModal } from './ToastContainer';

export const AdminExploring: React.FC = () => {
  const { 
    exploring, 
    addExploring, 
    updateExploring, 
    deleteExploring, 
    reorderExploring, 
    togglePublishExploring 
  } = useCMS();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExploringItem | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const handleOpenAdd = () => {
    setTitle('');
    setDescription('');
    setTag('Active Focus');
    setIsPublished(true);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (item: ExploringItem) => {
    setEditingItem(item);
    setTitle(item.title || item.name || '');
    setDescription(item.description);
    setTag(item.tag || '');
    setIsPublished(Boolean(item.is_published));
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    await addExploring({
      title: title.trim(),
      name: title.trim(),
      description: description.trim(),
      tag: tag.trim() || undefined,
      display_order: exploring.length + 1,
      is_published: isPublished,
    });
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !title.trim()) return;

    await updateExploring(editingItem.id, {
      title: title.trim(),
      name: title.trim(),
      description: description.trim(),
      tag: tag.trim() || undefined,
      is_published: isPublished,
    });
    setEditingItem(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteExploring(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-2 border border-cyan-500/20">
            <Compass className="w-3.5 h-3.5" />
            <span>Growth & Research</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Currently Exploring Topics
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Display technologies, frameworks, and AI concepts you are actively researching.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Topic</span>
        </button>
      </div>

      {/* Exploring Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exploring.map((item, index) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#0e131d] border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 font-mono text-slate-500 text-xs">
                  <span>#{item.display_order || index + 1}</span>
                  <button onClick={() => reorderExploring(item.id, 'up')} className="hover:text-cyan-400 p-0.5">
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button onClick={() => reorderExploring(item.id, 'down')} className="hover:text-cyan-400 p-0.5">
                    <ArrowDown className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => togglePublishExploring(item.id)}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${
                    item.is_published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}
                >
                  {item.is_published ? 'Published' : 'Draft'}
                </button>
              </div>

              {item.tag && (
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 inline-block mb-2">
                  {item.tag}
                </span>
              )}

              <h3 className="text-base font-bold text-white mb-1.5">
                {item.title || item.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-end gap-1.5">
              <button
                onClick={() => handleOpenEdit(item)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-cyan-300 transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeleteTargetId(item.id)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-rose-400 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {(isAddModalOpen || editingItem) && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 rounded-2xl bg-[#0e131d] border border-slate-800 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                {editingItem ? 'Edit Exploring Topic' : 'Add Exploring Topic'}
              </h3>
              <button
                onClick={() => { setIsAddModalOpen(false); setEditingItem(null); }}
                className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={editingItem ? handleSaveEdit : handleSaveAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="exp-topic-title">
                  Topic Title *
                </label>
                <input
                  id="exp-topic-title"
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. LLM Agents & Tool Use"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="exp-topic-tag">
                  Focus Tag (Optional)
                </label>
                <input
                  id="exp-topic-tag"
                  type="text"
                  value={tag}
                  onChange={e => setTag(e.target.value)}
                  placeholder="e.g. AI / ML"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="exp-topic-desc">
                  Description *
                </label>
                <textarea
                  id="exp-topic-desc"
                  rows={3}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="What are you currently learning or experimenting with?"
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
                  onClick={() => { setIsAddModalOpen(false); setEditingItem(null); }}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20"
                >
                  {editingItem ? 'Save Changes' : 'Create Record'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Topic"
        message="Are you sure you want to delete this currently exploring topic?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export const AdminSocial: React.FC = () => {
  const { 
    socialLinks, 
    addSocialLink, 
    updateSocialLink, 
    deleteSocialLink, 
    togglePublishSocialLink 
  } = useCMS();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Form
  const [platform, setPlatform] = useState('');
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const handleOpenAdd = () => {
    setPlatform('GitHub');
    setLabel('github.com/kavisri005');
    setUrl('https://github.com/kavisri005');
    setIsPublished(true);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (link: SocialLink) => {
    setEditingLink(link);
    setPlatform(link.platform);
    setLabel(link.label);
    setUrl(link.url);
    setIsPublished(Boolean(link.is_published));
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!platform.trim() || !url.trim()) return;

    await addSocialLink({
      platform: platform.trim(),
      label: label.trim() || url.trim(),
      url: url.trim(),
      display_order: socialLinks.length + 1,
      is_published: isPublished,
    });
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLink || !platform.trim() || !url.trim()) return;

    await updateSocialLink(editingLink.id, {
      platform: platform.trim(),
      label: label.trim() || url.trim(),
      url: url.trim(),
      is_published: isPublished,
    });
    setEditingLink(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteSocialLink(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-2 border border-cyan-500/20">
            <Share2 className="w-3.5 h-3.5" />
            <span>Social Connectivity</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Social & Contact Links
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage links for GitHub, LinkedIn, Email, Phone, and professional profiles.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Social Link</span>
        </button>
      </div>

      {/* Social Links List */}
      <div className="rounded-2xl bg-[#0e131d] border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0a0d14] text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Platform</th>
                <th className="py-3.5 px-4 font-semibold">Display Text</th>
                <th className="py-3.5 px-4 font-semibold">Target URL</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {socialLinks.map((link) => (
                <tr key={link.id} className="hover:bg-slate-900/50 transition">
                  <td className="py-3.5 px-4 font-bold text-white text-sm">
                    {link.platform}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-cyan-300 text-xs">
                    {link.label}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 text-xs truncate max-w-xs font-mono">
                    {link.url}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => togglePublishSocialLink(link.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition ${
                        link.is_published
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {link.is_published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
                        title="Open URL"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(link)}
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(link.id)}
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {(isAddModalOpen || editingLink) && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 rounded-2xl bg-[#0e131d] border border-slate-800 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                {editingLink ? 'Edit Link' : 'Add Social Link'}
              </h3>
              <button
                onClick={() => { setIsAddModalOpen(false); setEditingLink(null); }}
                className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={editingLink ? handleSaveEdit : handleSaveAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="social-platform">
                  Platform Name *
                </label>
                <input
                  id="social-platform"
                  type="text"
                  required
                  value={platform}
                  onChange={e => setPlatform(e.target.value)}
                  placeholder="e.g. GitHub / LinkedIn / Email"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="social-label">
                  Display Label *
                </label>
                <input
                  id="social-label"
                  type="text"
                  required
                  value={label}
                  onChange={e => setLabel(e.target.value)}
                  placeholder="e.g. linkedin.com/in/kavisri-a..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="social-url">
                  Destination URL *
                </label>
                <input
                  id="social-url"
                  type="text"
                  required
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
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
                  onClick={() => { setIsAddModalOpen(false); setEditingLink(null); }}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20"
                >
                  {editingLink ? 'Save Changes' : 'Create Link'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Social Link"
        message="Are you sure you want to delete this contact link?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
