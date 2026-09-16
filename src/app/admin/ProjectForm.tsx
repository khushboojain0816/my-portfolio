"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/types/project";

type Props = {
  mode: "create" | "edit";
  project?: Project;
};

export default function ProjectForm({ mode, project }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [tags, setTags] = useState(project?.tags.join(", ") ?? "");
  const [liveUrl, setLiveUrl] = useState(project?.liveUrl ?? "");
  const [repoUrl, setRepoUrl] = useState(project?.repoUrl ?? "");
  const [sortOrder, setSortOrder] = useState(project?.sortOrder ?? 0);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title,
      description,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      liveUrl: liveUrl.trim() || null,
      repoUrl: repoUrl.trim() || null,
      sortOrder: Number(sortOrder) || 0,
    };

    const url = mode === "create" ? "/api/admin/projects" : `/api/admin/projects/${project!.id}`;
    const method = mode === "create" ? "POST" : "PATCH";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.error || "Failed to save project.");
        setSaving(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid max-w-xl gap-5">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-2 w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-zinc-900 dark:text-zinc-50"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="mt-2 w-full resize-none rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Tags (comma separated)
        </label>
        <input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Next.js, TypeScript, Tailwind CSS"
          className="mt-2 w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="liveUrl"
            className="block text-sm font-medium text-zinc-900 dark:text-zinc-50"
          >
            Live URL
          </label>
          <input
            id="liveUrl"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="https://..."
            className="mt-2 w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </div>
        <div>
          <label
            htmlFor="repoUrl"
            className="block text-sm font-medium text-zinc-900 dark:text-zinc-50"
          >
            Repo URL
          </label>
          <input
            id="repoUrl"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/..."
            className="mt-2 w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="sortOrder"
          className="block text-sm font-medium text-zinc-900 dark:text-zinc-50"
        >
          Display order
        </label>
        <input
          id="sortOrder"
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(Number(e.target.value))}
          className="mt-2 w-32 rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-50"
        />
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">Lower numbers show first.</p>
      </div>

      {error && <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex w-fit items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {saving ? "Saving..." : mode === "create" ? "Create project" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="inline-flex w-fit items-center justify-center rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-black/5 dark:border-white/15 dark:text-zinc-50 dark:hover:bg-white/10"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
