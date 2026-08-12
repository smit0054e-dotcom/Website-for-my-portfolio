import React from 'react';
import { StudentProfile } from '../types';
import { 
  FolderGit2, 
  Handshake, 
  Github, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Code2,
  FileCode,
  Layout,
  Download
} from 'lucide-react';

interface HeroProps {
  profile: StudentProfile;
  darkMode: boolean;
  projectsCount: number;
  onOpenCollabModal: () => void;
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  darkMode,
  projectsCount,
  onOpenCollabModal,
  onOpenResumeModal,
}) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle Background Accent Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{profile.availabilityStatus}</span>
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            </div>

            {/* Main Headline */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>

            {/* Sub-headline */}
            <p className={`text-xl font-semibold ${
              darkMode ? 'text-indigo-300' : 'text-indigo-700'
            }`}>
              {profile.title}
            </p>

            {/* Tagline / Intro Description */}
            <p className={`text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {profile.tagline} Focused on crafting responsive interfaces, interactive DOM logic, and modern web applications.
            </p>

            {/* Core Tech Stack Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 font-semibold text-xs border border-orange-200 dark:border-orange-800">
                <FileCode className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                <span>HTML5</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 font-semibold text-xs border border-blue-200 dark:border-blue-800">
                <Layout className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>CSS3 Layouts</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-semibold text-xs border border-amber-200 dark:border-amber-800">
                <Code2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>JavaScript</span>
              </div>
            </div>

            {/* Primary Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-4">
              {/* Explore Projects Button */}
              <a
                href="#projects"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                id="hero-explore-projects-btn"
              >
                <FolderGit2 className="w-5 h-5 text-indigo-400 dark:text-indigo-600" />
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Collaboration Button */}
              <button
                onClick={onOpenCollabModal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center justify-center gap-2"
                id="hero-collaborate-btn"
              >
                <Handshake className="w-5 h-5" />
                <span>Let's Collaborate</span>
              </button>

              {/* Download Resume / CV */}
              <button
                onClick={onOpenResumeModal}
                className={`w-full sm:w-auto px-5 py-3.5 rounded-xl border font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                  darkMode
                    ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Download className="w-4 h-4 text-indigo-500" />
                <span>Resume / CV</span>
              </button>
            </div>

            {/* Direct Quick Contacts */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
              <a 
                href={`mailto:${profile.email}`} 
                className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>{profile.email}</span>
              </a>
              <a 
                href={`tel:${profile.phone}`} 
                className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                title="Call Phone"
              >
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>{profile.phone}</span>
              </a>
              {profile.githubUrl && (
                <a 
                  href={profile.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Github className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

          </div>

          {/* Right Avatar Card & Code Visual Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Card Container */}
              <div className={`rounded-3xl p-6 border shadow-2xl transition-all ${
                darkMode 
                  ? 'bg-slate-900/90 border-slate-800 shadow-indigo-950/40' 
                  : 'bg-white border-slate-200 shadow-indigo-100'
              }`}>
                
                {/* Developer Badge Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-600/20">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{profile.name}</div>
                      <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Student Web Developer</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active</span>
                  </div>
                </div>

                {/* Quick Info Box */}
                <div className="space-y-3">
                  <div className={`p-3 rounded-xl border text-left text-xs font-mono space-y-1 ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-900 text-slate-200 border-slate-800'
                  }`}>
                    <div className="text-slate-400">// student_profile.js</div>
                    <div><span className="text-purple-400">const</span> developer = &#123;</div>
                    <div className="pl-4"><span className="text-cyan-300">skills</span>: [<span className="text-emerald-300">'HTML'</span>, <span className="text-emerald-300">'CSS'</span>, <span className="text-emerald-300">'JavaScript'</span>],</div>
                    <div className="pl-4"><span className="text-cyan-300">openToWork</span>: <span className="text-amber-300">true</span>,</div>
                    <div className="pl-4"><span className="text-cyan-300">github</span>: <span className="text-emerald-300">'{profile.githubUrl}'</span></div>
                    <div>&#125;;</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center pt-1">
                    <div className={`p-2.5 rounded-xl border ${
                      darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{projectsCount}</div>
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{projectsCount === 1 ? 'Built Project' : 'Built Projects'}</div>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${
                      darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">100%</div>
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Responsive Code</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating Badge accent */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Vanilla JS & DOM</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">No heavy frameworks needed</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
