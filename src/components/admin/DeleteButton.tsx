"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteButton({ endpoint, id }: { endpoint: string; id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this item? This can't be undone.")) return;
    setLoading(true);
    const res = await fetch(`${endpoint}?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Failed to delete.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex-shrink-0 rounded-lg border border-border p-2 text-muted transition-colors hover:border-red-500/50 hover:text-red-400 disabled:opacity-50"
      aria-label="Delete"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
