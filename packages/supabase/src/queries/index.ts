import type { Client } from "../types";

export async function getProfileQuery(supabase: Client, userId: string) {
  return supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single()
    .throwOnError();
}

export async function getTimeEntriesQuery(supabase: Client, userId: string) {
  return supabase
    .from("timeEntries")
    .select("*")
    .eq("userId", userId)
    .throwOnError();
}
