import type { Metadata } from "next";
import "@mason/ui/globals.css";
import "@/styles/globals.css";
import { AppCommand } from "@/components/app-command";
import {
  getCurrentlyTrackingTimeEntry,
  getProjects,
  getTimeEntriesByRange,
  getUserPreferences,
} from "@mason/supabase/cached-queries";
import { notFound } from "next/navigation";
import { AppProviders } from "./app-providers";

export const metadata: Metadata = {
  title: "Mason",
  description: "The next generation of time tracking",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userPreferences, projects, timeEntries, currentlyTrackingTimeEntry] =
    await Promise.all([
      getUserPreferences(),
      getProjects(),
      getTimeEntriesByRange({
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      }),
      getCurrentlyTrackingTimeEntry(),
    ]);

  if (
    !userPreferences?.data ||
    !projects?.data ||
    !timeEntries?.data ||
    currentlyTrackingTimeEntry?.error
  ) {
    return notFound();
  }

  return (
    <AppProviders
      initialUserPreferences={userPreferences.data}
      initialProjects={{ projects: projects.data }}
      initialTimeEntries={{
        timeEntries: timeEntries.data,
        currentlyTrackingTimeEntry: currentlyTrackingTimeEntry?.data,
      }}
    >
      <AppCommand />
      {children}
    </AppProviders>
  );
}
