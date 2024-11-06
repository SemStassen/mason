"use client";

import dynamic from "next/dynamic";

const Tracker = dynamic(
  () => import("@/components/tracker").then((mod) => mod.Tracker),
  { ssr: false },
);

export default function RootPage() {
  return (
    <div className="flex flex-col w-full">
      <Tracker />
    </div>
  );
}
