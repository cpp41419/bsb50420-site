
-- Create a table to store chat logs from Hero AI
create table if not exists chat_logs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Context
  site_key text not null, -- e.g. 'bsb40520'
  course_code text, -- e.g. 'BSB40520'
  
  -- The Interaction
  user_query text not null,
  ai_response text,
  
  -- Meta
  metadata jsonb default '{}'::jsonb,
  provider text default 'deepseek'
);

-- Enable RLS (Security)
alter table chat_logs enable row level security;

-- Policy: Only service role (admin) can insert
create policy "Service role can insert chat logs"
  on chat_logs
  for insert
  to service_role
  with check (true);

-- Policy: Service role can read
create policy "Service role can read chat logs"
  on chat_logs
  for select
  to service_role
  using (true);
