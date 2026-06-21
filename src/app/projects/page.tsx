import { SectionLabel } from "@/components/Badge";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/data";

export const dynamic = 'force-dynamic';

export const metadata = { title: "Projects — AltLab" };

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <SectionLabel>Projects</SectionLabel>
      <h1 className="font-display text-3xl font-bold md:text-4xl">
        Infrastructure for AI-native computing
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Four research programs, each shipping as production-grade infrastructure:
        persistent memory, workflow orchestration, execution runtime, and an
        AI-native operating system.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
