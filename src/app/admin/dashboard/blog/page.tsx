import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import AdminNav from "@/components/AdminNav";
import { createClient } from "@/lib/supabase/server";
import { getPosts } from "@/lib/data";
import DeleteButton from "@/components/admin/DeleteButton";
import { formatDate } from "@/lib/utils";

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin");

  const posts = await getPosts();

  return (
    <div className="flex flex-col md:flex-row">
      <AdminNav />
      <div className="flex-1 px-5 py-8 md:px-10 md:py-10">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">Blog</h1>
          <Link
            href="/admin/dashboard/blog/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" /> New Post
          </Link>
        </div>

        <div className="card-surface mt-6 divide-y divide-border rounded-xl">
          {posts.length === 0 && (
            <p className="p-6 text-sm text-muted">No posts yet. Publish your first one.</p>
          )}
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{post.title}</p>
                <p className="text-xs text-muted">
                  {formatDate(post.createdAt)} &middot; /{post.slug}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/dashboard/blog/${post.id}/edit`}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:border-primary/50 hover:text-primary"
                >
                  Edit
                </Link>
                <DeleteButton endpoint="/api/posts" id={post.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
