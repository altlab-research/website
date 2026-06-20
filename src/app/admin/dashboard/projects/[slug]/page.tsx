import { redirect, notFound } from "next/navigation";
import AdminNav from "@/components/AdminNav";
import { createClient } from "@/lib/supabase/server";
import { getProjectBySlug } from "@/lib/data";
import EditProjectForm from "./EditProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin");

  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="flex flex-col md:flex-row">
      <AdminNav />
      <div className="flex-1 px-5 py-8 md:px-10 md:py-10">
        <h1 className="font-display text-2xl font-bold">Edit {project.name}</h1>
        <EditProjectForm project={project} />
      </div>
    </div>
  );
}
