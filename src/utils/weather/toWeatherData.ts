import type {
    WeatherData,
    WeatherResponse,
} from "@/types/api/weather";
import { normalizeWeatherCondition } from "./normalizeWeatherCondition";


export function toWeatherData(
    response: WeatherResponse,
): WeatherData {

    return {
        city:
            response.city,

        temperature:
            response.temperature,

        description: 
            response.description,
                
        temperatureUnit: 
            response.temperatureUnit,    

        condition:
            normalizeWeatherCondition(
                response.description,
            ),

        humidity:
            response.humidity,

        windSpeed:
            response.windSpeed,

        windSpeedUnit: 
            response.windSpeedUnit,    

        feelsLike:
            response.feelsLike,
        
        feelsLikeUnit: 
            response.feelsLikeUnit,

        icon:
            response.icon ?? "",
    };
}