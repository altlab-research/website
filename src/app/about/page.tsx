import { SectionLabel } from "@/components/Badge";
import { Brain, Database, Workflow, Cloud, Atom } from "lucide-react";

export const metadata = { title: "About — AltLab" };

const PILLARS = [
  { icon: Database, label: "Memory Systems" },
  { icon: Brain, label: "AI Orchestration" },
  { icon: Workflow, label: "Execution Runtimes" },
  { icon: Cloud, label: "Intelligent Operating Systems" },
  { icon: Atom, label: "Future Computing Architectures" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-5 py-14 text-center md:px-8 md:py-20">
        <SectionLabel>About</SectionLabel>
        <h1 className="font-display text-3xl font-bold md:text-5xl">AltLab</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
          Researching the systems that power AI-native computing.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-14 md:px-8">
        <div className="card-surface rounded-2xl p-8 md:p-10">
          <h2 className="font-display text-xl font-semibold">Our mission</h2>
          <p className="mt-3 max-w-2xl text-muted">
            AltLab is an independent AI systems research and infrastructure company.
            We build and research:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.label} className="flex items-center gap-3 rounded-lg border border-border bg-white/[0.02] p-4">
                <p.icon className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm font-medium">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-20 md:px-8">
        <SectionLabel>Founder</SectionLabel>
        <div className="card-surface flex flex-col items-start gap-5 rounded-2xl p-8 sm:flex-row sm:items-center md:p-10">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-primary font-display text-xl font-bold text-white">
            FA
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold">Faruq Adegboyega</h3>
            <p className="mt-1 text-sm text-muted">
              Building the future infrastructure for intelligent systems.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
