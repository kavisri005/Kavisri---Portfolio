import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FolderGit2, 
  Plus, 
  Trash2, 
  Edit3, 
  Copy, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Search, 
  Star, 
  ExternalLink, 
  Github, 
  Sparkles,
  LayoutGrid,
  List
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useRouter } from '../../context/RouterContext';
import { Project } from '../../types';
import { DeleteConfirmModal } from './ToastContainer';

export const AdminProjects: React.FC = () => {
  const { 
    projects, 
    deleteProject, 
    duplicateProject, 
    reorderProjects, 
    togglePublishProject 
  } = useCMS();
  const { navigate } = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'featured'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const categories = ['All', 'Software Development', 'Data & Analytics', 'AI / ML', 'Web Applications'];

  const filteredProjects = projects.filter(p => {
    const matchesCat = filterCategory === 'All' || p.category === filterCategory;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.technologies || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesStatus = true;
    if (filterStatus === 'published') matchesStatus = Boolean(p.is_published);
    if (filterStatus === 'draft') matchesStatus = !p.is_published;
    if (filterStatus === 'featured') matchesStatus = Boolean(p.featured);

    return matchesCat && matchesSearch && matchesStatus;
  });

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteProject(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-2 border border-cyan-500/20">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Project Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Projects Catalog
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Create, curate, reorder, duplicate, and publish technical software projects and data architectures.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/projects/new')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Control Bar: Filters, Search, View Mode */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Status & Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status buttons */}
          <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            {(['all', 'published', 'draft', 'featured'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-lg capitalize transition ${
                  filterStatus === status
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:border-cyan-500 outline-none cursor-pointer"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Search & Layout toggle */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-56">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none"
            />
          </div>

          <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'table' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'cards' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
              }`}
              title="Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Display: Table or Cards */}
      {viewMode === 'table' ? (
        <div className="rounded-2xl bg-[#0e131d] border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0a0d14] text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Order</th>
                  <th className="py-3.5 px-4 font-semibold">Project</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">Tech Stack</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500 text-xs">
                      No projects found matching the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((proj, index) => (
                    <tr key={proj.id} className="hover:bg-slate-900/50 transition">
                      {/* Order */}
                      <td className="py-3.5 px-4 font-mono text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <span>#{proj.display_order || index + 1}</span>
                          <div className="flex flex-col">
                            <button
                              onClick={() => reorderProjects(proj.id, 'up')}
                              className="p-0.5 text-slate-500 hover:text-cyan-400 transition"
                              title="Move up"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => reorderProjects(proj.id, 'down')}
                              className="p-0.5 text-slate-500 hover:text-cyan-400 transition"
                              title="Move down"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Project Title & Subtitle */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          {proj.featured && (
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20 shrink-0" />
                          )}
                          <div>
                            <span className="font-bold text-white text-sm block">
                              {proj.title}
                            </span>
                            {proj.subtitle && (
                              <span className="text-[11px] text-slate-400 block truncate max-w-xs">
                                {proj.subtitle}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-mono">
                          {proj.category}
                        </span>
                      </td>

                      {/* Tech Tags */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {(proj.technologies || []).slice(0, 3).map(tech => (
                            <span key={tech} className="px-1.5 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-cyan-400">
                              {tech}
                            </span>
                          ))}
                          {(proj.technologies || []).length > 3 && (
                            <span className="text-[10px] text-slate-500 font-mono self-center">
                              +{proj.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Published Status */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => togglePublishProject(proj.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition ${
                            proj.is_published
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {proj.is_published ? (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span>Published</span>
                            </>
                          ) : (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                              <span>Draft</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => navigate(`/admin/projects/${proj.id}`)}
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition"
                            title="Edit Project"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => duplicateProject(proj.id)}
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
                            title="Duplicate Project"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteTargetId(proj.id)}
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((proj, idx) => (
            <div
              key={proj.id}
              className="p-5 rounded-2xl bg-[#0e131d] border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    {proj.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {proj.featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />}
                    <span className={`w-2 h-2 rounded-full ${proj.is_published ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-1">{proj.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {(proj.technologies || []).map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">#{idx + 1}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => navigate(`/admin/projects/${proj.id}`)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 text-xs font-semibold text-cyan-300 hover:bg-slate-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => duplicateProject(proj.id)}
                    className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTargetId(proj.id)}
                    className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Project"
        message="Are you sure you want to delete this project? It will be removed from your catalog and the live portfolio."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
