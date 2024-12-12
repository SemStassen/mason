"use client";

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
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { redirect, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSidebarStore } from "~/stores/sidebar-store";
import { trpc } from "~/utils/trpc";

function AppCommand() {
  const toggleIsSidebarOpen = useSidebarStore(
    (state) => state.toggleIsSidebarOpen,
  );
  const signOut = () => {
    trpc.auth.signOut.useQuery();
  };

  const [isCommandModalOpen, setIsCommandModalOpen] = useState<boolean>(false);
  const [isStartTrackingModalOpen, setIsStartTrackingModalOpen] =
    useState<boolean>(false);

  useHotkeys("meta+j", () => setIsCommandModalOpen(true));
  const navigate = useNavigate();

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
          {/* <CommandGroup heading="Tracker">
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
          </CommandGroup> */}
          <CommandGroup heading="Navigation">
            <CommandItem
              value="Go to tracker"
              onSelect={() => handleCommandAction(() => navigate("/"))}
            >
              <Icons.Calendar />
              <span>Go to tracker</span>
            </CommandItem>
            <CommandItem
              value="Go to organization"
              onSelect={() =>
                handleCommandAction(() => navigate("/organization"))
              }
            >
              <Icons.Organization />
              <span>Go to organization</span>
            </CommandItem>
            <CommandItem
              value="Go to settings"
              onSelect={() => handleCommandAction(() => navigate("/settings"))}
            >
              <Icons.Settings />
              <span>Go to settings</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Miscellaneous">
            <CommandItem onSelect={() => handleCommandAction(() => signOut())}>
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

      {/* <CommandDialog
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
      </CommandDialog> */}
    </>
  );
}

export { AppCommand };
