import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  MapPin, 
  Calendar, 
  Building, 
  X,
  Award
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { Education } from '../../types';
import { DeleteConfirmModal } from './ToastContainer';

export const AdminEducation: React.FC = () => {
  const { 
    education, 
    addEducation, 
    updateEducation, 
    deleteEducation, 
    reorderEducation, 
    togglePublishEducation 
  } = useCMS();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Form
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [location, setLocation] = useState('');
  const [period, setPeriod] = useState('');
  const [score, setScore] = useState('');
  const [scoreLabel, setScoreLabel] = useState('CGPA');
  const [status, setStatus] = useState('Pursuing');
  const [description, setDescription] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const handleOpenAdd = () => {
    setDegree('B.E. Computer Science and Engineering');
    setInstitution('M.A.M. College of Engineering and Technology');
    setLocation('Trichy, Tamil Nadu');
    setPeriod('2023 - Present');
    setScore('8.33');
    setScoreLabel('CGPA');
    setStatus('Pursuing');
    setDescription('');
    setIsPublished(true);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (edu: Education) => {
    setEditingEdu(edu);
    setDegree(edu.degree);
    setInstitution(edu.institution);
    setLocation(edu.location);
    setPeriod(edu.period);
    setScore(edu.score || edu.cgpa || '');
    setScoreLabel(edu.score_label || 'CGPA');
    setStatus(edu.status || 'Pursuing');
    setDescription(edu.description || '');
    setIsPublished(Boolean(edu.is_published));
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!degree.trim() || !institution.trim()) return;

    await addEducation({
      degree: degree.trim(),
      institution: institution.trim(),
      location: location.trim(),
      period: period.trim(),
      score: score.trim() || undefined,
      score_label: scoreLabel.trim() || undefined,
      status: status.trim() || undefined,
      description: description.trim() || undefined,
      display_order: education.length + 1,
      is_published: isPublished,
    });
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu || !degree.trim() || !institution.trim()) return;

    await updateEducation(editingEdu.id, {
      degree: degree.trim(),
      institution: institution.trim(),
      location: location.trim(),
      period: period.trim(),
      score: score.trim() || undefined,
      score_label: scoreLabel.trim() || undefined,
      status: status.trim() || undefined,
      description: description.trim() || undefined,
      is_published: isPublished,
    });
    setEditingEdu(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteEducation(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-2 border border-cyan-500/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Education History
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage engineering degree, schooling milestones, CGPA metrics, and institution locations.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {/* Education List */}
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div
            key={edu.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#0e131d] border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row items-start justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1 text-slate-500 font-mono text-xs pt-1">
                <span>#{edu.display_order || index + 1}</span>
                <button
                  onClick={() => reorderEducation(edu.id, 'up')}
                  className="hover:text-cyan-400 p-0.5"
                  title="Move up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => reorderEducation(edu.id, 'down')}
                  className="hover:text-cyan-400 p-0.5"
                  title="Move down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    {edu.period}
                  </span>
                  {edu.status && (
                    <span className="text-xs font-mono text-slate-400">
                      • {edu.status}
                    </span>
                  )}
                  <button
                    onClick={() => togglePublishEducation(edu.id)}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${
                      edu.is_published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {edu.is_published ? 'Published' : 'Draft'}
                  </button>
                </div>

                <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <span>{edu.institution}</span>
                  <span className="text-slate-500 text-xs font-mono">({edu.location})</span>
                </h4>

                {(edu.score || edu.cgpa) && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                    <span className="text-slate-500">{edu.score_label || 'CGPA'}:</span>
                    <span className="font-bold">{edu.score || edu.cgpa}</span>
                  </div>
                )}

                {edu.description && (
                  <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                    {edu.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
              <button
                onClick={() => handleOpenEdit(edu)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeleteTargetId(edu.id)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {(isAddModalOpen || editingEdu) && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg p-6 rounded-2xl bg-[#0e131d] border border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                {editingEdu ? 'Edit Education Record' : 'Add Education Record'}
              </h3>
              <button
                onClick={() => { setIsAddModalOpen(false); setEditingEdu(null); }}
                className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={editingEdu ? handleSaveEdit : handleSaveAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="edu-degree">
                  Degree / Program *
                </label>
                <input
                  id="edu-degree"
                  type="text"
                  required
                  value={degree}
                  onChange={e => setDegree(e.target.value)}
                  placeholder="e.g. B.E. Computer Science and Engineering"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="edu-inst">
                  Institution Name *
                </label>
                <input
                  id="edu-inst"
                  type="text"
                  required
                  value={institution}
                  onChange={e => setInstitution(e.target.value)}
                  placeholder="e.g. M.A.M. College of Engineering and Technology"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="edu-period">
                    Period *
                  </label>
                  <input
                    id="edu-period"
                    type="text"
                    required
                    value={period}
                    onChange={e => setPeriod(e.target.value)}
                    placeholder="e.g. 2023 - 2027"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="edu-loc">
                    Location
                  </label>
                  <input
                    id="edu-loc"
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Trichy, Tamil Nadu"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="edu-score">
                    Score / CGPA Value
                  </label>
                  <input
                    id="edu-score"
                    type="text"
                    value={score}
                    onChange={e => setScore(e.target.value)}
                    placeholder="e.g. 8.04"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="edu-status">
                    Academic Status
                  </label>
                  <input
                    id="edu-status"
                    type="text"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    placeholder="e.g. Pursuing / Completed"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                  />
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
                  onClick={() => { setIsAddModalOpen(false); setEditingEdu(null); }}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20"
                >
                  {editingEdu ? 'Save Changes' : 'Create Record'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Education Record"
        message="Are you sure you want to delete this education entry?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
