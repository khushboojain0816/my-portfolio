import type { Project } from "@/types/project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-zinc-900">
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex gap-4 text-sm font-medium">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            className="text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Live demo
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            className="text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
          >
            Source code
          </a>
        )}
      </div>
    </article>
  );
}
