import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createProjectAdmin } from "@/lib/projects";
import { parseProjectInput } from "@/lib/validateProject";

export async function POST(request: Request) {
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
    const project = await createProjectAdmin(parsed.value);
    revalidatePath("/");
    revalidatePath("/admin");
    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    console.error("Failed to create project:", err);
    const message = err instanceof Error ? err.message : "Failed to create project.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
