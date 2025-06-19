import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWeatherIcon } from '../../../utils/weatherIcons';
import type { WeatherDto } from "../../../types/weather";

interface MobileTableWeatherProps {
    weatherData: WeatherDto[];
}

export const MobileTableWeather = ({ weatherData }: MobileTableWeatherProps) => {
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

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

    const checkScrollPosition = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScrollPosition();
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', checkScrollPosition);
            return () => scrollElement.removeEventListener('scroll', checkScrollPosition);
        }
    }, []);

    return (
        <div className="weather-forecast-mobile">
            <div
                className="weather-cards"
                role="region"
                aria-label="Karty prognozy pogody - przewiń poziomo"
                ref={scrollRef}
                style={{
                    maskImage: `linear-gradient(to right, 
                        ${canScrollLeft ? 'transparent 0, black 20px' : 'black 0'}, 
                        black calc(100% - 20px), 
                        ${canScrollRight ? 'transparent 100%' : 'black 100%'})`
                }}
            >
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
        </div>
    );
};