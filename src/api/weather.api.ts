import client from "./client";

import type { WeatherResponse } from "@/types/api/weather";

class WeatherApi {

    async getWeather(): Promise<WeatherResponse> {

        const { data } =
            await client.get<WeatherResponse>(
                "/weather"
            );

        return data;
    }
}

export default new WeatherApi();