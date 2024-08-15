import { Tracker } from "@/components/tracker";
import { Button } from "@mason/ui/button";
import { Icons } from "@mason/ui/icons";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 overflow-x-hidden">
      <header className="px-3 h-11 shrink-0 flex items-center border-b border-muted">
        <div className="flex gap-1.5 items-center">
          <div className="flex gap-1 text-sm">
            <span>Aug</span>
            <span className="text-muted-foreground">/</span>
            <span>Sep</span>
            <span className="text-muted-foreground">24</span>
          </div>
          <div className="bg-muted text-muted-foreground py-1 px-1.5 rounded-md text-xs">
            W22
          </div>
          <Button variant="ghost" size="icon">
            <Icons.ChevronLeft />
          </Button>
          <Button variant="ghost" size="icon">
            <Icons.ChevronRight />
          </Button>
          <Button variant="ghost" size="icon" className="w-auto">
            Today
          </Button>
        </div>
      </header>
      <Tracker />
    </div>
  );
}
