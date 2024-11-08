// import { UserForm } from "@/components/forms/user-form";
// import { UserPreferencesForm } from "@/components/forms/user-preferences-form";
// import { getUser, getUserPreferences } from "@mason/supabase/cached-queries";
// import { notFound } from "next/navigation";

import { UserForm } from "~/components/forms/user-form";

function Settings() {
  //   const [user, userPreferences] = await Promise.all([
  //     getUser(),
  //     getUserPreferences(),
  //   ]);

  //   if (!user?.data || !userPreferences?.data) {
  //     return notFound();
  //   }

  const user = {
    data: {
      username: "sem Stassen",
    },
  };

  return (
    <div className="max-w-[750px] w-full mx-auto px-6">
      <h2 className="text-2xl font-bold py-8">Profile</h2>
      <UserForm username={user.data.username} />
      <h2 className="text-2xl font-bold py-8">Preferences</h2>
      {/* <UserPreferencesForm
        weekStartsOnMonday={userPreferences.data.weekStartsOnMonday}
        uses24HourClock={userPreferences.data.uses24HourClock}
      /> */}
    </div>
  );
}

export { Settings };
