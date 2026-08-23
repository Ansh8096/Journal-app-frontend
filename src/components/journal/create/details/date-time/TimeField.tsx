import { Clock3 } from "lucide-react";

import { DateTimeField } from "./DateTimeField";

import { journalDetailsConstants } from "@/constants/journal/journal-details";

interface TimeFieldProps {
  value: Date;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const timeFormatter = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export function TimeField({
  value,
  onClick,
  disabled = false,
  className,
}: TimeFieldProps) {
  return (
    <DateTimeField
      label={journalDetailsConstants.time.label}
      value={timeFormatter.format(value)}
      icon={Clock3}
      onClick={onClick}
      disabled={disabled}
      className={className}
    />
  );
}

export type { TimeFieldProps };