import { useEffect, useState } from 'react';
import { useAccessibility } from './hooks/useAccessibility';
import { useWeatherData } from './hooks/useWeatherData';
import { useCoordinates } from './hooks/useCoordinates';
import AccessibilityControls from './components/accessibility/AccessibilityControls';
import { ErrorMessage } from './components/common/Error';
import { Loading } from './components/common/Loading';
import './styles/map.css';
import "./styles/table.css";
import { LocationSection } from './components/map/LocationSelection';
import { WeatherSection } from './components/weather/WeatherSection';

function App() {
  const accessibility = useAccessibility();
  const [isScrolled, setIsScrolled] = useState(false);

  const {
    coordinates,
    isUsingGeolocation,
    geolocation,
    handleLocationSelect,
    handleGetCurrentLocation
  } = useCoordinates();

  const {
    weatherData,
    summaryData,
    loading: weatherLoading,
    error: weatherError,
    apiError,
    refetch
  } = useWeatherData(coordinates?.latitude, coordinates?.longitude);

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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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
        <LocationSection
          coordinates={coordinates}
          isUsingGeolocation={isUsingGeolocation}
          geolocationLoading={geolocation.loading}
          onLocationSelect={handleLocationSelect}
          onGetCurrentLocation={handleGetCurrentLocation}
        />

        {isLoading && <Loading message="Ładowanie danych pogodowych..." />}

        {hasError && (
          <ErrorMessage
            message={geolocation.error || weatherError || undefined}
            error={apiError || undefined}
            onRetry={handleRetry}
          />
        )}

        {!isLoading && !hasError && weatherData.length > 0 && (
          <WeatherSection weatherData={weatherData} summaryData={summaryData} />
        )}
      </main>
    </div>
  );
}

export default App;