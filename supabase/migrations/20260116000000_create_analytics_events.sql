-- Create the analytics_events table
create table if not exists analytics_events (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  site_id text not null,
  event_name text not null,
  event_data jsonb,
  session_id text
);

-- Enable Row Level Security (RLS)
alter table analytics_events enable row level security;

-- Policy: Allow public (anon) users to INSERT events
-- We want to track anonymous visitors + authenticated users alike.
create policy "Allow generic insert"
  on analytics_events
  for insert
  to public, anon
  with check (true);

-- Policy: Allow only authenticated service roles or admins to SELECT/VIEW events
-- (This prevents users from querying your entire analytics DB from the browser)
create policy "Allow service role select"
  on analytics_events
  for select
  to service_role
  using (true);
