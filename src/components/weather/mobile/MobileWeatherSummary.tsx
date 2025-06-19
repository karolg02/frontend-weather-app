import type { WeatherSummaryDto } from '../../../types/weather';

interface WeatherSummaryMobileProps {
    summaryData: WeatherSummaryDto;
}

export const WeatherSummaryMobile = ({ summaryData }: WeatherSummaryMobileProps) => {
    const minTemp = summaryData?.minTemperature ?? 'N/A';
    const maxTemp = summaryData?.maxTemperature ?? 'N/A';
    const avgPressure = summaryData?.averagePressure ?? 'N/A';
    const avgSunshine = summaryData?.averageExpositionTime ?? 'N/A';
    const prediction = summaryData?.weatherPrediction ?? 'Brak prognozy';

    return (
        <div className="weather-summary-mobile">
            <div className="weather-summary-cards">
                <div className="summary-card">
                    <div className="summary-card-title">Skrajna Min Temp.</div>
                    <div className="summary-card-value temp-min">
                        {typeof minTemp === 'number'
                            ? `${minTemp.toFixed(1)}°C`
                            : minTemp
                        }
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-card-title">Skrajna Max Temp.</div>
                    <div className="summary-card-value temp-max">
                        {typeof maxTemp === 'number'
                            ? `${maxTemp.toFixed(1)}°C`
                            : maxTemp
                        }
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-card-title">Średnie ciśnienie</div>
                    <div className="summary-card-value">
                        {typeof avgPressure === 'number'
                            ? `${avgPressure.toFixed(1)} hPa`
                            : avgPressure
                        }
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-card-title">Średni czas ekspozycji na słońce</div>
                    <div className="summary-card-value energy-cell">
                        {typeof avgSunshine === 'number'
                            ? `${avgSunshine.toFixed(1)} h`
                            : avgSunshine
                        }
                    </div>
                </div>

                <div className="summary-card prediction">
                    <div className="summary-card-title">Prognoza pogody</div>
                    <div className="summary-card-value">{prediction}</div>
                </div>
            </div>
        </div>
    );
};