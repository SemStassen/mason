"use client";

import { signOutAction } from "@/actions/sign-out-action";
import { startTimeTrackingAction } from "@/actions/start-time-tracking-action";
import { stopTimeTrackingAction } from "@/actions/stop-time-tracking";
import { useProjectsStore } from "@/stores/projects-store";
import { useSidebarStore } from "@/stores/sidebar-store";
import { useTimeEntriesStore } from "@/stores/time-entries-store";
import { Badge } from "@mason/ui/badge";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@mason/ui/command";
import { DialogDescription, DialogTitle } from "@mason/ui/dialog";
import { Icons } from "@mason/ui/icons";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { CurrentlyTrackingBadge } from "./currently-tracking-badge";

function AppCommand() {
  const signOut = useAction(signOutAction);
  const startTimeTracking = useAction(startTimeTrackingAction);
  const stopTimeTracking = useAction(stopTimeTrackingAction);
  const toggleIsSidebarOpen = useSidebarStore(
    (state) => state.toggleIsSidebarOpen,
  );
  const projects = useProjectsStore((state) => state.projects);
  const currentlyTrackingTimeEntry = useTimeEntriesStore(
    (state) => state.currentlyTrackingTimeEntry,
  );

  const [isCommandModalOpen, setIsCommandModalOpen] = useState<boolean>(false);
  const [isStartTrackingModalOpen, setIsStartTrackingModalOpen] =
    useState<boolean>(false);

  const router = useRouter();
  useHotkeys("meta+j", () => setIsCommandModalOpen(true));

  const handleCommandAction = (method: () => void) => {
    setIsCommandModalOpen(false);
    method();
  };

  return (
    <>
      <CommandDialog
        open={isCommandModalOpen}
        onOpenChange={setIsCommandModalOpen}
      >
        <DialogTitle className="sr-only">
          Time tracking command menu
        </DialogTitle>
        <DialogDescription className="sr-only">
          This is used for power-users to quickly navigate across the app
        </DialogDescription>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Tracker">
            {currentlyTrackingTimeEntry ? (
              <CommandItem
                value="Stop tracking"
                keywords={[currentlyTrackingTimeEntry.project.name]}
                onSelect={() =>
                  handleCommandAction(() =>
                    stopTimeTracking.execute({
                      uuid: currentlyTrackingTimeEntry.uuid,
                      stoppedAt: new Date().toISOString(),
                    }),
                  )
                }
              >
                <Icons.Clock />
                <span>Stop tracking</span>
                <Badge>{currentlyTrackingTimeEntry.project.name}</Badge>
              </CommandItem>
            ) : (
              <CommandItem
                value="Start tracking"
                onSelect={() =>
                  handleCommandAction(() => setIsStartTrackingModalOpen(true))
                }
              >
                <Icons.Clock />
                <span>Start tracking</span>
              </CommandItem>
            )}
          </CommandGroup>
          <CommandGroup heading="Navigation">
            <CommandItem
              value="Go to tracker"
              onSelect={() => handleCommandAction(() => router.push("/"))}
            >
              <Icons.Calendar />
              <span>Go to tracker</span>
            </CommandItem>
            <CommandItem
              value="Go to organization"
              onSelect={() =>
                handleCommandAction(() => router.push("/organization"))
              }
            >
              <Icons.Organization />
              <span>Go to organization</span>
            </CommandItem>
            <CommandItem
              value="Go to settings"
              onSelect={() =>
                handleCommandAction(() => router.push("/settings"))
              }
            >
              <Icons.Settings />
              <span>Go to settings</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Miscellaneous">
            <CommandItem
              onSelect={() => handleCommandAction(() => signOut.execute())}
            >
              <Icons.SignOut />
              <span>Sign out</span>
            </CommandItem>
            <CommandItem
              value="Toggle Sidebar"
              onSelect={() => handleCommandAction(() => toggleIsSidebarOpen())}
            >
              <Icons.ViewSidebar />
              <span>Toggle sidebar</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Developer">
            <CommandItem
              value="Clear local storage"
              onSelect={() =>
                handleCommandAction(() => {
                  localStorage.clear();
                })
              }
            >
              <Icons.Trash />
              <span>Clear local storage</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <CommandDialog
        open={isStartTrackingModalOpen}
        onOpenChange={setIsStartTrackingModalOpen}
      >
        <DialogTitle className="sr-only">Start Tracking</DialogTitle>
        <DialogDescription className="sr-only">
          Here you can start tracking your time.
        </DialogDescription>
        <CommandInput placeholder="Search for a project" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {projects.map((project) => (
              <CommandItem
                key={project.uuid}
                onSelect={() =>
                  handleCommandAction(() => {
                    startTimeTracking.execute({
                      projectUuid: project.uuid,
                      startedAt: new Date().toISOString(),
                    });
                    setIsStartTrackingModalOpen(false);
                  })
                }
              >
                <Icons.DotFilled color={project.hexColor} />
                <span>{project.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export { AppCommand };
