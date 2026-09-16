import Link from "next/link";
import { getAdminProjects } from "@/lib/projects";
import DeleteProjectButton from "./DeleteProjectButton";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let projects: Awaited<ReturnType<typeof getAdminProjects>> = [];
  let loadError: string | null = null;

  try {
    projects = await getAdminProjects();
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Failed to load projects.";
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Projects</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Changes here appear on the live site immediately.
          </p>
        </div>
        <LogoutButton />
      </div>

      {loadError && (
        <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {loadError}
        </p>
      )}

      <Link
        href="/admin/projects/new"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        + New project
      </Link>

      <ul className="mt-8 divide-y divide-black/5 dark:divide-white/10">
        {projects.map((project) => (
          <li key={project.id} className="flex items-center justify-between gap-4 py-4">
            <div className="min-w-0">
              <p className="font-medium text-zinc-900 dark:text-zinc-50">{project.title}</p>
              <p className="mt-1 truncate text-sm text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
            </div>
            <div className="flex shrink-0 gap-4 text-sm font-medium">
              <Link
                href={`/admin/projects/${project.id}/edit`}
                className="text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Edit
              </Link>
              <DeleteProjectButton id={project.id} title={project.title} />
            </div>
          </li>
        ))}
        {projects.length === 0 && !loadError && (
          <li className="py-8 text-center text-sm text-zinc-500 dark:text-zinc-500">
            No projects yet. Click &quot;New project&quot; to add one.
          </li>
        )}
      </ul>
    </div>
  );
}
