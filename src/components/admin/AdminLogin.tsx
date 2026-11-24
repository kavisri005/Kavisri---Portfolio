import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  KeyRound, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  Send
} from 'lucide-react';
import { useCMS, AUTHORIZED_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } from '../../context/CMSContext';
import { useRouter } from '../../context/RouterContext';

export const AdminLogin: React.FC = () => {
  const { login, resetAdminPassword, adminPassword, isSupabaseConnected, addToast } = useCMS();
  const { navigate } = useRouter();

  // Mode: 'login' | 'forgot'
  const [mode, setMode] = useState<'login' | 'forgot'>('login');

  // Login form state
  const [email, setEmail] = useState('a.kavisri005@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password form state
  const [forgotEmail, setForgotEmail] = useState('a.kavisri005@gmail.com');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [forgotSuccess, setForgotSuccess] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/admin');
      } else {
        setError(res.error || 'Invalid credentials. Please verify your email and password.');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);
    setForgotSuccess(null);

    const cleanEmail = forgotEmail.trim().toLowerCase();
    if (cleanEmail !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      setForgotError(`Access Denied: Only the verified admin email (${AUTHORIZED_ADMIN_EMAIL}) can access and reset credentials for this portfolio.`);
      return;
    }

    if (newPassword.length < 6) {
      setForgotError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setForgotError('Passwords do not match. Please re-enter.');
      return;
    }

    setIsLoading(true);
    try {
      const res = resetAdminPassword(cleanEmail, newPassword);
      if (res.success) {
        setForgotSuccess(res.message);
        setPassword(newPassword);
        setEmail(cleanEmail);
        addToast('Password successfully reset!', 'success');
        setTimeout(() => {
          setMode('login');
          setForgotSuccess(null);
          setSuccessMessage('Password reset! You can now log in with your new password.');
        }, 1800);
      } else {
        setForgotError(res.error || 'Failed to reset password.');
      }
    } catch {
      setForgotError('An unexpected error occurred during password reset.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickResetToDefault = () => {
    const res = resetAdminPassword(AUTHORIZED_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD);
    if (res.success) {
      setPassword(DEFAULT_ADMIN_PASSWORD);
      setEmail(AUTHORIZED_ADMIN_EMAIL);
      setForgotSuccess(`Password restored to default: "${DEFAULT_ADMIN_PASSWORD}". Redirecting to login...`);
      setTimeout(() => {
        setMode('login');
        setForgotSuccess(null);
        setSuccessMessage(`Password restored to "${DEFAULT_ADMIN_PASSWORD}". You can now sign in.`);
      }, 1500);
    }
  };

  const handleSendResetEmail = () => {
    const subject = encodeURIComponent('Kavisri CMS — Admin Password Reset Request');
    const body = encodeURIComponent(
      `Hello Kavisri,\n\nThis is a password reset verification for your Portfolio Admin Dashboard.\n\nAuthorized Admin Email: ${AUTHORIZED_ADMIN_EMAIL}\nDefault Access Password: ${DEFAULT_ADMIN_PASSWORD}\nCurrent Stored Password: ${adminPassword}\n\nTo access your CMS dashboard, visit: ${window.location.origin}/admin`
    );
    window.open(`mailto:${AUTHORIZED_ADMIN_EMAIL}?subject=${subject}&body=${body}`, '_blank');
    addToast('Opened email client for password reset instructions.', 'info');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Orbs */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top back button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl glass-pill hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-mono transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-sky-400 text-slate-950 shadow-lg shadow-cyan-500/20 mb-3.5 font-black text-xl">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            KAVISRI CMS
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            Portfolio Content Management System
          </p>
          
          <div className="inline-flex items-center gap-2 mt-2.5 px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-cyan-300 border border-cyan-500/30">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Authorized Email: {AUTHORIZED_ADMIN_EMAIL}</span>
          </div>
        </div>

        {/* Card */}
        <motion.div
          layout
          className="p-6 sm:p-8 rounded-3xl glass-panel shadow-2xl backdrop-blur-2xl relative"
        >
          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              /* LOGIN VIEW */
              <motion.div
                key="login-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-3">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-cyan-400" />
                    <span>Admin Sign In</span>
                  </h2>
                  <span className="text-[11px] font-mono text-slate-400">
                    Protected Dashboard
                  </span>
                </div>

                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-3.5 mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{successMessage}</span>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-3.5 mb-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{error}</span>
                  </motion.div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="admin-email">
                      Admin Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="admin-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="a.kavisri005@gmail.com"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input text-slate-100 text-xs sm:text-sm outline-none transition"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400/90 mt-1 block">
                      Direct access granted exclusively to a.kavisri005@gmail.com
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-mono text-slate-300" htmlFor="admin-password">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setMode('forgot');
                          setError(null);
                          setSuccessMessage(null);
                        }}
                        className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition hover:underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        id="admin-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password (e.g. kavisri123)"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl glass-input text-slate-100 text-xs sm:text-sm outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Signing In...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In to Dashboard</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Password Hint Card */}
                <div className="mt-5 p-3.5 rounded-2xl glass-subcard border border-white/10 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-cyan-300 font-mono font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      Default Dashboard Password
                    </span>
                    <span className="bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-200 font-bold border border-cyan-500/30">
                      kavisri123
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-[10px]">
                    Use password <code className="text-cyan-300 font-mono font-bold">kavisri123</code> with email <code className="text-cyan-300 font-mono">a.kavisri005@gmail.com</code>. You can change or reset this anytime.
                  </p>
                </div>
              </motion.div>
            ) : (
              /* FORGOT PASSWORD VIEW */
              <motion.div
                key="forgot-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMode('login')}
                      className="p-1 rounded-lg glass-pill text-slate-400 hover:text-white transition mr-1"
                      title="Back to login"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <h2 className="text-base font-bold text-white">Reset Password</h2>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400">
                    Recovery Portal
                  </span>
                </div>

                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Reset your administrator credentials. Verification ensures that only <strong className="text-cyan-300">a.kavisri005@gmail.com</strong> can reset access.
                </p>

                {forgotSuccess && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-3.5 mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{forgotSuccess}</span>
                  </motion.div>
                )}

                {forgotError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-3.5 mb-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{forgotError}</span>
                  </motion.div>
                )}

                <form onSubmit={handleForgotSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1" htmlFor="forgot-email">
                      Admin Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="forgot-email"
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="a.kavisri005@gmail.com"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input text-slate-100 text-xs outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1" htmlFor="new-password">
                      New Password (min 6 chars)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        id="new-password"
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl glass-input text-slate-100 text-xs outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1" htmlFor="confirm-password">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <input
                        id="confirm-password"
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input text-slate-100 text-xs outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Set New Password &amp; Login</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleQuickResetToDefault}
                        className="py-2 px-2.5 rounded-xl glass-pill hover:border-cyan-500/40 text-slate-300 hover:text-white text-[11px] font-mono transition text-center"
                        title="Restore password to kavisri123"
                      >
                        Restore Default (kavisri123)
                      </button>

                      <button
                        type="button"
                        onClick={handleSendResetEmail}
                        className="py-2 px-2.5 rounded-xl glass-pill hover:border-cyan-500/40 text-cyan-300 hover:text-cyan-200 text-[11px] font-mono transition text-center flex items-center justify-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Send to Gmail</span>
                      </button>
                    </div>
                  </div>
                </form>

                <div className="mt-4 pt-3 border-t border-white/10 text-center">
                  <button
                    onClick={() => setMode('login')}
                    className="text-xs font-mono text-slate-400 hover:text-cyan-300 transition"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Access Info Footer */}
          <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-300 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin Authentication Security</span>
            </div>
            <p className="text-[10px] leading-relaxed text-slate-400">
              Only authorized administrator <strong className="text-slate-300">a.kavisri005@gmail.com</strong> can publish changes, modify project records, and edit live portfolio items.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
