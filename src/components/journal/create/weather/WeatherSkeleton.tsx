import * as React from "react";

import { Skeleton } from "@/components/ui/skeleton";

export function WeatherSkeleton() {
    return (
        <div
            className="space-y-6"
            role="status"
            aria-label="Loading weather"
            aria-live="polite"
        >
            <div className="flex items-center justify-center gap-6">
                <Skeleton className="h-20 w-20 rounded-2xl" />

                <div className="space-y-3">
                    <Skeleton className="h-10 w-28" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t pt-5">
                <Skeleton className="h-12 rounded-lg" />
                <Skeleton className="h-12 rounded-lg" />
                <Skeleton className="h-12 rounded-lg" />
            </div>
        </div>
    );
}

export default React.memo(WeatherSkeleton);