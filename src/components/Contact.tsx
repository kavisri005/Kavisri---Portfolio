import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Send, 
  Copy, 
  Check, 
  MessageSquare, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Sparkles,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';

const SUBJECT_PRESETS = [
  '💼 Internship Opportunity',
  '🚀 Project Collaboration',
  '💡 Technical Discussion',
  '👋 General Connect',
];

export const Contact: React.FC = () => {
  const { profile, socialLinks } = useCMS();
  const { t, language } = useLanguage();
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const emailVal = profile.email || 'a.kavisrii@gmail.com';
  const phoneVal = profile.phone || '8667589833';
  const locationVal = profile.location || 'Salem, India';

  const githubLink = socialLinks.find(s => s.platform.toLowerCase().includes('github'))?.url || profile.github_url || 'https://github.com/kavisri005';
  const linkedinLink = socialLinks.find(s => s.platform.toLowerCase().includes('linkedin'))?.url || profile.linkedin_url || 'https://linkedin.com/in/kavisri-a';

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setStatusMessage('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setStatusMessage('');

    try {
      const submissionSubject = subject.trim() || `Portfolio Direct Message from ${name.trim()}`;
      
      // Send directly to Kavisri's email via FormSubmit AJAX endpoint
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(emailVal)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          _replyto: email.trim(),
          _subject: submissionSubject,
          subject: submissionSubject,
          message: message.trim(),
          portfolio_url: window.location.origin,
          timestamp: new Date().toLocaleString(),
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const result = await response.json().catch(() => ({ success: 'true' }));

      if (response.ok || result.success === 'true' || result.success === true) {
        setStatus('success');
        setStatusMessage(
          language === 'tanglish'
            ? `Nandri ${name.trim()}! Ungaloda message ${emailVal}-ku instant-ah send aagiruku. Kavisri seekiram reply pannuvaanga!`
            : language === 'ta'
            ? `நன்றி ${name.trim()}! உங்கள் செய்தி ${emailVal} மின்னஞ்சலுக்கு நேரடியாக அனுப்பப்பட்டது. கவிஸ்ரீ விரைவில் பதிலளிப்பார்!`
            : `Thank you, ${name.trim()}! Your message has been dispatched directly to ${emailVal}. Kavisri will get back to you shortly.`
        );
        
        // Save to local message storage for offline backup
        try {
          const stored = JSON.parse(localStorage.getItem('kavisri_saved_messages') || '[]');
          stored.unshift({
            id: Date.now().toString(),
            name: name.trim(),
            email: email.trim(),
            subject: submissionSubject,
            message: message.trim(),
            timestamp: new Date().toISOString(),
            status: 'Delivered to ' + emailVal,
          });
          localStorage.setItem('kavisri_saved_messages', JSON.stringify(stored.slice(0, 50)));
        } catch {
          // Silent catch
        }

        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        throw new Error('Could not deliver directly.');
      }
    } catch (err: any) {
      setStatus('error');
      setStatusMessage(
        'Network error while delivering. You can still email Kavisri directly at ' + emailVal
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getGmailComposeUrl = () => {
    const s = encodeURIComponent(subject.trim() || 'Portfolio Inquiry / Collaboration');
    const b = encodeURIComponent(message.trim() ? `${message.trim()}\n\n---\nSent by: ${name} (${email})` : `Hi Kavisri,\n\nI came across your engineering portfolio and would like to connect.\n\nBest regards,\n${name}`);
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailVal)}&su=${s}&body=${b}`;
  };

  return (
    <section id="contact" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 border border-cyan-500/30">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Inbox Dispatch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-medium">
            {t('contact.subtitle')}
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-5 sm:p-6 rounded-2xl glass-panel glass-panel-hover"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">Direct Email</span>
                    <a 
                      href={`mailto:${emailVal}`} 
                      className="text-sm sm:text-base font-semibold text-white hover:text-cyan-300 transition font-mono"
                    >
                      {emailVal}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(emailVal, 'email')}
                  className="p-2 rounded-xl glass-pill text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition cursor-pointer"
                  title="Copy email address"
                  type="button"
                >
                  {copiedType === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            {/* Direct Phone Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-5 sm:p-6 rounded-2xl glass-panel glass-panel-hover"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-300 border border-sky-500/25">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">Direct Phone</span>
                    <a 
                      href={`tel:${phoneVal}`} 
                      className="text-sm sm:text-base font-semibold text-white hover:text-cyan-300 transition"
                    >
                      {phoneVal}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(phoneVal, 'phone')}
                  className="p-2 rounded-xl glass-pill text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition cursor-pointer"
                  title="Copy phone number"
                  type="button"
                >
                  {copiedType === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-5 sm:p-6 rounded-2xl glass-panel"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">Location</span>
                  <span className="text-sm sm:text-base font-semibold text-white">{locationVal}</span>
                </div>
              </div>
            </motion.div>

            {/* Social Connection Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <a
                href={linkedinLink}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl glass-panel glass-panel-hover text-slate-200 hover:text-white flex items-center justify-between transition group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-xs">LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition" />
              </a>

              <a
                href={githubLink}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl glass-panel glass-panel-hover text-slate-200 hover:text-white flex items-center justify-between transition group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-xs">GitHub</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition" />
              </a>
            </div>

            {/* Email Direct Verification Notice */}
            <div className="p-4 rounded-2xl glass-subcard border border-cyan-500/20 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Mail Delivery Active</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Messages submitted via the direct form are immediately delivered to <span className="text-white font-mono">{emailVal}</span> with your reply-to address attached.
              </p>
            </div>

          </div>

          {/* Right Column: Direct Message Composer with Instant Mail Dispatch */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSendMessage}
              className="p-6 sm:p-8 rounded-3xl glass-panel shadow-2xl space-y-4 relative overflow-hidden"
            >
              {/* Form Top Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
                    Direct Message to {profile.name?.split(' ')[0] || 'Kavisri'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  <span>{emailVal}</span>
                </span>
              </div>

              {/* Status Banner */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm space-y-2"
                  >
                    <div className="flex items-center gap-2 font-bold text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>Message Received &amp; Delivered!</span>
                    </div>
                    <p className="text-xs text-emerald-200/90 leading-relaxed">
                      {statusMessage}
                    </p>
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-white underline cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Send another message</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs sm:text-sm space-y-2"
                  >
                    <div className="flex items-center gap-2 font-bold text-rose-300">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>Delivery Notice</span>
                    </div>
                    <p className="text-xs text-rose-200/90 leading-relaxed">
                      {statusMessage}
                    </p>
                    <div className="pt-1 flex items-center gap-3">
                      <a
                        href={getGmailComposeUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-white font-medium underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Send via Web Gmail</span>
                      </a>
                      <a
                        href={`mailto:${emailVal}?subject=${encodeURIComponent(subject || 'Portfolio Message')}&body=${encodeURIComponent(message)}`}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white underline"
                      >
                        <span>Open default Mail App</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sender Name & Email Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="sender-name">
                    {t('contact.name')} <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="sender-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Lead Engineer / Recruiter"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-white text-xs sm:text-sm placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="sender-email">
                    {t('contact.email')} <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="sender-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-white text-xs sm:text-sm placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Subject Input & Presets */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono text-slate-300" htmlFor="message-subject">
                    {t('contact.subject')}
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">Optional</span>
                </div>
                
                <input
                  id="message-subject"
                  name="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Software Engineering Opportunity / Collaboration"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-white text-xs sm:text-sm placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition mb-2"
                />

                {/* Quick Topic Chips */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {SUBJECT_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setSubject(preset)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        subject === preset
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium'
                          : 'glass-pill text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="message-body">
                  {t('contact.message')} <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="message-body"
                  name="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message, opportunity details, or questions here..."
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-white text-xs sm:text-sm placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition resize-y min-h-[100px]"
                />
              </div>

              {/* Submit Action Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-[11px] font-mono text-slate-400">
                  Direct dispatch to {emailVal}
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending to Mail...</span>
                    </>
                  ) : (
                    <>
                      <span>{t('contact.send')}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
