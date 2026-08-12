import React, { useState } from 'react';
import { Project } from '../types';
import { 
  X, 
  Github, 
  Plus, 
  Code, 
  Layers, 
  Sparkles, 
  Check, 
  Link, 
  FileText,
  Tag
} from 'lucide-react';

interface AddProjectModalProps {
  darkMode: boolean;
  onAddProject: (newProject: Project) => void;
  onClose: () => void;
  defaultGithubUser?: string;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  darkMode,
  onAddProject,
  onClose,
  defaultGithubUser = "patelsmit0062"
}) => {
  const [title, setTitle] = useState('');
  const [githubUrl, setGithubUrl] = useState(`https://github.com/${defaultGithubUser}/`);
  const [category, setCategory] = useState<'HTML' | 'CSS' | 'JavaScript' | 'HTML/CSS' | 'DOM App'>('JavaScript');
  const [shortDescription, setShortDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('HTML, CSS, JavaScript');
  const [isFeatured, setIsFeatured] = useState(false);

  // Default HTML/CSS/JS code snippet for interactive playground testing
  const [snippetHtml, setSnippetHtml] = useState(`<div class="my-repo-card">
  <h2>Welcome to My Repository</h2>
  <p id="msg">Built with HTML, CSS, and JavaScript by Smit Patel!</p>
  <button id="clickBtn">Click Me</button>
</div>`);
  const [snippetCss, setSnippetCss] = useState(`.my-repo-card {
  padding: 1.5rem;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  border-radius: 12px;
  text-align: center;
  font-family: system-ui, sans-serif;
}
#clickBtn {
  margin-top: 10px;
  padding: 8px 16px;
  background: white;
  color: #4f46e5;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}`);
  const [snippetJs, setSnippetJs] = useState(`const btn = document.getElementById('clickBtn');
const msg = document.getElementById('msg');
btn.addEventListener('click', () => {
  msg.textContent = '🎉 Button Clicked! JavaScript DOM logic is working!';
});`);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !githubUrl.trim()) {
      alert('Please provide a repository title and GitHub URL.');
      return;
    }

    const tagsArr = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    // Auto-generate placeholder thumbnail based on category
    let placeholderImg = 'https://picsum.photos/seed/' + encodeURIComponent(title) + '/800/600';
    if (category === 'JavaScript') {
      placeholderImg = '/src/assets/images/project_weather_app_1786542797496.jpg';
    } else if (category === 'DOM App') {
      placeholderImg = '/src/assets/images/project_task_tracker_1786542812142.jpg';
    }

    const newProj: Project = {
      id: 'custom-repo-' + Date.now(),
      title: title.trim(),
      category: category,
      shortDescription: shortDescription.trim() || `GitHub repository by Smit Patel showcasing ${category} development.`,
      detailedDescription: detailedDescription.trim() || `This repository contains clean, well-structured code for ${title}, built using core web technologies (HTML, CSS, JavaScript).`,
      image: placeholderImg,
      githubUrl: githubUrl.trim(),
      liveDemoUrl: liveDemoUrl.trim() || githubUrl.trim(),
      tags: tagsArr.length > 0 ? tagsArr : ['HTML', 'CSS', 'JavaScript'],
      featured: isFeatured,
      highlights: [
        'Semantic HTML markup and responsive CSS styling',
        'Vanilla JavaScript interactivity and DOM manipulation',
        `Directly linked to GitHub repo: ${githubUrl.trim()}`
      ],
      codeSnippet: {
        html: snippetHtml,
        css: snippetCss,
        js: snippetJs
      }
    };

    onAddProject(newProj);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleQuickFill = () => {
    setTitle('Smit Patel Quiz Web App');
    setGithubUrl('https://github.com/patelsmit0062/js-quiz-app');
    setCategory('JavaScript');
    setShortDescription('An interactive multiple-choice quiz application created with HTML5, CSS3, and JavaScript LocalStorage score tracking.');
    setDetailedDescription('This application presents dynamic quiz questions, calculates real-time user scores, updates progress bars, and saves high scores locally.');
    setTagsInput('JavaScript, HTML5, CSS3, DOM API, LocalStorage');
    setIsFeatured(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className={`relative w-full max-w-2xl my-8 rounded-3xl border shadow-2xl overflow-hidden transition-all ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-indigo-600/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-md">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold flex items-center gap-2">
                <span>Add GitHub Repository Link</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Add your project to the Explore section with direct GitHub repository code access
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {submitted ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold">Repository Added Successfully!</h4>
            <p className="text-sm text-slate-400">
              Your new repository <span className="font-semibold text-indigo-400">{title}</span> is now visible in the Explore section.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            
            {/* Quick Fill Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-xs font-bold text-indigo-500 hover:text-indigo-400 flex items-center gap-1 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Fill Example Repo</span>
              </button>
            </div>

            {/* Title & GitHub URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                  Repository Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Weather Forecast JS App"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                  GitHub Repository Link *
                </label>
                <div className="relative">
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/patelsmit0062/repo-name"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode 
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                  <Github className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                </div>
              </div>
            </div>

            {/* Skill Category & Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                  Primary Skill / Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode 
                      ? 'bg-slate-800 border-slate-700 text-white' 
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="JavaScript">JavaScript</option>
                  <option value="HTML">HTML5</option>
                  <option value="CSS">CSS3</option>
                  <option value="HTML/CSS">HTML / CSS</option>
                  <option value="DOM App">DOM App</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                  Skills / Tags (comma separated)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="HTML, CSS, JavaScript, DOM API"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode 
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                </div>
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                Short Description
              </label>
              <textarea
                rows={2}
                placeholder="Brief summary of what this GitHub repository does..."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode 
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            {/* Live Demo URL & Featured check */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                  Live Demo Link (Optional)
                </label>
                <div className="relative">
                  <input
                    type="url"
                    placeholder="https://patelsmit0062.github.io/my-repo"
                    value={liveDemoUrl}
                    onChange={(e) => setLiveDemoUrl(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      darkMode 
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                  <Link className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                </div>
              </div>

              <div className="pt-4 sm:pt-0">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Mark as Featured Repository
                  </span>
                </label>
              </div>
            </div>

            {/* Optional Code Snippet accordion */}
            <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-indigo-400">
                  <Code className="w-4 h-4" />
                  <span>Interactive Playground Code Sample</span>
                </span>
                <span className="text-[11px] text-slate-400">HTML, CSS, JS live preview</span>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">HTML Code</label>
                  <textarea
                    rows={2}
                    value={snippetHtml}
                    onChange={(e) => setSnippetHtml(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg font-mono text-xs bg-slate-950 text-emerald-400 border border-slate-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">CSS Code</label>
                  <textarea
                    rows={2}
                    value={snippetCss}
                    onChange={(e) => setSnippetCss(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg font-mono text-xs bg-slate-950 text-sky-400 border border-slate-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">JavaScript Code</label>
                  <textarea
                    rows={2}
                    value={snippetJs}
                    onChange={(e) => setSnippetJs(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg font-mono text-xs bg-slate-950 text-amber-400 border border-slate-800 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Repository to Explore</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
