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
            <div className="weather-summary-container">
                <table className="weather-summary-table">
                    <caption id="table-description" className="sr-only">
                        Tabela zawiera podsumowanie prognozy pogody na tydzień:
                        minimalną i maksymalną temperaturę, średnie ciśnienie, czas nasłonecznienia
                        oraz prognozę pogody.
                    </caption>
                    <thead>
                        <tr>
                            <th>Min Temp.</th>
                            <th>Max Temp.</th>
                            <th>Ciśnienie</th>
                            <th>Słońce</th>
                            <th>Prognoza</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="temp-min">
                                {typeof minTemp === 'number' ? `${minTemp.toFixed(1)}°C` : minTemp}
                            </td>
                            <td className="temp-max">
                                {typeof maxTemp === 'number' ? `${maxTemp.toFixed(1)}°C` : maxTemp}
                            </td>
                            <td>
                                {typeof avgPressure === 'number' ? `${avgPressure.toFixed(0)} hPa` : avgPressure}
                            </td>
                            <td className="energy-cell">
                                {typeof avgSunshine === 'number' ? `${avgSunshine.toFixed(1)}h` : avgSunshine}
                            </td>
                            <td className="prediction-text">{prediction}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};