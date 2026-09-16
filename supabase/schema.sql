-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query)
-- to set up the projects table used by the admin portal.

create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  tags text[] not null default '{}',
  live_url text,
  repo_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

-- Anyone (the public homepage, using the anon key) can read projects.
create policy "Public can read projects"
  on public.projects
  for select
  using (true);

-- No insert/update/delete policy is defined for anon/authenticated roles.
-- The admin portal writes using the Supabase service role key (server-side
-- only, via SUPABASE_SERVICE_ROLE_KEY), which bypasses RLS entirely.
-- This keeps the table read-only to anyone browsing the site.

-- Optional: seed with the same 3 example projects the site shipped with.
insert into public.projects (title, description, tags, live_url, repo_url, sort_order)
values
  (
    'Task Flow',
    'A drag-and-drop task management app with boards, labels, and due dates, built to help small teams stay organized.',
    array['Next.js', 'TypeScript', 'Tailwind CSS'],
    '#',
    '#',
    0
  ),
  (
    'Weather Now',
    'A minimal weather dashboard that shows real-time conditions and a 5-day forecast for any city, with saved favorites.',
    array['React', 'REST API', 'CSS'],
    '#',
    '#',
    1
  ),
  (
    'Recipe Book',
    'A searchable recipe collection with filtering by cuisine and ingredients, plus a personal favorites list saved locally.',
    array['Next.js', 'Node.js', 'MongoDB'],
    '#',
    '#',
    2
  );
