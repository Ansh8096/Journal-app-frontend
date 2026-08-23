import * as React from "react";
import { Loader2, MapPin, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WEATHER_CARD } from "@/constants/journal/journal-weather";
import { cn } from "@/lib/utils";

export interface WeatherHeaderProps {
    city: string;
    loading?: boolean;
    disabled?: boolean;
    onRefresh?: () => void;
    className?: string;
}

export function WeatherHeader({
    city,
    loading = false,
    disabled = false,
    onRefresh,
    className,
}: WeatherHeaderProps) {
    return (
        <div
            className={cn(
                "flex items-center justify-between gap-4",
                className
            )}
        >
            <div className="flex items-center gap-2">
                <MapPin
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                />

                <h3 className="text-base font-semibold text-foreground">
                    {WEATHER_CARD.title} ({city})
                </h3>
            </div>

            <Button
                variant="ghost"
                size="icon"
                type="button"
                disabled={disabled || loading}
                aria-label={WEATHER_CARD.refreshLabel}
                aria-busy={loading}
                aria-disabled={disabled || loading}
                title={WEATHER_CARD.refreshLabel}
                onClick={onRefresh}
                className="h-8 w-8 rounded-full transition-transform hover:rotate-180"
            >
                {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <RefreshCw className="h-4 w-4" />
                )}
            </Button>
        </div>
    );
}

export default React.memo(WeatherHeader);