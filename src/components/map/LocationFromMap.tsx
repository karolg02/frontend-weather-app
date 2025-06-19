import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

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
        </div>
    );
}