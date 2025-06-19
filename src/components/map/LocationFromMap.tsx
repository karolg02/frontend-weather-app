import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

interface LocationPickerProps {
    onLocationSelect: (latitude: number, longitude: number) => void;
    selectedPosition?: { latitude: number; longitude: number } | null;
}

function MapCenterController({ selectedPosition }: { selectedPosition?: { latitude: number; longitude: number } | null }) {
    const map = useMap();

    useEffect(() => {
        if (selectedPosition) {
            map.setView([selectedPosition.latitude, selectedPosition.longitude], 10, {
                animate: true,
                duration: 1.5
            });
        }
    }, [selectedPosition, map]);

    return null;
}

function LocationMarker({ onLocationSelect, selectedPosition }: LocationPickerProps) {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            onLocationSelect(lat, lng);
        },
    });

    return selectedPosition ? (
        <Marker position={[selectedPosition.latitude, selectedPosition.longitude]} />
    ) : null;
}

export default function LocationPicker({ onLocationSelect, selectedPosition }: LocationPickerProps) {
    return (
        <div className="location-picker">
            <div className="map-container">
                <MapContainer
                    center={[52.3578, 19.2947]}
                    zoom={6}
                    style={{ height: '400px', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker
                        onLocationSelect={onLocationSelect}
                        selectedPosition={selectedPosition}
                    />
                    <MapCenterController selectedPosition={selectedPosition} />
                </MapContainer>
            </div>
            {selectedPosition && (
                <p className="selected-coords">
                    Wybrane współrzędne: {selectedPosition.latitude.toFixed(4)}, {selectedPosition.longitude.toFixed(4)}
                </p>
            )}
        </div>
    );
}