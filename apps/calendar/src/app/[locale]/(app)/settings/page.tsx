import { getProfile } from "@mason/supabase/cached-queries";

export default async function Settings() {
  const user = await getProfile();

  console.log(user);

  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
}
