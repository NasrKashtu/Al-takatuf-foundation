
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { ZoomIn, ZoomOut } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const InteractiveMap = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  
  // Updated coordinates for the new location
  const ourLocationCoords: [number, number] = [32.8872, 13.1913]; // Note: Leaflet uses [lat, lng]
  
  const handleZoomIn = () => {
    if (map) {
      map.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.zoomOut();
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 h-64 rounded-lg overflow-hidden">
      <MapContainer
        center={ourLocationCoords}
        zoom={12}
        className="w-full h-full"
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={ourLocationCoords}>
          <Popup>
            <span>Our Location</span>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Custom Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        <button
          onClick={handleZoomIn}
          className="bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          <ZoomIn size={20} className="text-gray-700 dark:text-gray-300" />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          <ZoomOut size={20} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg text-sm z-[1000]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span className="text-gray-700 dark:text-gray-300">Our Location</span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">Interactive Map</div>
      </div>
    </div>
  );
};

export default InteractiveMap;
