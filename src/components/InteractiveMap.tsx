
import { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [zoom, setZoom] = useState(2);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [0, 20],
      zoom: zoom,
    });

    // Add markers for organization locations
    const locations = [
      { lng: -74.006, lat: 40.7128, name: 'New York Office' },
      { lng: 2.3522, lat: 48.8566, name: 'Paris Office' },
      { lng: 139.6917, lat: 35.6895, name: 'Tokyo Office' }
    ];

    locations.forEach(location => {
      new mapboxgl.Marker({ color: '#dc2626' })
        .setLngLat([location.lng, location.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<p>${location.name}</p>`))
        .addTo(map.current!);
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('zoom', () => {
      if (map.current) {
        setZoom(Math.round(map.current.getZoom()));
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  const handleZoomIn = () => {
    if (map.current) {
      map.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (map.current) {
      map.current.zoomOut();
    }
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
    }
  };

  if (showTokenInput) {
    return (
      <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 h-64 rounded-lg flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Enter Mapbox Token</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Please enter your Mapbox public token to display the interactive map. 
            Get yours at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">mapbox.com</a>
          </p>
          <form onSubmit={handleTokenSubmit}>
            <input
              type="text"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              placeholder="pk.ey..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md mb-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors"
            >
              Load Map
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 h-64 rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />

      {/* Custom Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
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
      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg text-sm">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-red-600 rounded-full"></div>
          <span className="text-gray-700 dark:text-gray-300">Our Locations</span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">Zoom: {zoom}</div>
      </div>
    </div>
  );
};

export default InteractiveMap;
