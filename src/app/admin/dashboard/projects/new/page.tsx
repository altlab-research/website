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

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("RESEARCH");
  const [features, setFeatures] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("#6D5EF3");
  const [githubUrl, setGithubUrl] = useState("");
  const [docsUrl, setDocsUrl] = useState("");
  const [order, setOrder] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        slug: slug || slugify(name),
        tagline,
        description,
        status,
        features: features.split(",").map((f) => f.trim()).filter(Boolean),
        icon: icon || undefined,
        color: color || undefined,
        githubUrl: githubUrl || undefined,
        docsUrl: docsUrl || undefined,
        order,
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/dashboard/projects");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to create product.");
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <AdminNav />
      <div className="flex-1 px-5 py-8 md:px-10 md:py-10">
        <Link href="/admin/dashboard/projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Products
        </Link>

        <h1 className="mt-4 font-display text-2xl font-bold">New Product</h1>

        <form onSubmit={handleSubmit} className="card-surface mt-6 max-w-2xl space-y-4 rounded-xl p-6">
          <Field label="Name">
            <input
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
              className="input"
              placeholder="AltMemory"
            />
          </Field>

          <Field label="Slug">
            <input
              required
              value={slug}
              onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
              className="input"
              placeholder="altmemory"
            />
          </Field>

          <Field label="Tagline">
            <input required value={tagline} onChange={(e) => setTagline(e.target.value)} className="input" placeholder="Persistent Memory Infrastructure" />
          </Field>

          <Field label="Description">
            <textarea required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="input" />
          </Field>

          <Field label="Status">
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="input">
              <option value="RESEARCH">Research</option>
              <option value="ALPHA">Alpha</option>
              <option value="ACTIVE">Active</option>
            </select>
          </Field>

          <Field label="Features (comma separated)">
            <input value={features} onChange={(e) => setFeatures(e.target.value)} className="input" placeholder="Semantic Retrieval, Memory Ranking, Long-term Storage" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Icon (Lucide name)">
              <input value={icon} onChange={(e) => setIcon(e.target.value)} className="input" placeholder="Layers" />
            </Field>
            <Field label="Color">
              <div className="flex items-center gap-2">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-9 w-12 cursor-pointer rounded border border-border bg-transparent" />
                <input value={color} onChange={(e) => setColor(e.target.value)} className="input flex-1" placeholder="#6D5EF3" />
              </div>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="GitHub URL">
              <input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="input" placeholder="https://github.com/..." />
            </Field>
            <Field label="Docs URL">
              <input value={docsUrl} onChange={(e) => setDocsUrl(e.target.value)} className="input" placeholder="https://..." />
            </Field>
          </div>

          <Field label="Display Order">
            <input type="number" min={0} value={order} onChange={(e) => setOrder(Number(e.target.value))} className="input" />
          </Field>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Product"}
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
