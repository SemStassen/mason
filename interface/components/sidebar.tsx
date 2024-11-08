"use client";

import { cn } from "@mason/ui/cn";
import { Icons } from "@mason/ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { useSidebarStore } from "~/stores/sidebar-store";

const items = [
  {
    name: "Tracker",
    path: "/",
    Icon: () => <Icons.Calendar size={22} fill="inherit" />,
  },
  {
    name: "Organization",
    path: "/organization",
    Icon: () => <Icons.Organization size={22} fill="inherit" />,
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
}

function Item({ item }: itemProps) {
  return (
    <li>
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          cn(
            "flex py-1 px-2 rounded-md w-full justify-start gap-2 text-muted-foreground fill-muted-foreground hover:fill-black hover:text-black hover:bg-muted",
            isActive &&
              "bg-primary/10 text-primary fill-primary hover:bg-primary/20 hover:text-primary hover:fill-primary",
          )
        }
      >
        <item.Icon />
        {item.name}
      </NavLink>
    </li>
  );
}

function Sidebar() {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  return (
    <AnimatePresence initial={false}>
      {isSidebarOpen && (
        <motion.aside
          key="sidebar"
          className="flex-none overflow-hidden border-r border-muted"
          transition={{
            ease: "linear",
            duration: 0.1,
          }}
          initial={{ width: 0 }}
          animate={{ width: 292 }}
          exit={{ width: 0 }}
        >
          <div className="bg-background h-full flex-none w-[292px]">
            <div className="flex h-full flex-col w-full pt-8 space-y-6 px-2">
              <h1 className="px-3 flex items-center justify-center py-4">
                <Link to="/">Mason</Link>
              </h1>
              <nav className="flex min-h-0 flex-col">
                <ul className="space-y-0.5">
                  {items.map((item) => {
                    return <Item key={item.path} item={item} />;
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export { Sidebar };
