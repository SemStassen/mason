import { Button } from "@mason/ui/button";
import { Icons } from "@mason/ui/icons";
import { Shortcut } from "@mason/ui/shortcut";
import { Tooltip, TooltipContent, TooltipTrigger } from "@mason/ui/tooltip";
import { useHotkeys } from "react-hotkeys-hook";
import { hotkeys } from "~/lib/hotkeys";
import { useSidebarStore } from "~/stores/sidebar-store";

function SidebarToggle() {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const toggleIsSidebarOpen = useSidebarStore(
    (state) => state.toggleIsSidebarOpen,
  );

  const hotkey = hotkeys.navigation.toggleSidebar.key;

  useHotkeys(hotkey, () => toggleIsSidebarOpen());

  return (
    <Tooltip disableHoverableContent={true}>
      <TooltipTrigger asChild>
        <Button size="icon" variant="ghost" onClick={toggleIsSidebarOpen}>
          {/* TODO: Maybe change this icon */}
          <Icons.ViewSidebar />
        </Button>
      </TooltipTrigger>
      <TooltipContent align="start">
        {isSidebarOpen ? "Close" : "Open"} sidebar <Shortcut>{hotkey}</Shortcut>
      </TooltipContent>
    </Tooltip>
  );
}

export { SidebarToggle };
