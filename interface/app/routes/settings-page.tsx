import { db, pg } from "@mason/db/client/db";
import { useLiveQuery } from "@mason/db/client/hooks";
import { createBrowserClient } from "@mason/supabase/browser";
import { redirect, useLoaderData } from "react-router-dom";
import { UserForm } from "~/components/forms/user-form";
import { UserPreferencesForm } from "~/components/forms/user-preferences-form";
import type { UserPreferenceType } from "../../../packages/db/src/client/schema";

// TODO - EXPORT SCHEMA

async function settingsLoader({ request }: { request: Request }) {
  const supabase = createBrowserClient();
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    return redirect("/login");
  }

  const userQuery = db.query.users
    .findFirst({
      where: (users, { eq }) => eq(users.uuid, data.session.user.id),
    })
    .toSQL();

  const userPreferencesQuery = db.query.userPreferences
    .findFirst({
      where: (userPreferences, { eq }) =>
        eq(userPreferences.user_uuid, data.session.user.id),
    })
    .toSQL();

  const [liveUsers, liveUserPreferences] = await Promise.all([
    pg.live.query({
      query: userQuery.sql,
      params: userQuery.params,
      signal: request.signal,
      offset: 0,
      limit: 1,
    }),
    pg.live.query({
      query: userPreferencesQuery.sql,
      params: userPreferencesQuery.params,
      signal: request.signal,
      offset: 0,
      limit: 1,
    }),
  ]);

  if (
    liveUserPreferences.initialResults.totalCount === 0 ||
    liveUsers.initialResults.totalCount === 0
  ) {
    throw new Response("Not Found", { status: 404 });
  }

  return { liveUsers, liveUserPreferences };
}

function SettingsPage() {
  const { liveUsers, liveUserPreferences } =
    useLoaderData<typeof settingsLoader>();

  const userPreferences =
    // @ts-expect-error
    useLiveQuery<UserPreferenceType>(liveUserPreferences);

  if (!userPreferences?.rows[0]) {
    throw Error;
  }

  const { week_starts_on_monday, uses_24_hour_clock } = userPreferences.rows[0];

  return (
    <div className="max-w-[750px] w-full mx-auto px-6">
      <h2 className="text-2xl font-bold py-8">Profile</h2>
      <UserForm liveUsers={liveUsers} />
      <h2 className="text-2xl font-bold py-8">Preferences</h2>
      <UserPreferencesForm
        weekStartsOnMonday={week_starts_on_monday}
        uses24HourClock={uses_24_hour_clock}
      />
    </div>
  );
}

export { SettingsPage, settingsLoader };
