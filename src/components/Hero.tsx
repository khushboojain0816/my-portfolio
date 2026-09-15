import { site } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-24 sm:py-32"
    >
      <p className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/15 dark:text-zinc-400">
        Available for new opportunities
      </p>

      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-50">
        Hi, I&apos;m {site.name}
      </h1>

      <p className="max-w-2xl text-lg leading-8 text-zinc-600 sm:text-xl dark:text-zinc-400">
        {site.tagline}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href="#projects"
          className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          View my work
        </a>
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-black/5 dark:border-white/15 dark:text-zinc-50 dark:hover:bg-white/10"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
