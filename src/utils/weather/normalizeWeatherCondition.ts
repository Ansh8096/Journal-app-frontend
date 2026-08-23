import type {
    WeatherCondition,
} from "@/types/api/weather";

import {
    DEFAULT_WEATHER_CONDITION,
    WEATHER_CONDITIONS,
} from "@/constants/weather/weather-conditions";


export function normalizeWeatherCondition(
    description: string,
): WeatherCondition {

    const value =
        description
            .trim()
            .toLowerCase();


    /* ---------------------------------------------------------------------- */
    /*                                EMPTY                                   */
    /* ---------------------------------------------------------------------- */

    if (!value) {
        return DEFAULT_WEATHER_CONDITION;
    }


    /* ---------------------------------------------------------------------- */
    /*                                STORM                                    */
    /* ---------------------------------------------------------------------- */

    if (
        value.includes("thunderstorm") ||
        value.includes("thunder storm") ||
        value.includes("storm")
    ) {
        return WEATHER_CONDITIONS.STORM;
    }


    /* ---------------------------------------------------------------------- */
    /*                                 SNOW                                    */
    /* ---------------------------------------------------------------------- */

    if (
        value.includes("snow") ||
        value.includes("sleet") ||
        value.includes("blizzard")
    ) {
        return WEATHER_CONDITIONS.SNOW;
    }


    /* ---------------------------------------------------------------------- */
    /*                              RAIN / DRIZZLE                            */
    /* ---------------------------------------------------------------------- */

    if (
        value.includes("rain") ||
        value.includes("drizzle") ||
        value.includes("shower")
    ) {
        return WEATHER_CONDITIONS.RAIN;
    }


    /* ---------------------------------------------------------------------- */
    /*                               FOG / MIST                               */
    /* ---------------------------------------------------------------------- */

    if (
        value.includes("fog") ||
        value.includes("mist") ||
        value.includes("haze")
    ) {
        return WEATHER_CONDITIONS.FOG;
    }


    /* ---------------------------------------------------------------------- */
    /*                            PARTLY CLOUDY                               */
    /* ---------------------------------------------------------------------- */

    if (
        value.includes("partly cloudy") ||
        value.includes("partly-cloudy") ||
        value.includes("few cloud") ||
        value.includes("mostly sunny")
    ) {
        return WEATHER_CONDITIONS.PARTLY_CLOUDY;
    }


    /* ---------------------------------------------------------------------- */
    /*                                CLOUDY                                  */
    /* ---------------------------------------------------------------------- */

    if (
        value.includes("cloud") ||
        value.includes("overcast")
    ) {
        return WEATHER_CONDITIONS.CLOUDY;
    }


    /* ---------------------------------------------------------------------- */
    /*                                 CLEAR                                  */
    /* ---------------------------------------------------------------------- */

    if (
        value.includes("clear") ||
        value.includes("sunny") ||
        value.includes("sun")
    ) {
        return WEATHER_CONDITIONS.CLEAR;
    }


    /* ---------------------------------------------------------------------- */
    /*                                FALLBACK                                */
    /* ---------------------------------------------------------------------- */

    return DEFAULT_WEATHER_CONDITION;
}