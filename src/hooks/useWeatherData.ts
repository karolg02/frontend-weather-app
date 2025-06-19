import { useState, useEffect, useCallback } from 'react';
import { weatherApiService } from '../services/weatherApi';
import { ErrorCodes } from '../types/errorCodes';
import type { WeatherDto, WeatherSummaryDto } from '../types/weather';
import { parseApiError } from '../utils/parseApiError';

interface ApiError {
    type: ErrorCodes;
    details: string[];
}

export const useWeatherData = (latitude?: number, longitude?: number) => {
    const [weatherData, setWeatherData] = useState<WeatherDto[]>([]);
    const [summaryData, setSummaryData] = useState<WeatherSummaryDto | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [apiError, setApiError] = useState<ApiError | null>(null);

    const fetchWeatherData = useCallback(async () => {
        if (!latitude || !longitude) return;

        setLoading(true);
        setError(null);
        setApiError(null);

        try {
            const forecast = await weatherApiService.getWeatherForecast(latitude, longitude);
            setWeatherData(forecast);

            try {
                const summary = await weatherApiService.getWeatherSummary(latitude, longitude);
                setSummaryData(summary);
            } catch (summaryError: any) {
                console.warn('Summary fetch failed:', summaryError);
                setSummaryData(null);
            }

        } catch (err: any) {
            console.error('Weather API Error:', err);

            if (err.apiError) {
                setApiError(err.apiError);
            } else {
                const parsedError = parseApiError(err);
                if (parsedError) {
                    setApiError(parsedError);
                } else {
                    setApiError({
                        type: 'WEATHER_API_ERROR' as any,
                        details: []
                    });
                }
            }
        } finally {
            setLoading(false);
        }
    }, [latitude, longitude]);

    useEffect(() => {
        fetchWeatherData();
    }, [fetchWeatherData]);

    return {
        weatherData,
        summaryData,
        loading,
        error,
        apiError,
        refetch: fetchWeatherData
    };
};