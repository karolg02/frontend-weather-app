import { WeatherTable } from '../weather/WeatherTable';
import { WeatherSummaryTable } from '../weather/WeatherSummaryTable';
import type { WeatherDto, WeatherSummaryDto } from '../../types/weather';

interface WeatherSectionProps {
    weatherData: WeatherDto[];
    summaryData: WeatherSummaryDto | null;
}

export const WeatherSection = ({ weatherData, summaryData }: WeatherSectionProps) => {
    return (
        <>
            <section className="weather-forecast-section" aria-label="Prognoza pogody">
                <h2>Prognoza na 7 dni</h2>
                <div className="weather-results">
                    <WeatherTable weatherData={weatherData} />
                </div>
            </section>

            {summaryData && (
                <footer className="weather-summary-footer" aria-label="Podsumowanie prognozy">
                    <h2>Podsumowanie tygodnia</h2>
                    <WeatherSummaryTable summaryData={summaryData} />
                </footer>
            )}
        </>
    );
};