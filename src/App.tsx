import { useEffect, useState } from 'react';
import { useAccessibility } from './hooks/useAccessibility';
import { useWeatherData } from './hooks/useWeatherData';
import AccessibilityControls from './components/accessibility/AccessibilityControls';
import { WeatherTable } from './components/weather/WeatherTable';
import { WeatherSummaryTable } from './components/weather/WeatherSummaryTable';
import LocationPicker from './components/map/LocationFromMap';
import './styles/map.css';
import "./styles/table.css";

function App() {
  const accessibility = useAccessibility();
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const { weatherData, summaryData, loading: weatherLoading, error: weatherError } = useWeatherData(
    coordinates?.latitude,
    coordinates?.longitude
  );

  const getMyLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError('Geolokalizacja nie jest obsługiwana przez tę przeglądarkę');
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLocationLoading(false);
      },
      (error) => {
        let errorMessage = 'Nie udało się pobrać lokalizacji';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Dostęp do lokalizacji został odrzucony. Sprawdź ustawienia przeglądarki.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Informacje o lokalizacji są niedostępne';
            break;
          case error.TIMEOUT:
            errorMessage = 'Przekroczono czas oczekiwania na lokalizację';
            break;
        }

        setLocationError(errorMessage);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  useEffect(() => {
    getMyLocation();
  }, []);

  const handleLocationSelect = (lat: number, lng: number) => {
    setCoordinates({ latitude: lat, longitude: lng });
    setLocationError(null);
  };

  const isLoading = locationLoading || weatherLoading;
  const error = locationError || weatherError;

  return (
    <div className="app">
      <header className="header">
        <h1>🌤️ Prognoza Pogody</h1>
        <AccessibilityControls {...accessibility} />
      </header>

      <main className="main">
        <section className="location-section" aria-label="Wybór lokalizacji">
          <h2>Wybierz lokalizację</h2>

          <div className="map-container">
            <LocationPicker
              onLocationSelect={handleLocationSelect}
              selectedPosition={coordinates}
            />
          </div>

          <div className="location-controls">
            <button
              className="location-btn"
              onClick={getMyLocation}
              disabled={locationLoading}
              aria-describedby="location-status"
            >
              {locationLoading ? '📍 Lokalizowanie...' : '📍 Znajdź mnie'}
            </button>
          </div>

          {isLoading && coordinates && (
            <div className="loading" id="location-status" role="status" aria-live="polite">
              <p>Ładowanie danych pogodowych...</p>
            </div>
          )}

          {error && (
            <div className="error" role="alert" aria-live="assertive">
              <p>Błąd: {error}</p>
            </div>
          )}
        </section>

        {!isLoading && !error && weatherData.length > 0 && (
          <section className="weather-forecast-section" aria-label="Prognoza pogody">
            <h2>Prognoza na 7 dni</h2>
            <div className="weather-results">
              <WeatherTable weatherData={weatherData} />
            </div>
          </section>
        )}
      </main>

      {!isLoading && !error && summaryData && (
        <footer className="weather-summary-footer" aria-label="Podsumowanie prognozy">
          <h2>Podsumowanie tygodnia</h2>
          <WeatherSummaryTable summaryData={summaryData} />
        </footer>
      )}
    </div>
  );
}

export default App;