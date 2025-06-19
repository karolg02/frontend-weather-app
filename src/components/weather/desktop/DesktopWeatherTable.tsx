import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWeatherIcon } from '../../../utils/weatherIcons';
import type { WeatherDto } from "../../../types/weather";

interface DesktopWeatherTableProps {
    weatherData: WeatherDto[];
}

export const DesktopWeatherTable = ({ weatherData }: DesktopWeatherTableProps) => {
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
        <div className="weather-forecast-desktop">
            <table className="weather-table-horizontal"
                aria-label="Tabela prognozy pogody na 7 dni"
                role="table">
                <caption id="table-description" className="sr-only">
                    Tabela zawiera prognozy pogody dla każdego z 7 dni: datę, ikonę pogody,
                    temperatury minimalne i maksymalne oraz szacowaną energię słoneczną
                </caption>
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