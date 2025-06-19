import { useState, useEffect } from 'react';
import type { WeatherDto, WeatherSummaryDto } from '../types/weather';
import { weatherApiService } from '../services/weatherApi';

export const useWeatherData = (latitude?: number, longitude?: number) => {
    const [weatherData, setWeatherData] = useState<WeatherDto[]>([]);
    const [summaryData, setSummaryData] = useState<WeatherSummaryDto | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!latitude || !longitude) {
            setWeatherData([]);
            setSummaryData(null);
            setError(null);
            return;
        }

        const fetchWeatherData = async () => {
            setLoading(true);
            setError(null);

            try {
                const [forecast, summary] = await Promise.all([
                    weatherApiService.getWeatherForecast(latitude, longitude),
                    weatherApiService.getWeatherSummary(latitude, longitude)
                ]);
                setWeatherData(forecast);
                setSummaryData(summary);
            } catch (err) {
                console.error('Weather data fetch error:', err);
                setError(err instanceof Error ? err.message : 'Błąd podczas pobierania danych pogodowych');
                setWeatherData([]);
                setSummaryData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [latitude, longitude]);

    return {
        weatherData,
        summaryData,
        loading,
        error,
        refetch: () => {
            if (latitude && longitude) {
                setWeatherData([]);
                setSummaryData(null);
                setError(null);
            }
        }
    };
};