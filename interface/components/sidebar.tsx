import { db } from "@mason/db/client/db";
import { useSubscription } from "@mason/db/client/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@mason/ui/avatar";
import { Button } from "@mason/ui/button";
import { cn } from "@mason/ui/cn";
import { Icons } from "@mason/ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useLoaderData } from "react-router-dom";
import type { AppLoaderType } from "~/app/router-provider";
import { useSidebarStore } from "~/stores/sidebar-store";

const NAV_ITEMS = [
  {
    name: "Tracker",
    path: "/",
    Icon: () => <Icons.Calendar size={22} fill="inherit" />,
  },
  {
    name: "Projects",
    path: "/projects",
    Icon: () => <Icons.Organization size={22} fill="inherit" />,
  },
  {
    name: "Settings",
    path: "/settings",
    Icon: () => <Icons.Settings size={22} fill="inherit" />,
  },
];

interface NavitemProps {
  item: {
    name: string;
    path: string;
    Icon: () => JSX.Element;
  };
}

function NavItem({ item }: NavitemProps) {
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

function NavUser() {
  const { userUuid } = useLoaderData<AppLoaderType>();

  const me = useSubscription(
    db.query.users.findFirst({
      where: (users, { eq }) => eq(users.uuid, userUuid),
    }),
    "uuid",
  );

  if (me.status === "loading") {
    return null;
  }

  if (!me.data[0]) {
    // TODO: Throw error
    return null;
  }

  const { username, email } = me.data[0];

  return (
    <Button variant="outline" className="h-14 gap-2">
      <Avatar className="w-8 h-8 rounded-lg">
        <AvatarImage />
        <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{username}</span>
        <span className="truncate text-xs">{email}</span>
      </div>
    </Button>
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
          <div className="bg-background h-full flex-none w-[292px] flex flex-col justify-between px-2 pt-8 pb-2">
            {/* Logo and navigation */}
            <div className="flex h-full flex-col w-full space-y-6">
              <h1 className="px-3 flex items-center justify-center py-4">
                <Link to="/">Mason</Link>
              </h1>
              <nav className="flex min-h-0 flex-col">
                <ul className="space-y-0.5">
                  {NAV_ITEMS.map((item) => {
                    return <NavItem key={item.path} item={item} />;
                  })}
                </ul>
              </nav>
            </div>
            {/* User profile */}
            <NavUser />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export { Sidebar };
