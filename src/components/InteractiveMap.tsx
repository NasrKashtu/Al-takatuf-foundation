
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { ZoomIn, ZoomOut } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
type IconDefault = L.Icon.Default & {
  _getIconUrl?: string;
};

delete (L.Icon.Default.prototype as IconDefault)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const InteractiveMap = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  
  // Updated coordinates for the selected location from the image
  const ourLocationCoords: [number, number] = [25.9333, 14.9333]; // Umm al Aranib, Libya
  
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
    <div className="relative bg-muted w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] 2xl:h-[700px] rounded-lg overflow-hidden border border-border">
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
            <span>بلدية الشرقية/أم الأرانب</span>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Custom Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        <button
          onClick={handleZoomIn}
          className="bg-card text-foreground p-2 md:p-3 rounded-lg shadow-md-soft hover:bg-muted border border-border transition-colors"
        >
          <ZoomIn size={20} />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-card text-foreground p-2 md:p-3 rounded-lg shadow-md-soft hover:bg-muted border border-border transition-colors"
        >
          <ZoomOut size={20} />
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border border-border p-3 md:p-4 rounded-lg text-sm md:text-base z-[1000] max-w-xs shadow-md-soft">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-foreground">بلدية الشرقية/أم الأرانب</span>
        </div>
        <div className="text-xs md:text-sm text-muted-foreground">Interactive Map</div>
      </div>
    </div>
  );
};

export default InteractiveMap;
