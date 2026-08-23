import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface DateTimeFieldProps {
    label: string;
    value: string;
    icon: LucideIcon;
    /**
     * Kept for prop-type compatibility with DateField/TimeField/
     * JournalDetailsCard (which still pass onDateClick/onTimeClick) so
     * nothing upstream breaks — but intentionally unused here. Per an
     * explicit request, this field is now a read-only display, not an
     * interactive dropdown/button, so there's nothing left to wire a
     * click handler to.
     */
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

export function DateTimeField({
    label,
    value,
    icon: Icon,
    className,
}: DateTimeFieldProps) {
    return (
        <div className={cn("flex items-center justify-between gap-3", className)}>
            <span className="text-sm font-medium text-foreground">
                {label}
            </span>

            <span
                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    bg-background
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-foreground
                "
            >
                <Icon
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                />
                {value}
            </span>
        </div>
    );
}

export type { DateTimeFieldProps };