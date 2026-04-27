import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { ZoomIn, ZoomOut } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useApp } from '@/contexts/AppContext';

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

const OUR_LOCATION: [number, number] = [25.9333, 14.9333]; // Umm al Aranib, Libya

const InteractiveMap = () => {
  const { t } = useApp();
  const [map, setMap] = useState<L.Map | null>(null);

  return (
    <div className="relative bg-muted w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] 2xl:h-[700px] rounded-lg overflow-hidden border border-border">
      <MapContainer
        center={OUR_LOCATION}
        zoom={12}
        className="w-full h-full"
        zoomControl={false}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={OUR_LOCATION}>
          <Popup>
            <span>{t('mapLocationName')}</span>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Custom Zoom Controls — `end-4` flips with dir for RTL */}
      <div className="absolute top-4 end-4 flex flex-col gap-2 z-[1000]">
        <button
          onClick={() => map?.zoomIn()}
          aria-label={t('zoomIn')}
          className="bg-card text-foreground p-2 md:p-3 rounded-lg shadow-md-soft hover:bg-muted border border-border transition-colors"
        >
          <ZoomIn size={20} />
        </button>
        <button
          onClick={() => map?.zoomOut()}
          aria-label={t('zoomOut')}
          className="bg-card text-foreground p-2 md:p-3 rounded-lg shadow-md-soft hover:bg-muted border border-border transition-colors"
        >
          <ZoomOut size={20} />
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 start-4 bg-card/95 backdrop-blur-sm border border-border p-3 md:p-4 rounded-lg text-sm md:text-base z-[1000] max-w-xs shadow-md-soft">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-primary rounded-full" aria-hidden="true" />
          <span className="text-foreground">{t('mapLocationName')}</span>
        </div>
        <div className="text-xs md:text-sm text-muted-foreground">
          {t('interactiveMap')}
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
