import weatherApi from "@/api/weather.api";

import type { WeatherResponse } from "@/types/api/weather";

class WeatherService {

    async getWeather(): Promise<WeatherResponse> {
        return await weatherApi.getWeather();
    }

}

export default new WeatherService();