import React, { useState, useEffect } from 'react';
import { StudentProfile } from '../types';
import { 
  Code2, 
  FolderGit2, 
  User, 
  Mail, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Edit3, 
  Handshake, 
  Github,
  Award
} from 'lucide-react';

interface NavbarProps {
  profile: StudentProfile;
  darkMode: boolean;
  projectsCount?: number;
  setDarkMode: (val: boolean) => void;
  onOpenCollabModal: () => void;
  onOpenEditModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  darkMode,
  projectsCount,
  setDarkMode,
  onOpenCollabModal,
  onOpenEditModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Explore Projects', href: '#projects', icon: FolderGit2 },
    { name: 'About Us', href: '#about', icon: User },
    { name: 'Contact & Collaborate', href: '#contact', icon: Mail },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-800'
            : 'bg-white/90 backdrop-blur-md shadow-md border-b border-slate-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          href="#" 
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
          id="brand-logo-link"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className={`font-bold text-lg leading-tight flex items-center gap-1.5 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              <span>{profile.name}</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Student Dev
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">HTML • CSS • JavaScript</p>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isProjectsLink = link.href === '#projects';
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                  darkMode
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 text-indigo-500" />
                <span>{link.name}</span>
                {isProjectsLink && projectsCount !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {projectsCount}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          {/* GitHub Direct Quick Icon */}
          {profile.githubUrl && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Visit GitHub Profile"
              className={`p-2.5 rounded-lg border transition-colors ${
                darkMode
                  ? 'border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white'
                  : 'border-slate-200 hover:bg-slate-100 text-slate-700 hover:text-slate-900'
              }`}
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle Theme"
            className={`p-2.5 rounded-lg border transition-colors ${
              darkMode
                ? 'border-slate-700 hover:bg-slate-800 text-amber-400'
                : 'border-slate-200 hover:bg-slate-100 text-slate-700'
            }`}
            id="theme-toggle-btn"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Edit Profile Button (for customizing student info) */}
          <button
            onClick={onOpenEditModal}
            title="Customize Profile Info"
            className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              darkMode
                ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
            id="edit-profile-btn"
          >
            <Edit3 className="w-3.5 h-3.5 text-indigo-500" />
            <span>Customize</span>
          </button>

          {/* Collaboration Button */}
          <button
            onClick={onOpenCollabModal}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all flex items-center gap-2"
            id="nav-collaboration-btn"
          >
            <Handshake className="w-4 h-4" />
            <span>Let's Collaborate</span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg border ${
              darkMode ? 'border-slate-700 text-amber-400' : 'border-slate-200 text-slate-700'
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg border ${
              darkMode ? 'border-slate-700 text-white' : 'border-slate-200 text-slate-900'
            }`}
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-4 pt-2 pb-6 space-y-3 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                  darkMode ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-5 h-5 text-indigo-500" />
                <span>{link.name}</span>
              </a>
            );
          })}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEditModal();
              }}
              className={`w-full py-2.5 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2 ${
                darkMode ? 'border-slate-700 text-slate-200' : 'border-slate-300 text-slate-800'
              }`}
            >
              <Edit3 className="w-4 h-4 text-indigo-500" />
              <span>Customize Profile Info</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCollabModal();
              }}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-base shadow-md flex items-center justify-center gap-2"
            >
              <Handshake className="w-5 h-5" />
              <span>Let's Collaborate</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
