import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

export interface TagChipProps {
  tag: string;
  onRemove: (tag: string) => void;
  disabled?: boolean;
  className?: string;
}

export function TagChip({
  tag,
  onRemove,
  disabled = false,
  className,
}: TagChipProps) {
  const handleRemove = () => {
    if (!disabled) {
      onRemove(tag);
    }
  };

  return (
    <div
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full border bg-muted/50 px-3 py-1",
        "transition-colors duration-200",
        className
      )}
    >
      <span
        className="max-w-[180px] truncate text-sm font-medium text-foreground"
        title={tag}
      >
        {tag}
      </span>

      <button
        type="button"
        onClick={handleRemove}
        disabled={disabled}
        aria-label={`Remove ${tag}`}
        className={cn(
          "inline-flex h-5 w-5 items-center justify-center rounded-full",
          "transition-colors duration-200",
          "hover:bg-destructive hover:text-destructive-foreground",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-ring",
          "focus-visible:ring-offset-2",
          disabled &&
            "cursor-not-allowed opacity-50 hover:bg-transparent hover:text-current"
        )}
      >
        <X
          className="h-3.5 w-3.5"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

export default React.memo(TagChip);