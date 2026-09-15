import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:justify-between dark:text-zinc-500">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <div className="flex gap-5">
          <a
            href={site.social.github}
            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            GitHub
          </a>
          <a
            href={site.social.linkedin}
            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
