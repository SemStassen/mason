import type { Client } from "../types";

export async function createUser(supabase: Client, data: any) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return;
  }

  return supabase
    .from("users")
    .insert(data)
    .eq("id", session.user.id)
    .select()
    .single();
}
