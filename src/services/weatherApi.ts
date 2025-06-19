import type { WeatherDto, WeatherSummaryDto } from '../types/weather';
import { configService } from '../config/config';

class WeatherApiService {
    async getWeatherForecast(latitude: number, longitude: number): Promise<WeatherDto[]> {
        try {
            const response = await fetch(`${configService.apiBaseUrl}/weather?latitude=${latitude}&longitude=${longitude}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            //TODO dopisac wlasne error handlery
            console.error('Error fetching weather data:', error);
            throw error;
        }
    }

    async getWeatherSummary(latitude: number, longitude: number): Promise<WeatherSummaryDto> {
        try {
            const response = await fetch(`${configService.apiBaseUrl}/weather/summarizeWeek?latitude=${latitude}&longitude=${longitude}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            //TODO dopisac wlasne error handlery
            console.error('Error fetching weather summary:', error);
            throw error;
        }
    }
}

export const weatherApiService = new WeatherApiService();