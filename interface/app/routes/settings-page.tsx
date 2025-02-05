import { db, pg } from "@mason/db/client/db";
import { useLiveQuery } from "@mason/db/client/hooks";
import type { LiveQuery } from "@mason/db/client/pglite";
import type { UserPreferenceType, UserType } from "@mason/db/client/schema";
import { createBrowserClient } from "@mason/supabase/browser";
import { redirect, useLoaderData } from "react-router-dom";
import { UserForm } from "~/components/forms/user-form";
import { UserPreferencesForm } from "~/components/forms/user-preferences-form";

type SettingsLoaderReturns =
  | Response
  | {
      liveUserMe: LiveQuery<UserType>;
      liveUserMePreferences: LiveQuery<UserPreferenceType>;
    };

async function settingsLoader({
  request,
}: { request: Request }): Promise<SettingsLoaderReturns> {
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

  const [liveUserMe, liveUserMePreferences] = await Promise.all([
    pg.live.query<UserType>({
      query: userQuery.sql,
      params: userQuery.params,
      signal: request.signal,
      offset: 0,
      limit: 1,
    }),
    pg.live.query<UserPreferenceType>({
      query: userPreferencesQuery.sql,
      params: userPreferencesQuery.params,
      signal: request.signal,
      offset: 0,
      limit: 1,
    }),
  ]);

  return { liveUserMe, liveUserMePreferences };
}

function SettingsPage() {
  const { liveUserMe, liveUserMePreferences } =
    useLoaderData<Exclude<SettingsLoaderReturns, Response>>();

  return (
    <div className="max-w-[750px] w-full mx-auto px-6">
      <h2 className="text-2xl font-bold py-8">Profile</h2>
      <UserForm liveUserMe={liveUserMe} />
      <h2 className="text-2xl font-bold py-8">Preferences</h2>
      <UserPreferencesForm liveUserMePreferences={liveUserMePreferences} />
    </div>
  );
}

export { SettingsPage, settingsLoader };
