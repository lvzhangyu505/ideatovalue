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
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewer_email text,
  review_note text,
  reviewed_at timestamptz
);

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
