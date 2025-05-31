
import { useState } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

const InteractiveMap = () => {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 h-64 rounded-lg overflow-hidden">
      {/* World Map SVG */}
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 800 400" 
          style={{ transform: `scale(${zoom})` }}
          className="transition-transform duration-300"
        >
          {/* Simplified world map paths */}
          <g fill="#059669" stroke="#047857" strokeWidth="0.5" className="opacity-80">
            {/* North America */}
            <path d="M 100 120 Q 150 100 200 110 L 250 130 L 220 180 L 180 190 L 140 170 Z" />
            {/* South America */}
            <path d="M 180 200 L 220 220 L 210 280 L 190 300 L 170 280 L 175 240 Z" />
            {/* Europe */}
            <path d="M 380 100 L 420 95 L 440 110 L 430 130 L 400 135 L 375 125 Z" />
            {/* Africa */}
            <path d="M 370 140 L 420 145 L 430 200 L 410 280 L 385 285 L 365 250 L 360 180 Z" />
            {/* Asia */}
            <path d="M 450 90 L 600 100 L 650 130 L 620 180 L 580 190 L 520 170 L 480 140 L 455 115 Z" />
            {/* Australia */}
            <path d="M 580 250 L 630 255 L 640 280 L 615 290 L 585 285 Z" />
          </g>
          
          {/* Markers for organization locations */}
          <circle cx="200" cy="150" r="4" fill="#dc2626" className="animate-pulse" />
          <circle cx="400" cy="120" r="4" fill="#dc2626" className="animate-pulse" />
          <circle cx="550" cy="140" r="4" fill="#dc2626" className="animate-pulse" />
        </svg>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          disabled={zoom >= 3}
        >
          <ZoomIn size={20} className="text-gray-700 dark:text-gray-300" />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          disabled={zoom <= 0.5}
        >
          <ZoomOut size={20} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg text-sm">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
          <span className="text-gray-700 dark:text-gray-300">Our Locations</span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">Zoom: {Math.round(zoom * 100)}%</div>
      </div>
    </div>
  );
};

export default InteractiveMap;
