import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWeatherIcon } from '../../utils/weatherIcons';
import type { WeatherDto } from "../../types/weather";

interface WeatherData {
    weatherData: WeatherDto[];
}

export const WeatherTable = ({ weatherData }: WeatherData) => {
    const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getDayName = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pl-PL', { weekday: 'short' });
    };

    return (
        <div className="weather-forecast">
            <div className="weather-cards">
                {weatherData.map((day, index) => (
                    <div key={index} className="weather-day-card">
                        <div className="card-header">
                            <div className="card-day-name">{getDayName(day.date)}</div>
                            <div className="card-date">{formatDate(day.date)}</div>
                        </div>

                        <div className="card-weather-icon">
                            <FontAwesomeIcon
                                icon={getWeatherIcon(day.weatherCode)}
                                title={`Kod pogody: ${day.weatherCode}`}
                            />
                        </div>

                        <div className="card-temps">
                            <div className="card-temp-item card-temp-min">
                                <div className="card-temp-label">Min</div>
                                <div className="card-temp-value">{day.minTemperature.toFixed(1)}°C</div>
                            </div>
                            <div className="card-temp-item card-temp-max">
                                <div className="card-temp-label">Max</div>
                                <div className="card-temp-value">{day.maxTemperature.toFixed(1)}°C</div>
                            </div>
                        </div>

                        <div className="card-energy">
                            <div className="card-energy-label">Energia słoneczna</div>
                            <div className="card-energy-value">{day.estimatedEnergy.toFixed(1)} kWh</div>
                        </div>
                    </div>
                ))}
            </div>

            <table className="weather-table-horizontal">
                <thead>
                    <tr>
                        <th className="row-header">Dzień</th>
                        {weatherData.map((day, index) => (
                            <th
                                key={index}
                                className={`day-header ${hoveredColumn === index ? 'column-hovered' : ''}`}
                                onMouseEnter={() => setHoveredColumn(index)}
                                onMouseLeave={() => setHoveredColumn(null)}
                            >
                                <div className="day-name">{getDayName(day.date)}</div>
                                <div className="day-date">{formatDate(day.date)}</div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="row-header">Pogoda</td>
                        {weatherData.map((day, index) => (
                            <td
                                key={index}
                                className={`weather-icon-cell ${hoveredColumn === index ? 'column-hovered' : ''}`}
                                onMouseEnter={() => setHoveredColumn(index)}
                                onMouseLeave={() => setHoveredColumn(null)}
                            >
                                <FontAwesomeIcon
                                    icon={getWeatherIcon(day.weatherCode)}
                                    size="2x"
                                    title={`Kod pogody: ${day.weatherCode}`}
                                />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="row-header">Min Temp.</td>
                        {weatherData.map((day, index) => (
                            <td
                                key={index}
                                className={`temp-min ${hoveredColumn === index ? 'column-hovered' : ''}`}
                                onMouseEnter={() => setHoveredColumn(index)}
                                onMouseLeave={() => setHoveredColumn(null)}
                            >
                                {day.minTemperature.toFixed(1)}°C
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="row-header">Max Temp.</td>
                        {weatherData.map((day, index) => (
                            <td
                                key={index}
                                className={`temp-max ${hoveredColumn === index ? 'column-hovered' : ''}`}
                                onMouseEnter={() => setHoveredColumn(index)}
                                onMouseLeave={() => setHoveredColumn(null)}
                            >
                                {day.maxTemperature.toFixed(1)}°C
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="row-header">Energia</td>
                        {weatherData.map((day, index) => (
                            <td
                                key={index}
                                className={`energy-cell ${hoveredColumn === index ? 'column-hovered' : ''}`}
                                onMouseEnter={() => setHoveredColumn(index)}
                                onMouseLeave={() => setHoveredColumn(null)}
                            >
                                {day.estimatedEnergy.toFixed(1)} kWh
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};