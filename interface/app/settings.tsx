import { UserForm } from "~/components/forms/user-form";
import { UserPreferencesForm } from "~/components/forms/user-preferences-form";

function Settings() {
  return (
    <div className="max-w-[750px] w-full mx-auto px-6">
      <h2 className="text-2xl font-bold py-8">Profile</h2>
      <UserForm />
      <h2 className="text-2xl font-bold py-8">Preferences</h2>
      <UserPreferencesForm />
    </div>
  );
}

export { Settings };
