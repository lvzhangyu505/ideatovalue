create extension if not exists pgcrypto;

create table if not exists public.project_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  user_id uuid not null,
  user_email text not null,
  user_name text not null,
  project_name text not null,
  project_type text not null,
  project_subcategory text not null,
  description text not null,
  goal text not null,
  problem text not null,
  audience text not null,
  solution text not null,
  verification text not null,
  existing_resources text not null,
  needed_resources text not null,
  key_risks text not null,
  risk_responses text not null,
  timeline text not null,
  public_stage text not null default 'supporting',
  badge_label text not null default '平台审核通过',
  completion_rate integer not null default 0,
  supporter_count integer not null default 0,
  days_left integer not null default 30,
  support_tiers jsonb not null default '[]'::jsonb,
  latest_updates jsonb not null default '[]'::jsonb,
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewer_email text,
  review_note text,
  reviewed_at timestamptz
);

alter table public.project_submissions
  add column if not exists public_stage text not null default 'supporting';

alter table public.project_submissions
  add column if not exists badge_label text not null default '平台审核通过';

alter table public.project_submissions
  add column if not exists completion_rate integer not null default 0;

alter table public.project_submissions
  add column if not exists supporter_count integer not null default 0;

alter table public.project_submissions
  add column if not exists days_left integer not null default 30;

alter table public.project_submissions
  add column if not exists support_tiers jsonb not null default '[]'::jsonb;

alter table public.project_submissions
  add column if not exists latest_updates jsonb not null default '[]'::jsonb;

update public.project_submissions
set
  public_stage = coalesce(nullif(public_stage, ''), 'supporting'),
  badge_label = coalesce(nullif(badge_label, ''), '平台审核通过'),
  completion_rate = coalesce(completion_rate, 0),
  supporter_count = coalesce(supporter_count, 0),
  days_left = coalesce(days_left, 30),
  support_tiers = coalesce(support_tiers, '[]'::jsonb),
  latest_updates = coalesce(latest_updates, '[]'::jsonb);

create index if not exists project_submissions_user_id_idx on public.project_submissions(user_id);
create index if not exists project_submissions_status_idx on public.project_submissions(status);
create index if not exists project_submissions_created_at_idx on public.project_submissions(created_at desc);

create or replace function public.set_project_submissions_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_project_submissions_updated_at on public.project_submissions;
create trigger set_project_submissions_updated_at
before update on public.project_submissions
for each row
execute function public.set_project_submissions_updated_at();
