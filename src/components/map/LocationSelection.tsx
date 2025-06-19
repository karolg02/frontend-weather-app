import LocationPicker from './LocationFromMap';

interface LocationSectionProps {
    coordinates: { latitude: number; longitude: number } | null;
    isUsingGeolocation: boolean;
    geolocationLoading: boolean;
    onLocationSelect: (lat: number, lng: number) => void;
    onGetCurrentLocation: () => void;
}

export const LocationSection = ({
    coordinates,
    isUsingGeolocation,
    geolocationLoading,
    onLocationSelect,
    onGetCurrentLocation
}: LocationSectionProps) => {
    return (
        <section className="location-section" aria-label="Wybór lokalizacji">
            <h2>Wybierz lokalizację</h2>

            <LocationPicker
                onLocationSelect={onLocationSelect}
                selectedPosition={coordinates}
            />

            <div className="location-controls">
                <button
                    className="location-btn"
                    onClick={onGetCurrentLocation}
                    disabled={geolocationLoading || isUsingGeolocation}
                    aria-describedby="location-status"
                    title={isUsingGeolocation ? "Używasz już swojej lokalizacji. Kliknij na mapie aby wybrać inną." : undefined}
                >
                    {geolocationLoading ? '📌 Lokalizowanie...' :
                        isUsingGeolocation ? '📌 Używasz swojej lokalizacji' :
                            '📌 Znajdź mnie'}
                </button>
            </div>
        </section>
    );
};