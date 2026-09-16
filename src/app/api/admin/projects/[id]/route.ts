import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { updateProjectAdmin, deleteProjectAdmin } from "@/lib/projects";
import { parseProjectInput } from "@/lib/validateProject";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = parseProjectInput(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const project = await updateProjectAdmin(id, parsed.value);
    revalidatePath("/");
    revalidatePath("/admin");
    return NextResponse.json({ project });
  } catch (err) {
    console.error("Failed to update project:", err);
    const message = err instanceof Error ? err.message : "Failed to update project.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await deleteProjectAdmin(id);
    revalidatePath("/");
    revalidatePath("/admin");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to delete project:", err);
    const message = err instanceof Error ? err.message : "Failed to delete project.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
