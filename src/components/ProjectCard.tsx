import Link from "next/link";
import { Layers, Workflow, Cpu, Sparkles, ArrowRight, type LucideIcon } from "lucide-react";
import type { Project } from "@/types";
import { StatusBadge } from "./Badge";

const ICONS: Record<string, LucideIcon> = {
  Layers,
  Workflow,
  Cpu,
  Sparkles,
};

export default function ProjectCard({ project }: { project: Project }) {
  const Icon = ICONS[project.icon ?? ""] || Layers;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card-surface group flex h-full flex-col rounded-xl p-6 transition-all hover:-translate-y-1"
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${project.color ?? "#6D5EF3"}1A` }}
        >
          <Icon className="h-5 w-5" style={{ color: project.color ?? "#6D5EF3" }} />
        </div>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold">{project.name}</h3>
      <p className="text-sm font-medium text-muted">{project.tagline}</p>
      <p className="mt-3 flex-1 text-sm text-muted">{project.description}</p>

      <ul className="mt-4 space-y-1.5">
        {project.features.slice(0, 3).map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-muted">
            <span className="h-1 w-1 rounded-full bg-primary" />
            {f}
          </li>
        ))}
      </ul>

      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
        View project
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
