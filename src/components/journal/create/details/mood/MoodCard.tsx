import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export interface MoodCardProps {
  label: string;
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
}

export function MoodCard({
  label,
  icon: Icon,
  colorClass,
  bgClass,
  borderClass,
  selected,
  disabled = false,
  onClick,
  className,
}: MoodCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      aria-label={`Select ${label} mood`}
      className={cn(
        "group relative flex w-full flex-col items-center justify-center gap-2 rounded-xl border p-3",
        "transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-sm",
        "active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        bgClass,
        borderClass,

        selected && "border-2 shadow-sm ring-2 ring-offset-1",

        disabled && [
          "cursor-not-allowed",
          "opacity-60",
          "hover:translate-y-0",
          "hover:shadow-none",
        ],

        className
      )}
    >
      {selected && (
        <div
          className={cn(
            "absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground",
          )}
          aria-hidden="true"
        >
          <Check className="h-3 w-3" />
        </div>
      )}

      <Icon
        className={cn(
          "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
          colorClass
        )}
        aria-hidden="true"
      />

      <span className={cn("text-sm font-medium", colorClass)}>
        {label}
      </span>
    </button>
  );
}

export default MoodCard;