import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal, ArrowUpRight, Cpu, Network, Binary } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const CurrentlyExploring: React.FC = () => {
  const { exploring } = useCMS();

  const publishedExploring = exploring.filter(item => item.is_published !== false);

  if (publishedExploring.length === 0) return null;

  return (
    <section id="exploring" className="py-14 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-purple-300 text-xs font-mono tracking-wider uppercase mb-2 border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Forward-Looking Focus</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Currently Exploring
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
              </span>
            </h3>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm max-w-md">
            Continuously advancing knowledge beyond curriculum by studying next-generation developer tooling, APIs, and AI integrations.
          </p>
        </div>

        {/* Exploring Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {publishedExploring.map((item, index) => {
            const itemTitle = item.title || item.name;

            return (
              <motion.div
                key={item.id || itemTitle}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.1 }}
                className="p-6 rounded-2xl glass-panel glass-panel-hover border-purple-500/25 hover:border-purple-400/50 shadow-lg group relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Top tag & icon */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-[10px] font-mono tracking-wider uppercase px-3 py-1 rounded-full glass-pill text-purple-200 border border-purple-500/30">
                      {item.tag || 'AI Technology'}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-300 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      {index === 0 && <Cpu className="w-4 h-4" />}
                      {index === 1 && <Binary className="w-4 h-4" />}
                      {index >= 2 && <Network className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {itemTitle}
                  </h4>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Subtle status bottom */}
                <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-purple-300/90">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                    Active Learning
                  </span>
                  <span className="text-slate-400">2026 Horizon</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
