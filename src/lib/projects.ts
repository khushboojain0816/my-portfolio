import { getPublicSupabaseClient, getServiceSupabaseClient } from "@/lib/supabase/server";
import type { Project, ProjectInput } from "@/types/project";

type ProjectRow = {
  id: string;
  title: string;
  description: string;
  tags: string[] | null;
  live_url: string | null;
  repo_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

function mapRow(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    tags: row.tags ?? [],
    liveUrl: row.live_url,
    repoUrl: row.repo_url,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const demoProjects: Omit<Project, "id" | "sortOrder" | "createdAt" | "updatedAt">[] = [
  {
    title: "Task Flow",
    description:
      "A drag-and-drop task management app with boards, labels, and due dates, built to help small teams stay organized.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Weather Now",
    description:
      "A minimal weather dashboard that shows real-time conditions and a 5-day forecast for any city, with saved favorites.",
    tags: ["React", "REST API", "CSS"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Recipe Book",
    description:
      "A searchable recipe collection with filtering by cuisine and ingredients, plus a personal favorites list saved locally.",
    tags: ["Next.js", "Node.js", "MongoDB"],
    liveUrl: "#",
    repoUrl: "#",
  },
];

function getDemoProjects(): Project[] {
  const now = new Date(0).toISOString();
  return demoProjects.map((project, index) => ({
    ...project,
    id: `demo-${index}`,
    sortOrder: index,
    createdAt: now,
    updatedAt: now,
  }));
}

/** Public read: used by the homepage. Falls back to demo data if Supabase isn't configured. */
export async function getPublicProjects(): Promise<Project[]> {
  const supabase = getPublicSupabaseClient();
  if (!supabase) return getDemoProjects();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) {
    console.error("Failed to load projects from Supabase:", error);
    return getDemoProjects();
  }

  return data.map(mapRow);
}

function requireServiceClient() {
  const supabase = getServiceSupabaseClient();
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.",
    );
  }
  return supabase;
}

/** Admin read: used by /admin. Throws if Supabase isn't configured (admin can't function without it). */
export async function getAdminProjects(): Promise<Project[]> {
  const supabase = requireServiceClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function getProjectByIdAdmin(id: string): Promise<Project | null> {
  const supabase = requireServiceClient();
  const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : null;
}

export async function createProjectAdmin(input: ProjectInput): Promise<Project> {
  const supabase = requireServiceClient();
  const { data, error } = await supabase
    .from("projects")
    .insert({
      title: input.title,
      description: input.description,
      tags: input.tags,
      live_url: input.liveUrl,
      repo_url: input.repoUrl,
      sort_order: input.sortOrder,
    })
    .select("*")
    .single();
  if (error) throw error;
  return mapRow(data);
}

export async function updateProjectAdmin(id: string, input: ProjectInput): Promise<Project> {
  const supabase = requireServiceClient();
  const { data, error } = await supabase
    .from("projects")
    .update({
      title: input.title,
      description: input.description,
      tags: input.tags,
      live_url: input.liveUrl,
      repo_url: input.repoUrl,
      sort_order: input.sortOrder,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return mapRow(data);
}

export async function deleteProjectAdmin(id: string): Promise<void> {
  const supabase = requireServiceClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}
