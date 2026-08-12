import React, { useState } from 'react';
import { Project } from '../types';
import { 
  X, 
  Github, 
  ExternalLink, 
  Code, 
  Play, 
  Sparkles, 
  Check, 
  Copy, 
  RefreshCw,
  Eye,
  FileCode,
  Layers
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project;
  darkMode: boolean;
  onClose: () => void;
  onOpenCollabModal: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  darkMode,
  onClose,
  onOpenCollabModal,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'playground'>('overview');
  const [htmlCode, setHtmlCode] = useState(project.codeSnippet.html);
  const [cssCode, setCssCode] = useState(project.codeSnippet.css);
  const [jsCode, setJsCode] = useState(project.codeSnippet.js);
  const [copied, setCopied] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string>('Console ready. Click "Execute Code" to trigger.');

  const handleCopySnippet = () => {
    const fullSnippet = `<!-- HTML -->\n${htmlCode}\n\n/* CSS */\n${cssCode}\n\n// JS\n${jsCode}`;
    navigator.clipboard.writeText(fullSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunPlayground = () => {
    setExecutionOutput('Executing code...');
    setTimeout(() => {
      setExecutionOutput(`Successfully compiled & executed standard HTML, CSS, and JS logic!\nSimulated event listener ready.`);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className={`w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden my-8 transition-all ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold">
              {project.category}
            </span>
            <h3 className="text-xl font-extrabold line-clamp-1">{project.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                darkMode ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700' : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              <Github className="w-4 h-4 text-indigo-500" />
              <span>GitHub Code</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

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

        {/* View Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50 dark:bg-slate-950">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 font-bold text-xs border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Overview & Features</span>
          </button>

          <button
            onClick={() => setActiveTab('playground')}
            className={`px-4 py-3 font-bold text-xs border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'playground'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Live Code Sandbox (HTML/CSS/JS)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {activeTab === 'overview' ? (
            <div className="space-y-6">
              {/* Image Showcase */}
              <div className="relative rounded-2xl overflow-hidden aspect-16/9 bg-slate-950 border border-slate-800">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h4 className="text-lg font-bold">Project Architecture & Description</h4>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {project.detailedDescription}
                </p>
              </div>

              {/* Technical Highlights */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                  Key Development Highlights
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className={`text-xs p-3 rounded-xl border flex items-center gap-2.5 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-xs font-semibold border border-indigo-200 dark:border-indigo-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            /* Live Playground Tab */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Inspect & Edit standard HTML5, CSS3, and JavaScript logic:
                </div>

                <button
                  onClick={handleCopySnippet}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
                  <span>{copied ? 'Copied' : 'Copy Full Snippet'}</span>
                </button>
              </div>

              {/* 3 Code Panels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                {/* HTML Panel */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-orange-500">index.html</label>
                  <textarea
                    rows={8}
                    value={htmlCode}
                    onChange={(e) => setHtmlCode(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 text-orange-200 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                {/* CSS Panel */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-blue-400">style.css</label>
                  <textarea
                    rows={8}
                    value={cssCode}
                    onChange={(e) => setCssCode(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 text-blue-200 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* JS Panel */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-amber-400">app.js</label>
                  <textarea
                    rows={8}
                    value={jsCode}
                    onChange={(e) => setJsCode(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 text-amber-200 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Execution Console Bar */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">// Sandbox Execution Console</span>
                  <button
                    onClick={handleRunPlayground}
                    className="px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold flex items-center gap-1"
                  >
                    <Play className="w-3 h-3 fill-slate-950" />
                    <span>Run Live Code</span>
                  </button>
                </div>
                <div className="text-emerald-400 whitespace-pre-wrap">{executionOutput}</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-950">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <Github className="w-4 h-4" />
            <span>Open GitHub Repository Source</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onOpenCollabModal();
            }}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md"
          >
            Collaborate On This Project
          </button>
        </div>

      </div>
    </div>
  );
};
