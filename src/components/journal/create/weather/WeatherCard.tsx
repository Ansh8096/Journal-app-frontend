import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";

import { WeatherHeader } from "./WeatherHeader";

import type { WeatherData } from "@/types/api/weather";
import { cn } from "@/lib/utils";
import { WeatherDisplay } from "./WeatherDisplay";
import { WeatherMetrics } from "./WeatherMetrics";
import { WeatherEmpty } from "./WeatherEmpty";
import { WeatherError } from "./WeatherError";
import { WeatherSkeleton } from "./WeatherSkeleton";

export interface WeatherCardProps {
    weather?: WeatherData;

    loading?: boolean;

    error?: boolean;

    disabled?: boolean;

    onRefresh?: () => void;

    className?: string;
}

export function WeatherCard({
    weather,
    loading = false,
    error = false,
    disabled = false,
    onRefresh,
    className,
}: WeatherCardProps) {
    return (
        <Card
            className={cn(
                "overflow-hidden shadow-sm transition-shadow hover:shadow-md",
                className
            )}
        >
            <CardContent className="space-y-5 p-5">
                <WeatherHeader
                    city={weather?.city ?? "--"}
                    loading={loading}
                    disabled={disabled}
                    onRefresh={onRefresh}
                />

                {loading ? (
                    <WeatherSkeleton />
                ) : error ? (
                    <WeatherError onRetry={onRefresh} />
                ) : !weather ? (
                    <WeatherEmpty />
                ) : (
                    <>
                        <WeatherDisplay weather={weather} />

                        <WeatherMetrics weather={weather} />
                    </>
                )}
            </CardContent>
        </Card>
    );
}

export default React.memo(WeatherCard);