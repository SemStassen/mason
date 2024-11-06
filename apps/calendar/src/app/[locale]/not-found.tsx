import { Button } from "@mason/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-primary/10">
      <div className="space-y-4 border border-primary p-4 rounded-md bg-background">
        <div>
          <h2 className="text-lg font-semibold">
            Something unexpected happened!
          </h2>
          <p>We are sorry for the inconvenience.</p>
        </div>
        <Button asChild>
          <Link href="/">Try again</Link>
        </Button>
      </div>
    </div>
  );
}
