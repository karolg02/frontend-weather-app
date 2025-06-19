import { useState } from 'react';
import { useAccessibility } from './hooks/useAccessibility';
import { useWeatherData } from './hooks/useWeatherData';
import AccessibilityControls from './components/accessibility/AccessibilityControls';

function App() {
  const accessibility = useAccessibility();
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [manualCoords, setManualCoords] = useState({ latitude: '', longitude: '' });

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

  const handleManualCoordinates = () => {
    const latitude = parseFloat(manualCoords.latitude);
    const longitude = parseFloat(manualCoords.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      setLocationError('Wprowadź prawidłowe współrzędne liczbowe');
      return;
    }

    if (latitude < -90 || latitude > 90) {
      setLocationError('Szerokość geograficzna musi być między -90 a 90');
      return;
    }

    if (longitude < -180 || longitude > 180) {
      setLocationError('Długość geograficzna musi być między -180 a 180');
      return;
    }

    setCoordinates({ latitude, longitude });
    setLocationError(null);
  };

  const resetLocation = () => {
    setCoordinates(null);
    setManualCoords({ latitude: '', longitude: '' });
    setLocationError(null);
  };

  const isLoading = locationLoading || weatherLoading;
  const error = locationError || weatherError;

  return (
    <div className="app">
      <header className="header">
        <h1>Weather App</h1>
        <AccessibilityControls {...accessibility} />
      </header>

      <main className="main">
        {!coordinates && (
          <div className="location-section">
            <h2>Pobierz prognozę pogody dla lokalizacji</h2>

            <div className="location-method">
              <h3>Automatyczne wykrywanie</h3>
              <button
                className="location-btn"
                onClick={getMyLocation}
                disabled={locationLoading}
              >
                {locationLoading ? '📍 Pobieranie lokalizacji...' : '📍 Moja lokalizacja'}
              </button>
            </div>

            <div className="divider">lub</div>

            <div className="location-method">
              <h3>Wprowadź współrzędne ręcznie</h3>
              <div className="manual-coords">
                <div className="coord-input">
                  <label htmlFor="latitude">Szerokość geograficzna</label>
                  <input
                    id="latitude"
                    type="number"
                    step="any"
                    placeholder="np. 50.0614"
                    value={manualCoords.latitude}
                    onChange={(e) => setManualCoords({ ...manualCoords, latitude: e.target.value })}
                  />
                  <small>Od -90 do 90</small>
                </div>

                <div className="coord-input">
                  <label htmlFor="longitude">Długość geograficzna</label>
                  <input
                    id="longitude"
                    type="number"
                    step="any"
                    placeholder="np. 19.9383"
                    value={manualCoords.longitude}
                    onChange={(e) => setManualCoords({ ...manualCoords, longitude: e.target.value })}
                  />
                  <small>Od -180 do 180</small>
                </div>
              </div>

              <button
                className="location-btn"
                onClick={handleManualCoordinates}
                disabled={!manualCoords.latitude || !manualCoords.longitude}
              >
                🌍 Użyj tych współrzędnych
              </button>
            </div>
          </div>
        )}

        {coordinates && (
          <div className="current-location">
            <p className="coordinates">
              📍 Lokalizacja: {coordinates.latitude.toFixed(4)}, {coordinates.longitude.toFixed(4)}
            </p>
            <button className="reset-btn" onClick={resetLocation}>
              Zmień lokalizację
            </button>
          </div>
        )}

        {isLoading && coordinates && (
          <div className="loading">
            <p>Ładowanie danych pogodowych...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>Błąd: {error}</p>
            {locationError && !coordinates && (
              <button
                className="retry-btn"
                onClick={getMyLocation}
              >
                Spróbuj ponownie
              </button>
            )}
          </div>
        )}

        {!isLoading && !error && weatherData.length > 0 && (
          <div className="weather-results">
            <h2>Prognoza na 7 dni</h2>
            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
            {summaryData && (
              <>
                <h2>Podsumowanie tygodnia</h2>
                <pre>{JSON.stringify(summaryData, null, 2)}</pre>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;