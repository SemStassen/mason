"use server";

import { updateProfile } from "@mason/supabase/mutations";
import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { updateUserSchema } from "./schema";

export const updateProfileAction = authActionClient
  .schema(updateUserSchema)
  .metadata({
    name: "update-user",
  })
  .action(async ({ parsedInput: data, ctx: { user, supabase } }) => {
    await updateProfile(supabase, data);

    revalidateTag(`profile_${user.id}`);
  });
