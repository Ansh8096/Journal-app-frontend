import * as React from "react";
import { CloudOff } from "lucide-react";

export function WeatherEmpty() {
    return (
        <div
            className="flex flex-col items-center justify-center gap-3 py-6 text-center animate-in fade-in-50 duration-500"
            role="status"
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
                <CloudOff
                    className="h-6 w-6 text-muted-foreground"
                    aria-hidden="true"
                />
            </div>

            <div className="max-w-[220px] space-y-1">
                <h3 className="text-sm font-semibold text-foreground">
                    Weather unavailable
                </h3>

                <p className="text-xs leading-5 text-muted-foreground">
                    Weather information isn't available yet.
                </p>
            </div>
        </div>
    );
}

export default React.memo(WeatherEmpty);