"use client";

import { Button } from "@mason/ui/button";
import { cn } from "@mason/ui/cn";
import { Icons } from "@mason/ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    name: "Calendar",
    path: "/",
  },
  {
    name: "Settings",
    path: "/settings",
  },
];

const icons = {
  "/": () => <Icons.Calendar size={22} />,
  "/settings": () => <Icons.Settings size={22} />,
};

interface itemProps {
  item: {
    name: string;
    path: string;
  };
  isActive: boolean;
}

function Item({ item, isActive }: itemProps) {
  const Icon = icons[item.path];
  return (
    <Button
      className={cn(isActive && "border-accent border")}
      variant="ghost"
      asChild
    >
      <Link href={item.path}>
        <Icon />
      </Link>
    </Button>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const firstPart = pathname.split("/")[1];
  return (
    <aside className="fixed top-0 border-r border-muted z-10 bg-background">
      <div className="mx-4 flex h-screen flex-shrink-0 flex-col items-center justify-between pb-4 md:flex">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="mt-6">
            <Link href="/">Mason</Link>
          </div>
          <div className="flex flex-col gap-1.5">
            {items.map((item) => {
              const isActive =
                (pathname === "/" && item.path === "/") ||
                (pathname !== "/" && item.path.startsWith(`/${firstPart}`));
              return <Item key={item.path} item={item} isActive={isActive} />;
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
