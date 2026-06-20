import { redirect } from "next/navigation";
import {
  FileText,
  Image as ImageIcon,
  Upload,
  GitBranch,
  Newspaper,
  FlaskConical,
  Boxes,
  Eye,
  Download,
  Users,
  Github,
} from "lucide-react";
import AdminNav from "@/components/AdminNav";
import { createClient } from "@/lib/supabase/server";
import { getPapers, getPosts, getExperiments, getProjects } from "@/lib/data";

const CAPABILITIES = [
  { icon: FileText, label: "Publish Papers", desc: "Add new research papers with abstracts, authors, and tags." },
  { icon: ImageIcon, label: "Edit Homepage", desc: "Update the hero copy, featured project, and stats." },
  { icon: Upload, label: "Upload PDFs", desc: "Attach paper PDFs for direct download." },
  { icon: Upload, label: "Upload Images", desc: "Manage thumbnails and cover images." },
  { icon: GitBranch, label: "Upload Diagrams", desc: "Attach architecture diagrams to research papers." },
  { icon: Newspaper, label: "Publish Blog", desc: "Write and publish new blog posts." },
  { icon: FlaskConical, label: "Publish Experiments", desc: "Track in-progress experiments and their status." },
  { icon: Boxes, label: "Edit Products", desc: "Update project descriptions, features, and status." },
];

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin");

  const [papers, posts, experiments, projects] = await Promise.all([
    getPapers(),
    getPosts(),
    getExperiments(),
    getProjects(),
  ]);

  const totalDownloads = papers.reduce((sum, p) => sum + p.downloads, 0);
  const totalViews = papers.reduce((sum, p) => sum + p.views, 0);

  const analytics = [
    { icon: Eye, label: "Research Views", value: totalViews.toLocaleString() },
    { icon: Download, label: "Downloads", value: totalDownloads.toLocaleString() },
    { icon: Users, label: "Visitors", value: "12,408" },
    { icon: Github, label: "GitHub Clicks", value: "1,932" },
  ];

  const recentItems = [
    ...papers.slice(0, 2).map((p) => ({ type: "Paper", title: p.title, date: p.publishedAt })),
    ...posts.slice(0, 2).map((p) => ({ type: "Blog Post", title: p.title, date: p.createdAt })),
  ].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <div className="flex flex-col md:flex-row">
      <AdminNav />

      <div className="flex-1 px-5 py-8 md:px-10 md:py-10">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-muted">Signed in as {user.email}</p>
          <h1 className="font-display text-2xl font-bold md:text-3xl">Dashboard</h1>
        </div>

        <section id="analytics" className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {analytics.map((stat) => (
            <div key={stat.label} className="card-surface rounded-xl p-5">
              <stat.icon className="h-5 w-5 text-primary" />
              <p className="mt-3 font-display text-2xl font-bold">{stat.value}</p>
              <p className="mt-0.5 text-xs text-muted">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold">Content overview</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="card-surface rounded-xl p-5">
              <p className="font-display text-xl font-bold">{papers.length}</p>
              <p className="text-xs text-muted">Published papers</p>
            </div>
            <div className="card-surface rounded-xl p-5">
              <p className="font-display text-xl font-bold">{posts.length}</p>
              <p className="text-xs text-muted">Blog posts</p>
            </div>
            <div className="card-surface rounded-xl p-5">
              <p className="font-display text-xl font-bold">{experiments.length}</p>
              <p className="text-xs text-muted">Experiments</p>
            </div>
            <div className="card-surface rounded-xl p-5">
              <p className="font-display text-xl font-bold">{projects.length}</p>
              <p className="text-xs text-muted">Products</p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold">Capabilities</h2>
          <p className="mt-1 text-sm text-muted">
            Content actions are wired to mock data right now. Connect Supabase
            Storage and Prisma to make these persist.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((cap) => (
              <button
                key={cap.label}
                className="card-surface rounded-xl p-5 text-left transition-all hover:-translate-y-0.5"
              >
                <cap.icon className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm font-semibold">{cap.label}</p>
                <p className="mt-1 text-xs text-muted">{cap.desc}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10 pb-10">
          <h2 className="font-display text-lg font-semibold">Recently updated</h2>
          <div className="card-surface mt-4 divide-y divide-border rounded-xl">
            {recentItems.map((item) => (
              <div key={item.title} className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted">{item.type}</p>
                </div>
                <span className="flex-shrink-0 text-xs text-muted">
                  {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
