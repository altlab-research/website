import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import AdminNav from "@/components/AdminNav";
import { createClient } from "@/lib/supabase/server";
import { getPapers } from "@/lib/data";
import DeleteButton from "@/components/admin/DeleteButton";
import { formatDate } from "@/lib/utils";

export default async function AdminPapersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin");

  const papers = await getPapers();

  return (
    <div className="flex flex-col md:flex-row">
      <AdminNav />
      <div className="flex-1 px-5 py-8 md:px-10 md:py-10">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">Papers</h1>
          <Link
            href="/admin/dashboard/papers/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" /> New Paper
          </Link>
        </div>

        <div className="card-surface mt-6 divide-y divide-border rounded-xl">
          {papers.length === 0 && (
            <p className="p-6 text-sm text-muted">No papers yet. Publish your first one.</p>
          )}
          {papers.map((paper) => (
            <div key={paper.id} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{paper.title}</p>
                <p className="text-xs text-muted">
                  {formatDate(paper.publishedAt)} &middot; /{paper.slug}
                </p>
              </div>
              <DeleteButton endpoint="/api/papers" id={paper.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
