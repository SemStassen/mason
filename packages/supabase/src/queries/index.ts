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
      userUuid:user_uuid,
      weekStartsOnMonday:week_starts_on_monday,
      uses24HourClock:uses_24_hour_clock
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
      user:users_on_projects!inner (
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
      project:projects!inner ( 
        uuid, 
        name,
        hexColor:hex_color
      ),
      userUuid:user_uuid,
      startedAt:started_at,
      stoppedAt:stopped_at::timestamptz,
      note
      `,
    )
    .eq("user_uuid", params.userUuid)
    .not("stopped_at", "is", null)
    .or(
      `and(started_at.gte.${params.from},started_at.lte.${params.to}),` +
        `and(stopped_at.gte.${params.from},stopped_at.lte.${params.to}),` +
        `and(started_at.lte.${params.from},stopped_at.gte.${params.from})`,
    );
}

export async function getCurrentlyTrackingTimeEntryQuery(
  supabase: Client,
  userUuid: string,
) {
  return await supabase
    .from("time_entries")
    .select(
      `
    uuid,
    project:projects!inner ( 
      uuid, 
      name,
      hexColor:hex_color
    ),
    userUuid:user_uuid,
    startedAt:started_at,
    note
    `,
    )
    .eq("user_uuid", userUuid)
    .is("stopped_at", null)
    .maybeSingle();
}
