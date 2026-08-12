import { StudentProfile, Project, Skill } from '../types';

export const initialProfile: StudentProfile = {
  name: "Smit Patel",
  title: "Student Web Developer & Frontend Specialist",
  tagline: "Building responsive, accessible, and interactive web applications with pure HTML, CSS, and JavaScript.",
  bio: "Hello! I am Smit Patel, a passionate Web Developer specializing in core web technologies — HTML5, CSS3, and JavaScript. I love crafting semantic, responsive, and user-friendly web pages and DOM applications. Explore my skills, check out my GitHub projects, or add your own repository link directly in the Explore section below!",
  email: "patelsmit0062@gmail.com",
  phone: "7984934371",
  location: "Open for Opportunities & Collaborations",
  githubUrl: "https://github.com/patelsmit0062",
  linkedinUrl: "https://linkedin.com/in/patelsmit0062",
  twitterUrl: "https://x.com/patelsmit0062",
  avatarUrl: "",
  availabilityStatus: "Available for Web Development & Projects",
  yearsExperience: "HTML, CSS, JavaScript Enthusiast",
  education: "Computer Science & Web Development Student"
};

export const initialProjects: Project[] = [];

export const initialSkills: Skill[] = [
  {
    name: "HTML5 & Semantic Markup",
    category: "Core Frontend",
    proficiency: 92,
    iconName: "Code2",
    description: "Structuring clean, accessible, and SEO-friendly document trees with proper sectioning tags.",
    sampleCode: `<article class="card">
  <header><h1>Semantic Web</h1></header>
  <p>Clean HTML structure enhances accessibility.</p>
</article>`
  },
  {
    name: "CSS3 & Responsive Layouts",
    category: "Core Frontend",
    proficiency: 88,
    iconName: "Palette",
    description: "Expertise in Flexbox, Grid, CSS Variables, Media Queries, and smooth transitions.",
    sampleCode: `.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}`
  },
  {
    name: "JavaScript (ES6+)",
    category: "Core Frontend",
    proficiency: 85,
    iconName: "Terminal",
    description: "DOM manipulation, arrow functions, promises, async/await, array methods, and LocalStorage.",
    sampleCode: `const fetchData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};`
  },
  {
    name: "Git & GitHub Workflow",
    category: "Tools & Workflow",
    proficiency: 80,
    iconName: "GitBranch",
    description: "Version control basics, branching, pull requests, commit messages, and GitHub Pages deployment.",
    sampleCode: `git checkout -b feature/new-component
git commit -m "feat: add collaboration section"
git push origin feature/new-component`
  },
  {
    name: "Web Accessibility (WCAG)",
    category: "Web Fundamentals",
    proficiency: 82,
    iconName: "Accessibility",
    description: "ARIA roles, keyboard navigation focus rings, screen-reader support, and color contrast compliance.",
    sampleCode: `<button aria-label="Toggle dark mode theme" tabindex="0">
  <svg>...</svg>
</button>`
  },
  {
    name: "Browser APIs & LocalStorage",
    category: "Tools & Workflow",
    proficiency: 84,
    iconName: "Database",
    description: "Persisting user preferences, JSON parsing, Web Storage API, and event handling.",
    sampleCode: `const saveTheme = (mode) => {
  localStorage.setItem('theme_preference', mode);
};`
  }
];
