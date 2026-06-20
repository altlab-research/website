"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/types";

export default function EditProjectForm({ project }: { project: Project }) {
  const router = useRouter();
  const [tagline, setTagline] = useState(project.tagline);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);
  const [features, setFeatures] = useState(project.features.join(", "));
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setLoading(true);

    const res = await fetch("/api/projects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: project.slug,
        tagline,
        description,
        status,
        features: features.split(",").map((f) => f.trim()).filter(Boolean),
      }),
    });

    setLoading(false);

    if (res.ok) {
      setSaved(true);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to save changes.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface mt-6 max-w-2xl space-y-4 rounded-xl p-6">
      <Field label="Tagline">
        <input value={tagline} onChange={(e) => setTagline(e.target.value)} className="input" />
      </Field>

      <Field label="Description">
        <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="input" />
      </Field>

      <Field label="Status">
        <select value={status} onChange={(e) => setStatus(e.target.value as Project["status"])} className="input">
          <option value="RESEARCH">Research</option>
          <option value="ALPHA">Alpha</option>
          <option value="ACTIVE">Active</option>
        </select>
      </Field>

      <Field label="Features (comma separated)">
        <input value={features} onChange={(e) => setFeatures(e.target.value)} className="input" />
      </Field>

      {error && <p className="text-xs text-red-400">{error}</p>}
      {saved && <p className="text-xs text-emerald-400">Saved.</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
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
