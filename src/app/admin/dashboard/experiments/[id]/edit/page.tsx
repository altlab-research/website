"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdminNav from "@/components/AdminNav";

export default function EditExperimentPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("RESEARCH");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch(`/api/experiments?id=${id}`)
      .then((r) => r.json())
      .then((data) => {
        const exp = data.experiment;
        if (exp) {
          setName(exp.name);
          setSlug(exp.slug);
          setDescription(exp.description);
          setTags((exp.tags ?? []).join(", "));
          setStatus(exp.status);
          setProgress(exp.progress);
        }
        setFetching(false);
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch(`/api/experiments?id=${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        slug,
        description,
        status,
        progress,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/dashboard/experiments");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to update experiment.");
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
        <Link href="/admin/dashboard/experiments" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Experiments
        </Link>

        <h1 className="mt-4 font-display text-2xl font-bold">Edit Experiment</h1>

        <form onSubmit={handleSubmit} className="card-surface mt-6 max-w-2xl space-y-4 rounded-xl p-6">
          <Field label="Name">
            <input required value={name} onChange={(e) => setName(e.target.value)} className="input" />
          </Field>
          <Field label="Slug">
            <input required value={slug} onChange={(e) => setSlug(e.target.value)} className="input" />
          </Field>
          <Field label="Description">
            <textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="input" />
          </Field>
          <Field label="Tags (comma separated)">
            <input value={tags} onChange={(e) => setTags(e.target.value)} className="input" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Status">
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="input">
                <option value="RESEARCH">Research</option>
                <option value="RUNNING">Running</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </Field>
            <Field label="Progress (%)">
              <input type="number" min={0} max={100} value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="input" />
            </Field>
          </div>

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
