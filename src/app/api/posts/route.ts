import { NextRequest, NextResponse } from "next/server";
import { getPosts } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

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
      {
        error:
          "Could not write to the database. Set DATABASE_URL and run `npx prisma db push` to enable persistence.",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
