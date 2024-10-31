import { getTimeEntriesByRange } from "@mason/supabase/cached-queries";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const Tracker = dynamic(
  () => import("@/components/tracker").then((mod) => mod.Tracker),
  { ssr: false },
);

export default async function RootPage() {
  const now = new Date();

  const timeEntries = await getTimeEntriesByRange({
    from: new Date(now.setDate(now.getDate() - now.getDay())).toISOString(),
    to: new Date(now.setDate(now.getDate() + (6 - now.getDay()))).toISOString(),
  });

  if (!timeEntries?.data) {
    return notFound();
  }

  return (
    <div className="flex flex-col w-full">
      <Tracker timeEntries={timeEntries.data} />
    </div>
  );
}
