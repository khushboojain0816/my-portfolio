"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  function validate(formData: FormData) {
    const nextErrors: Record<string, string> = {};
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!message) nextErrors.message = "Please enter a message.";

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    setServerError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setServerError(data?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setServerError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
        Contact
      </h2>
      <p className="mt-3 max-w-2xl text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
        Have a project in mind or just want to say hi? Fill out the form
        below, or email me directly at{" "}
        <a
          href={`mailto:${site.email}`}
          className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
        >
          {site.email}
        </a>
        .
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-10 grid max-w-xl gap-5"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-900 dark:text-zinc-50"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="mt-2 w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-50"
          />
          {errors.name && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-900 dark:text-zinc-50"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="mt-2 w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-50"
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-zinc-900 dark:text-zinc-50"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="mt-2 w-full resize-none rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-indigo-500 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-50"
          />
          {errors.message && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-fit items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {status === "submitting" ? "Sending..." : "Send message"}
        </button>

        {status === "success" && (
          <p className="text-sm font-medium text-green-600 dark:text-green-400">
            Thanks for reaching out! I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            {serverError || "Something went wrong. Please try again."}
          </p>
        )}
      </form>
    </section>
  );
}
