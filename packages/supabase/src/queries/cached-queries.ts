import "server-only";

import { unstable_cache } from "next/cache";
// @ts-ignore <-- This actually works because of next
import { cache } from "react";
import { getProfileQuery } from ".";
import { createClient } from "../client/server";

export const getSession = cache(async () => {
  const supabase = createClient();

  return supabase.auth.getSession();
});

export const getProfile = async () => {
  const {
    data: { session },
  } = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const supabase = createClient();

  return unstable_cache(
    async () => {
      return getProfileQuery(supabase, userId);
    },
    ["profile", userId],
    {
      tags: [`profile_${userId}`],
      revalidate: 180,
    },
    // @ts-ignore
  )(userId);
};
