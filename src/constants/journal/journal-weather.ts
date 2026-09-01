import {
    Cloud,
    CloudRain,
    CloudSnow,
    CloudSun,
    Sun,
    Wind,
    CloudLightning,
    CloudFog,
    type LucideIcon,
} from "lucide-react";

export interface WeatherIconConfig {
    keywords: readonly string[];
    icon: LucideIcon;
    colorClass: string;
}

export const WEATHER_CARD = {
    title: "Weather",
    refreshLabel: "Refresh weather",
} as const;

export const WEATHER_METRICS = {
    humidity: {
        label: "Humidity",
        unit: "%",
    },
    wind: {
        label: "Wind",
        unit: "km/h",
    },
    feelsLike: {
        label: "Feels like",
        unit: "°C",
    },
} as const;

export const WEATHER_ICONS: readonly WeatherIconConfig[] = [
    {
        keywords: ["sunny", "clear"],
        icon: Sun,
        colorClass:
            "text-amber-500 dark:text-amber-400",
    },
    {
        keywords: ["partly cloudy", "partly sunny"],
        icon: CloudSun,
        colorClass:
            "text-amber-500 dark:text-amber-400",
    },
    {
        keywords: ["cloudy", "overcast"],
        icon: Cloud,
        colorClass:
            "text-slate-500 dark:text-slate-300",
    },
    {
        keywords: ["rain", "drizzle"],
        icon: CloudRain,
        colorClass:
            "text-blue-500 dark:text-blue-400",
    },
    {
        keywords: ["storm", "thunder"],
        icon: CloudLightning,
        colorClass:
            "text-indigo-500 dark:text-indigo-400",
    },
    {
        keywords: ["snow"],
        icon: CloudSnow,
        colorClass:
            "text-sky-500 dark:text-sky-300",
    },
    {
        keywords: ["fog", "mist", "haze"],
        icon: CloudFog,
        colorClass:
            "text-slate-500 dark:text-slate-300",
    },
] as const;

export const WEATHER_DEFAULT_ICON = Wind;

export const WEATHER_DEFAULT_ICON_COLOR =
    "text-slate-500 dark:text-slate-300";

export function getWeatherIcon(condition: string): LucideIcon {
    const normalizedCondition = condition.toLowerCase();

    const match = WEATHER_ICONS.find(({ keywords }) =>
        keywords.some((keyword) =>
            normalizedCondition.includes(keyword)
        )
    );

    return match?.icon ?? WEATHER_DEFAULT_ICON;
}

/**
 * New — returns just the color class for a condition. Kept separate from
 * getWeatherIcon (rather than changing that function's return type) so
 * any other existing callers of getWeatherIcon elsewhere in the app,
 * that I can't see from the files shared here, keep working unchanged.
 */
export function getWeatherIconColor(condition: string): string {
    const normalizedCondition = condition.toLowerCase();

    const match = WEATHER_ICONS.find(({ keywords }) =>
        keywords.some((keyword) =>
            normalizedCondition.includes(keyword)
        )
    );

    return match?.colorClass ?? WEATHER_DEFAULT_ICON_COLOR;
}
