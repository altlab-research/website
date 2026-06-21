export type ExperimentStatus = "RUNNING" | "COMPLETED" | "RESEARCH";
export type ProjectStatus = "ACTIVE" | "ALPHA" | "RESEARCH";

export interface Paper {
  id: string;
  title: string;
  slug: string;
  abstract: string;
  authors: string[];
  thumbnail: string | null;
  pdfUrl: string | null;
  paperPdf?: string | null;
  githubUrl: string | null;
  demoUrl?: string | null;
  architectureUrl: string | null;
  architectureImageUrl?: string | null;
  publishedAt: Date | string;
  tags: string[];
  content: string | null;
  status?: string | null;
  researchArea?: string | null;
  featured?: boolean;
  citations: number;
  downloads: number;
  views: number;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  cover: string | null;
  excerpt: string | null;
  content: string;
  tags: string[];
  createdAt: Date | string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  features: string[];
  icon: string | null;
  color: string | null;
  githubUrl: string | null;
  docsUrl: string | null;
}

export interface Experiment {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: ExperimentStatus;
  tags: string[];
  progress: number;
}

export interface CareerListing {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  description: string;
}
