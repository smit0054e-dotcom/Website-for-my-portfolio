import React, { useState } from 'react';
import { initialSkills } from '../data/portfolioData';
import { Skill } from '../types';
import { 
  Award, 
  Code2, 
  Terminal, 
  Palette, 
  GitBranch, 
  Accessibility, 
  Database, 
  Check, 
  Copy,
  FileCode,
  Sparkles
} from 'lucide-react';

interface SkillsSectionProps {
  darkMode: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ darkMode }) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill>(initialSkills[0]);
  const [copied, setCopied] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return Code2;
      case 'Palette': return Palette;
      case 'Terminal': return Terminal;
      case 'GitBranch': return GitBranch;
      case 'Accessibility': return Accessibility;
      case 'Database': return Database;
      default: return FileCode;
    }
  };

  const handleCopyCode = () => {
    if (selectedSkill.sampleCode) {
      navigator.clipboard.writeText(selectedSkill.sampleCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Skill Proficiency & Interactive Inspector
          </h2>
          <p className={`text-base sm:text-lg ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Click on any skill to inspect real code snippets and learn how I apply HTML, CSS, and JavaScript in real projects.
          </p>
        </div>

        {/* Skills Grid + Code Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Skill Cards List */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {initialSkills.map((skill) => {
              const Icon = getIcon(skill.iconName);
              const isSelected = selectedSkill.name === skill.name;

              return (
                <div
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill)}
                  className={`cursor-pointer p-5 rounded-2xl border transition-all ${
                    isSelected
                      ? darkMode
                        ? 'bg-indigo-950/60 border-indigo-500 shadow-lg shadow-indigo-950/50'
                        : 'bg-indigo-50/90 border-indigo-500 shadow-md shadow-indigo-100'
                      : darkMode
                      ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : darkMode
                          ? 'bg-slate-800 text-indigo-400'
                          : 'bg-slate-100 text-indigo-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`font-bold text-sm ${
                        darkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {skill.name}
                      </span>
                    </div>

                    <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                      {skill.proficiency}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>

                  <p className={`text-xs mt-3 line-clamp-2 ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {skill.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Code Snippet Inspector Box */}
          <div className="lg:col-span-5">
            <div className={`p-6 rounded-3xl border shadow-xl sticky top-28 ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 text-slate-100 border-slate-800'
            }`}>
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    {selectedSkill.name.toLowerCase().replace(/[^a-z0-0]/g, '')}_example.snippet
                  </span>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
                  <span>{copied ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{selectedSkill.name}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedSkill.description}
                </p>

                {/* Code Box */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 font-mono text-xs overflow-x-auto text-emerald-300 leading-relaxed max-h-60">
                  <pre>{selectedSkill.sampleCode || '// Select a skill to view code example'}</pre>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Category: <strong>{selectedSkill.category}</strong></span>
                  <span className="text-emerald-400 font-semibold">Verified Pure Standard</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
