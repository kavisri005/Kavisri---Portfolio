import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface SectionDividerProps {
  icon?: LucideIcon;
  symbol?: string;
  label?: string;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  icon: Icon,
  symbol,
  label,
  className = 'my-4 sm:my-8',
}) => {
  return (
    <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center select-none overflow-hidden ${className}`}>
      {/* Left Beam */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-cyan-400/60" />

      {/* Center Glass Accent Badge / Node */}
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className="mx-3 sm:mx-4 px-3 py-1 rounded-full glass-pill border border-cyan-500/30 bg-black/40 backdrop-blur-md flex items-center gap-1.5 shadow-[0_0_12px_rgba(56,189,248,0.15)] group cursor-default"
      >
        {/* Pulsing micro-node */}
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-80" />
        
        {Icon && (
          <Icon className="w-3.5 h-3.5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
        )}
        {symbol && (
          <span className="text-[11px] font-mono font-bold text-cyan-300 tracking-wider">
            {symbol}
          </span>
        )}
        {label && (
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-slate-200 transition-colors">
            {label}
          </span>
        )}
      </motion.div>

      {/* Right Beam */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-400/60 via-cyan-500/30 to-transparent" />
    </div>
  );
};
