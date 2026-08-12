import React, { useState, useEffect } from 'react';
import { initialProfile, initialProjects } from './data/portfolioData';
import { StudentProfile, Project } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CollaborationModal } from './components/CollaborationModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { EditProfileModal } from './components/EditProfileModal';
import { ResumeModal } from './components/ResumeModal';
import { AddProjectModal } from './components/AddProjectModal';

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('student_portfolio_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name === "Alex Morgan" || !parsed.email?.includes("patelsmit")) {
          return initialProfile;
        }
        return parsed;
      }
      return initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('student_portfolio_projects');
      if (saved) {
        const parsed: Project[] = JSON.parse(saved);
        // Filter out any leftover mock projects from previous template
        const userProjects = parsed.filter(p => !['weather-dashboard', 'study-task-tracker', 'js-playground', 'css-responsive-gallery', 'dom-currency-converter', 'css-layout-gallery'].includes(p.id) && !p.githubUrl.includes('student-developer-portfolio'));
        return userProjects;
      }
      return initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('portfolio_dark_mode');
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [collabModalOpen, setCollabModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [addProjectModalOpen, setAddProjectModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('student_portfolio_profile', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('student_portfolio_projects', JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_dark_mode', JSON.stringify(darkMode));
    } catch (e) {
      console.error(e);
    }
  }, [darkMode]);

  const handleSaveProfile = (updated: StudentProfile) => {
    setProfile(updated);
  };

  const handleResetProfile = () => {
    setProfile(initialProfile);
    localStorage.removeItem('student_portfolio_profile');
  };

  const handleAddProject = (newProject: Project) => {
    setProjects(prev => [newProject, ...prev]);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans selection:bg-indigo-500 selection:text-white ${
      darkMode ? 'bg-slate-950 text-slate-100 dark' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Fixed Header */}
      <Navbar
        profile={profile}
        darkMode={darkMode}
        projectsCount={projects.length}
        setDarkMode={setDarkMode}
        onOpenCollabModal={() => setCollabModalOpen(true)}
        onOpenEditModal={() => setEditModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        profile={profile}
        darkMode={darkMode}
        projectsCount={projects.length}
        onOpenCollabModal={() => setCollabModalOpen(true)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
      />

      {/* Explore My Projects Section */}
      <ProjectsSection
        projects={projects}
        profile={profile}
        darkMode={darkMode}
        onSelectProject={(proj) => setSelectedProject(proj)}
        onOpenCollabModal={() => setCollabModalOpen(true)}
        onOpenAddProjectModal={() => setAddProjectModalOpen(true)}
      />

      {/* About Us / About Me Section */}
      <AboutSection
        profile={profile}
        darkMode={darkMode}
        onOpenCollabModal={() => setCollabModalOpen(true)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
      />

      {/* Contact Section */}
      <ContactSection
        profile={profile}
        darkMode={darkMode}
      />

      {/* Footer */}
      <Footer
        profile={profile}
        darkMode={darkMode}
        onOpenCollabModal={() => setCollabModalOpen(true)}
      />

      {/* Interactive Modals */}
      {collabModalOpen && (
        <CollaborationModal
          profile={profile}
          darkMode={darkMode}
          onClose={() => setCollabModalOpen(false)}
        />
      )}

      {addProjectModalOpen && (
        <AddProjectModal
          darkMode={darkMode}
          onAddProject={handleAddProject}
          onClose={() => setAddProjectModalOpen(false)}
          defaultGithubUser="patelsmit0062"
        />
      )}

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          darkMode={darkMode}
          onClose={() => setSelectedProject(null)}
          onOpenCollabModal={() => {
            setSelectedProject(null);
            setCollabModalOpen(true);
          }}
        />
      )}

      {editModalOpen && (
        <EditProfileModal
          profile={profile}
          darkMode={darkMode}
          onSaveProfile={handleSaveProfile}
          onResetProfile={handleResetProfile}
          onClose={() => setEditModalOpen(false)}
        />
      )}

      {resumeModalOpen && (
        <ResumeModal
          profile={profile}
          darkMode={darkMode}
          onClose={() => setResumeModalOpen(false)}
        />
      )}
    </div>
  );
}
