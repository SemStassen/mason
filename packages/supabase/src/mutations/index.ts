import type { Client } from "../types";

export async function updateProfile(supabase: Client, data: any) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return;
  }

  return supabase
    .from("profiles")
    .update(data)
    .eq("id", session.user.id)
    .select()
    .single();
}
