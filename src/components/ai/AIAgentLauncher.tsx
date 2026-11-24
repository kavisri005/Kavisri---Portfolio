import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Move } from 'lucide-react';
import { DetectiveDoggy } from './DetectiveDoggy';

interface AIAgentLauncherProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const AIAgentLauncher: React.FC<AIAgentLauncherProps> = ({ onOpen, isOpen }) => {
  const [showBubble, setShowBubble] = useState(true);
  const [bubbleTextIndex, setBubbleTextIndex] = useState(0);

  const BUBBLE_TEXTS = [
    "Ask me anything about Kavisri in any language!",
    "Explore live projects, skills, 8.33 CGPA & internships.",
    "Drag me anywhere on your screen!",
  ];

  // Auto cycle speech bubble clue text
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbleTextIndex((prev) => (prev + 1) % BUBBLE_TEXTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Hide speech bubble when chat opens
  useEffect(() => {
    if (isOpen) {
      setShowBubble(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 14000);
    return () => clearTimeout(timer);
  }, []);

  if (isOpen) return null; // Hidden when chat popover is active

  return (
    <motion.div 
      drag
      dragMomentum={false}
      dragElastic={0.08}
      whileDrag={{ scale: 1.06, cursor: 'grabbing' }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 select-none pointer-events-auto cursor-grab active:cursor-grabbing touch-none"
      title="Detective Doggy AI Assistant (Drag to reposition)"
    >
      {/* Interactive Speech Clue Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, y: 5 }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            className="relative max-w-[200px] sm:max-w-[230px] p-2.5 rounded-2xl glass-card border border-cyan-500/40 shadow-xl shadow-cyan-950/50 text-xs text-slate-200 backdrop-blur-xl bg-[#090e18]/95 cursor-pointer hover:border-cyan-400 transition group"
            onClick={() => {
              setShowBubble(false);
              onOpen();
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
              }}
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white/15 hover:bg-white/30 text-slate-300 flex items-center justify-center text-[9px] transition cursor-pointer"
              title="Close notification"
            >
              <X className="w-2.5 h-2.5" />
            </button>

            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-cyan-400 to-sky-500 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Sparkles className="w-3 h-3 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <p className="font-bold text-cyan-300 text-[11px] leading-tight">
                    Detective Doggy
                  </p>
                  <span className="text-[9px] text-slate-400 font-mono flex items-center gap-0.5">
                    <Move className="w-2.5 h-2.5" />
                  </span>
                </div>
                <p className="text-slate-300 text-[10px] leading-snug mt-0.5">
                  {BUBBLE_TEXTS[bubbleTextIndex]}
                </p>
              </div>
            </div>

            {/* Pointer arrow pointing to doggy */}
            <div className="absolute -bottom-1.5 right-5 sm:right-6 w-3 h-3 bg-[#090e18] border-r border-b border-cyan-500/40 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating breathing animation wrapper */}
      <div className="flex items-center justify-center relative group">
        {/* Round-Shaped Detective Live Doggy Floating Button */}
        <motion.button
          id="detective-doggy-launcher-btn"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          onClick={(e) => {
            // Prevent triggering on pure drag release if moved
            setShowBubble(false);
            onOpen();
          }}
          className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#0c1322] via-[#0f1b2d] to-[#08101e] border-2 border-cyan-400/60 hover:border-cyan-300 p-1 shadow-2xl shadow-cyan-500/30 flex items-center justify-center cursor-pointer overflow-visible"
          title="Detective Doggy AI (Drag to move, Click to chat)"
          aria-label="Open Detective Doggy AI Chatbot"
        >
          {/* Glowing Pulsing Ring */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/30 via-sky-400/20 to-amber-400/30 blur-md group-hover:opacity-100 opacity-70 transition animate-pulse pointer-events-none" />

          {/* Live Animated Detective Doggy Character */}
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <DetectiveDoggy size="md" mood="idle" className="w-full h-full scale-90 sm:scale-100" />
          </div>

          {/* Mini Drag Indicator badge */}
          <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-cyan-950 border border-cyan-400/50 text-cyan-300 flex items-center justify-center text-[8px] opacity-0 group-hover:opacity-100 transition shadow-sm">
            <Move className="w-2.5 h-2.5" />
          </span>

          {/* Online Clue Status Dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-400 border-2 border-[#090e18] rounded-full shadow-sm flex items-center justify-center">
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-slate-950" />
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

