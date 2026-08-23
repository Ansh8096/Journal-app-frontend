import { CalendarDays } from "lucide-react";

import { DateTimeField } from "./DateTimeField";

import { journalDetailsConstants } from "@/constants/journal/journal-details";

interface DateFieldProps {
    value: Date;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
});

export function DateField({
    value,
    onClick,
    disabled = false,
    className,
}: DateFieldProps) {
    return (
        <DateTimeField
            label={journalDetailsConstants.date.label}
            value={dateFormatter.format(value)}
            icon={CalendarDays}
            onClick={onClick}
            disabled={disabled}
            className={className}
        />
    );
}

export type { DateFieldProps };