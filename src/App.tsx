import { useEffect, useState } from 'react';
import { useAccessibility } from './hooks/useAccessibility';
import { useWeatherData } from './hooks/useWeatherData';
import { useGeolocation } from './hooks/useGeolocation';
import AccessibilityControls from './components/accessibility/AccessibilityControls';
import { WeatherTable } from './components/weather/WeatherTable';
import { WeatherSummaryTable } from './components/weather/WeatherSummaryTable';
import LocationPicker from './components/map/LocationFromMap';
import './styles/map.css';
import "./styles/table.css";
import { ErrorMessage } from './components/common/Error';
import { Loading } from './components/common/Loading';

function App() {
  const accessibility = useAccessibility();
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isUsingGeolocation, setIsUsingGeolocation] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const geolocation = useGeolocation();

  const { weatherData, summaryData, loading: weatherLoading, error: weatherError, apiError, refetch } = useWeatherData(
    coordinates?.latitude,
    coordinates?.longitude
  );

  useEffect(() => {
    geolocation.getCurrentLocation();
  }, []);

  useEffect(() => {
    if (geolocation.location) {
      setCoordinates({
        latitude: geolocation.location.latitude,
        longitude: geolocation.location.longitude
      });
      setIsUsingGeolocation(true);
    }
  }, [geolocation.location?.latitude, geolocation.location?.longitude, geolocation.location?.timestamp]);

  const handleLocationSelect = (lat: number, lng: number) => {
    setCoordinates({ latitude: lat, longitude: lng });
    geolocation.clearError();
    setIsUsingGeolocation(false);
  };

  const handleGetCurrentLocation = () => {
    geolocation.getCurrentLocation();
  };

  const handleRetry = () => {
    if (apiError || weatherError) {
      refetch();
    } else if (geolocation.error) {
      geolocation.getCurrentLocation();
    }
  };

  const isLoading = geolocation.loading || weatherLoading;
  const hasError = geolocation.error || weatherError || apiError;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <h1>🌤️ Weather App</h1>
        <AccessibilityControls {...accessibility} />
      </header>

      <main className="main">
        <section className="location-section" aria-label="Wybór lokalizacji">
          <h2>Wybierz lokalizację</h2>

          <LocationPicker
            onLocationSelect={handleLocationSelect}
            selectedPosition={coordinates}
          />

          <div className="location-controls">
            <button
              className="location-btn"
              onClick={handleGetCurrentLocation}
              disabled={geolocation.loading || isUsingGeolocation}
              aria-describedby="location-status"
              title={isUsingGeolocation ? "Używasz już swojej lokalizacji. Kliknij na mapie aby wybrać inną." : undefined}
            >
              {geolocation.loading ? '📌 Lokalizowanie...' :
                isUsingGeolocation ? '📌 Używasz swojej lokalizacji' :
                  '📌 Znajdź mnie'}
            </button>
          </div>
        </section>

        {isLoading && (
          <Loading message="Ładowanie danych pogodowych..." />
        )}

        {hasError && (
          <ErrorMessage
            message={geolocation.error || weatherError || undefined}
            error={apiError || undefined}
            onRetry={handleRetry}
          />
        )}

        {!isLoading && !hasError && weatherData.length > 0 && (
          <section className="weather-forecast-section" aria-label="Prognoza pogody">
            <h2>Prognoza na 7 dni</h2>
            <div className="weather-results">
              <WeatherTable weatherData={weatherData} />
            </div>
          </section>
        )}
      </main>

      {!isLoading && !hasError && summaryData && (
        <footer className="weather-summary-footer" aria-label="Podsumowanie prognozy">
          <h2>Podsumowanie tygodnia</h2>
          <WeatherSummaryTable summaryData={summaryData} />
        </footer>
      )}
    </div>
  );
}

export default App;