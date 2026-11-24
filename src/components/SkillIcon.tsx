import React from 'react';
import { 
  Code2, 
  Database, 
  Terminal, 
  Layers, 
  Sparkles, 
  Cpu, 
  Globe, 
  BarChart3, 
  FileCode, 
  Server,
  Workflow,
  Boxes
} from 'lucide-react';

interface SkillIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const SkillIcon: React.FC<SkillIconProps> = ({ name, className = 'w-4 h-4', size = 16 }) => {
  const norm = name.trim().toLowerCase();

  // Python
  if (norm.includes('python')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path 
          d="M11.92 2C6.54 2 6.84 4.34 6.84 4.34L6.85 6.76H12V7.52H4.42C2.16 7.52 2 9.77 2 12.02C2 14.65 3.32 14.54 3.32 14.54H4.88V12.35C4.88 9.87 7.02 9.87 7.02 9.87H12.16C14.37 9.87 14.5 7.74 14.5 7.74V4.34C14.5 2.1 12.24 2 11.92 2ZM9.3 3.65C9.8 3.65 10.2 4.05 10.2 4.55C10.2 5.05 9.8 5.45 9.3 5.45C8.8 5.45 8.4 5.05 8.4 4.55C8.4 4.05 8.8 3.65 9.3 3.65Z" 
          fill="#3776AB" 
        />
        <path 
          d="M12.08 22C17.46 22 17.16 19.66 17.16 19.66L17.15 17.24H12V16.48H19.58C21.84 16.48 22 14.23 22 11.98C22 9.35 20.68 9.46 20.68 9.46H19.12V11.65C19.12 14.13 16.98 14.13 16.98 14.13H11.84C9.63 14.13 9.5 16.26 9.5 16.26V19.66C9.5 21.9 11.76 22 12.08 22ZM14.7 20.35C14.2 20.35 13.8 19.95 13.8 19.45C13.8 18.95 14.2 18.55 14.7 18.55C15.2 18.55 15.6 18.95 15.6 19.45C15.6 19.95 15.2 20.35 14.7 20.35Z" 
          fill="#FFD43B" 
        />
      </svg>
    );
  }

  // Java
  if (norm === 'java' || norm.startsWith('java ')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M7.7 19.1C7.7 19.1 8.7 19.6 10.4 19.6C12.4 19.6 14.5 18.7 15.7 18.2C15.7 18.2 14.7 19.2 12.8 19.7C10.7 20.3 8.7 20.1 7.7 19.1Z" fill="#E76F00" />
        <path d="M6.3 16.8C6.3 16.8 7.5 17.5 9.7 17.5C12.2 17.5 14.8 16.3 16.4 15.6C16.4 15.6 15.1 16.9 12.7 17.6C10.1 18.3 7.6 18.1 6.3 16.8Z" fill="#5382A1" />
        <path d="M12.4 13.2C13.2 13.8 14.1 14.5 14.1 15.2C14.1 16.1 12.6 16.7 11.2 16.7C9.3 16.7 8.3 15.8 8.3 15.8C8.3 15.8 9.3 16.2 10.8 16.2C12.1 16.2 13.2 15.7 13.2 15C13.2 14.4 12.3 13.9 11.4 13.2C10.3 12.4 9.3 11.3 9.3 10.1C9.3 8.3 10.9 7.4 12.7 6.4C11.9 7.4 11.6 8.5 12.1 9.4C12.6 10.4 13.9 11.2 12.4 13.2Z" fill="#E76F00" />
        <path d="M15.5 12.7C16.5 13.2 17.8 14.1 17.8 15.1C17.8 16.6 15.3 17.6 12.7 17.6C9.6 17.6 7.4 16.2 7.4 16.2C7.4 16.2 9.3 17 12.4 17C14.9 17 16.8 16.2 16.8 14.9C16.8 14 15.8 13.4 14.8 12.8C14.3 12.5 13.9 12.2 13.6 11.8C13.1 12.1 13.7 12.4 15.5 12.7Z" fill="#5382A1" />
        <path d="M13.5 3C13.5 3 14.9 4.4 13.5 6.5C12.2 8.3 11.4 9.1 12.7 10.8C12.2 10.2 11.7 9.5 11.7 8.7C11.7 7.5 12.7 6.6 13.3 5.4C13.8 4.2 13.5 3 13.5 3Z" fill="#E76F00" />
      </svg>
    );
  }

  // JavaScript
  if (norm.includes('javascript') || norm === 'js') {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path d="M12.5 17.8C13.3 18.4 14.3 18.8 15.5 18.8C17.6 18.8 18.9 17.7 18.9 15.7C18.9 14.1 18 13.3 16.1 12.5L15.3 12.1C14.1 11.6 13.6 11.1 13.6 10.2C13.6 9.2 14.4 8.5 15.7 8.5C16.7 8.5 17.4 8.8 18.1 9.3L18.8 7.3C18 6.7 16.9 6.4 15.6 6.4C13.5 6.4 12 7.7 12 9.8C12 11.5 12.9 12.4 14.7 13.2L15.5 13.6C16.8 14.2 17.3 14.7 17.3 15.7C17.3 16.8 16.3 17.5 14.9 17.5C13.7 17.5 12.7 17 12.1 16.2L12.5 17.8ZM6.8 18.6C7.9 18.6 8.7 18.2 9.2 17.6C9.8 16.9 10.1 15.9 10.1 14.4V6.7H8.5V14.4C8.5 15.8 7.8 16.4 6.8 16.4C6.4 16.4 5.9 16.3 5.5 16L5 17.7C5.5 18.3 6.1 18.6 6.8 18.6Z" fill="#000000" />
      </svg>
    );
  }

  // TypeScript
  if (norm.includes('typescript') || norm === 'ts') {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M12.5 17.8C13.3 18.4 14.3 18.8 15.5 18.8C17.6 18.8 18.9 17.7 18.9 15.7C18.9 14.1 18 13.3 16.1 12.5L15.3 12.1C14.1 11.6 13.6 11.1 13.6 10.2C13.6 9.2 14.4 8.5 15.7 8.5C16.7 8.5 17.4 8.8 18.1 9.3L18.8 7.3C18 6.7 16.9 6.4 15.6 6.4C13.5 6.4 12 7.7 12 9.8C12 11.5 12.9 12.4 14.7 13.2L15.5 13.6C16.8 14.2 17.3 14.7 17.3 15.7C17.3 16.8 16.3 17.5 14.9 17.5C13.7 17.5 12.7 17 12.1 16.2L12.5 17.8ZM6 8.5H8.2V18.5H10.1V8.5H12.3V6.7H6V8.5Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // HTML / HTML5
  if (norm.includes('html')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M3 2L4.7 20.8L12 22.8L19.3 20.8L21 2H3Z" fill="#E34F26" />
        <path d="M12 3.8V21.1L17.8 19.5L19.2 3.8H12Z" fill="#EF652A" />
        <path d="M7.4 7.4H16.6L16.4 9.6H9.7L9.9 11.8H16.2L15.8 16.4L12 17.4L8.2 16.4L8 14.2H10.2L10.3 15L12 15.5L13.7 15L13.9 13.3H7.8L7.4 7.4Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // CSS / CSS3
  if (norm.includes('css')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M3 2L4.7 20.8L12 22.8L19.3 20.8L21 2H3Z" fill="#1572B6" />
        <path d="M12 3.8V21.1L17.8 19.5L19.2 3.8H12Z" fill="#33A9DC" />
        <path d="M7.4 7.4H16.6L16.4 9.6H9.7L9.9 11.8H16.2L15.8 16.4L12 17.4L8.2 16.4L8 14.2H10.2L10.3 15L12 15.5L13.7 15L13.9 13.3H7.8L7.4 7.4Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // React
  if (norm.includes('react')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      </svg>
    );
  }

  // MySQL / SQL
  if (norm.includes('mysql') || norm.includes('sql')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M4 6C4 4.34 7.58 3 12 3C16.42 3 20 4.34 20 6V18C20 19.66 16.42 21 12 21C7.58 21 4 19.66 4 18V6Z" stroke="#00758F" strokeWidth="1.5" />
        <path d="M4 10C4 11.66 7.58 13 12 13C16.42 13 20 11.66 20 10" stroke="#00758F" strokeWidth="1.5" />
        <path d="M4 14C4 15.66 7.58 17 12 17C16.42 17 20 15.66 20 14" stroke="#F29111" strokeWidth="1.5" />
        <circle cx="12" cy="6" r="1.5" fill="#00758F" />
      </svg>
    );
  }

  // MongoDB
  if (norm.includes('mongodb') || norm.includes('mongo')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2C11.8 2 11.6 2.1 11.5 2.3C10.2 4.4 7 10 7 13.8C7 17.5 9.3 20.8 12 22C14.7 20.8 17 17.5 17 13.8C17 10 13.8 4.4 12.5 2.3C12.4 2.1 12.2 2 12 2Z" fill="#47A248" />
        <path d="M12 22V13C12 11.2 12.4 9 12.4 9C12.4 9 13.8 10.9 14.5 13C15.1 14.8 14.8 16.8 13.8 18.3L12 22Z" fill="#499D4A" />
      </svg>
    );
  }

  // Schema Design / Architecture
  if (norm.includes('schema') || norm.includes('architect') || norm.includes('design')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="6" rx="1.5" stroke="#38BDF8" strokeWidth="1.5" />
        <rect x="14" y="3" width="7" height="6" rx="1.5" stroke="#38BDF8" strokeWidth="1.5" />
        <rect x="8.5" y="15" width="7" height="6" rx="1.5" stroke="#38BDF8" strokeWidth="1.5" />
        <path d="M6.5 9V12H17.5V9M12 12V15" stroke="#38BDF8" strokeWidth="1.5" />
      </svg>
    );
  }

  // Pandas
  if (norm.includes('pandas')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="4" height="16" rx="2" fill="#150458" />
        <rect x="10" y="7" width="4" height="13" rx="2" fill="#FFD43B" />
        <rect x="16" y="10" width="4" height="10" rx="2" fill="#E70488" />
      </svg>
    );
  }

  // NumPy
  if (norm.includes('numpy')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M4 7.5L12 3L20 7.5V16.5L12 21L4 16.5V7.5Z" stroke="#4DABCF" strokeWidth="1.5" fill="#013243" />
        <path d="M12 3V21M4 7.5L20 16.5M20 7.5L4 16.5" stroke="#4DABCF" strokeWidth="1.5" />
      </svg>
    );
  }

  // Matplotlib
  if (norm.includes('matplotlib')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#11557C" strokeWidth="1.5" />
        <path d="M7 15L10 10L14 13L17 8" stroke="#11557C" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="7" cy="15" r="1.5" fill="#F48024" />
        <circle cx="10" cy="10" r="1.5" fill="#F48024" />
        <circle cx="14" cy="13" r="1.5" fill="#F48024" />
        <circle cx="17" cy="8" r="1.5" fill="#F48024" />
      </svg>
    );
  }

  // Power BI
  if (norm.includes('power bi') || norm.includes('powerbi')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="12" width="4" height="9" rx="1.5" fill="#F2C811" />
        <rect x="10" y="8" width="4" height="13" rx="1.5" fill="#F2C811" />
        <rect x="17" y="3" width="4" height="18" rx="1.5" fill="#F2C811" />
      </svg>
    );
  }

  // Generative AI / GenAI
  if (norm.includes('generative') || norm.includes('genai') || norm.includes('llm')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L14.2 8.4L20.6 10.6L14.2 12.8L12 19.2L9.8 12.8L3.4 10.6L9.8 8.4L12 2Z" fill="#A855F7" />
        <path d="M19 16L20 19L23 20L20 21L19 24L18 21L15 20L18 19L19 16Z" fill="#C084FC" />
      </svg>
    );
  }

  // Prompt Engineering
  if (norm.includes('prompt')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="3" stroke="#C084FC" strokeWidth="1.5" />
        <path d="M7 9L10 12L7 15M12 15H16" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // APIs / REST API
  if (norm.includes('api') || norm.includes('rest')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="12" rx="3" stroke="#38BDF8" strokeWidth="1.5" />
        <path d="M7 12H9M12 12H12.01M15 12H17" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // C / C++
  if (norm === 'c' || norm === 'c++' || norm.includes('cpp')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M14 8.5C13.2 7.6 12 7 10.5 7C7.5 7 5 9.2 5 12C5 14.8 7.5 17 10.5 17C12 17 13.2 16.4 14 15.5" stroke="#00599C" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 12H20M18 10V14" stroke="#00599C" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // Git / GitHub
  if (norm.includes('git')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="6" r="3" stroke="#F05032" strokeWidth="1.5" />
        <circle cx="18" cy="9" r="3" stroke="#F05032" strokeWidth="1.5" />
        <circle cx="6" cy="18" r="3" stroke="#F05032" strokeWidth="1.5" />
        <path d="M6 9V15M6 9C6 11 9 12 15 10" stroke="#F05032" strokeWidth="1.5" />
      </svg>
    );
  }

  // Fallback icon based on category type
  return <Code2 className={`${className} text-cyan-400`} />;
};
