import type { WeatherSummaryDto } from '../../types/weather';

interface WeatherSummary {
    summaryData: WeatherSummaryDto;
}

export const WeatherSummaryTable = ({ summaryData }: WeatherSummary) => {
    const minTemp = summaryData?.minTemperature ?? 'N/A';
    const maxTemp = summaryData?.maxTemperature ?? 'N/A';
    const avgPressure = summaryData?.averagePressure ?? 'N/A';
    const avgSunshine = summaryData?.averageExpositionTime ?? 'N/A';
    const prediction = summaryData?.weatherPrediction ?? 'Brak prognozy';

    return (
        <div>
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

            <table className="weather-summary-table">
                <thead>
                    <tr>
                        <th>Skrajna Min Temp. (°C)</th>
                        <th>Skrajna Max Temp. (°C)</th>
                        <th>Średnie ciśnienie (hPa)</th>
                        <th>Średni czas ekspozycji na słońce (h)</th>
                        <th>Prognoza pogody</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="temp-min">
                            {typeof minTemp === 'number'
                                ? minTemp.toFixed(1)
                                : minTemp
                            }
                        </td>
                        <td className="temp-max">
                            {typeof maxTemp === 'number'
                                ? maxTemp.toFixed(1)
                                : maxTemp
                            }
                        </td>
                        <td>
                            {typeof avgPressure === 'number'
                                ? avgPressure.toFixed(1)
                                : avgPressure
                            }
                        </td>
                        <td className="energy-cell">
                            {typeof avgSunshine === 'number'
                                ? avgSunshine.toFixed(1)
                                : avgSunshine
                            }
                        </td>
                        <td className="prediction-text">{prediction}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}