"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdminNav from "@/components/AdminNav";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function NewPaperPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [abstract, setAbstract] = useState("");
  const [authors, setAuthors] = useState("");
  const [tags, setTags] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [paperPdf, setPaperPdf] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [architectureUrl, setArchitectureUrl] = useState("");
  const [architectureImageUrl, setArchitectureImageUrl] = useState("");
  const [status, setStatus] = useState("published");
  const [researchArea, setResearchArea] = useState("");
  const [featured, setFeatured] = useState(false);
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/papers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug: slug || slugify(title),
        abstract,
        authors: authors.split(",").map((a) => a.trim()).filter(Boolean),
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        pdfUrl: pdfUrl || undefined,
        paperPdf: paperPdf || undefined,
        githubUrl: githubUrl || undefined,
        demoUrl: demoUrl || undefined,
        architectureUrl: architectureUrl || undefined,
        architectureImageUrl: architectureImageUrl || undefined,
        status,
        researchArea: researchArea || undefined,
        featured,
        publishedAt: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString(),
        content: content || undefined,
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/dashboard/papers");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to publish paper.");
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <AdminNav />
      <div className="flex-1 px-5 py-8 md:px-10 md:py-10">
        <Link href="/admin/dashboard/papers" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Papers
        </Link>

        <h1 className="mt-4 font-display text-2xl font-bold">New Paper</h1>

        <form onSubmit={handleSubmit} className="card-surface mt-6 max-w-2xl space-y-4 rounded-xl p-6">
          <Field label="Title">
            <input
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
              className="input"
            />
          </Field>

          <Field label="Slug">
            <input
              required
              value={slug}
              onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
              className="input"
            />
          </Field>

          <Field label="Abstract">
            <textarea required rows={4} value={abstract} onChange={(e) => setAbstract(e.target.value)} className="input" />
          </Field>

          <Field label="Authors (comma separated)">
            <input value={authors} onChange={(e) => setAuthors(e.target.value)} className="input" placeholder="Faruq Adegboyega, AltLab Systems Group" />
          </Field>

          <Field label="Tags (comma separated)">
            <input value={tags} onChange={(e) => setTags(e.target.value)} className="input" placeholder="AI Agents, Systems" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Status">
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="input">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </Field>
            <Field label="Research Area">
              <input value={researchArea} onChange={(e) => setResearchArea(e.target.value)} className="input" placeholder="Memory Systems" />
            </Field>
          </div>

          <Field label="Published At">
            <input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} className="input" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="PDF URL">
              <input value={pdfUrl} onChange={(e) => setPdfUrl(e.target.value)} className="input" placeholder="https://..." />
            </Field>
            <Field label="Paper PDF (direct file URL)">
              <input value={paperPdf} onChange={(e) => setPaperPdf(e.target.value)} className="input" placeholder="https://..." />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="GitHub URL">
              <input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="input" placeholder="https://github.com/..." />
            </Field>
            <Field label="Demo URL">
              <input value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} className="input" placeholder="https://..." />
            </Field>
          </div>

          <Field label="Architecture Image URL">
            <input value={architectureImageUrl} onChange={(e) => setArchitectureImageUrl(e.target.value)} className="input" placeholder="https://... (shown above abstract)" />
          </Field>

          <Field label="Architecture Diagram URL (link)">
            <input value={architectureUrl} onChange={(e) => setArchitectureUrl(e.target.value)} className="input" placeholder="https://..." />
          </Field>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            <span className="text-sm font-medium">Featured paper</span>
          </label>

          <Field label="Full content (markdown, optional)">
            <textarea rows={8} value={content} onChange={(e) => setContent(e.target.value)} className="input" />
          </Field>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Publishing..." : "Publish Paper"}
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
