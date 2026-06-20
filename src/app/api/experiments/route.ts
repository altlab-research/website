import { NextRequest, NextResponse } from "next/server";
import { getExperiments } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';  // Use 'nodejs' for Prisma compatibility

export async function GET() {
  const experiments = await getExperiments();
  return NextResponse.json({ experiments });
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
    const experiment = await prisma.experiment.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        status: body.status ?? "RESEARCH",
        tags: body.tags ?? [],
        progress: body.progress ?? 0,
      },
    });
    return NextResponse.json({ experiment }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not create experiment.", details: err instanceof Error ? err.message : String(err) },
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
    await prisma.experiment.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not delete experiment.", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
