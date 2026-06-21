import { NextRequest, NextResponse } from "next/server";
import { getPapers } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    const paper = await prisma.paper.findUnique({ where: { id } });
    return NextResponse.json({ paper });
  }
  const papers = await getPapers();
  return NextResponse.json({ papers });
}


export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    const paper = await prisma.paper.create({
      data: {
        title: body.title,
        slug: body.slug,
        abstract: body.abstract,
        authors: body.authors ?? [],
        pdfUrl: body.pdfUrl,
        paperPdf: body.paperPdf,
        githubUrl: body.githubUrl,
        demoUrl: body.demoUrl,
        architectureUrl: body.architectureUrl,
        architectureImageUrl: body.architectureImageUrl,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
        tags: body.tags ?? [],
        content: body.content,
        status: body.status ?? "published",
        researchArea: body.researchArea,
        featured: body.featured ?? false,
      },
    });
    return NextResponse.json({ paper }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not create paper.", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const body = await request.json();
  try {
    const paper = await prisma.paper.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        abstract: body.abstract,
        authors: body.authors ?? [],
        pdfUrl: body.pdfUrl,
        paperPdf: body.paperPdf,
        githubUrl: body.githubUrl,
        demoUrl: body.demoUrl,
        architectureUrl: body.architectureUrl,
        architectureImageUrl: body.architectureImageUrl,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
        tags: body.tags ?? [],
        content: body.content,
        status: body.status,
        researchArea: body.researchArea,
        featured: body.featured,
      },
    });
    return NextResponse.json({ paper });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not update paper.", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    await prisma.paper.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not delete paper.", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
