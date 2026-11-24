import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { CurrentlyExploring } from './components/CurrentlyExploring';
import { Projects } from './components/Projects';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { TechCanvasBackground } from './components/TechCanvasBackground';
import { ScrollSelectionDock } from './components/ScrollSelectionDock';
import { SectionDivider } from './components/SectionDivider';
import { PortfolioAIAgent } from './components/ai/PortfolioAIAgent';
import { AIAgentLauncher } from './components/ai/AIAgentLauncher';
import { User, Code2, Sparkles, FolderGit2, Milestone, GraduationCap, Award, Trophy, Mail } from 'lucide-react';

// Admin Components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminProfile } from './components/admin/AdminProfile';
import { AdminSkills } from './components/admin/AdminSkills';
import { AdminProjects } from './components/admin/AdminProjects';
import { AdminProjectEdit } from './components/admin/AdminProjectEdit';
import { AdminExperience } from './components/admin/AdminExperience';
import { AdminEducation } from './components/admin/AdminEducation';
import { AdminCertifications } from './components/admin/AdminCertifications';
import { AdminAchievements } from './components/admin/AdminAchievements';
import { AdminExploring, AdminSocial } from './components/admin/AdminExploring';
import { AdminResume } from './components/admin/AdminResume';
import { AdminSettings } from './components/admin/AdminSettings';

import { useCMS } from './context/CMSContext';
import { useRouter } from './context/RouterContext';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [aiAgentOpen, setAiAgentOpen] = useState(false);
  const { user } = useCMS();
  const { currentPath, activeAdminTab } = useRouter();
  const { isDark } = useTheme();

  const isAdminRoute = currentPath.startsWith('/admin');

  if (isAdminRoute) {
    if (!user) {
      return <AdminLogin />;
    }

    // Determine which admin child component to render
    const renderAdminContent = () => {
      if (currentPath === '/admin/projects/new') {
        return <AdminProjectEdit projectId="new" />;
      }
      if (currentPath.startsWith('/admin/projects/')) {
        const pId = currentPath.replace('/admin/projects/', '');
        return <AdminProjectEdit projectId={pId} />;
      }

      switch (activeAdminTab) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'profile':
          return <AdminProfile />;
        case 'skills':
          return <AdminSkills />;
        case 'projects':
          return <AdminProjects />;
        case 'experience':
          return <AdminExperience />;
        case 'education':
          return <AdminEducation />;
        case 'certifications':
          return <AdminCertifications />;
        case 'achievements':
          return <AdminAchievements />;
        case 'exploring':
          return <AdminExploring />;
        case 'social':
          return <AdminSocial />;
        case 'resume':
          return <AdminResume />;
        case 'settings':
          return <AdminSettings />;
        default:
          return <AdminDashboard />;
      }
    };

    return (
      <AdminLayout>
        {renderAdminContent()}
      </AdminLayout>
    );
  }

  // Public Portfolio View with Live Interactive Canvas and Day/Night Glassmorphism
  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-cyan-500/25 selection:text-cyan-300 relative overflow-x-hidden ${
      isDark ? 'bg-[#07090e] text-slate-100' : 'bg-[#f4f7fb] text-slate-900'
    }`}>
      {/* Live Interactive CS & Data Constellation Background */}
      <TechCanvasBackground />

      {/* Sticky Navigation with Day/Night Switcher and Multilingual + AI */}
      <Navbar 
        onOpenResume={() => setResumeOpen(true)} 
        onOpenAI={() => setAiAgentOpen(true)}
      />

      {/* Main Portfolio Content Flow */}
      <main id="main-content" className="relative z-10">
        {/* 1. Hero */}
        <Hero 
          onOpenResume={() => setResumeOpen(true)} 
          onOpenAI={() => setAiAgentOpen(true)}
        />

        <SectionDivider icon={User} label="Profile & Bio" symbol="01" />

        {/* 2. About */}
        <About />

        <SectionDivider icon={Code2} label="Technical Stack" symbol="02" />

        {/* 3. Technical Skills */}
        <Skills />

        <SectionDivider icon={Sparkles} label="R&D & Intelligence" symbol="03" />

        {/* 4. Currently Exploring */}
        <CurrentlyExploring />

        <SectionDivider icon={FolderGit2} label="Engineering Works" symbol="04" />

        {/* 5. Featured Projects */}
        <Projects />

        <SectionDivider icon={Milestone} label="Professional Journey" symbol="05" />

        {/* 6. Experience & Journey Timeline */}
        <ExperienceTimeline />

        <SectionDivider icon={GraduationCap} label="Academic Foundation" symbol="06" />

        {/* 7. Education */}
        <Education />

        <SectionDivider icon={Award} label="Credentials & Badges" symbol="07" />

        {/* 8. Certifications */}
        <Certifications />

        <SectionDivider icon={Trophy} label="Honors & Recognition" symbol="08" />

        {/* 9. Achievements & Activities */}
        <Achievements />

        <SectionDivider icon={Mail} label="Get In Touch" symbol="09" />

        {/* 10. Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Glassmorphic Scroll Selection Dock & Progress */}
      <ScrollSelectionDock />

      {/* Floating AI Agent Launcher */}
      <AIAgentLauncher 
        isOpen={aiAgentOpen}
        onOpen={() => setAiAgentOpen(true)} 
      />

      {/* Multilingual Portfolio AI Agent Modal */}
      <PortfolioAIAgent
        isOpen={aiAgentOpen}
        onClose={() => setAiAgentOpen(false)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Full Interactive Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
