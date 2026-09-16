@AGENTS.md

# Portfolio Website — Project Context

## Overview

This is Khushboo Jain's personal portfolio site, a single-page Next.js
application (App Router) with a hero, about, projects, and contact section.
It's meant to be clean, modern, and mobile responsive.

## Stack

- **Next.js 16** (App Router, TypeScript, `src/` directory). Note: this
  version renamed `middleware.ts` to `proxy.ts` (`export function proxy`,
  not `middleware`) — see `src/proxy.ts`.
- **React 19**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`, configured in
  `src/app/globals.css`)
- **Supabase** (`@supabase/supabase-js`) — stores project data, managed via
  the `/admin` portal
- **ESLint** (`eslint-config-next`)

## Structure

```
src/
  app/
    layout.tsx      # Root layout, fonts, <html>/<body>, page metadata
    page.tsx         # Composes all sections in order (force-dynamic, see below)
    globals.css       # Tailwind import + light/dark theme tokens
    admin/              # Password-protected project management portal
      login/               # /admin/login — password form
      page.tsx               # /admin — project list, edit/delete links
      ProjectForm.tsx          # Shared create/edit form (client component)
      DeleteProjectButton.tsx   # Delete with confirm()
      LogoutButton.tsx           # Clears the session cookie
      projects/new/                # /admin/projects/new
      projects/[id]/edit/            # /admin/projects/[id]/edit
    api/
      contact/route.ts    # Contact form submission (see below)
      admin/
        login/route.ts      # Checks ADMIN_PASSWORD, sets session cookie
        logout/route.ts       # Clears session cookie
        projects/route.ts       # POST — create project
        projects/[id]/route.ts    # PATCH / DELETE — update/delete project
  components/
    Header.tsx        # Sticky nav with mobile hamburger menu
    Hero.tsx           # Name + tagline + CTA buttons
    About.tsx           # Bio paragraphs + skills list
    Projects.tsx          # Server component; fetches projects via lib/projects.ts
    ProjectCard.tsx        # Single project card (title, description, tags, links)
    ContactForm.tsx          # Client component: controlled form + validation
    Footer.tsx                # Copyright + social links
  data/
    site.ts            # Editable content: name, tagline, about text, skills
                        # (project data now lives in Supabase, not here)
  lib/
    projects.ts         # Data access: public reads (anon key, RLS) +
                         # admin CRUD (service role key, bypasses RLS)
    validateProject.ts    # Shared server-side validation for project input
    admin-auth.ts           # Signs/verifies the admin session cookie (Web
                             # Crypto HMAC — works in both Node and Edge)
    supabase/server.ts        # Supabase client factories (public + service role)
  types/
    project.ts        # Shared Project / ProjectInput types
  proxy.ts           # Guards /admin/* and /api/admin/* (redirects/401s if
                      # not logged in); Next 16's replacement for middleware.ts
supabase/
  schema.sql         # Run once in the Supabase SQL editor to create the
                      # projects table, RLS policy, and seed demo rows
```

## Editing content

Name, tagline, about text, skills, email, and social links live in
`src/data/site.ts` — edit that file for those.

**Projects are managed through `/admin`, not in code.** They're stored in
Supabase and fetched fresh on every homepage request (`export const dynamic
= "force-dynamic"` in `src/app/page.tsx` and `src/app/admin/page.tsx`), so
admin changes — edits, new projects, deletes — show up on the live site
immediately with no redeploy.

If Supabase isn't configured yet (see setup below), the homepage falls back
to 3 hardcoded demo projects (`fallbackProjects` in `src/lib/projects.ts`)
so the site still renders correctly out of the box.

## Admin portal (`/admin`)

Password-protected (not Supabase Auth — a single shared admin password, by
design for a one-person portfolio). Login sets an HMAC-signed, httpOnly
session cookie (7-day expiry); `src/proxy.ts` checks it on every `/admin/*`
and `/api/admin/*` request and redirects to `/admin/login` (or returns 401
for API calls) if missing/invalid/expired.

**Setup required to use it:**

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase SQL editor, run `supabase/schema.sql` — creates the
   `projects` table, enables RLS with a public-read-only policy, and seeds
   3 example rows.
3. From Project Settings → API, copy the URL, `anon` key, and `service_role`
   key.
4. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — used for
     the public homepage read (respects RLS, read-only).
   - `SUPABASE_SERVICE_ROLE_KEY` — used **server-side only** by
     `/admin`/`/api/admin/*` for writes (bypasses RLS). Never expose this to
     the browser or commit it.
   - `ADMIN_PASSWORD` — what you type in at `/admin/login`.
   - `ADMIN_SESSION_SECRET` — random string signing the session cookie;
     generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
5. Restart `npm run dev` (env vars only load on startup) and visit
   `/admin/login`.

Without `SUPABASE_SERVICE_ROLE_KEY`/`NEXT_PUBLIC_SUPABASE_URL` set, `/admin`
still loads (auth works independently) but shows a "Supabase is not
configured" message instead of the project list — it doesn't crash.

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

