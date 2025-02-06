import { cn } from "../utils";
import { Button } from "./button";
import { Icons } from "./icons";

interface TimeProps {
  value?: Date;
  onChange?: (time: Date) => void;
  step?: number;
  format?: "12h" | "24h";
  className?: string;
  disabled?: boolean;
}

interface TimeSegmentProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
  label: string;
  disabled?: boolean;
}

function TimeSegment({
  value,
  onChange,
  max,
  label,
  disabled,
}: TimeSegmentProps) {
  function increment() {
    onChange(value === max ? 0 : value + 1);
  }

  function decrement() {
    onChange(value === 0 ? max : value - 1);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={increment}
        disabled={disabled}
      >
        <Icons.ChevronUp className="h-4 w-4" />
        <span className="sr-only">Increase {label}</span>
      </Button>
      <div className="w-12 text-center tabular-nums">
        {value.toString().padStart(2, "0")}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={decrement}
        disabled={disabled}
      >
        <Icons.ChevronDown className="h-4 w-4" />
        <span className="sr-only">Decrease {label}</span>
      </Button>
    </div>
  );
}

function Time({
  className,
  value = new Date(),
  onChange,
  step = 1,
  format = "24h",
  disabled,
  ...props
}: TimeProps) {
  const hours = value.getHours();
  const minutes = value.getMinutes();
  const isPM = hours >= 12;

  function setHours(newHours: number) {
    if (!onChange) return;
    const newDate = new Date(value);
    if (format === "12h") {
      // Preserve AM/PM when in 12h format
      newHours = isPM ? (newHours % 12) + 12 : newHours % 12;
    }
    newDate.setHours(newHours);
    onChange(newDate);
  }

  function setMinutes(newMinutes: number) {
    if (!onChange) return;
    const newDate = new Date(value);
    newDate.setMinutes(newMinutes);
    onChange(newDate);
  }

  function toggleMeridiem() {
    if (!onChange || format !== "12h") return;
    const newDate = new Date(value);
    newDate.setHours(hours + (isPM ? -12 : 12));
    onChange(newDate);
  }

  return (
    <div
      className={cn(
        "flex select-none items-center gap-4 rounded-md border p-4",
        disabled && "opacity-50",
        className,
      )}
      {...props}
    >
      <TimeSegment
        value={format === "12h" ? hours % 12 || 12 : hours}
        onChange={setHours}
        max={format === "12h" ? 12 : 23}
        label="hours"
        disabled={disabled}
      />
      <div className="text-2xl">:</div>
      <TimeSegment
        value={minutes}
        onChange={setMinutes}
        max={59}
        label="minutes"
        disabled={disabled}
      />
      {format === "12h" && (
        <Button
          variant="outline"
          size="sm"
          className="w-16"
          onClick={toggleMeridiem}
          disabled={disabled}
        >
          {isPM ? "PM" : "AM"}
        </Button>
      )}
    </div>
  );
}
Time.displayName = "Time";

export { Time };
