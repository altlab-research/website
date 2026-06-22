import { NextRequest, NextResponse } from "next/server";
import { getProjects } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    const project = await prisma.project.findUnique({ where: { id } });
    return NextResponse.json({ project });
  }
  const projects = await getProjects();
  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  try {
    const project = await prisma.project.create({
      data: {
        name: body.name,
        slug: body.slug,
        tagline: body.tagline,
        description: body.description,
        status: body.status ?? "RESEARCH",
        features: body.features ?? [],
        icon: body.icon,
        color: body.color,
        githubUrl: body.githubUrl,
        docsUrl: body.docsUrl,
        order: body.order ?? 0,
      },
    });
    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not create project.", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = request.nextUrl.searchParams.get("id");
  const body = await request.json();

  try {
    const project = await prisma.project.update({
      where: id ? { id } : { slug: body.slug },
      data: {
        name: body.name,
        slug: body.slug,
        tagline: body.tagline,
        description: body.description,
        status: body.status,
        features: body.features,
        icon: body.icon,
        color: body.color,
        githubUrl: body.githubUrl,
        docsUrl: body.docsUrl,
        order: body.order,
      },
    });
    return NextResponse.json({ project });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not update project.", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not delete project.", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

