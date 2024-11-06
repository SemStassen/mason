import type { Client } from "../types";
import type { TablesInsert, TablesUpdate } from "../types/db";

export async function updateUser(
  supabase: Client,
  data: Omit<TablesUpdate<"users">, "uuid" | "created_at" | "email">,
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return;
  }

  return supabase
    .from("users")
    .update({
      username: data.username,
    })
    .eq("uuid", session.user.id)
    .select()
    .single();
}

export async function updateUserPreferences(
  supabase: Client,
  data: Omit<TablesUpdate<"user_preferences">, "user_uuid" | "created_at">,
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return;
  }
  return supabase
    .from("user_preferences")
    .update({
      week_starts_on_monday: data.week_starts_on_monday,
      uses_24_hour_clock: data.uses_24_hour_clock,
    })
    .eq("user_uuid", session.user.id)
    .select()
    .single();
}

export async function updateTimeEntry(
  supabase: Client,
  uuid: string,
  data: Omit<TablesUpdate<"time_entries">, "uuid" | "user_uuid">,
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return;
  }

  return supabase
    .from("time_entries")
    .update({
      project_uuid: data.project_uuid,
      started_at: data.started_at,
      stopped_at: data.stopped_at,
      note: data.note,
    })
    .eq("user_uuid", session.user.id)
    .eq("uuid", uuid)
    .select()
    .single();
}

export async function deleteTimeEntry(supabase: Client, uuid: string) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return;
  }

  return supabase
    .from("time_entries")
    .delete()
    .eq("user_uuid", session.user.id)
    .eq("uuid", uuid);
}

export async function startTimeTracking(
  supabase: Client,
  data: Omit<
    TablesInsert<"time_entries">,
    "uuid" | "user_uuid" | "stopped_at" | "note"
  >,
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return;
  }

  return supabase.from("time_entries").insert({
    user_uuid: session.user.id,
    project_uuid: data.project_uuid,
    started_at: data.started_at,
  });
}
export async function stopTimeTracking(
  supabase: Client,
  uuid: string,
  data: Omit<
    TablesUpdate<"time_entries">,
    "uuid" | "user_uuid" | "project_uuid" | "note" | "started_at"
  >,
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return;
  }

  return supabase
    .from("time_entries")
    .update({
      stopped_at: data.stopped_at,
    })
    .eq("uuid", uuid)
    .eq("user_uuid", session.user.id);
}
