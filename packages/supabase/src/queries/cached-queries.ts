import "server-only";

import { unstable_cache } from "next/cache";
// @ts-ignore <-- This actually works because of next
import { cache } from "react";
import {
  type GetTimeEntryByRangeParams,
  getCurrentlyTrackingTimeEntryQuery,
  getProjectsQuery,
  getTimeEntriesByRangeQuery,
  getUserPreferencesQuery,
  getUserQuery,
} from ".";
import { createClient } from "../client/server";

export const getSession = cache(async () => {
  const supabase = await createClient();

  return supabase.auth.getSession();
});

export const getUser = async () => {
  const {
    data: { session },
  } = await getSession();
  const userUuid = session?.user?.id;

  if (!userUuid) {
    return null;
  }

  const supabase = await createClient();

  return unstable_cache(
    async () => {
      return getUserQuery(supabase, userUuid);
    },
    ["user", userUuid],
    {
      tags: [`user_${userUuid}`],
      revalidate: 180,
    },
    // @ts-ignore
  )(userUuid);
};

export const getUserPreferences = async () => {
  const {
    data: { session },
  } = await getSession();
  const userUuid = session?.user?.id;

  if (!userUuid) {
    return null;
  }

  const supabase = await createClient();

  return unstable_cache(
    async () => {
      return getUserPreferencesQuery(supabase, userUuid);
    },
    ["user_preferences", userUuid],
    {
      tags: [`user_preferences_${userUuid}`],
      revalidate: 180,
    },
    // @ts-ignore
  )(userUuid);
};

export const getProjects = async () => {
  const {
    data: { session },
  } = await getSession();
  const userUuid = session?.user?.id;

  if (!userUuid) {
    return null;
  }

  const supabase = await createClient();

  return unstable_cache(
    async () => {
      return getProjectsQuery(supabase, userUuid);
    },
    ["projects", userUuid],
    {
      tags: [`projects_${userUuid}`],
      revalidate: 180,
    },
    // @ts-ignore
  )(userUuid);
};

export const getTimeEntriesByRange = async (
  params: Omit<GetTimeEntryByRangeParams, "userUuid">,
) => {
  const {
    data: { session },
  } = await getSession();
  const userUuid = session?.user?.id;

  if (!userUuid) {
    return null;
  }

  const supabase = await createClient();

  return unstable_cache(
    async () => {
      return getTimeEntriesByRangeQuery(supabase, {
        userUuid: userUuid,
        from: params.from,
        to: params.to,
      });
    },
    ["time_entries", userUuid],
    {
      tags: [`time_entries_${userUuid}`],
      revalidate: 180,
    },
    // @ts-ignore
  )(userUuid);
};

export const getCurrentlyTrackingTimeEntry = async () => {
  const {
    data: { session },
  } = await getSession();
  const userUuid = session?.user?.id;

  if (!userUuid) {
    return null;
  }

  const supabase = await createClient();

  return unstable_cache(
    async () => {
      return getCurrentlyTrackingTimeEntryQuery(supabase, userUuid);
    },
    ["time_entries", userUuid],
    {
      tags: [`time_entries_${userUuid}`],
      revalidate: 180,
    },
    // @ts-ignore
  )(userUuid);
};
