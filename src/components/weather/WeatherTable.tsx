import type { WeatherDto } from "../../types/weather";
import { DesktopWeatherTable } from "./desktop/DesktopWeatherTable";
import { MobileTableWeather } from "./mobile/MobileWeatherTable";

interface WeatherTableProps {
    weatherData: WeatherDto[];
}

export const WeatherTable = ({ weatherData }: WeatherTableProps) => {
    return (
        <div className="weather-forecast">
            <MobileTableWeather weatherData={weatherData} />
            <DesktopWeatherTable weatherData={weatherData} />
        </div>
    );
};