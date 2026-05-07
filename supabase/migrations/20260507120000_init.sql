-- Schema AgroOps + RLS por usuário (auth.uid)
-- Execute no SQL Editor do Supabase ou via CLI migration.

-- Perfis de usuário (estende auth.users)
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.users enable row level security;

create policy "users_select_own"
  on public.users for select
  using (auth.uid() = id);

create policy "users_insert_own"
  on public.users for insert
  with check (auth.uid() = id);

create policy "users_update_own"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Máquinas
create table if not exists public.machines (
  id uuid primary key default gen_random_uuid (),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  status text not null default 'idle'
    check (status in ('active', 'idle', 'offline')),
  lat double precision not null,
  lng double precision not null,
  updated_at timestamptz not null default now ()
);

create index if not exists machines_user_id_idx on public.machines (user_id);

alter table public.machines enable row level security;

create policy "machines_all_own"
  on public.machines for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Inventário
create table if not exists public.inventory (
  id uuid primary key default gen_random_uuid (),
  user_id uuid not null references auth.users (id) on delete cascade,
  product text not null,
  quantity numeric not null default 0,
  updated_at timestamptz not null default now ()
);

create index if not exists inventory_user_id_idx on public.inventory (user_id);

alter table public.inventory enable row level security;

create policy "inventory_all_own"
  on public.inventory for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Realtime (ignore erro se já estiver na publication)
alter publication supabase_realtime add table public.machines;
alter publication supabase_realtime add table public.inventory;

-- Perfil automático ao registrar (opcional)
create or replace function public.handle_new_user ()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, full_name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      split_part(coalesce(new.email, ''), '@', 1)
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user ();
