-- Create the table
create table if not exists foods (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid default auth.uid(),
  image_url text not null,
  food_name text,
  calories int,
  carbs int,
  protein int,
  fat int
);

-- Enable RLS
alter table foods enable row level security;

-- Create policy to allow anonymous inserts (for demo purposes)
-- Note: In production, you should restrict this to authenticated users
create policy "Enable insert for everyone" on foods for insert with check (true);
create policy "Enable read for everyone" on foods for select using (true);

-- Create storage bucket
insert into storage.buckets (id, name, public) values ('food-images', 'food-images', true)
on conflict (id) do nothing;

-- Storage policies
create policy "Give public access to food-images" on storage.objects for select using ( bucket_id = 'food-images' );
create policy "Enable upload for everyone" on storage.objects for insert with check ( bucket_id = 'food-images' );
