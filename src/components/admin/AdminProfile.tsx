import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Save, 
  RotateCcw, 
  Upload, 
  Eye, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  FileText, 
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { Profile } from '../../types';

export const AdminProfile: React.FC = () => {
  const { profile, updateProfile, uploadImage } = useCMS();
  const [formData, setFormData] = useState<Profile>({ ...profile });
  const [detailedBioText, setDetailedBioText] = useState(
    Array.isArray(profile.detailed_bio) ? profile.detailed_bio.join('\n\n') : ''
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImg, setIsUploadingImg] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setIsUploadingImg(true);

    try {
      const res = await uploadImage(file, 'portfolio-media');
      if (res.success && res.url) {
        setFormData(prev => ({ ...prev, profile_image_url: res.url }));
      }
    } finally {
      setIsUploadingImg(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const paragraphs = detailedBioText
      .split('\n\n')
      .map(p => p.trim())
      .filter(Boolean);

    try {
      await updateProfile({
        ...formData,
        detailed_bio: paragraphs.length > 0 ? paragraphs : formData.detailed_bio,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData({ ...profile });
    setDetailedBioText(Array.isArray(profile.detailed_bio) ? profile.detailed_bio.join('\n\n') : '');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-2 border border-cyan-500/20">
            <User className="w-3.5 h-3.5" />
            <span>Profile Metadata</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Profile Editor
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Update personal identity, headlines, bio summaries, contact channels, and links.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 text-xs font-mono flex items-center gap-2 transition"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Preview Changes</span>
          </button>
        </div>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Image & Core Identity */}
          <div className="space-y-6">
            {/* Image Card */}
            <div className="p-5 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Profile Avatar / Visual
              </span>

              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/60 border border-dashed border-slate-800 text-center">
                {formData.profile_image_url ? (
                  <div className="relative group w-32 h-32 rounded-2xl overflow-hidden mb-3 border border-cyan-500/30">
                    <img
                      src={formData.profile_image_url}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, profile_image_url: '' }))}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-rose-400 text-xs font-semibold transition"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-extrabold text-2xl mb-3">
                    {formData.name.charAt(0) || 'K'}
                  </div>
                )}

                <label className="cursor-pointer px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition">
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isUploadingImg ? 'Uploading...' : 'Upload Avatar'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <span className="text-[10px] text-slate-400 mt-2 font-mono">
                  JPG, PNG, WebP
                </span>
              </div>
            </div>

            {/* Social & Contact */}
            <div className="p-5 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Direct Contact & Channels
              </span>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="profile-email">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  <input
                    id="profile-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="profile-phone">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  <input
                    id="profile-phone"
                    type="text"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="profile-location">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  <input
                    id="profile-location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="profile-github">
                  GitHub URL
                </label>
                <div className="relative">
                  <Github className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  <input
                    id="profile-github"
                    type="url"
                    required
                    value={formData.github_url}
                    onChange={e => setFormData({ ...formData, github_url: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1" htmlFor="profile-linkedin">
                  LinkedIn URL
                </label>
                <div className="relative">
                  <Linkedin className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  <input
                    id="profile-linkedin"
                    type="url"
                    required
                    value={formData.linkedin_url}
                    onChange={e => setFormData({ ...formData, linkedin_url: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Detailed Description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block border-b border-slate-800/80 pb-2">
                Core Positioning & Headlines
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5" htmlFor="profile-name">
                    Display Name
                  </label>
                  <input
                    id="profile-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white font-semibold focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5" htmlFor="profile-headline">
                    Hero Headline
                  </label>
                  <input
                    id="profile-headline"
                    type="text"
                    required
                    value={formData.headline}
                    onChange={e => setFormData({ ...formData, headline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5" htmlFor="profile-short-bio">
                  Short Bio (Hero & Meta)
                </label>
                <textarea
                  id="profile-short-bio"
                  rows={2}
                  value={formData.short_bio}
                  onChange={e => setFormData({ ...formData, short_bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:border-cyan-500 outline-none resize-none leading-relaxed"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono text-slate-400" htmlFor="profile-detailed-bio">
                    Detailed Bio (About Section Paragraphs)
                  </label>
                  <span className="text-[10px] font-mono text-slate-500">
                    Separate paragraphs with a blank line
                  </span>
                </div>
                <textarea
                  id="profile-detailed-bio"
                  rows={6}
                  value={detailedBioText}
                  onChange={e => setDetailedBioText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:border-cyan-500 outline-none resize-y leading-relaxed font-sans"
                />
              </div>
            </div>

            {/* Save Buttons Bar */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                disabled={isSaving}
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-2 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl p-6 sm:p-8 rounded-2xl bg-[#0e131d] border border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Live Profile Preview
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-slate-300">
              <h2 className="text-2xl font-extrabold text-white">{formData.name}</h2>
              <p className="text-cyan-400 font-semibold">{formData.headline}</p>
              <p className="text-xs text-slate-400">{formData.short_bio}</p>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
                <div className="font-bold text-white">About Text:</div>
                {detailedBioText.split('\n\n').map((p, i) => (
                  <p key={i} className="text-slate-300 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
