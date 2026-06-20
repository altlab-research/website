import Link from "next/link";
import { redirect } from "next/navigation";
import { Pencil } from "lucide-react";
import AdminNav from "@/components/AdminNav";
import { createClient } from "@/lib/supabase/server";
import { getProjects } from "@/lib/data";
import { StatusBadge } from "@/components/Badge";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin");

  const projects = await getProjects();

  return (
    <div className="flex flex-col md:flex-row">
      <AdminNav />
      <div className="flex-1 px-5 py-8 md:px-10 md:py-10">
        <h1 className="font-display text-2xl font-bold">Products</h1>
        <p className="mt-1 text-sm text-muted">
          AltMemory, AltFlow, AltRuntime, and AltOS are fixed product pages — edit their copy and status here.
        </p>

        <div className="card-surface mt-6 divide-y divide-border rounded-xl">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{project.name}</p>
                  <StatusBadge status={project.status} />
                </div>
                <p className="mt-1 text-xs text-muted">{project.tagline}</p>
              </div>
              <Link
                href={`/admin/dashboard/projects/${project.slug}`}
                className="flex-shrink-0 rounded-lg border border-border p-2 text-muted transition-colors hover:border-primary/50 hover:text-ink"
              >
                <Pencil className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
