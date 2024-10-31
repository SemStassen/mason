"use client";

import { useProjectsStore } from "@/stores/projects-store";
import { useSidebarStore } from "@/stores/sidebar-store";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

function TimeTrackingCommand() {
  const toggleIsSidebarOpen = useSidebarStore(
    (state) => state.toggleIsSidebarOpen,
  );
  const projects = useProjectsStore((state) => state.projects);

  const [isCommandModalOpen, setIsCommandModalOpen] = useState<boolean>(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] =
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
            <CommandItem
              onSelect={() =>
                handleCommandAction(() => setIsTrackingModalOpen(true))
              }
            >
              <Icons.Clock />
              <span>Start tracking</span>
            </CommandItem>
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
              value="Go to settings"
              onSelect={() =>
                handleCommandAction(() => router.push("/settings"))
              }
            >
              <Icons.Settings />
              <span>Go to settings</span>
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
        open={isTrackingModalOpen}
        onOpenChange={setIsTrackingModalOpen}
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
                  handleCommandAction(() => setIsTrackingModalOpen(true))
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

export { TimeTrackingCommand };
