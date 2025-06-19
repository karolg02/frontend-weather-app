import { useState, useEffect } from 'react';
import { useGeolocation } from './useGeolocation';

export const useCoordinates = () => {
    const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
    const [isUsingGeolocation, setIsUsingGeolocation] = useState(false);
    const geolocation = useGeolocation();

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

    return {
        coordinates,
        isUsingGeolocation,
        geolocation,
        handleLocationSelect,
        handleGetCurrentLocation
    };
};