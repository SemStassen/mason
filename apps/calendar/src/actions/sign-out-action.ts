"use server";

import { redirect } from "next/navigation";
import { authActionClient } from "./safe-action";

export const signOutAction = authActionClient
  .metadata({
    name: "sign-out",
  })
  .action(async ({ ctx: { supabase } }) => {
    await supabase.auth.signOut();

    redirect("/login");
  });
