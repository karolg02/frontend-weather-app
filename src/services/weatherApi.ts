import type { WeatherDto, WeatherSummaryDto } from '../types/weather';
import { configService } from '../config/config';
import { parseApiError } from '../utils/parseApiError';

class WeatherApiService {
    private async fetchWithErrorHandling(url: string): Promise<any> {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                let errorData = null;
                errorData = await response.json();

                const errorStructure = {
                    response: {
                        status: response.status,
                        statusText: response.statusText,
                        data: errorData
                    }
                };

                const parsedError = parseApiError(errorStructure);
                if (parsedError) {
                    const error = new Error('API Error');
                    (error as any).apiError = parsedError;
                    throw error;
                }

                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (fetchError: any) {
            const parsedError = parseApiError(fetchError);
            if (parsedError) {
                const error = new Error('Network Error');
                (error as any).apiError = parsedError;
                throw error;
            }

            throw fetchError;
        }
    }

    async getWeatherForecast(latitude: number, longitude: number): Promise<WeatherDto[]> {
        const url = `${configService.apiBaseUrl}/weather?latitude=${latitude}&longitude=${longitude}`;
        return await this.fetchWithErrorHandling(url);
    }

    async getWeatherSummary(latitude: number, longitude: number): Promise<WeatherSummaryDto> {
        const url = `${configService.apiBaseUrl}/weather/summarizeWeek?latitude=${latitude}&longitude=${longitude}`;
        return await this.fetchWithErrorHandling(url);
    }
}

export const weatherApiService = new WeatherApiService();