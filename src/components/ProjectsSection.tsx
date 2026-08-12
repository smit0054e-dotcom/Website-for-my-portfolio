import React, { useState } from 'react';
import { Project, StudentProfile } from '../types';
import { 
  Github, 
  ExternalLink, 
  Code, 
  Sparkles, 
  Star, 
  Layers, 
  Terminal, 
  Eye, 
  Play,
  Plus
} from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  profile: StudentProfile;
  darkMode: boolean;
  onSelectProject: (project: Project) => void;
  onOpenCollabModal: () => void;
  onOpenAddProjectModal: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  profile,
  darkMode,
  onSelectProject,
  onOpenCollabModal,
  onOpenAddProjectModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [starredProjects, setStarredProjects] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('portfolio_project_stars');
      return saved ? JSON.parse(saved) : { 'weather-dashboard': 12, 'study-task-tracker': 18, 'js-playground': 25 };
    } catch {
      return { 'weather-dashboard': 12, 'study-task-tracker': 18, 'js-playground': 25 };
    }
  });

  const toggleStar = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarredProjects(prev => {
      const current = prev[projectId] || 0;
      const next = { ...prev, [projectId]: current + 1 };
      try {
        localStorage.setItem('portfolio_project_stars', JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const categories = ['All', 'HTML', 'CSS', 'JavaScript', 'HTML/CSS', 'DOM App'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory || p.tags.some(t => t.toLowerCase() === activeCategory.toLowerCase()));

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 text-xs font-semibold">
              <FolderGitIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Explore My Web Projects</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Explore My Projects
            </h2>
            <p className={`text-base sm:text-lg ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Hand-crafted web applications built with pure <span className="font-bold text-orange-500">HTML5</span>, <span className="font-bold text-sky-500">CSS3</span>, and <span className="font-bold text-amber-500">JavaScript</span>. Filter by skill or add a new GitHub repository link!
            </p>
          </div>

          {/* GitHub Action Buttons (Profile & Repository Link Adder) */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAddProjectModal}
              id="add-github-repo-btn"
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add GitHub Repository</span>
            </button>

            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 border border-slate-700"
              id="main-github-repo-link"
            >
              <Github className="w-5 h-5 text-indigo-400" />
              <span>GitHub Profile</span>
              <ExternalLink className="w-4 h-4 opacity-70" />
            </a>
          </div>
        </div>

        {/* Filter Tabs with Skills Highlight */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
              <Code className="w-3.5 h-3.5" />
              <span>Filter Skill:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : darkMode
                    ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Showing <span className="font-bold text-indigo-400">{filteredProjects.length}</span> projects
          </div>
        </div>

        {/* Projects Grid or Empty State */}
        {filteredProjects.length === 0 ? (
          <div className={`p-12 rounded-3xl border text-center space-y-5 transition-all ${
            darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-600/10 text-indigo-500 flex items-center justify-center">
              <Plus className="w-8 h-8 stroke-[2.5]" />
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h3 className={`text-xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                No projects listed yet
              </h3>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                The project list is currently clean. Click the button below to add your own GitHub repository link, title, skill tags, and live code preview!
              </p>
            </div>
            <button
              onClick={onOpenAddProjectModal}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Your GitHub Repository</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const stars = starredProjects[project.id] || 0;
              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className={`group cursor-pointer rounded-2xl border overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 ${
                    darkMode
                      ? 'bg-slate-900/90 border-slate-800 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-950/50'
                      : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100'
                  }`}
                >
                  <div>
                    {/* Thumbnail Container */}
                    <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold border border-slate-700/50">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center gap-1 shadow-sm">
                            <Sparkles className="w-3 h-3" />
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Quick Live Preview Overlay Hint */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/60 backdrop-blur-xs pointer-events-none">
                        <span className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold flex items-center gap-2 shadow-lg">
                          <Play className="w-4 h-4 fill-slate-900" />
                          Live Demo & Code
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`text-xl font-bold line-clamp-1 group-hover:text-indigo-500 transition-colors ${
                          darkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {project.title}
                        </h3>

                        {/* Interactive Star button */}
                        <button
                          onClick={(e) => toggleStar(project.id, e)}
                          title="Star project"
                          className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border transition-colors ${
                            darkMode
                              ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
                              : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                          }`}
                        >
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{stars}</span>
                        </button>
                      </div>

                      <p className={`text-sm leading-relaxed line-clamp-2 ${
                        darkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {project.shortDescription}
                      </p>

                      {/* Tag Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md ${
                              darkMode
                                ? 'bg-slate-800 text-slate-300 border border-slate-700'
                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className={`px-6 py-4 border-t flex items-center justify-between gap-2 ${
                    darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-100'
                  }`}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                        darkMode
                          ? 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                          : 'border-slate-300 text-slate-700 hover:bg-white hover:text-slate-900'
                      }`}
                    >
                      <Github className="w-3.5 h-3.5 text-indigo-500" />
                      <span>GitHub Code</span>
                    </a>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <span>View Demo</span>
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner encouraging collaboration */}
        <div className={`mt-16 p-8 rounded-3xl border text-center relative overflow-hidden ${
          darkMode ? 'bg-indigo-950/40 border-indigo-900' : 'bg-indigo-50/80 border-indigo-200'
        }`}>
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Want to see more code or collaborate on a new project?
            </h3>
            <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              I am always building new HTML, CSS, and JavaScript projects and looking for open-source opportunities or web development internships!
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={onOpenCollabModal}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all"
              >
                Collaborate With Me
              </button>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 rounded-xl border font-bold text-sm transition-all flex items-center gap-2 ${
                  darkMode ? 'border-indigo-700 text-indigo-200 hover:bg-indigo-900/50' : 'border-indigo-300 text-indigo-800 hover:bg-white'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>Explore All Repositories</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const FolderGitIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);
