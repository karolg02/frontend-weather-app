import type { WeatherSummaryDto } from "../../../types/weather";


interface DesktopWeatherSummaryProps {
    summaryData: WeatherSummaryDto;
}

export const WeatherSummaryDesktop = ({ summaryData }: DesktopWeatherSummaryProps) => {
    const minTemp = summaryData?.minTemperature ?? 'N/A';
    const maxTemp = summaryData?.maxTemperature ?? 'N/A';
    const avgPressure = summaryData?.averagePressure ?? 'N/A';
    const avgSunshine = summaryData?.averageExpositionTime ?? 'N/A';
    const prediction = summaryData?.weatherPrediction ?? 'Brak prognozy';

    return (
        <div className="weather-summary-desktop">
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
};