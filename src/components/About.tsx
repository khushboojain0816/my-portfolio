import { about } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
        {about.heading}
      </h2>

      <div className="mt-6 grid gap-10 sm:grid-cols-5">
        <div className="space-y-4 sm:col-span-3">
          {about.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8 dark:text-zinc-400"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="sm:col-span-2">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Skills &amp; Tools
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {about.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-black/10 px-3 py-1 text-sm text-zinc-700 dark:border-white/15 dark:text-zinc-300"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
