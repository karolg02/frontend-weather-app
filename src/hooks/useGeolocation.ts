import { useState, useCallback, useMemo } from 'react';

interface GeolocationState {
    latitude: number | null;
    longitude: number | null;
    loading: boolean;
    error: string | null;
}

interface GeolocationCoordinates {
    latitude: number;
    longitude: number;
}

export const useGeolocation = () => {
    const [state, setState] = useState<GeolocationState>({
        latitude: null,
        longitude: null,
        loading: false,
        error: null
    });

    const getCurrentLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setState(prev => ({
                ...prev,
                error: 'Geolokalizacja nie jest obsługiwana przez tę przeglądarkę'
            }));
            return;
        }

        setState(prev => ({ ...prev, loading: true, error: null }));

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    loading: false,
                    error: null
                });
            },
            (error) => {
                const errorMessages: Record<number, string> = {
                    [error.PERMISSION_DENIED]: 'Dostęp do lokalizacji został odrzucony. Sprawdź ustawienia przeglądarki.',
                    [error.POSITION_UNAVAILABLE]: 'Informacje o lokalizacji są niedostępne. Sprawdź połączenie internetowe.',
                    [error.TIMEOUT]: 'Przekroczono czas oczekiwania na lokalizację. Spróbuj ponownie.'
                };

                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: errorMessages[error.code] || 'Nie udało się pobrać lokalizacji'
                }));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    }, []);

    const clearError = useCallback(() => {
        setState(prev => ({ ...prev, error: null }));
    }, []);

    const reset = useCallback(() => {
        setState({
            latitude: null,
            longitude: null,
            loading: false,
            error: null
        });
    }, []);

    const location: GeolocationCoordinates | null = useMemo(() => {
        return state.latitude !== null && state.longitude !== null
            ? { latitude: state.latitude, longitude: state.longitude }
            : null;
    }, [state.latitude, state.longitude]);

    return {
        location,
        loading: state.loading,
        error: state.error,
        getCurrentLocation,
        clearError,
        reset
    };
};