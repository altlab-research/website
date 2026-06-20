import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, BookOpen, Check, Layers, Workflow, Cpu, Sparkles, type LucideIcon } from "lucide-react";
import { getProjects, getProjectBySlug } from "@/lib/data";
import { StatusBadge } from "@/components/Badge";

const ICONS: Record<string, LucideIcon> = { Layers, Workflow, Cpu, Sparkles };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const Icon = ICONS[project.icon ?? ""] || Layers;

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Projects
      </Link>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${project.color ?? "#6D5EF3"}1A` }}
          >
            <Icon className="h-7 w-7" style={{ color: project.color ?? "#6D5EF3" }} />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold md:text-4xl">{project.name}</h1>
            <p className="mt-1 text-sm font-medium text-muted">{project.tagline}</p>
          </div>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-primary/50">
            <Github className="h-4 w-4" /> GitHub
          </a>
        )}
        {project.docsUrl && (
          <a href={project.docsUrl} className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-white">
            <BookOpen className="h-4 w-4" /> Read the Docs
          </a>
        )}
      </div>

      <div className="card-surface mt-10 rounded-xl p-6 md:p-8">
        <h2 className="font-display text-lg font-semibold">Key Features</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {project.features.map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm text-ink/90">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
