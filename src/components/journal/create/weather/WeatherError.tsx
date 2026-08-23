import * as React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export interface WeatherErrorProps {
    onRetry?: () => void;
}

export function WeatherError({
    onRetry,
}: WeatherErrorProps) {
    return (
        <div
            className="flex flex-col items-center justify-center gap-4 py-6 text-center animate-in fade-in-50 duration-500"
            role="alert"
        >
            {/*
                Softened from a bare, bold red triangle to a muted icon
                inside a pale red circle — reads as "something needs your
                attention" rather than "something is on fire."
            */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle
                    className="h-6 w-6 text-destructive"
                    aria-hidden="true"
                />
            </div>

            <div className="max-w-[240px] space-y-1">
                <h3 className="text-sm font-semibold text-foreground">
                    Unable to load weather
                </h3>

                <p className="text-xs leading-5 text-muted-foreground">
                    Something went wrong while fetching the latest
                    weather information.
                </p>
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
                <RefreshCw className="mr-2 h-3.5 w-3.5" />
                Retry
            </Button>
        </div>
    );
}

export default React.memo(WeatherError);