import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { 
  X, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  GraduationCap, 
  Code2, 
  Briefcase, 
  Mail, 
  Phone, 
  Github,
  MapPin
} from 'lucide-react';

interface ResumeModalProps {
  profile: StudentProfile;
  darkMode: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  profile,
  darkMode,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const md = `# ${profile.name} - ${profile.title}
Email: ${profile.email} | Phone: ${profile.phone} | Location: ${profile.location}
GitHub: ${profile.githubUrl}

## Summary
${profile.bio}

## Technical Skills
- Core Web: HTML5 (Semantic, Accessibility WCAG), CSS3 (Flexbox, Grid, Responsive Design), JavaScript (DOM Manipulation, Async/Await)
- Tools: Git, GitHub, VS Code, Browser Developer Tools

## Projects
- Interactive Weather Forecast App: HTML5, CSS Grid, Async Fetch API
- Student Study & Task Tracker: JavaScript DOM Events, LocalStorage
- Interactive Web Code Playground: JS Sandbox Execution, iFrames

## Education
${profile.education}
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden my-8 transition-all ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Student Resume & CV</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Printable & Exportable Developer Profile
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                darkMode ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700' : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-indigo-500" />}
              <span>{copied ? 'Copied MD' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className={`p-2 rounded-xl border transition-colors ${
                darkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document */}
        <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto font-sans" id="printable-resume-area">
          
          {/* Resume Header */}
          <div className="border-b pb-6 border-slate-200 dark:border-slate-800 space-y-2">
            <h1 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {profile.name}
            </h1>
            <p className="text-base font-bold text-slate-700 dark:text-slate-300">
              {profile.title}
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-indigo-500" />
                {profile.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                {profile.phone}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1">
                <Github className="w-3.5 h-3.5" />
                {profile.githubUrl}
              </span>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-900 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              {profile.bio}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-900 pb-1">
              Technical Core Skills
            </h2>
            <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
              <li><strong>HTML5:</strong> Semantic elements, Accessibility WCAG 2.1, SEO structure, Forms, Media tags</li>
              <li><strong>CSS3:</strong> Flexbox, CSS Grid, Responsive design, CSS Variables, Media Queries, Micro-interactions</li>
              <li><strong>JavaScript:</strong> DOM Manipulation, Async/Await, Fetch API, LocalStorage, Arrow Functions, Array Methods</li>
              <li><strong>Tools & Workflows:</strong> Git, GitHub repositories, VS Code, Browser DevTools, Responsive testing</li>
            </ul>
          </div>

          {/* Featured Projects */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-900 pb-1">
              Featured Web Projects
            </h2>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                    Interactive Weather Forecast App
                  </h3>
                  <span className="text-[11px] font-mono text-indigo-500">HTML • CSS Grid • Fetch API</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Built an asynchronous forecast dashboard retrieving live weather metrics with dynamic theme changes.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                    Student Study & Task Tracker
                  </h3>
                  <span className="text-[11px] font-mono text-indigo-500">JavaScript • DOM Events • LocalStorage</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Created a local-storage powered task organizer with completion progress indicators and filter tags.
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-900 pb-1">
              Education & Certifications
            </h2>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {profile.education}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
