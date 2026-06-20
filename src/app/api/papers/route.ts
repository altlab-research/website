import { NextRequest, NextResponse } from "next/server";
import { getPapers } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
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
        githubUrl: body.githubUrl,
        architectureUrl: body.architectureUrl,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
        tags: body.tags ?? [],
        content: body.content,
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
