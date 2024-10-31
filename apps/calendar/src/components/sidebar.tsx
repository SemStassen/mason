"use client";

import { useProjectsStore } from "@/stores/projects-store";
import { useSidebarStore } from "@/stores/sidebar-store";
import { Button } from "@mason/ui/button";
import { cn } from "@mason/ui/cn";
import { Icons } from "@mason/ui/icons";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    name: "Tracker",
    path: "/",
    Icon: () => <Icons.Calendar size={22} fill="inherit" />,
  },
  {
    name: "Settings",
    path: "/settings",
    Icon: () => <Icons.Settings size={22} fill="inherit" />,
  },
];

interface itemProps {
  item: {
    name: string;
    path: string;
    Icon: () => JSX.Element;
  };
  isActive: boolean;
}

function Item({ item, isActive }: itemProps) {
  return (
    <li>
      <Button
        className={cn(
          "w-full justify-start gap-2 text-muted-foreground fill-muted-foreground hover:fill-black",
          isActive &&
            "bg-primary/10 text-primary fill-primary hover:bg-primary/20 hover:text-primary hover:fill-primary",
        )}
        variant="ghost"
        size="icon"
        asChild
      >
        <Link href={item.path}>
          <item.Icon />
          {item.name}
        </Link>
      </Button>
    </li>
  );
}

function Sidebar() {
  const pathname = usePathname();
  const firstPart = pathname.split("/")[1];
  const { isSidebarOpen } = useSidebarStore();
  const { projects } = useProjectsStore();

  return (
    <AnimatePresence initial={false}>
      {isSidebarOpen && (
        <motion.aside
          key="sidebar"
          className="flex-none"
          transition={{
            ease: "linear",
            duration: 0.1,
          }}
          initial={{ width: 0 }}
          animate={{ width: 220 }}
          exit={{ width: 0 }}
        >
          <div className="bg-background border-r border-muted h-full overflow-hidden flex-none width-[220px]">
            <div className="flex h-full flex-col w-full pt-8 space-y-6 px-2">
              <h1 className="px-3 flex items-center justify-center py-4">
                <Link href="/">Mason</Link>
              </h1>
              <nav className="flex min-h-0 flex-col">
                <ul className="space-y-0.5">
                  {items.map((item) => {
                    const isActive =
                      (pathname === "/" && item.path === "/") ||
                      (pathname !== "/" &&
                        item.path.startsWith(`/${firstPart}`));
                    return (
                      <Item key={item.path} item={item} isActive={isActive} />
                    );
                  })}
                </ul>
              </nav>

              <div>
                <h4 className="text-sm">Projects</h4>
                {projects.map(({ name, uuid }) => (
                  <div key={uuid}>{name}</div>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export { Sidebar };
