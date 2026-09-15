import { projects } from "@/data/site";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-5xl px-6 py-20 sm:py-28"
    >
      <h2 className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
        Projects
      </h2>
      <p className="mt-3 max-w-2xl text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
        A few examples of things I&apos;ve built. Replace these with your own
        projects.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
