import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, KeyRound, Lock, Mail, ShieldCheck } from 'lucide-react';
import { useCMS, AUTHORIZED_ADMIN_EMAIL } from '../../context/CMSContext';
import { useRouter } from '../../context/RouterContext';

export const AdminLogin: React.FC = () => {
  const { login } = useCMS();
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) navigate('/admin');
      else setError(result.error || 'Invalid email or password.');
    } catch {
      setError('Unable to sign in right now. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-6 left-6 z-20">
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl glass-pill hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-mono transition">
          <ArrowLeft className="w-3.5 h-3.5" /><span>Back to Portfolio</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-sky-400 text-slate-950 shadow-lg shadow-cyan-500/20 mb-3.5">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">KAVISRI CMS</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">Portfolio Content Management System</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 sm:p-8 rounded-3xl glass-panel shadow-2xl backdrop-blur-2xl relative">
          <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2"><KeyRound className="w-4 h-4 text-cyan-400" />Admin Sign In</h2>
            <span className="text-[11px] font-mono text-slate-400">Protected Dashboard</span>
          </div>

          {error && <div role="alert" className="p-3.5 mb-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="admin-email">Admin Email</label>
              <div className="relative">
                <Mail className="absolute inset-y-0 left-0 ml-3.5 my-auto w-4 h-4 text-slate-400" />
                <input id="admin-email" type="email" autoComplete="username" required value={email} onChange={event => setEmail(event.target.value)} placeholder="Enter admin email" className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input text-slate-100 text-xs sm:text-sm outline-none transition" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="admin-password">Password</label>
              <div className="relative">
                <Lock className="absolute inset-y-0 left-0 ml-3.5 my-auto w-4 h-4 text-slate-400" />
                <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} placeholder="Enter admin password" className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input text-slate-100 text-xs sm:text-sm outline-none transition" />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition disabled:opacity-50">
              <span>{isLoading ? 'Signing In…' : 'Sign In to Dashboard'}</span>{!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-300 font-mono"><ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /><span>Admin Authentication</span></div>
            <p className="text-[10px] leading-relaxed">Sign in with the authorized administrator account for {AUTHORIZED_ADMIN_EMAIL}.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
