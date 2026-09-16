import type { ProjectInput } from "@/types/project";

type ParseResult = { value: ProjectInput } | { error: string };

export function parseProjectInput(body: unknown): ParseResult {
  const b = (body ?? {}) as Record<string, unknown>;

  const title = typeof b.title === "string" ? b.title.trim() : "";
  const description = typeof b.description === "string" ? b.description.trim() : "";
  const liveUrl = typeof b.liveUrl === "string" && b.liveUrl.trim() ? b.liveUrl.trim() : null;
  const repoUrl = typeof b.repoUrl === "string" && b.repoUrl.trim() ? b.repoUrl.trim() : null;
  const sortOrder =
    typeof b.sortOrder === "number" && Number.isFinite(b.sortOrder) ? b.sortOrder : 0;

  if (!title) return { error: "Title is required." };
  if (!description) return { error: "Description is required." };

  let tags: string[] = [];
  if (Array.isArray(b.tags)) {
    tags = b.tags
      .filter((tag): tag is string => typeof tag === "string" && tag.trim().length > 0)
      .map((tag) => tag.trim());
  }

  return { value: { title, description, tags, liveUrl, repoUrl, sortOrder } };
}
