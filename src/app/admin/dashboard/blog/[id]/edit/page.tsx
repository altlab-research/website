"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdminNav from "@/components/AdminNav";

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch(`/api/posts?id=${id}`)
      .then((r) => r.json())
      .then((data) => {
        const post = data.post;
        if (post) {
          setTitle(post.title);
          setSlug(post.slug);
          setExcerpt(post.excerpt ?? "");
          setTags((post.tags ?? []).join(", "));
          setContent(post.content);
        }
        setFetching(false);
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch(`/api/posts?id=${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        excerpt,
        content,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/dashboard/blog");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to update post.");
    }
  }

  if (fetching) return (
    <div className="flex flex-col md:flex-row">
      <AdminNav />
      <div className="flex-1 px-5 py-8 md:px-10 md:py-10">
        <p className="text-sm text-muted">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row">
      <AdminNav />
      <div className="flex-1 px-5 py-8 md:px-10 md:py-10">
        <Link href="/admin/dashboard/blog" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
        </Link>

        <h1 className="mt-4 font-display text-2xl font-bold">Edit Post</h1>

        <form onSubmit={handleSubmit} className="card-surface mt-6 max-w-2xl space-y-4 rounded-xl p-6">
          <Field label="Title">
            <input required value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
          </Field>
          <Field label="Slug">
            <input required value={slug} onChange={(e) => setSlug(e.target.value)} className="input" />
          </Field>
          <Field label="Excerpt">
            <textarea rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="input" />
          </Field>
          <Field label="Tags (comma separated)">
            <input value={tags} onChange={(e) => setTags(e.target.value)} className="input" />
          </Field>
          <Field label="Content">
            <textarea required rows={10} value={content} onChange={(e) => setContent(e.target.value)} className="input" />
          </Field>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
