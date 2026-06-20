import Link from "next/link";
import { ArrowRight, Brain, Database, Workflow, Cloud, Atom, Layers } from "lucide-react";
import HeroVisual from "@/components/HeroVisual";
import ResearchCard from "@/components/ResearchCard";
import { SectionLabel } from "@/components/Badge";
import { getPapers, getProjects, getExperiments } from "@/lib/data";

export default async function HomePage() {
  const [papers, projects, experiments] = await Promise.all([
    getPapers(),
    getProjects(),
    getExperiments(),
  ]);

  const latestPapers = papers.slice(0, 3);
  const featured = projects[0];

  const researchAreas = [
    {
      icon: Brain,
      title: "AI Systems",
      desc: "Multi-agent systems, autonomy, and intelligent architectures.",
    },
    {
      icon: Database,
      title: "Memory & Knowledge",
      desc: "Memory systems, knowledge graphs, and retrieval models.",
    },
    {
      icon: Workflow,
      title: "Workflows",
      desc: "Orchestration engines for complex tasks and automation.",
    },
    {
      icon: Cloud,
      title: "Infrastructure",
      desc: "Distributed systems, scalability, and reliable infrastructure.",
    },
    {
      icon: Atom,
      title: "Future Computing",
      desc: "Exploring next-gen paradigms and AI-native architectures.",
    },
  ];

  const stats = [
    { value: `${papers.length}+`, label: "Research Papers" },
    { value: `${experiments.length}+`, label: "Experiments" },
    { value: `${projects.length}`, label: "Active Projects" },
    { value: "100%", label: "Open Source" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-14 md:px-8 md:pb-16 md:pt-20">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-6">
          <div>
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.4rem]">
              Engineering the Future
              <br />
              of <span className="text-gradient">AI-Native Computing</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
              Researching memory systems, agent orchestration, AI runtimes and
              intelligent operating systems.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/research"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
              >
                Read Research
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                Explore Products
              </Link>
            </div>
          </div>

          <HeroVisual />
        </div>
      </section>

      {/* Research Areas */}
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <SectionLabel>Research Areas</SectionLabel>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {researchAreas.map((area) => (
            <div key={area.title} className="card-surface rounded-xl p-5 transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <area.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 font-display text-sm font-semibold">{area.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Research + Featured Project */}
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <SectionLabel>Latest Research</SectionLabel>
              <Link href="/research" className="text-xs font-medium text-muted hover:text-ink">
                View all &rarr;
              </Link>
            </div>
            <div className="space-y-4">
              {latestPapers.map((paper) => (
                <ResearchCard key={paper.id} paper={paper} />
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Featured Project</SectionLabel>
            {featured ? (
              <Link
                href={`/projects/${featured.slug}`}
                className="card-surface block rounded-xl p-6 transition-all hover:-translate-y-0.5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{featured.name}</h3>
                <p className="mt-2 text-sm text-muted">{featured.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  View Project <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ) : (
              <div className="card-surface rounded-xl p-6 text-sm text-muted">
                No products published yet.
              </div>
            )}

            <div className="card-surface mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl">
              {stats.map((s) => (
                <div key={s.label} className="bg-bg-secondary/40 p-4 text-center">
                  <p className="font-display text-2xl font-bold text-gradient">{s.value}</p>
                  <p className="mt-1 text-[11px] text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="card-surface flex flex-col items-start justify-between gap-6 rounded-2xl p-8 md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="font-display text-xl font-semibold md:text-2xl">
              Building the infrastructure for what comes after the chatbot.
            </h2>
            <p className="mt-2 max-w-lg text-sm text-muted">
              Follow our research as we publish papers, open-source our infrastructure,
              and document experiments in real time.
            </p>
          </div>
          <Link
            href="/about"
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-white"
          >
            About AltLab <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
