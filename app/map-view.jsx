'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
const icon = (n, type = 'recommended') => L.divIcon({ className: 'tm-marker-wrap', html: `<div class="tm-marker ${type}">${type === 'user' ? '★' : n}</div>`, iconSize: [38, 44], iconAnchor: [19, 42], popupAnchor: [0, -40] });
function Fit({ places }) { const map = useMap(); useEffect(() => { if (places.length)
    map.fitBounds(L.latLngBounds(places.map(p => [p.lat, p.lng])), { padding: [45, 45], maxZoom: 13 }); }, [map, places]); return null; }
export default function MapView({ places, onSelect }) {
    const center = places.length ? [places[0].lat, places[0].lng] : [13.052, 80.25];
    return <MapContainer center={center} zoom={12} className="leaflet-map" zoomControl={false}><TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/><Fit places={places}/><Polyline positions={places.map(p => [p.lat, p.lng])} pathOptions={{ color: '#2563eb', weight: 4, opacity: .8, dashArray: '9 7' }}/>{places.map((p, i) => <Marker key={p.id} position={[p.lat, p.lng]} icon={icon(i + 1, p.priority)} eventHandlers={{ click: () => onSelect?.(p.id) }}><Popup><div className="map-popup"><b>{p.name}</b><span>{p.time || 'Selected stop'}</span><span>₹{p.cost} · {p.score}% match</span><button onClick={() => onSelect?.(p.id)}>View details</button></div></Popup></Marker>)}</MapContainer>;
}
