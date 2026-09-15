@AGENTS.md

# Portfolio Website — Project Context

## Overview

This is Khushboo Jain's personal portfolio site, a single-page Next.js
application (App Router) with a hero, about, projects, and contact section.
It's meant to be clean, modern, and mobile responsive.

## Stack

- **Next.js 16** (App Router, TypeScript, `src/` directory)
- **React 19**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`, configured in
  `src/app/globals.css`)
- **ESLint** (`eslint-config-next`)

## Structure

```
src/
  app/
    layout.tsx      # Root layout, fonts, <html>/<body>, page metadata
    page.tsx         # Composes all sections in order
    globals.css       # Tailwind import + light/dark theme tokens
  components/
    Header.tsx        # Sticky nav with mobile hamburger menu
    Hero.tsx           # Name + tagline + CTA buttons
    About.tsx           # Bio paragraphs + skills list
    Projects.tsx          # Renders ProjectCard for each entry in data/site.ts
    ProjectCard.tsx        # Single project card (title, description, tags, links)
    ContactForm.tsx          # Client component: controlled form + validation
    Footer.tsx                # Copyright + social links
  data/
    site.ts                    # All editable content: name, tagline, about
                                 # text, skills, and the projects array
```

## Editing content

All personal content (name, tagline, about text, skills, project details,
email, social links) lives in `src/data/site.ts`. Edit that file rather than
the components to update copy.

The 3 projects currently in `projects` (Task Flow, Weather Now, Recipe Book)
are **placeholder examples** — replace them with real projects, and swap the
`liveUrl`/`repoUrl` `"#"` placeholders with real links.

## Contact form

`ContactForm.tsx` is a client component with local validation (required
name/email/message, basic email format check) that submits to
`POST /api/contact` (`src/app/api/contact/route.ts`), which re-validates the
payload server-side and sends an email via [Resend](https://resend.com).

**Setup required to actually send email:**

1. Create a free account at resend.com and generate an API key.
2. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`.
3. (Optional) Verify your own sending domain in Resend and set
   `CONTACT_FROM_EMAIL` to an address on that domain — otherwise the route
   falls back to Resend's shared `onboarding@resend.dev` test sender, which
   works but is rate-limited and clearly not your own domain.
4. (Optional) Set `CONTACT_TO_EMAIL` to override where messages are
   delivered — defaults to the email in `src/data/site.ts`.

Without `RESEND_API_KEY` set, the API route returns a 500 with a friendly
error message instead of throwing, and the form surfaces that message to the
visitor.

## Design notes

- Neutral zinc palette with an indigo accent color, light/dark mode support
  driven by `prefers-color-scheme` (see `globals.css`).
- Layout is mobile-first with Tailwind responsive breakpoints (`sm:`, `lg:`);
  the header collapses into a hamburger menu below the `sm` breakpoint.
- Section ids (`#top`, `#about`, `#projects`, `#contact`) back the in-page
  nav links and are used for smooth anchor scrolling.

## Commands

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build (also type-checks)
npm run lint     # eslint
```

## Git

Repository: `khushboojain0816/my-portfolio`. Primary branch: `main`.

