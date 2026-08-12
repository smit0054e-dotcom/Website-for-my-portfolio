export interface StudentProfile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  avatarUrl: string;
  availabilityStatus: string;
  yearsExperience: string;
  education: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'JavaScript' | 'HTML' | 'CSS' | 'HTML/CSS' | 'DOM App' | 'Full-Stack' | string;
  shortDescription: string;
  detailedDescription: string;
  image: string;
  githubUrl: string;
  liveDemoUrl: string;
  tags: string[];
  featured: boolean;
  highlights: string[];
  codeSnippet: {
    html: string;
    css: string;
    js: string;
  };
}

export interface Skill {
  name: string;
  category: 'Core Frontend' | 'Tools & Workflow' | 'Web Fundamentals';
  proficiency: number; // 0 - 100
  iconName: string;
  description: string;
  sampleCode?: string;
}

export interface CollaborationForm {
  senderName: string;
  senderEmail: string;
  projectType: string;
  subject: string;
  message: string;
}
