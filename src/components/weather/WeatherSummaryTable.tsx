import type { WeatherSummaryDto } from '../../types/weather';
import { WeatherSummaryDesktop } from './desktop/DesktopWeatherSummary';
import { WeatherSummaryMobile } from './mobile/MobileWeatherSummary';

interface WeatherSummaryTableProps {
    summaryData: WeatherSummaryDto;
}

export const WeatherSummaryTable = ({ summaryData }: WeatherSummaryTableProps) => {
    return (
        <div className="weather-summary"
            role="region"
            aria-label="Podsumowanie statystyk pogodowych"
            aria-live="polite">
            <WeatherSummaryMobile summaryData={summaryData} />
            <WeatherSummaryDesktop summaryData={summaryData} />
        </div>
    );
};