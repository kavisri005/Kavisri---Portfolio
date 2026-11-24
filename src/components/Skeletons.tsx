import React from 'react';
import { motion } from 'motion/react';
import { FolderGit2, Milestone, Sparkles } from 'lucide-react';

export const ShimmerBar: React.FC<{ className?: string }> = ({ className = 'h-4 w-full' }) => (
  <div className={`relative overflow-hidden rounded-md bg-white/[0.06] dark:bg-white/[0.05] ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/15 dark:via-cyan-400/10 to-transparent" />
  </div>
);

export const ProjectCardSkeleton: React.FC<{ index?: number }> = ({ index = 0 }) => {
  const isReversed = index % 2 !== 0;

  return (
    <div className="rounded-3xl glass-panel p-6 sm:p-9 shadow-2xl relative overflow-hidden border border-white/10 dark:border-white/5">
      {/* Ambient glass shimmer background */}
      <div className="absolute inset-0 pointer-events-none -translate-x-full animate-[shimmer_2.2s_infinite] bg-gradient-to-r from-transparent via-cyan-400/[0.04] to-transparent" />

      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Left Column: Details Skeleton */}
        <div className={`lg:col-span-6 space-y-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
          {/* Header Tag and Number */}
          <div className="flex items-center justify-between">
            <div className="h-6 w-28 rounded-full glass-pill flex items-center px-3">
              <ShimmerBar className="h-3 w-16 rounded" />
            </div>
            <ShimmerBar className="h-3 w-20 rounded" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <ShimmerBar className="h-7 w-3/4 rounded-lg" />
          </div>

          {/* Description Multi-line */}
          <div className="space-y-2">
            <ShimmerBar className="h-4 w-full rounded" />
            <ShimmerBar className="h-4 w-5/6 rounded" />
            <ShimmerBar className="h-4 w-4/6 rounded" />
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            <ShimmerBar className="h-6 w-16 rounded-lg" />
            <ShimmerBar className="h-6 w-20 rounded-lg" />
            <ShimmerBar className="h-6 w-14 rounded-lg" />
            <ShimmerBar className="h-6 w-24 rounded-lg" />
          </div>

          {/* Contributions Box Skeleton */}
          <div className="pt-2 space-y-2">
            <ShimmerBar className="h-3 w-32 rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-3 rounded-xl glass-subcard flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-cyan-500/20 shrink-0 animate-pulse" />
                <ShimmerBar className="h-3 w-full rounded" />
              </div>
              <div className="p-3 rounded-xl glass-subcard flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-cyan-500/20 shrink-0 animate-pulse" />
                <ShimmerBar className="h-3 w-4/5 rounded" />
              </div>
            </div>
          </div>

          {/* CTA Button Skeleton */}
          <div className="pt-2">
            <div className="h-10 w-44 rounded-xl glass-pill flex items-center px-4">
              <ShimmerBar className="h-4 w-28 rounded" />
            </div>
          </div>
        </div>

        {/* Right Column: Realistic Mockup Viewport Skeleton */}
        <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-4 sm:p-5 h-[280px] sm:h-[320px] flex flex-col justify-between relative overflow-hidden shadow-inner">
            {/* Mockup browser/dashboard topbar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
              </div>
              <ShimmerBar className="h-3 w-36 rounded-full" />
              <div className="w-4 h-4 rounded-full bg-white/10" />
            </div>

            {/* Inner Dashboard Wireframe Grid */}
            <div className="space-y-3 my-auto py-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="h-16 rounded-xl glass-subcard p-2 space-y-1">
                  <ShimmerBar className="h-2.5 w-10 rounded" />
                  <ShimmerBar className="h-5 w-14 rounded" />
                </div>
                <div className="h-16 rounded-xl glass-subcard p-2 space-y-1">
                  <ShimmerBar className="h-2.5 w-10 rounded" />
                  <ShimmerBar className="h-5 w-12 rounded" />
                </div>
                <div className="h-16 rounded-xl glass-subcard p-2 space-y-1">
                  <ShimmerBar className="h-2.5 w-10 rounded" />
                  <ShimmerBar className="h-5 w-16 rounded" />
                </div>
              </div>

              <div className="h-24 rounded-xl glass-subcard p-3 flex flex-col justify-end space-y-2">
                <div className="flex items-end gap-2 h-14 pt-2">
                  <div className="w-1/6 h-[60%] rounded-t bg-cyan-500/20 animate-pulse" />
                  <div className="w-1/6 h-[85%] rounded-t bg-sky-500/25 animate-pulse" />
                  <div className="w-1/6 h-[45%] rounded-t bg-cyan-500/20 animate-pulse" />
                  <div className="w-1/6 h-[95%] rounded-t bg-teal-500/30 animate-pulse" />
                  <div className="w-1/6 h-[70%] rounded-t bg-sky-500/25 animate-pulse" />
                  <div className="w-1/6 h-[80%] rounded-t bg-cyan-500/30 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <ShimmerBar className="h-2.5 w-24 rounded" />
              <ShimmerBar className="h-2.5 w-16 rounded" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export const ProjectsSkeleton: React.FC<{ count?: number }> = ({ count = 2 }) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} index={i} />
      ))}
    </div>
  );
};

export const ExperienceSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="relative animate-in fade-in duration-500">
      {/* Vertical glowing center line */}
      <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-400/40 via-sky-500/40 to-indigo-500/20 opacity-60" />

      <div className="space-y-12 sm:space-y-16">
        {Array.from({ length: count }).map((_, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={index} className="relative flex flex-col md:flex-row items-center">
              {/* Timeline Node Icon Skeleton */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full glass-panel border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/10 z-20">
                <div className="w-4 h-4 rounded-full bg-cyan-400/30 animate-ping" />
              </div>

              {/* Card wrapper */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                <div className="rounded-3xl glass-panel p-6 sm:p-8 shadow-xl space-y-4 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none -translate-x-full animate-[shimmer_2.2s_infinite] bg-gradient-to-r from-transparent via-cyan-400/[0.04] to-transparent" />

                  {/* Year badge */}
                  <div className={`flex items-center gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                    <div className="h-6 w-24 rounded-full glass-pill flex items-center px-3">
                      <ShimmerBar className="h-3 w-16 rounded" />
                    </div>
                    <div className="h-6 w-20 rounded-full glass-pill flex items-center px-3">
                      <ShimmerBar className="h-3 w-12 rounded" />
                    </div>
                  </div>

                  {/* Title & Company */}
                  <div className={`space-y-2 ${isEven ? 'md:items-end' : 'items-start'}`}>
                    <ShimmerBar className={`h-6 w-48 rounded ${isEven ? 'md:ml-auto' : ''}`} />
                    <div className={`flex items-center gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                      <ShimmerBar className="h-3.5 w-28 rounded" />
                      <ShimmerBar className="h-3.5 w-20 rounded" />
                    </div>
                  </div>

                  {/* Responsibilities list */}
                  <div className="space-y-2 pt-2 text-left">
                    <div className="p-2.5 rounded-xl glass-subcard flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-cyan-400/20 shrink-0" />
                      <ShimmerBar className="h-3 w-full rounded" />
                    </div>
                    <div className="p-2.5 rounded-xl glass-subcard flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-cyan-400/20 shrink-0" />
                      <ShimmerBar className="h-3 w-5/6 rounded" />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
