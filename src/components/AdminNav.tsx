"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  FlaskConical,
  Boxes,
  LogOut,
} from "lucide-react";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/dashboard/papers", label: "Papers", icon: FileText },
  { href: "/admin/dashboard/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/dashboard/experiments", label: "Experiments", icon: FlaskConical },
  { href: "/admin/dashboard/projects", label: "Products", icon: Boxes },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin");
    router.refresh();
  }

  return (
    <aside className="flex w-full flex-col border-b border-border bg-bg-secondary/40 md:h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <Logo className="h-6 w-6" />
        <span className="font-display text-sm font-bold">AltLab Admin</span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {NAV.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              pathname === item.href.split("#")[0]
                ? "bg-primary/10 text-ink"
                : "text-muted hover:bg-white/5 hover:text-ink"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={handleSignOut}
        className="m-3 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-white/5 hover:text-ink"
      >
        <LogOut className="h-4 w-4" /> Sign Out
      </button>
    </aside>
  );
}
