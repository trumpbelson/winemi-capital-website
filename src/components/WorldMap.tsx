import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';
import { GLOBAL_MARKETS } from '../config';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

export default function WorldMap() {
  const homeCity = GLOBAL_MARKETS.find(m => m.isHome)!;
  const otherCities = GLOBAL_MARKETS.filter(m => !m.isHome);

  return (
    <div className="relative w-full border border-white/5 rounded-sm overflow-hidden bg-secondary/50">
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0],
          scale: 147,
        }}
        style={{ width: '100%', height: 'auto' }}
        width={800}
        height={450}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#1a1a1a"
                stroke="#2d2d2d"
                strokeWidth={0.5}
                style={{
                  'default': { outline: 'none' },
                  hover: { outline: 'none', fill: '#252525' },
                  pressed: { outline: 'none' },
                } as any}
              />
            ))
          }
        </Geographies>

        {/* Connection lines from Accra to other cities */}
        {otherCities.map((city) => (
          <Line
            key={city.city}
            from={[homeCity.lng, homeCity.lat]}
            to={[city.lng, city.lat]}
            stroke="#b8860b"
            strokeWidth={0.5}
            strokeOpacity={0.3}
            strokeLinecap="round"
          />
        ))}

        {/* City markers */}
        {GLOBAL_MARKETS.map((city) => (
          <Marker key={city.city} coordinates={[city.lng, city.lat]}>
            <circle
              r={city.isHome ? 5 : 3}
              fill={city.isHome ? '#b8860b' : '#b8860b'}
              opacity={city.isHome ? 1 : 0.6}
              className={city.isHome ? 'pulse-dot' : ''}
            />
            {city.isHome && (
              <circle
                r={10}
                fill="none"
                stroke="#b8860b"
                strokeWidth={0.5}
                opacity={0.4}
                className="pulse-dot"
              />
            )}
            <text
              textAnchor="middle"
              y={city.isHome ? -12 : -8}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: city.isHome ? '8px' : '6px',
                fill: city.isHome ? '#d4a843' : 'rgba(245,240,235,0.5)',
                fontWeight: city.isHome ? 600 : 400,
              }}
            >
              {city.city.toUpperCase()}
            </text>
          </Marker>
        ))}
      </ComposableMap>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-primary/80 backdrop-blur-sm border border-white/5 px-4 py-3 rounded-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-[10px] text-ivory/60">ACCRA, GHANA — OUR FOUNDATION</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
            <span className="text-[10px] text-ivory/40">GLOBAL MARKETS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
