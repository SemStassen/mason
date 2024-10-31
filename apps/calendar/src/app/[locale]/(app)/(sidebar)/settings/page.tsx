import { UserForm } from "@/components/forms/user-form";
import { UserPreferencesForm } from "@/components/forms/user-preferences-form";
import { getUser, getUserPreferences } from "@mason/supabase/cached-queries";
import { notFound } from "next/navigation";

export default async function SettingsPage() {
  const userRes = await getUser();
  const userPreferencesRes = await getUserPreferences();

  if (!userRes?.data || !userPreferencesRes?.data) {
    return notFound();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold py-8">Profile</h2>
      <UserForm username={userRes.data.username} />
      <h2 className="text-2xl font-bold py-8">Preferences</h2>
      <UserPreferencesForm
        weekStartsOnMonday={userPreferencesRes.data.weekStartsOnMonday}
      />
    </div>
  );
}
