import type { Client } from "../types";

export async function getUserQuery(supabase: Client, userUuid: string) {
  return supabase
    .from("users")
    .select(`
      uuid,
      username,
      email
    `)
    .eq("uuid", userUuid)
    .single()
    .throwOnError();
}

export async function getUserPreferencesQuery(
  supabase: Client,
  userUuid: string,
) {
  return supabase
    .from("user_preferences")
    .select(`
      weekStartsOnMonday:week_starts_on_monday,
      userUuid:user_uuid
    `)
    .eq("user_uuid", userUuid)
    .single()
    .throwOnError();
}

export async function getProjectsQuery(supabase: Client, userUuid: string) {
  return await supabase
    .from("projects")
    .select(`
      uuid,
      name,
      hexColor:hex_color,
      user:users_on_projects (
        userUuid:user_uuid
      )
    `)
    .eq("users_on_projects.user_uuid", userUuid);
}

export interface GetTimeEntryByRangeParams {
  userUuid: string;
  from: string;
  to: string;
}

export async function getTimeEntriesByRangeQuery(
  supabase: Client,
  params: GetTimeEntryByRangeParams,
) {
  return await supabase
    .from("time_entries")
    .select(
      `
      uuid,
      project:projects ( 
        uuid, 
        name,
        hexColor:hex_color
      ),
      userUuid:user_uuid,
      startedAt:started_at,
      stoppedAt:stopped_at,
      note
      `,
    )
    .eq("user_uuid", params.userUuid)
    .or(
      `and(started_at.gte.${params.from},started_at.lte.${params.to}),` +
        `and(stopped_at.gte.${params.from},stopped_at.lte.${params.to}),` +
        `and(started_at.lte.${params.from},stopped_at.gte.${params.from})`,
    );
}
