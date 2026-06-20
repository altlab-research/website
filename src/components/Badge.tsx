export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
      {children}
    </p>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-border bg-white/5 px-2 py-0.5 text-[11px] font-medium text-muted">
      {children}
    </span>
  );
}

const STATUS_STYLES: Record<string, string> = {
  RUNNING: "bg-primary/15 text-primary border-primary/30",
  COMPLETED: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  RESEARCH: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  ACTIVE: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  ALPHA: "bg-primary/15 text-primary border-primary/30",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize ${
        STATUS_STYLES[status] || "border-border text-muted"
      }`}
    >
      {status.toLowerCase()}
    </span>
  );
}
