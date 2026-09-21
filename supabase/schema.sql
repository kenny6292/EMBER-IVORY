-- EMBER & IVORY production database blueprint
-- Apply only after the dedicated Supabase project is created.
create extension if not exists pgcrypto;

create type public.app_role as enum ('customer','staff','admin');
create type public.order_status as enum ('pending','confirmed','preparing','ready','completed','cancelled');
create type public.order_type as enum ('pickup','delivery');
create type public.reservation_status as enum ('pending','confirmed','seated','completed','cancelled','no_show');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role public.app_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.menu_categories(id) on delete restrict,
  name text not null,
  slug text not null unique,
  description text not null default '',
  price numeric(12,2) not null check (price >= 0),
  image_url text,
  is_available boolean not null default true,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.restaurant_tables (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  capacity integer not null check (capacity > 0),
  is_active boolean not null default true
);

create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  reservation_date date not null,
  reservation_time time not null,
  party_size integer not null check (party_size > 0 and party_size <= 50),
  table_id uuid references public.restaurant_tables(id) on delete set null,
  status public.reservation_status not null default 'pending',
  special_request text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  order_type public.order_type not null,
  delivery_address text,
  status public.order_status not null default 'pending',
  subtotal numeric(12,2) not null check (subtotal >= 0),
  delivery_fee numeric(12,2) not null default 0 check (delivery_fee >= 0),
  total numeric(12,2) generated always as (subtotal + delivery_fee) stored,
  payment_reference text unique,
  payment_status text not null default 'pending' check (payment_status in ('pending','paid','failed','refunded')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  menu_item_id uuid references public.menu_items(id) on delete set null,
  item_name text not null,
  unit_price numeric(12,2) not null check (unit_price >= 0),
  quantity integer not null check (quantity > 0),
  line_total numeric(12,2) generated always as (unit_price * quantity) stored
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.restaurant_settings (
  id boolean primary key default true,
  restaurant_name text not null default 'EMBER & IVORY',
  address text,
  phone text,
  email text,
  opening_hours jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index menu_items_category_idx on public.menu_items(category_id);
create index reservations_datetime_idx on public.reservations(reservation_date, reservation_time);
create index reservations_status_idx on public.reservations(status);
create index orders_status_idx on public.orders(status);
create index orders_created_at_idx on public.orders(created_at desc);
create index order_items_order_idx on public.order_items(order_id);

alter table public.profiles enable row level security;
alter table public.menu_categories enable row level security;
alter table public.menu_items enable row level security;
alter table public.restaurant_tables enable row level security;
alter table public.reservations enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.messages enable row level security;
alter table public.restaurant_settings enable row level security;

-- Public catalog/settings reads.
create policy "public can read active categories" on public.menu_categories for select to anon, authenticated using (is_active = true);
create policy "public can read available menu" on public.menu_items for select to anon, authenticated using (is_available = true);
create policy "public can read restaurant settings" on public.restaurant_settings for select to anon, authenticated using (true);

-- Customers can read/update only their own profile.
create policy "users read own profile" on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy "users update own profile" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- Customers can read their own orders/order items and reservations.
create policy "users read own orders" on public.orders for select to authenticated using (user_id = (select auth.uid()));
create policy "users read own order items" on public.order_items for select to authenticated using (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = (select auth.uid()))
);
create policy "users read own reservations" on public.reservations for select to authenticated using (user_id = (select auth.uid()));

-- Public reservation/order/message INSERT is intentionally handled by secure server routes.
-- Staff/admin policies should be added using a server-side role check after auth is configured.
