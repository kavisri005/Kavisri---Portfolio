import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  X, 
  Send, 
  User as UserIcon, 
  ArrowRight, 
  RotateCcw, 
  GripHorizontal,
  Globe2,
  CheckCircle2,
  Move
} from 'lucide-react';
import { KNOWLEDGE_BASE, QUICK_CLUES, KnowledgeResponse } from './knowledgeBase';
import { DetectiveDoggy } from './DetectiveDoggy';
import { formatAIResponse, detectMessageLanguage, DetectedLang } from '../../utils/aiResponseFormatter';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  detectedLang?: string;
  action?: KnowledgeResponse['action'];
  relatedSuggestions?: string[];
  timestamp: Date;
}

interface PortfolioAIAgentProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export const PortfolioAIAgent: React.FC<PortfolioAIAgentProps> = ({ 
  isOpen, 
  onClose, 
  onOpenResume 
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentLang, setCurrentLang] = useState<string>('English');
  const [doggyMood, setDoggyMood] = useState<'idle' | 'investigating' | 'happy' | 'sniffing'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input when opened and initialize welcome greeting
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      if (messages.length === 0) {
        const welcomeText = formatAIResponse(
          "Hello! I am Detective Doggy, Kavisri A's portfolio assistant. Kavisri is a Computer Science and Engineering undergraduate at M.A.M. College of Engineering and Technology with an 8.33/10 CGPA and hands-on experience in React.js, Python, Flask, SQL, REST APIs, and database systems.\n\nAsk me about her projects, skills, education, internships, or contact details."
        );

        setMessages([
          {
            id: 'init-1',
            sender: 'ai',
            text: welcomeText,
            detectedLang: 'English',
            timestamp: new Date(),
            relatedSuggestions: [
              'Tell me about Kavisri',
              'What are her top projects?',
              'What is her tech stack?',
              'How to contact Kavisri?'
            ]
          }
        ]);
      }
    }
  }, [isOpen]);

  // Match query with server-side AI endpoint with fast detective fallback
  const processQuery = async (rawQuery: string) => {
    const q = rawQuery.trim();
    if (!q) return;

    const detection = detectMessageLanguage(q);
    setCurrentLang(detection.label);
    const lower = q.toLowerCase();

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      detectedLang: detection.label,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);
    setDoggyMood('investigating');

    try {
      // Build history for context
      const history = messages.slice(-6).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q, history })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          const cleanReply = formatAIResponse(data.reply);
          const aiMsg: Message = {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: cleanReply,
            detectedLang: detection.label,
            action: data.action,
            relatedSuggestions: data.relatedSuggestions || ['What are her top projects?', 'What is her tech stack?', 'How to contact Kavisri?'],
            timestamp: new Date()
          };

          setMessages(prev => [...prev, aiMsg]);
          setIsTyping(false);
          setDoggyMood('happy');
          setTimeout(() => setDoggyMood('idle'), 3000);
          return;
        }
      }
    } catch {
      // Fall through to local detective knowledge engine
    }

    // Local fallback matching
    let matchedKey = 'about';

    if (lower.includes('project') || lower.includes('iot') || lower.includes('agriculture') || lower.includes('tracker') || lower.includes('thittam') || lower.includes('velai') || lower.includes('work') || lower.includes('app')) {
      if (lower.includes('agri') || lower.includes('farm') || lower.includes('soil') || lower.includes('water') || lower.includes('vivasaayam')) {
        matchedKey = 'agriculture';
      } else {
        matchedKey = 'projects';
      }
    } else if (lower.includes('skill') || lower.includes('tech') || lower.includes('python') || lower.includes('java') || lower.includes('react') || lower.includes('sql') || lower.includes('theriyum') || lower.includes('knowledge') || lower.includes('stack') || lower.includes('hunaar')) {
      matchedKey = 'skills';
    } else if (lower.includes('cgpa') || lower.includes('college') || lower.includes('degree') || lower.includes('mamcet') || lower.includes('mam') || lower.includes('education') || lower.includes('school') || lower.includes('padikira') || lower.includes('mark') || lower.includes('padai') || lower.includes('marks')) {
      matchedKey = 'education';
    } else if (lower.includes('experience') || lower.includes('intern') || lower.includes('codealpha') || lower.includes('anubavam') || lower.includes('anubhav')) {
      matchedKey = 'experience';
    } else if (lower.includes('contact') || lower.includes('email') || lower.includes('mail') || lower.includes('phone') || lower.includes('number') || lower.includes('hire') || lower.includes('reach') || lower.includes('pesa') || lower.includes('thodharbu') || lower.includes('call') || lower.includes('sampark')) {
      if (lower.includes('hire') || lower.includes('job') || lower.includes('role') || lower.includes('opportunity') || lower.includes('naukri')) {
        matchedKey = 'hire';
      } else {
        matchedKey = 'contact';
      }
    } else if (lower.includes('resume') || lower.includes('cv') || lower.includes('pdf') || lower.includes('download')) {
      matchedKey = 'resume';
    } else if (lower.includes('hi') || lower.includes('hello') || lower.includes('vanakkam') || lower.includes('hey') || lower.includes('kavi') || lower.includes('namaste')) {
      matchedKey = 'about';
    }

    const match = KNOWLEDGE_BASE[matchedKey] || KNOWLEDGE_BASE.about;
    
    let rawResponseText = match.en;
    if (detection.code === 'tanglish' && match.tanglish) {
      rawResponseText = match.tanglish;
    } else if (detection.code === 'ta' && match.ta) {
      rawResponseText = match.ta;
    } else if (detection.code === 'hi' && match.hi) {
      rawResponseText = match.hi;
    }

    const cleanReply = formatAIResponse(rawResponseText);

    const aiMsg: Message = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: cleanReply,
      detectedLang: detection.label,
      action: match.action,
      relatedSuggestions: match.relatedSuggestions,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
    setDoggyMood('happy');
    setTimeout(() => setDoggyMood('idle'), 3000);
  };

  const handleActionClick = (action: KnowledgeResponse['action']) => {
    if (!action) return;
    if (action.type === 'modal' && action.target === 'resume') {
      onOpenResume();
    } else if (action.type === 'scroll') {
      const el = document.querySelector(action.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const clearChat = () => {
    setDoggyMood('sniffing');
    const resetText = formatAIResponse(
      "Chat history cleared. Ask Detective Doggy about Kavisri's listed web projects, technical skills, internships, education, or contact details."
    );
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'ai',
        text: resetText,
        detectedLang: 'English',
        timestamp: new Date(),
        relatedSuggestions: [
          'What are her top projects?',
          'What is her tech stack?',
          'How to contact Kavisri?'
        ]
      }
    ]);
    setTimeout(() => setDoggyMood('idle'), 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Draggable Popover Window with High Precision Controls */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.05}
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
        className="fixed bottom-5 right-5 z-50 w-[360px] sm:w-[410px] max-w-[calc(100vw-24px)] h-[520px] max-h-[82vh] flex flex-col glass-panel rounded-3xl border-2 border-cyan-400/50 shadow-2xl shadow-cyan-950/70 overflow-hidden bg-[#090e18]/98 backdrop-blur-2xl touch-none"
      >
        {/* Draggable Header Bar with Live Detective Doggy and Drag Handle */}
        <div className="px-3.5 py-2.5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-cyan-950/50 via-slate-900/70 to-slate-900/60 backdrop-blur-md cursor-grab active:cursor-grabbing select-none">
          <div className="flex items-center gap-2.5">
            {/* Live Round Detective Doggy Avatar */}
            <div className="relative w-9 h-9 rounded-full bg-slate-900 border border-cyan-400/50 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <DetectiveDoggy size="sm" mood={doggyMood} className="w-full h-full" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border border-[#090e18] rounded-full animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-extrabold text-white tracking-tight flex items-center gap-1">
                  <span>Detective Doggy</span>
                </h3>
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-0.5">
                  <Globe2 className="w-2.5 h-2.5" />
                  <span>Multilingual AI</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-mono">
                <span>Active Language:</span>
                <span className="text-cyan-300 font-semibold">{currentLang}</span>
              </div>
            </div>
          </div>

          {/* Action buttons (Drag Grip indicator, Clear, Close) */}
          <div className="flex items-center gap-1">
            {/* Drag Handle Indicator */}
            <div 
              className="p-1 text-slate-400 hover:text-cyan-300 transition" 
              title="Click and hold anywhere on this header to drag"
            >
              <GripHorizontal className="w-4 h-4 opacity-70" />
            </div>

            <button
              onClick={clearChat}
              title="Clear Chat History"
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-white/10 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              title="Minimize & Close"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs scroll-smooth cursor-default select-text">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-6 h-6 rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[11px]">🐾</span>
                </div>
              )}

              <div className={`max-w-[85%] space-y-1.5`}>
                {/* Language Tag if present */}
                {msg.detectedLang && msg.detectedLang !== 'English' && (
                  <div className={`text-[9px] font-mono text-cyan-300 flex items-center gap-1 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <Globe2 className="w-2.5 h-2.5" />
                    <span>{msg.detectedLang} detected</span>
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl leading-relaxed shadow-md text-xs transition-all ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-semibold rounded-tr-none'
                      : 'bg-slate-900/90 text-slate-200 border border-white/10 rounded-tl-none font-normal'
                  }`}
                >
                  {/* Clean paragraph rendering */}
                  {msg.text.split('\n\n').map((para, pIdx) => (
                    <p key={pIdx} className={pIdx > 0 ? 'mt-2' : ''}>
                      {para}
                    </p>
                  ))}
                </div>

                {/* Interactive Action Clue Button */}
                {msg.action && (
                  <motion.button
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handleActionClick(msg.action)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500 hover:text-slate-950 transition font-bold text-[11px] shadow-sm group cursor-pointer"
                  >
                    <span>{msg.action.label.en}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                )}

                {/* Related Prompt Suggestions */}
                {msg.relatedSuggestions && msg.relatedSuggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {msg.relatedSuggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => processQuery(sug)}
                        className="text-[10px] px-2 py-0.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-200 border border-white/5 hover:border-cyan-500/30 transition cursor-pointer"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5 text-cyan-300">
                  <UserIcon className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {/* Typing State */}
          {isTyping && (
            <div className="flex gap-2 justify-start items-center">
              <div className="w-6 h-6 rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center shrink-0">
                <span className="text-[11px] animate-spin">🔍</span>
              </div>
              <div className="px-3 py-2 rounded-2xl bg-slate-900/90 border border-white/10 text-cyan-400 flex items-center gap-1.5 text-[11px] font-mono">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-slate-300 text-[10px]">Processing response...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Clue Chips Dock */}
        <div className="px-3 py-1.5 border-t border-white/10 bg-white/[0.02] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-cyan-400 shrink-0 flex items-center gap-0.5">
            <span>Quick:</span>
          </span>
          {QUICK_CLUES.map((clue, idx) => (
            <button
              key={idx}
              onClick={() => processQuery(clue)}
              className="whitespace-nowrap px-2 py-0.5 rounded-full text-[10px] bg-white/5 hover:bg-cyan-500/20 hover:border-cyan-500/40 border border-white/10 text-slate-300 hover:text-cyan-200 transition cursor-pointer"
            >
              {clue}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            processQuery(inputQuery);
          }}
          className="p-2.5 border-t border-white/10 bg-slate-950/90 flex items-center gap-1.5"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask Detective Doggy in any language..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="p-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 font-bold hover:opacity-95 disabled:opacity-30 disabled:cursor-not-allowed transition shadow-md shadow-cyan-500/20 cursor-pointer"
            title="Send Message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

