import * as React from "react";

import { cn } from "@/lib/utils";

export interface WeatherMetricProps {
    label: string;
    value: string;

    className?: string;
}

export function WeatherMetric({
    label,
    value,
    className,
}: WeatherMetricProps) {
    // Was previously `${label}-label` — an id built from the label text
    // itself. For a label like "Feels like" that produces an id
    // containing a space, which is invalid per the HTML spec, and it
    // isn't guaranteed unique if this component ever renders more than
    // once on the same page. useId() fixes both problems.
    const labelId = React.useId();

    return (
        <div
            role="group"
            className={cn(
                "flex flex-1 flex-col items-center justify-center text-center",
                className,
            )}
        >
            <span
                id={labelId}
                className="text-xs font-medium text-muted-foreground"
            >
                {label}
            </span>

            <span
                aria-labelledby={labelId}
                className="mt-1 text-sm font-semibold text-foreground"
            >
                {value}
            </span>
        </div>
    );
}

export default React.memo(WeatherMetric);