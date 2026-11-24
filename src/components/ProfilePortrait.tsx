import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Sparkles, X, Maximize2, Award, CheckCircle2 } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface ProfilePortraitProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'about';
  showBadge?: boolean;
  allowZoom?: boolean;
}

export const ProfilePortrait: React.FC<ProfilePortraitProps> = ({ 
  className = '', 
  size = 'hero',
  showBadge = true,
  allowZoom = true
}) => {
  const { profile } = useCMS();
  const [imgError, setImgError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const customImgUrl = profile.profile_image_url;

  // Render when custom user photo exists
  if (customImgUrl && !imgError) {
    return (
      <>
        <div 
          onClick={() => allowZoom && setIsZoomed(true)}
          className={`relative group ${allowZoom ? 'cursor-pointer' : ''} ${className}`}
        >
          <img
            src={customImgUrl}
            alt={profile.name || 'Kavisri A'}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top rounded-2xl shadow-xl transition-all duration-300 group-hover:scale-105"
          />
          {allowZoom && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center backdrop-blur-xs">
              <span className="p-2 rounded-full bg-slate-900/80 text-cyan-300 border border-cyan-500/40 shadow-lg">
                <Maximize2 className="w-4 h-4" />
              </span>
            </div>
          )}
          {showBadge && (
            <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full glass-pill border border-cyan-500/40 text-[10px] font-mono text-cyan-300 flex items-center gap-1 shadow-lg backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>CSE '27</span>
            </div>
          )}
        </div>

        {/* Full View Lightbox Modal */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-lg w-full rounded-3xl overflow-hidden glass-panel border border-cyan-500/40 shadow-2xl p-2 bg-[#090e18]"
              >
                <button
                  onClick={() => setIsZoomed(false)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <img
                  src={customImgUrl}
                  alt={profile.name || 'Kavisri A'}
                  className="w-full h-auto max-h-[75vh] object-cover rounded-2xl"
                />
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold text-base">{profile.name || 'Kavisri A'}</h4>
                    <p className="text-cyan-300 text-xs font-mono">Computer Science Engineering • 8.33 CGPA</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    M.A.M. College of Engg &amp; Tech
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Authentic stylized vector portrait matching Kavisri's photo:
  // - Magenta/Pink kurta with intricate gold neck embroidery
  // - Gold/Yellow dupatta draped elegantly over shoulder
  // - Long dark wavy curly hair with braided top crown
  // - Gold jhumka earrings & glass bangles
  // - Radiant warm smile
  // - Golden hour ambient lighting
  return (
    <>
      <div 
        onClick={() => allowZoom && setIsZoomed(true)}
        className={`relative overflow-hidden rounded-3xl group ${allowZoom ? 'cursor-pointer' : ''} ${className}`}
      >
        
        {/* Ambient background glow matching warm golden hour bokeh */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/80 via-slate-900 to-amber-950/40" />
        
        {/* Subtle bokeh particles */}
        <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full bg-amber-500/25 blur-2xl animate-pulse" />
        <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-full bg-cyan-500/25 blur-2xl" />

        {/* Stylized Portrait Visual */}
        <svg 
          viewBox="0 -45 400 565" 
          className="w-full h-full object-cover relative z-10 select-none transform transition-transform duration-500 group-hover:scale-103 drop-shadow-xl"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#082f49" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#0f172a" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#451a03" stopOpacity="0.6"/>
            </linearGradient>

            {/* Skin tones */}
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d98c56"/>
              <stop offset="60%" stopColor="#c47640"/>
              <stop offset="100%" stopColor="#a35828"/>
            </linearGradient>

            {/* Magenta / Pink Kurta */}
            <linearGradient id="kurtaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e11d48"/>
              <stop offset="50%" stopColor="#be123c"/>
              <stop offset="100%" stopColor="#881337"/>
            </linearGradient>

            {/* Gold / Yellow Dupatta */}
            <linearGradient id="dupattaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a"/>
              <stop offset="40%" stopColor="#facc15"/>
              <stop offset="100%" stopColor="#ca8a04"/>
            </linearGradient>

            {/* Hair Gradient */}
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b"/>
              <stop offset="40%" stopColor="#090d16"/>
              <stop offset="100%" stopColor="#020617"/>
            </linearGradient>

            {/* Gold Jewelry Gradient */}
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a"/>
              <stop offset="50%" stopColor="#eab308"/>
              <stop offset="100%" stopColor="#a16207"/>
            </linearGradient>
          </defs>

          {/* Hair Background volume (long wavy curly locks) */}
          <path 
            d="M100 160 C60 220 50 340 70 440 C90 410 110 330 130 280 C140 240 145 180 140 160 Z" 
            fill="url(#hairGrad)" 
          />
          <path 
            d="M300 160 C340 220 350 340 330 440 C310 410 290 330 270 280 C260 240 255 180 260 160 Z" 
            fill="url(#hairGrad)" 
          />
          {/* Extra hair flow left side */}
          <path 
            d="M120 200 C70 260 60 380 90 470 C105 440 120 370 135 310 Z" 
            fill="#0c111d" 
          />

          {/* Neck */}
          <path d="M175 220 L225 220 L230 300 L170 300 Z" fill="url(#skinGrad)" />

          {/* Magenta Kurta Body */}
          <path 
            d="M110 340 C140 310 170 300 200 300 C230 300 260 310 290 340 L340 520 L60 520 Z" 
            fill="url(#kurtaGrad)" 
          />

          {/* Intricate Gold Neck Embroidery on Kurta */}
          <path 
            d="M170 300 Q200 360 230 300 Q215 375 200 385 Q185 375 170 300 Z" 
            fill="none" 
            stroke="url(#goldGrad)" 
            strokeWidth="3.5" 
          />
          <path 
            d="M180 310 Q200 350 220 310 M190 320 Q200 340 210 320" 
            stroke="url(#goldGrad)" 
            strokeWidth="2" 
          />
          <circle cx="200" cy="355" r="3" fill="#fef08a" />
          <circle cx="200" cy="370" r="2.5" fill="#fef08a" />

          {/* Golden Yellow Dupatta Draped over Right Shoulder */}
          <path 
            d="M80 340 C100 290 140 265 175 260 C165 295 150 350 140 430 C130 480 110 520 80 520 L60 420 Z" 
            fill="url(#dupattaGrad)" 
            opacity="0.95"
          />
          <path 
            d="M175 260 C160 310 145 370 135 450 C125 500 110 520 85 520" 
            stroke="#ca8a04" 
            strokeWidth="1.5" 
            fill="none"
          />

          {/* Face Contour */}
          <path 
            d="M140 150 C140 230 160 260 200 260 C240 260 260 230 260 150 C260 90 230 75 200 75 C170 75 140 90 140 150 Z" 
            fill="url(#skinGrad)" 
          />

          {/* Front Hair Crown & Braid Styling */}
          <path 
            d="M135 140 C145 90 170 70 200 70 C230 70 255 90 265 140 C250 110 230 100 200 100 C170 100 150 110 135 140 Z" 
            fill="url(#hairGrad)" 
          />
          {/* Crown Braid Texture lines */}
          <path d="M160 90 Q175 80 190 90 Q205 100 220 90 Q235 80 245 90" stroke="#334155" strokeWidth="2.5" fill="none" />

          {/* Ears */}
          <ellipse cx="138" cy="165" rx="7" ry="12" fill="#c47640" />
          <ellipse cx="262" cy="165" rx="7" ry="12" fill="#c47640" />

          {/* Gold Jhumka Earrings (Left & Right) */}
          <g transform="translate(136, 175)">
            <circle cx="0" cy="0" r="3" fill="#fef08a" />
            <path d="M-4 4 L4 4 L2 10 L-2 10 Z" fill="url(#goldGrad)" />
            <circle cx="0" cy="12" r="1.5" fill="#facc15" />
          </g>
          <g transform="translate(264, 175)">
            <circle cx="0" cy="0" r="3" fill="#fef08a" />
            <path d="M-4 4 L4 4 L2 10 L-2 10 Z" fill="url(#goldGrad)" />
            <circle cx="0" cy="12" r="1.5" fill="#facc15" />
          </g>

          {/* Forehead Bindi */}
          <circle cx="200" cy="128" r="2.5" fill="#0f172a" />

          {/* Eyebrows */}
          <path d="M158 138 Q173 132 188 138" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M212 138 Q227 132 242 138" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Eyes (Bright & expressive) */}
          <ellipse cx="173" cy="150" rx="8" ry="5.5" fill="#ffffff" />
          <ellipse cx="227" cy="150" rx="8" ry="5.5" fill="#ffffff" />
          {/* Iris */}
          <circle cx="174" cy="150" r="4.5" fill="#1e1b18" />
          <circle cx="226" cy="150" r="4.5" fill="#1e1b18" />
          {/* Eye Catchlight */}
          <circle cx="176" cy="148" r="1.5" fill="#ffffff" />
          <circle cx="228" cy="148" r="1.5" fill="#ffffff" />
          {/* Upper Eyeliner */}
          <path d="M164 148 Q174 143 183 148" stroke="#0f172a" strokeWidth="2" fill="none" />
          <path d="M217 148 Q226 143 236 148" stroke="#0f172a" strokeWidth="2" fill="none" />

          {/* Nose */}
          <path d="M198 152 Q200 178 193 182 Q200 184 207 182" stroke="#a35828" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Warm Radiant Smile (Teeth & Rose Pink Lips) */}
          {/* Upper Lip */}
          <path d="M182 198 Q200 194 218 198 Q200 201 182 198 Z" fill="#e11d48" />
          {/* Teeth */}
          <path d="M185 199 Q200 197 215 199 Q200 209 185 199 Z" fill="#ffffff" />
          {/* Smile curve */}
          <path d="M180 197 Q200 216 220 197" stroke="#9f1239" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Lower Lip */}
          <path d="M184 203 Q200 215 216 203 Q200 219 184 203 Z" fill="#f43f5e" />

          {/* Cheerful dimple accents */}
          <path d="M176 195 Q174 200 177 205" stroke="#a35828" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M224 195 Q226 200 223 205" stroke="#a35828" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />

          {/* Glass Bangles on Forearm (Gold, Green, Pink) */}
          <g transform="translate(230, 480) rotate(-15)">
            <rect x="0" y="0" width="30" height="4" rx="2" fill="#ca8a04" />
            <rect x="0" y="5" width="30" height="4" rx="2" fill="#16a34a" />
            <rect x="0" y="10" width="30" height="4" rx="2" fill="#e11d48" />
            <rect x="0" y="15" width="30" height="4" rx="2" fill="#ca8a04" />
          </g>
        </svg>

        {/* Hover zoom indicator */}
        {allowZoom && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center">
            <span className="px-3 py-1.5 rounded-full bg-slate-900/80 text-cyan-300 border border-cyan-500/40 text-xs font-mono shadow-xl flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Expand Photo</span>
            </span>
          </div>
        )}

        {/* Floating Status & Academic Tag */}
        {showBadge && (
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
            <div className="px-3 py-1.5 rounded-full glass-pill border border-cyan-500/40 text-xs font-mono text-cyan-300 flex items-center gap-1.5 shadow-xl backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold">{profile.name || 'Kavisri A'}</span>
            </div>

            <div className="px-3 py-1.5 rounded-full glass-pill border border-amber-500/40 text-xs font-mono text-amber-300 flex items-center gap-1.5 shadow-xl backdrop-blur-md">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>CSE '27</span>
            </div>
          </div>
        )}
      </div>

      {/* Full View Lightbox Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full rounded-3xl overflow-hidden glass-panel border border-cyan-500/40 shadow-2xl p-3 bg-[#090e18]"
            >
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-5 right-5 z-20 p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-950">
                <ProfilePortrait className="w-full h-full" showBadge={false} allowZoom={false} />
              </div>

              <div className="p-3.5 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-base">{profile.name || 'Kavisri A'}</h4>
                  <p className="text-cyan-300 text-xs font-mono">Computer Science Engineering • 8.33 CGPA</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  M.A.M. College of Engg &amp; Tech
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

