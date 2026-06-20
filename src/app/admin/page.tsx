"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5">
      <div className="flex flex-col items-center text-center">
        <Logo className="h-10 w-10" />
        <h1 className="mt-4 font-display text-2xl font-bold">Admin Login</h1>
        <p className="mt-1 text-sm text-muted">Sign in to manage AltLab content.</p>
      </div>

      <form onSubmit={handleSubmit} className="card-surface mt-8 space-y-4 rounded-xl p-6">
        <div>
          <label htmlFor="email" className="text-xs font-medium text-muted">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-border bg-bg-secondary px-3.5 py-2.5 text-sm text-ink outline-none focus:border-primary"
            placeholder="you@altlab.dev"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-xs font-medium text-muted">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-border bg-bg-secondary px-3.5 py-2.5 text-sm text-ink outline-none focus:border-primary"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          <Lock className="h-3.5 w-3.5" />
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-muted">
        Admin accounts are provisioned manually via Supabase Auth — there is no
        public sign-up.
      </p>
    </div>
  );
}
