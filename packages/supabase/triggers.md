```
-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

-- Drop the existing function if it exists
drop function if exists public.handle_new_user ();

-- inserts a row into public.profiles
create function public.handle_new_user () returns trigger language plpgsql security definer
set
  search_path = '' as $$
BEGIN
  INSERT INTO public.users (supa_user_id, username, email)
  VALUES (new.id, new.raw_user_meta_data ->> 'name', new.email);
  RETURN new;
END;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
after insert on auth.users for each row
execute procedure public.handle_new_user ();
```
