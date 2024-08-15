import { ProfileForm } from "@/components/forms/profile-form";
import { getProfile } from "@mason/supabase/cached-queries";
import { notFound } from "next/navigation";

export default async function Settings() {
  const res = await getProfile();

  if (!res?.data) {
    return notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold py-8">Profile</h1>
      <ProfileForm username={res.data.username} />
    </div>
  );
}
