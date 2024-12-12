import { Sidebar } from "@mason/interface/components/sidebar";
import { Outlet } from "react-router";
import { SidebarToggle } from "~/components/sidebar-toggle";

function RootLayout() {
  return (
    <div className="overflow-hidden h-screen w-screen overscroll-x-none">
      <div className="relative h-full w-full flex">
        <Sidebar />
        <div className="absolute top-2 left-2">
          <SidebarToggle />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export { RootLayout };
