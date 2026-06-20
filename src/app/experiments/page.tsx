import { SectionLabel } from "@/components/Badge";
import ExperimentCard from "@/components/ExperimentCard";
import { getExperiments } from "@/lib/data";

export const metadata = { title: "Labs — AltLab" };

export default async function ExperimentsPage() {
  const experiments = await getExperiments();

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <SectionLabel>Labs</SectionLabel>
      <h1 className="font-display text-3xl font-bold md:text-4xl">Active experiments</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Work-in-progress research running inside AltLab — some shipping toward
        production, some still pure exploration.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {experiments.map((experiment) => (
          <ExperimentCard key={experiment.id} experiment={experiment} />
        ))}
      </div>
    </div>
  );
}
