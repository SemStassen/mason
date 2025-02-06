import { cn } from "../utils";

const Shortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "text-xs text-center inline-block align-baseline text-muted-foreground bg-background shadow-sm border min-w-5 p-0.5 rounded-sm",
        className,
      )}
      {...props}
    />
  );
};

export { Shortcut };
