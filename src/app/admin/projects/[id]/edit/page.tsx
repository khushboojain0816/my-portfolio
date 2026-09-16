import { notFound } from "next/navigation";
import { getProjectByIdAdmin } from "@/lib/projects";
import ProjectForm from "../../../ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectByIdAdmin(id).catch(() => null);

  if (!project) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Edit project</h1>
      <ProjectForm mode="edit" project={project} />
    </div>
  );
}
