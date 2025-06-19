export interface WeatherQueryDto {
    latitude: number;
    longitude: number;
}
export interface WeatherDto {
    date: string;
    weatherCode: number;
    minTemperature: number;
    maxTemperature: number;
    estimatedEnergy: number;
}

export interface WeatherSummaryDto {
    minTemperature: number;
    maxTemperature: number;
    averagePressure: number;
    averageSunshineHours: number;
    weatherPrediction: string;
}