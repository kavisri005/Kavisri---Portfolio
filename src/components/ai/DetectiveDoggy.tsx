import React from 'react';
import { motion } from 'motion/react';

interface DetectiveDoggyProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'idle' | 'investigating' | 'happy' | 'sniffing';
  className?: string;
}

export const DetectiveDoggy: React.FC<DetectiveDoggyProps> = ({
  size = 'md',
  mood = 'idle',
  className = '',
}) => {
  const dimensions = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${dimensions} ${className}`}>
      {/* Soft Ambient Detective Aura */}
      <motion.div
        animate={{
          scale: mood === 'investigating' ? [1, 1.15, 1] : [1, 1.06, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: mood === 'investigating' ? 1.5 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/30 via-amber-400/20 to-sky-400/30 blur-md pointer-events-none"
      />

      {/* SVG Detective Doggy Illustration */}
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full drop-shadow-md overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="dogFur" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" /> {/* Warm Honey Gold */}
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <linearGradient id="dogFaceLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>

          <linearGradient id="detectiveHat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="50%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          <linearGradient id="hatBand" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>

          <linearGradient id="lensGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#A16207" />
          </linearGradient>
        </defs>

        {/* Tail Wagging in Background */}
        <motion.g
          animate={{
            rotate: [0, 22, -15, 20, 0],
            originX: '95px',
            originY: '85px',
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <path
            d="M 90 85 Q 110 75 108 55 Q 104 50 98 56 Q 92 68 86 80 Z"
            fill="url(#dogFur)"
          />
          {/* Tail fluffy tip */}
          <circle cx="106" cy="54" r="5" fill="#FEF3C7" />
        </motion.g>

        {/* Dog Left Ear (Floppy Hound Ear with twitch animation) */}
        <motion.g
          animate={{
            rotate: mood === 'happy' ? [-8, 8, -8] : [-3, 3, -3],
            originX: '28px',
            originY: '42px',
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <path
            d="M 28 42 C 12 48, 8 72, 18 84 C 24 90, 34 82, 34 68 Z"
            fill="#B45309"
          />
          <path
            d="M 24 50 C 16 56, 14 74, 20 80 C 23 83, 28 78, 28 68 Z"
            fill="#F59E0B"
            opacity="0.6"
          />
        </motion.g>

        {/* Dog Right Ear (Floppy Hound Ear with slight offset twitch) */}
        <motion.g
          animate={{
            rotate: mood === 'happy' ? [8, -8, 8] : [3, -3, 3],
            originX: '92px',
            originY: '42px',
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.2,
          }}
        >
          <path
            d="M 92 42 C 108 48, 112 72, 102 84 C 96 90, 86 82, 86 68 Z"
            fill="#B45309"
          />
          <path
            d="M 96 50 C 104 56, 106 74, 100 80 C 97 83, 92 78, 92 68 Z"
            fill="#F59E0B"
            opacity="0.6"
          />
        </motion.g>

        {/* Puppy Head Base */}
        <ellipse cx="60" cy="62" rx="36" ry="32" fill="url(#dogFur)" />

        {/* Cute Face Muzzle Highlight (Heart / Pear Shape) */}
        <path
          d="M 60 52 C 48 52 40 60 40 72 C 40 82 50 88 60 88 C 70 88 80 82 80 72 C 80 60 72 52 60 52 Z"
          fill="url(#dogFaceLight)"
        />

        {/* Cheeks Blush */}
        <circle cx="42" cy="70" r="5" fill="#FDA4AF" opacity="0.65" />
        <circle cx="78" cy="70" r="5" fill="#FDA4AF" opacity="0.65" />

        {/* Big Expressive Puppy Eyes (With Blinking Animation) */}
        <motion.g
          animate={{
            scaleY: [1, 1, 0.1, 1, 1, 1, 1],
            originY: '58px',
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            times: [0, 0.45, 0.5, 0.55, 0.7, 0.85, 1],
          }}
        >
          {/* Left Eye */}
          <g>
            <ellipse cx="48" cy="58" rx="6" ry="7.5" fill="#1E1B4B" />
            <circle cx="46" cy="55" r="2.5" fill="#FFFFFF" />
            <circle cx="50" cy="61" r="1.2" fill="#67E8F9" />
          </g>

          {/* Right Eye */}
          <g>
            <ellipse cx="72" cy="58" rx="6" ry="7.5" fill="#1E1B4B" />
            <circle cx="70" cy="55" r="2.5" fill="#FFFFFF" />
            <circle cx="74" cy="61" r="1.2" fill="#67E8F9" />
          </g>
        </motion.g>

        {/* Sniffing Nose (Twitches continuously) */}
        <motion.g
          animate={{
            y: mood === 'sniffing' ? [-1.5, 1.5, -1.5] : [-0.8, 0.8, -0.8],
            scale: mood === 'sniffing' ? [1, 1.08, 1] : [1, 1.03, 1],
            originX: '60px',
            originY: '71px',
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Cute Heart-shaped Nose */}
          <path
            d="M 55 70 C 55 67 58 66 60 68 C 62 66 65 67 65 70 C 65 74 60 77 60 77 C 60 77 55 74 55 70 Z"
            fill="#18181B"
          />
          {/* Nose shine highlight */}
          <ellipse cx="58.5" cy="69" rx="1.8" ry="1" fill="#FFFFFF" opacity="0.8" />
        </motion.g>

        {/* Puppy Mouth (Smiling / Curious) */}
        <path
          d="M 60 77 L 60 80 M 54 80 Q 60 84 60 80 Q 60 84 66 80"
          stroke="#3F3F46"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cute Tongue Peeking Out when happy/investigating */}
        {(mood === 'happy' || mood === 'investigating') && (
          <motion.path
            d="M 58 81 C 58 86, 62 86, 62 81 Z"
            fill="#F43F5E"
            animate={{ scaleY: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Detective Hound Deerstalker Hat */}
        <g id="detective-hat">
          {/* Back Hat Flap / Brim */}
          <ellipse cx="60" cy="38" rx="34" ry="10" fill="url(#detectiveHat)" />

          {/* Hat Crown (Houndstooth / Brown Cap) */}
          <path
            d="M 32 38 C 32 20, 44 14, 60 14 C 76 14, 88 20, 88 38 Z"
            fill="url(#detectiveHat)"
          />

          {/* Front Curved Detective Visor */}
          <path
            d="M 28 38 Q 60 48 92 38 Q 60 43 28 38 Z"
            fill="#5B21B6"
            opacity="0.15"
          />
          <path
            d="M 30 38 Q 60 47 90 38 Q 60 41 30 38 Z"
            fill="#451A03"
          />

          {/* Cyan High-Tech Band on Hat */}
          <path
            d="M 33 36 Q 60 42 87 36 Q 60 38 33 36 Z"
            fill="url(#hatBand)"
          />

          {/* Hat Ribbon / Top Button Bow */}
          <circle cx="60" cy="14" r="3.5" fill="#FDE047" />
          <path
            d="M 56 14 Q 52 11 50 14 Q 54 16 57 15 Z M 64 14 Q 68 11 70 14 Q 66 16 63 15 Z"
            fill="#FDE047"
          />
        </g>

        {/* Detective Trench Collar & Golden Badge */}
        <g id="trench-collar">
          {/* Blue / Slate Coat Neck */}
          <path
            d="M 40 88 L 32 108 L 88 108 L 80 88 Z"
            fill="#0F172A"
          />
          {/* Coat Lapels */}
          <path
            d="M 42 88 L 52 108 L 60 96 L 68 108 L 78 88 Z"
            fill="#1E293B"
          />
          {/* Golden Detective Badge */}
          <circle cx="60" cy="98" r="4.5" fill="url(#goldRim)" />
          <polygon
            points="60,95.5 61,97.5 63,97.5 61.5,98.8 62,100.8 60,99.5 58,100.8 58.5,98.8 57,97.5 59,97.5"
            fill="#451A03"
          />
        </g>

        {/* Magnifying Glass (Investigative Tool in Foreground Paw) */}
        <motion.g
          animate={
            mood === 'investigating'
              ? {
                  rotate: [-15, 20, -10, 15, -15],
                  x: [0, 4, -3, 2, 0],
                  y: [0, -4, 2, -2, 0],
                  originX: '85px',
                  originY: '88px',
                }
              : {
                  rotate: [-4, 6, -4],
                  originX: '85px',
                  originY: '88px',
                }
          }
          transition={{
            duration: mood === 'investigating' ? 2.5 : 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Paw holding the magnifying handle */}
          <ellipse cx="84" cy="92" rx="7" ry="5" fill="url(#dogFur)" />
          <circle cx="81" cy="91" r="1.8" fill="#FDE68A" />
          <circle cx="84" cy="90" r="1.8" fill="#FDE68A" />
          <circle cx="87" cy="91" r="1.8" fill="#FDE68A" />

          {/* Magnifying Glass Handle */}
          <line
            x1="84"
            y1="90"
            x2="98"
            y2="76"
            stroke="#78350F"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            x1="84"
            y1="90"
            x2="98"
            y2="76"
            stroke="#FDE047"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Magnifying Glass Gold Rim */}
          <circle
            cx="100"
            cy="72"
            r="15"
            fill="none"
            stroke="url(#goldRim)"
            strokeWidth="4"
          />

          {/* Magnifying Lens Glowing Glass */}
          <circle
            cx="100"
            cy="72"
            r="13"
            fill="url(#lensGlass)"
          />

          {/* Lens Flare / Clue Reflection */}
          <ellipse
            cx="96"
            cy="67"
            rx="5"
            ry="2.5"
            transform="rotate(-35 96 67)"
            fill="#FFFFFF"
            opacity="0.75"
          />
          <circle cx="104" cy="76" r="1.8" fill="#FFFFFF" opacity="0.6" />

          {/* Sparkle star on lens */}
          <path
            d="M 96 64 Q 96 67 93 67 Q 96 67 96 70 Q 96 67 99 67 Q 96 67 96 64 Z"
            fill="#FFFFFF"
          />
        </motion.g>
      </svg>
    </div>
  );
};
