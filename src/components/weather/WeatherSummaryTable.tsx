import type { WeatherSummaryDto } from '../../types/weather';
import { WeatherSummaryDesktop } from './desktop/DesktopWeatherSummary';
import { WeatherSummaryMobile } from './mobile/MobileWeatherSummary';

interface WeatherSummaryTableProps {
    summaryData: WeatherSummaryDto;
}

export const WeatherSummaryTable = ({ summaryData }: WeatherSummaryTableProps) => {
    return (
        <div className="weather-summary">
            <WeatherSummaryMobile summaryData={summaryData} />
            <WeatherSummaryDesktop summaryData={summaryData} />
        </div>
    );
};