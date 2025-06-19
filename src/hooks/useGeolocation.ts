import { useState, useEffect } from 'react';

interface GeolocationState {
    latitude: number | null;
    longitude: number | null;
    loading: boolean;
    error: string | null;
}

export const useGeolocation = () => {
    const [location, setLocation] = useState<GeolocationState>({
        latitude: null,
        longitude: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation(prev => ({
                ...prev,
                loading: false,
                error: 'Geolokalizacja nie jest obsługiwana przez tę przeglądarkę'
            }));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    loading: false,
                    error: null
                });
            },
            (error) => {
                let errorMessage = 'Nie udało się pobrać lokalizacji';

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Dostęp do lokalizacji został odrzucony';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Informacje o lokalizacji są niedostępne';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Przekroczono czas oczekiwania na lokalizację';
                        break;
                }

                setLocation(prev => ({
                    ...prev,
                    loading: false,
                    error: errorMessage
                }));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    }, []);

    return location;
};