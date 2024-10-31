"use client";

import { useSidebarStore } from "@/stores/sidebar-store";
import { Button } from "@mason/ui/button";
import { Icons } from "@mason/ui/icons";

function SidebarToggle() {
  const { toggleIsSidebarOpen } = useSidebarStore();
  return (
    <Button size="icon" variant="ghost" onClick={toggleIsSidebarOpen}>
      {/* TODO: Maybe change this icon */}
      <Icons.ViewSidebar />
    </Button>
  );
}

export { SidebarToggle };
