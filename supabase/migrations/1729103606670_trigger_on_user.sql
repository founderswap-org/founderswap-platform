-- Create the companies table if it doesn't exist
create table if not exists public.companies (
  id serial primary key,
  created_at timestamp default now(),
  name text not null unique,
  website text,
  grow_stage_id int8
);

-- inserts a row into public.profiles
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  -- Find the company_id from the companies table
  declare
    v_company_id int;
  begin
    select id into v_company_id
    from public.companies
    where name = new.raw_user_meta_data ->> 'company';
    
    -- If company does not exist, create it
    if v_company_id is null then
      insert into public.companies (name)
      values (new.raw_user_meta_data ->> 'company')
      returning id into v_company_id;
    end if;
    
    -- Insert into profiles with found or created company_id
  insert into public.users (id, firstname, lastname, linkedin, languages, company_id)
    values (
      new.id,
      new.raw_user_meta_data ->> 'firstname',
      new.raw_user_meta_data ->> 'lastname',
      coalesce(new.raw_user_meta_data ->> 'linkedin', null),
      coalesce(new.raw_user_meta_data ->> 'languages', null),
      v_company_id
    );
    
    return new;
  end;
end;
$$;

-- trigger the function every time a user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
