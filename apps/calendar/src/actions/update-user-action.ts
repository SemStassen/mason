"use server";

import { updateUser } from "@mason/supabase/mutations";
import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { updateUserSchema } from "./schema";

export const updateUserAction = authActionClient
  .schema(updateUserSchema)
  .metadata({
    name: "update-user",
  })
  .action(async ({ parsedInput: data, ctx: { user, supabase } }) => {
    await updateUser(supabase, {
      username: data.username,
    });

    revalidateTag(`user_${user.uuid}`);
  });
