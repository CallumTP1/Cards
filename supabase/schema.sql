-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  items jsonb not null,                       -- [{ id, name, qty, price }]
  total numeric(10,2) not null,
  status text not null default 'pending',     -- pending | paid | shipped | cancelled
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

-- Customers can only see their own orders...
drop policy if exists "orders: read own" on public.orders;
create policy "orders: read own" on public.orders
  for select using (auth.uid() = user_id);

-- ...and can only create their own orders, always starting as 'pending'.
drop policy if exists "orders: insert own pending" on public.orders;
create policy "orders: insert own pending" on public.orders
  for insert with check (auth.uid() = user_id and status = 'pending');
