import { NextRequest, NextResponse } from "next/server";
import { getPosts } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json({ posts });
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
    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug: body.slug,
        cover: body.cover,
        excerpt: body.excerpt,
        content: body.content,
        tags: body.tags ?? [],
      },
    });
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not create post.", details: err instanceof Error ? err.message : String(err) },
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
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not delete post.", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
