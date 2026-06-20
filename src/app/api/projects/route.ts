import { NextRequest, NextResponse } from "next/server";
import { getProjects } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json({ projects });
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    const project = await prisma.project.update({
      where: { slug: body.slug },
      data: {
        tagline: body.tagline,
        description: body.description,
        status: body.status,
        features: body.features,
      },
    });
    return NextResponse.json({ project });
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
