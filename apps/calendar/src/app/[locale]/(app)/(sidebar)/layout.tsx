"use client";

import { SidebarToggle } from "@/components/sidebar-toggle";
import dynamic from "next/dynamic";

const Sidebar = dynamic(
  () => import("@/components/sidebar").then((mod) => mod.Sidebar),
  { ssr: false },
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full flex">
      <Sidebar />
      <div className="absolute top-2 left-2">
        <SidebarToggle />
      </div>
      {children}
    </div>
  );
}
