import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  Database, 
  ShieldCheck, 
  Copy, 
  Check, 
  RotateCcw, 
  Radio, 
  Key, 
  User, 
  ExternalLink,
  AlertTriangle
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { SUPABASE_CONFIG_INFO } from '../../lib/supabase';
import { DeleteConfirmModal } from './ToastContainer';

export const AdminSettings: React.FC = () => {
  const { 
    user, 
    isSupabaseConnected, 
    lastUpdated, 
    resetToDefaults, 
    addToast 
  } = useCMS();

  const [copiedSql, setCopiedSql] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const sampleSqlSnippet = `-- Create profile table
CREATE TABLE IF NOT EXISTS public.profile (
    id TEXT PRIMARY KEY DEFAULT 'kavisri-profile',
    name TEXT NOT NULL DEFAULT 'KAVISRI A',
    headline TEXT NOT NULL DEFAULT 'I build practical software solutions with code, data & AI.',
    short_bio TEXT NOT NULL,
    detailed_bio JSONB NOT NULL DEFAULT '[]'::jsonb,
    location TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    linkedin_url TEXT NOT NULL,
    github_url TEXT NOT NULL,
    resume_url TEXT DEFAULT '',
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and add public read policy
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profile read" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Admin profile full access" ON public.profile FOR ALL TO authenticated USING (true) WITH CHECK (true);`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sampleSqlSnippet);
    setCopiedSql(true);
    addToast('Schema SQL copied to clipboard.', 'success');
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleConfirmReset = () => {
    resetToDefaults();
    setShowResetModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-2 border border-cyan-500/20">
            <Settings className="w-3.5 h-3.5" />
            <span>System Preferences</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Settings & Database Architecture
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Configure Supabase PostgreSQL synchronization, Row Level Security policies, and admin session credentials.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Database & Supabase Info */}
        <div className="p-6 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>Database Connection</span>
            </h3>

            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono ${
              isSupabaseConnected 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isSupabaseConnected ? 'bg-emerald-400' : 'bg-cyan-400'}`} />
              <span>{isSupabaseConnected ? 'Connected to Supabase' : 'Local CMS Sync Active'}</span>
            </span>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono space-y-1">
              <span className="text-slate-500 block text-[10px]">VITE_SUPABASE_URL</span>
              <span className="text-slate-200 truncate block">
                {SUPABASE_CONFIG_INFO.url || 'Not configured in .env (Using client-side cache & seed data)'}
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed text-[11px]">
              The CMS supports direct connection to your Supabase PostgreSQL instance with full Row Level Security (RLS) enforcement. Public visitors can only view items marked <code>is_published = true</code>.
            </p>
          </div>
        </div>

        {/* Admin Session Info */}
        <div className="p-6 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" />
              <span>Authenticated Admin Session</span>
            </h3>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Active
            </span>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono space-y-1">
              <span className="text-slate-500 block text-[10px]">CURRENT ADMIN EMAIL</span>
              <span className="text-cyan-300 font-bold block">
                {user?.email || 'a.kavisri005@gmail.com'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono space-y-1">
              <span className="text-slate-500 block text-[10px]">LAST SYNCHRONIZATION TIME</span>
              <span className="text-slate-200 block">
                {new Date(lastUpdated).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Supabase Schema SQL Viewer */}
      <div className="p-6 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>PostgreSQL Schema & Security Policies (RLS)</span>
            </h3>
            <span className="text-[11px] text-slate-500">
              Run this in your Supabase SQL editor to create all required tables and permissions.
            </span>
          </div>

          <button
            onClick={handleCopySql}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-cyan-300 text-xs font-mono transition self-start sm:self-auto"
          >
            {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSql ? 'Copied to Clipboard' : 'Copy SQL Schema'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-[#07090e] border border-slate-800 text-[11px] font-mono text-cyan-200/90 overflow-x-auto max-h-60 leading-relaxed custom-scrollbar">
          {sampleSqlSnippet}
        </pre>
      </div>

      {/* Danger Zone: Content Reset */}
      <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-4">
        <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>Factory Content Reset</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
            Reset all portfolio categories (Profile, Skills, Projects, Experience, Education, Certifications, Achievements) to the verified initial dataset for Kavisri A.
          </p>

          <button
            onClick={() => setShowResetModal(true)}
            className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-2 transition self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Content</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showResetModal}
        title="Reset Content to Factory Defaults"
        message="This will reset all your portfolio entries (Projects, Skills, Certifications, etc.) to the verified seed dataset. Do you wish to continue?"
        onConfirm={handleConfirmReset}
        onCancel={() => setShowResetModal(false)}
      />
    </div>
  );
};
