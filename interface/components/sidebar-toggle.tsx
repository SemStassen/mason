import { Button } from "@mason/ui/button";
import { Icons } from "@mason/ui/icons";
import { useSidebarStore } from "~/stores/sidebar-store";

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
