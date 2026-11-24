import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  ExternalLink, 
  CheckCircle2, 
  X, 
  Search,
  Sparkles
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { Certification } from '../../types';
import { DeleteConfirmModal } from './ToastContainer';

export const AdminCertifications: React.FC = () => {
  const { 
    certifications, 
    addCertification, 
    updateCertification, 
    deleteCertification, 
    reorderCertifications, 
    togglePublishCertification 
  } = useCMS();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Form
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const [verificationUrl, setVerificationUrl] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const handleOpenAdd = () => {
    setTitle('');
    setIssuer('');
    setIssueDate('');
    setCredentialId('');
    setVerificationUrl('');
    setIsPublished(true);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (cert: Certification) => {
    setEditingCert(cert);
    setTitle(cert.title || cert.name || '');
    setIssuer(cert.issuer || '');
    setIssueDate(cert.issue_date || '');
    setCredentialId(cert.credential_id || '');
    setVerificationUrl(cert.verification_url || '');
    setIsPublished(Boolean(cert.is_published));
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addCertification({
      title: title.trim(),
      name: title.trim(),
      issuer: issuer.trim() || undefined,
      issue_date: issueDate.trim() || undefined,
      credential_id: credentialId.trim() || undefined,
      verification_url: verificationUrl.trim() || undefined,
      display_order: certifications.length + 1,
      is_published: isPublished,
    });
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert || !title.trim()) return;

    await updateCertification(editingCert.id, {
      title: title.trim(),
      name: title.trim(),
      issuer: issuer.trim() || undefined,
      issue_date: issueDate.trim() || undefined,
      credential_id: credentialId.trim() || undefined,
      verification_url: verificationUrl.trim() || undefined,
      is_published: isPublished,
    });
    setEditingCert(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteCertification(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  const filteredCerts = certifications.filter(c => {
    const name = (c.title || c.name || '').toLowerCase();
    const iss = (c.issuer || '').toLowerCase();
    const q = searchQuery.toLowerCase();
    return name.includes(q) || iss.includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-2 border border-cyan-500/20">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Certifications & Courses ({certifications.length})
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage the programming, web, database, AI, and professional skills certificates shown on the portfolio.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative max-w-sm w-full">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search certifications..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none"
          />
        </div>
      </div>

      {/* Certifications Table */}
      <div className="rounded-2xl bg-[#0e131d] border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0a0d14] text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Order</th>
                <th className="py-3.5 px-4 font-semibold">Certification Name</th>
                <th className="py-3.5 px-4 font-semibold">Issuer / Platform</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredCerts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 text-xs">
                    No certifications found.
                  </td>
                </tr>
              ) : (
                filteredCerts.map((cert, index) => (
                  <tr key={cert.id} className="hover:bg-slate-900/50 transition">
                    {/* Order */}
                    <td className="py-3.5 px-4 font-mono text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <span>#{cert.display_order || index + 1}</span>
                        <div className="flex flex-col">
                          <button
                            onClick={() => reorderCertifications(cert.id, 'up')}
                            className="p-0.5 text-slate-500 hover:text-cyan-400 transition"
                            title="Move up"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => reorderCertifications(cert.id, 'down')}
                            className="p-0.5 text-slate-500 hover:text-cyan-400 transition"
                            title="Move down"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Title */}
                    <td className="py-3.5 px-4 font-bold text-white text-sm">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{cert.title || cert.name}</span>
                      </div>
                    </td>

                    {/* Issuer */}
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {cert.issuer || 'Professional Organization'}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => togglePublishCertification(cert.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition ${
                          cert.is_published
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {cert.is_published ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {cert.verification_url && (
                          <a
                            href={cert.verification_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
                            title="Verify link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => handleOpenEdit(cert)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition"
                          title="Edit Certification"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTargetId(cert.id)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition"
                          title="Delete Certification"
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

      {/* Add / Edit Modal */}
      {(isAddModalOpen || editingCert) && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 rounded-2xl bg-[#0e131d] border border-slate-800 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                {editingCert ? 'Edit Certification' : 'Add Certification'}
              </h3>
              <button
                onClick={() => { setIsAddModalOpen(false); setEditingCert(null); }}
                className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={editingCert ? handleSaveEdit : handleSaveAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="cert-title">
                  Certification Name *
                </label>
                <input
                  id="cert-title"
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. AI Literacy Course"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="cert-issuer">
                  Issuing Organization (Optional)
                </label>
                <input
                  id="cert-issuer"
                  type="text"
                  value={issuer}
                  onChange={e => setIssuer(e.target.value)}
                  placeholder="e.g. Coursera / Infosys Springboard"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="cert-verify">
                  Verification / Credential URL (Optional)
                </label>
                <input
                  id="cert-verify"
                  type="url"
                  value={verificationUrl}
                  onChange={e => setVerificationUrl(e.target.value)}
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
                  onClick={() => { setIsAddModalOpen(false); setEditingCert(null); }}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20"
                >
                  {editingCert ? 'Save Changes' : 'Create Record'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Certification"
        message="Are you sure you want to delete this certification record?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
