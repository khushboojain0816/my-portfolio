import ProjectForm from "../../ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">New project</h1>
      <ProjectForm mode="create" />
    </div>
  );
}
