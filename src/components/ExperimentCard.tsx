import type { Experiment } from "@/types";
import { StatusBadge, Tag } from "./Badge";

export default function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <div className="card-surface rounded-xl p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-base font-semibold">{experiment.name}</h3>
        <StatusBadge status={experiment.status} />
      </div>
      <p className="mt-2 text-sm text-muted">{experiment.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {experiment.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-xs text-muted">
          <span>Progress</span>
          <span>{experiment.progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-primary"
            style={{ width: `${experiment.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
