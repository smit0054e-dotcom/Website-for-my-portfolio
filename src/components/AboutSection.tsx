import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { 
  User, 
  GraduationCap, 
  Code2, 
  CheckCircle, 
  BookOpen, 
  Award, 
  Download, 
  Handshake, 
  Copy, 
  Check, 
  Sparkles,
  FileCode,
  Layout,
  Terminal
} from 'lucide-react';

interface AboutSectionProps {
  profile: StudentProfile;
  darkMode: boolean;
  onOpenCollabModal: () => void;
  onOpenResumeModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  profile,
  darkMode,
  onOpenCollabModal,
  onOpenResumeModal,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyBio = () => {
    navigator.clipboard.writeText(`${profile.name} - ${profile.title}\nEmail: ${profile.email}\nPhone: ${profile.phone}\nGitHub: ${profile.githubUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const coreStrengths = [
    {
      title: "HTML5 & Semantic Web",
      desc: "Creating accessible, structured, and SEO-compliant DOM hierarchies with clean document outline standards.",
      icon: FileCode,
      color: "from-orange-500 to-amber-500"
    },
    {
      title: "CSS3 & Modern Layouts",
      desc: "Mastering Flexbox, CSS Grid, media queries, CSS variables, and fluid typography for responsive viewports.",
      icon: Layout,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "JavaScript (ES6+) & DOM",
      desc: "Writing modular vanilla JS, event handling, asynchronous Fetch API calls, LocalStorage state, and array methods.",
      icon: Terminal,
      color: "from-amber-500 to-yellow-500"
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 text-xs font-semibold">
            <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Student Bio & Developer Profile</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            About Us / About Me
          </h2>
          <p className={`text-base sm:text-lg ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Get to know my journey, web development philosophy, and core technical skills in HTML, CSS, and JavaScript.
          </p>
        </div>

        {/* Main Bio Card */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className={`p-8 rounded-3xl border shadow-xl relative space-y-6 ${
            darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-indigo-600/20">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {profile.name}
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    {profile.education}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyBio}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  darkMode
                    ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
                title="Copy Contact Info"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-indigo-500" />}
                <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Info'}</span>
              </button>
            </div>

            {/* Bio Paragraphs */}
            <div className={`space-y-4 text-base leading-relaxed ${
              darkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <p>
                {profile.bio}
              </p>
              <p>
                I believe that mastering the core trio of web development — <strong className="text-indigo-600 dark:text-indigo-400 font-bold">HTML5, CSS3, and JavaScript</strong> — is the essential foundation for creating high-performance, resilient, and accessible web experiences without heavy framework bloat.
              </p>
            </div>

            {/* Key Highlights Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Semantic & WCAG Accessible HTML</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Responsive CSS Grid & Flexbox Layouts</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Vanilla JavaScript & DOM Manipulation</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Git Version Control & GitHub Repositories</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={onOpenResumeModal}
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Student Resume / CV</span>
              </button>

              <button
                onClick={onOpenCollabModal}
                className={`px-5 py-3 rounded-xl border font-bold text-sm flex items-center gap-2 transition-all ${
                  darkMode
                    ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                    : 'border-slate-300 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Handshake className="w-4 h-4 text-indigo-500" />
                <span>Collaborate With Me</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
