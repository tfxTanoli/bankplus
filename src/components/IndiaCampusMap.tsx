import React, { useState } from 'react';
import indiaData from '@svg-maps/india';
import { CENTRES } from '../data/mockData';
import { ZoomIn, ZoomOut, RotateCcw, MapPin, Sparkles } from 'lucide-react';

interface IndiaCampusMapProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

// Active state IDs in @svg-maps/india
const ACTIVE_STATE_IDS = new Set(['up', 'ut', 'br', 'rj', 'hr', 'dl']);

export const IndiaCampusMap: React.FC<IndiaCampusMapProps> = ({
  selectedCity,
  onSelectCity
}) => {
  // 'full' = viewBox 0 0 612 696 (All of India)
  // 'focus' = viewBox 140 145 235 160 (Focus on UP, UK, Bihar, NCR, Rajasthan corridor)
  const [zoomMode, setZoomMode] = useState<'full' | 'focus'>('full');
  const [hoveredCentreId, setHoveredCentreId] = useState<string | null>(null);

  // Manual zoom factor
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const handleZoomIn = () => {
    if (zoomMode === 'full') {
      setZoomMode('focus');
    } else {
      setZoomLevel(prev => Math.min(prev + 0.25, 2));
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel(prev => Math.max(prev - 0.25, 1));
    } else if (zoomMode === 'focus') {
      setZoomMode('full');
    }
  };

  const handleReset = () => {
    setZoomMode('full');
    setZoomLevel(1);
  };

  // Compute viewBox dynamically based on zoom
  const getViewBox = () => {
    if (zoomMode === 'full') {
      return '0 0 612 696';
    }
    // Hub focus base: x=140, y=145, w=235, h=160
    const baseW = 235 / zoomLevel;
    const baseH = 160 / zoomLevel;
    const baseCenterX = 250;
    const baseCenterY = 225;
    const x = baseCenterX - baseW / 2;
    const y = baseCenterY - baseH / 2;
    return `${x} ${y} ${baseW} ${baseH}`;
  };

  return (
    <div className="bg-slate-950 text-white rounded-2xl overflow-hidden border border-slate-800 shadow-xl flex flex-col">
      {/* Top Controls Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <h4 className="text-xs sm:text-sm font-black tracking-wide text-white uppercase flex items-center gap-1.5">
              <span>National Footprint</span>
              <span className="text-[10px] text-blue-300 font-mono font-normal">
                (PAN India Map)
              </span>
            </h4>
          </div>
          <p className="text-[11px] text-slate-400">
            7 Active ALCs • 3 Coming Soon • Registered & Corporate Offices
          </p>
        </div>

        {/* View Mode & Zoom Controls */}
        <div className="flex items-center gap-1.5">
          <div className="bg-slate-800/90 p-0.5 rounded-lg border border-slate-700/80 flex text-[10px] font-bold">
            <button
              onClick={() => {
                setZoomMode('full');
                setZoomLevel(1);
              }}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                zoomMode === 'full'
                  ? 'bg-[#003399] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Show entire India map"
            >
              All India
            </button>
            <button
              onClick={() => {
                setZoomMode('focus');
                setZoomLevel(1);
              }}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                zoomMode === 'focus'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Zoom into active ALC region"
            >
              Hub Cluster
            </button>
          </div>

          <div className="flex items-center gap-1 bg-slate-800/90 p-0.5 rounded-lg border border-slate-700/80">
            <button
              onClick={handleZoomIn}
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleReset}
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SVG Canvas with India Map and Centre Pins */}
      <div className="relative w-full aspect-4/3 sm:aspect-[4/3.2] bg-gradient-to-b from-slate-950 via-[#071126] to-slate-950 overflow-hidden flex items-center justify-center select-none">
        {/* Subtle grid pattern background representing geographic coordinates */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none"></div>

        {/* Compass Rose Accent in Corner */}
        <div className="absolute top-3 right-3 z-10 pointer-events-none flex flex-col items-center opacity-60">
          <span className="text-[9px] font-black text-blue-300 tracking-widest font-mono">N</span>
          <div className="w-0.5 h-4 bg-gradient-to-b from-blue-400 to-transparent"></div>
        </div>

        {/* Interactive SVG */}
        <svg
          viewBox={getViewBox()}
          className="w-full h-full transition-all duration-500 ease-out"
          style={{ maxHeight: '100%' }}
        >
          <defs>
            {/* Filter for pin shadow */}
            <filter id="pin-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.8" />
            </filter>
            {/* Active glow filter */}
            <filter id="glow-emerald" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* India States & Union Territories Outline */}
          <g id="india-states">
            {indiaData.locations.map((loc) => {
              const isActiveState = ACTIVE_STATE_IDS.has(loc.id);

              return (
                <path
                  key={loc.id}
                  id={`state-${loc.id}`}
                  d={loc.path}
                  className={`transition-colors duration-200 ${
                    isActiveState
                      ? 'fill-blue-950/70 stroke-[#0047bb]/60 hover:fill-blue-900/60'
                      : 'fill-slate-900/80 stroke-slate-800/80 hover:fill-slate-850'
                  }`}
                  strokeWidth={isActiveState ? '1.2' : '0.8'}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                >
                  <title>{loc.name}{isActiveState ? ' (BankPlus ALC Region)' : ''}</title>
                </path>
              );
            })}
          </g>

          {/* Network Inter-connect Lines between Offices & ALCs */}
          <g id="network-corridor-lines" opacity="0.35" strokeDasharray="3,3" className="pointer-events-none">
            {/* Line from Kanpur HQ to Corporate Gurugram */}
            <line x1="258" y1="258" x2="182" y2="213" stroke="#38bdf8" strokeWidth="1.2" />
            {/* Line from Kanpur HQ to Varanasi */}
            <line x1="258" y1="258" x2="316" y2="282" stroke="#38bdf8" strokeWidth="1.2" />
            {/* Line from Kanpur HQ to Budaun */}
            <line x1="258" y1="258" x2="226" y2="224" stroke="#38bdf8" strokeWidth="1.2" />
            {/* Line from Varanasi to Siwan */}
            <line x1="316" y1="282" x2="348" y2="262" stroke="#10b981" strokeWidth="1.2" />
            {/* Line from Gurugram to Saharanpur */}
            <line x1="182" y1="213" x2="194" y2="180" stroke="#10b981" strokeWidth="1.2" />
            {/* Line from Saharanpur to Rudrapur/Dineshpur */}
            <line x1="194" y1="180" x2="237" y2="202" stroke="#10b981" strokeWidth="1.2" />
            {/* Line from Gurugram to Bharatpur */}
            <line x1="182" y1="213" x2="190" y2="240" stroke="#10b981" strokeWidth="1.2" />
          </g>

          {/* Markers / Pins for All Centres */}
          <g id="centres-pins">
            {CENTRES.map((centre) => {
              const isSelected = centre.city === selectedCity;
              const isHQ = centre.isHQ;
              const isCorp = centre.id === 'gurugram-co';
              const isComingSoon = centre.isComingSoon;
              const isHovered = hoveredCentreId === centre.id;

              const pinX = centre.mapCoords.x;
              const pinY = centre.mapCoords.y;

              // Determine pin colors
              let pinColor = '#10b981'; // emerald for active ALC
              let pinFill = '#059669';
              let badgeColor = 'bg-emerald-500';

              if (isHQ) {
                pinColor = '#f59e0b'; // amber/gold for Kanpur Academic HQ
                pinFill = '#d97706';
                badgeColor = 'bg-amber-400 text-slate-950';
              } else if (isCorp) {
                pinColor = '#38bdf8'; // sky blue for Gurugram Corporate Office
                pinFill = '#0284c7';
                badgeColor = 'bg-sky-400 text-slate-950';
              } else if (isComingSoon) {
                pinColor = '#fbbf24'; // yellow/amber for Coming Soon
                pinFill = '#d97706';
                badgeColor = 'bg-amber-500 text-slate-950';
              }

              // Label offset calculation to avoid text overlap in dense clusters
              let labelDx = 0;
              let labelDy = 12;
              let textAnchor = 'middle';

              if (centre.city === 'Dineshpur') {
                labelDx = -14;
                labelDy = -6;
                textAnchor = 'end';
              } else if (centre.city === 'Rudrapur') {
                labelDx = 14;
                labelDy = -6;
                textAnchor = 'start';
              } else if (centre.city === 'Bareilly') {
                labelDx = 14;
                labelDy = 2;
                textAnchor = 'start';
              } else if (centre.city === 'Unnao') {
                labelDx = 14;
                labelDy = -5;
                textAnchor = 'start';
              } else if (centre.city === 'Budaun') {
                labelDx = -12;
                labelDy = 4;
                textAnchor = 'end';
              } else if (centre.city === 'Farrukhabad') {
                labelDx = 12;
                labelDy = 8;
                textAnchor = 'start';
              } else if (centre.city === 'Gurugram') {
                labelDx = -14;
                labelDy = 3;
                textAnchor = 'end';
              } else if (centre.city === 'Bharatpur') {
                labelDx = -14;
                labelDy = 5;
                textAnchor = 'end';
              } else if (centre.city === 'Saharanpur') {
                labelDx = 0;
                labelDy = -9;
                textAnchor = 'middle';
              } else if (centre.city === 'Kanpur') {
                labelDx = 0;
                labelDy = 13;
                textAnchor = 'middle';
              } else if (centre.city === 'Gorakhpur') {
                labelDx = 14;
                labelDy = -4;
                textAnchor = 'start';
              } else if (centre.city === 'Varanasi') {
                labelDx = 0;
                labelDy = 13;
                textAnchor = 'middle';
              } else if (centre.city === 'Siwan') {
                labelDx = 12;
                labelDy = 4;
                textAnchor = 'start';
              }

              const scale = zoomMode === 'focus' ? 0.75 : 1;

              return (
                <g
                  key={centre.id}
                  onClick={() => onSelectCity(centre.city)}
                  onMouseEnter={() => setHoveredCentreId(centre.id)}
                  onMouseLeave={() => setHoveredCentreId(null)}
                  className="cursor-pointer group"
                  transform={`translate(${pinX}, ${pinY})`}
                  style={{ transition: 'transform 0.2s ease-out' }}
                >
                  {/* Selected Ripple animation */}
                  {isSelected && (
                    <circle
                      r="16"
                      fill="none"
                      stroke={pinColor}
                      strokeWidth="1.5"
                      opacity="0.7"
                      className="animate-ping"
                    />
                  )}

                  {/* Outer halo on hover or selected */}
                  {(isSelected || isHovered) && (
                    <circle
                      r="12"
                      fill={pinColor}
                      opacity="0.25"
                      filter={isHQ ? 'url(#glow-gold)' : 'url(#glow-emerald)'}
                    />
                  )}

                  {/* Main Pin Shape */}
                  {isHQ ? (
                    // Star shape for Registered HQ (Kanpur)
                    <g filter="url(#pin-shadow)">
                      <circle r="7" fill="#d97706" stroke="#fbbf24" strokeWidth="1.5" />
                      <path
                        d="M 0 -3.8 L 1.2 -1.2 L 3.8 -1.2 L 1.7 0.4 L 2.5 3.0 L 0 1.4 L -2.5 3.0 L -1.7 0.4 L -3.8 -1.2 L -1.2 -1.2 Z"
                        fill="#ffffff"
                      />
                    </g>
                  ) : isCorp ? (
                    // Diamond/Badge for Corporate Office (Gurugram)
                    <g filter="url(#pin-shadow)">
                      <circle r="6.5" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                      <rect
                        x="-2.5"
                        y="-2.5"
                        width="5"
                        height="5"
                        fill="#ffffff"
                        transform="rotate(45)"
                      />
                    </g>
                  ) : (
                    // Circular Pin for ALCs (Open Now vs Coming Soon)
                    <g filter="url(#pin-shadow)">
                      <circle
                        r={isSelected ? 6.5 : 5}
                        fill={pinFill}
                        stroke={isComingSoon ? '#fef08a' : '#a7f3d0'}
                        strokeWidth="1.5"
                      />
                      <circle r="2" fill="#ffffff" />
                    </g>
                  )}

                  {/* City Name Label on Map */}
                  <text
                    x={labelDx}
                    y={labelDy}
                    textAnchor={textAnchor}
                    className={`font-sans font-bold tracking-tight select-none transition-all duration-150 ${
                      isSelected
                        ? 'text-white text-[9.5px] font-black'
                        : isHovered
                        ? 'text-white text-[8.5px]'
                        : 'text-slate-300 text-[8px]'
                    }`}
                    style={{
                      fill: isSelected
                        ? '#ffffff'
                        : isHovered
                        ? '#ffffff'
                        : isComingSoon
                        ? '#fde68a'
                        : '#cbd5e1',
                      paintOrder: 'stroke',
                      stroke: '#020617',
                      strokeWidth: '2.5px',
                      strokeLinejoin: 'round'
                    }}
                  >
                    {centre.city} {isHQ ? '★' : isComingSoon ? '⏳' : ''}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Floating Active Selection Badge (at bottom of map) */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-[11px] shadow-lg pointer-events-auto">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-slate-400">Selected Centre:</span>
            <span className="font-bold text-white flex items-center gap-1">
              <span>{selectedCity}</span>
              {selectedCity === 'Kanpur' && (
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-400/30">
                  Regd. HQ
                </span>
              )}
              {selectedCity === 'Gurugram' && (
                <span className="text-[10px] bg-sky-400/20 text-sky-300 px-1.5 py-0.2 rounded border border-sky-400/30">
                  Corp. Office
                </span>
              )}
            </span>
          </div>

          <div className="text-[10px] text-slate-400 hidden sm:inline">
            Tap any city pin or state to view branch address & helpline
          </div>
        </div>
      </div>

      {/* Map Legend & Summary Footer */}
      <div className="p-3 bg-slate-900 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-300">
        <div className="flex flex-wrap items-center gap-3 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30"></span>
            <span>7 Active ALCs (Open Now)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-amber-500/30"></span>
            <span>4 Coming Soon ALCs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-amber-400/30 flex items-center justify-center text-[7px] text-slate-950 font-black">★</span>
            <span>Registered & Corp. Offices</span>
          </div>
        </div>

        <div className="text-[10px] text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Classrooms active in UP, Bihar, Uttarakhand & Rajasthan</span>
        </div>
      </div>
    </div>
  );
};
