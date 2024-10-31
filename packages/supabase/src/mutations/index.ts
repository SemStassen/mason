import type { Client } from "../types";
import type { TablesUpdate } from "../types/db";

export async function updateUser(
  supabase: Client,
  data: TablesUpdate<"users">,
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return;
  }

  return supabase
    .from("users")
    .update(data)
    .eq("uuid", session.user.id)
    .select()
    .single();
}

export async function updateUserPreferences(
  supabase: Client,
  data: TablesUpdate<"user_preferences">,
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return;
  }

  return supabase
    .from("user_preferences")
    .update(data)
    .eq("user_uuid", session.user.id)
    .select()
    .single();
}

export async function updateTimeEntry(
  supabase: Client,
  uuid: string,
  data: TablesUpdate<"time_entries">,
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return;
  }

  return supabase
    .from("time_entries")
    .update(data)
    .eq("user_uuid", session.user.id)
    .eq("uuid", uuid)
    .select()
    .single();
}
