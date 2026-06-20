import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import AdminNav from "@/components/AdminNav";
import { createClient } from "@/lib/supabase/server";
import { getExperiments } from "@/lib/data";
import DeleteButton from "@/components/admin/DeleteButton";
import { StatusBadge } from "@/components/Badge";

export default async function AdminExperimentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin");

  const experiments = await getExperiments();

  return (
    <div className="flex flex-col md:flex-row">
      <AdminNav />
      <div className="flex-1 px-5 py-8 md:px-10 md:py-10">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">Experiments</h1>
          <Link
            href="/admin/dashboard/experiments/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" /> New Experiment
          </Link>
        </div>

        <div className="card-surface mt-6 divide-y divide-border rounded-xl">
          {experiments.length === 0 && (
            <p className="p-6 text-sm text-muted">No experiments yet. Add your first one.</p>
          )}
          {experiments.map((experiment) => (
            <div key={experiment.id} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium">{experiment.name}</p>
                  <StatusBadge status={experiment.status} />
                </div>
                <p className="mt-1 text-xs text-muted">{experiment.progress}% complete</p>
              </div>
              <DeleteButton endpoint="/api/experiments" id={experiment.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
