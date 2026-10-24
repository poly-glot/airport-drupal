export default function TerminalOneMap() {
  return (
    <svg className="map" viewBox="0 0 760 460" width="760" height="460" role="img" aria-label="Schematic map of Terminal 1: railway station below, check-in zones A to C, security, the departure lounge and gates 1 to 19, and the arrivals hall">
      <rect className="map__ground" width="760" height="460"></rect>
      <rect className="map__zone" x="30" y="40" width="210" height="70" rx="8" strokeWidth="2"></rect>
      <text className="map__label" x="46" y="68" fontSize="14">Check-in A</text>
      <text className="map__label" x="46" y="90" fontSize="12">Lifts to the station</text>
      <rect className="map__zone" x="30" y="120" width="210" height="70" rx="8" strokeWidth="2"></rect>
      <text className="map__label" x="46" y="148" fontSize="14">Check-in B</text>
      <rect className="map__zone" x="30" y="200" width="210" height="70" rx="8" strokeWidth="2"></rect>
      <text className="map__label" x="46" y="228" fontSize="14">Check-in C</text>
      <text className="map__label" x="46" y="250" fontSize="12">Special assistance</text>
      <rect className="map__zone map__zone--sand" x="30" y="290" width="210" height="70" rx="8" strokeWidth="2"></rect>
      <text className="map__label" x="46" y="318" fontSize="14">Rail station (level −1)</text>
      <text className="map__label" x="46" y="340" fontSize="12">Lifts next to zone A</text>
      <path className="map__security" d="M285 40 V270" strokeWidth="6"></path>
      <text className="map__label" x="252" y="292" fontSize="14">Security</text>
      <rect className="map__zone" x="330" y="40" width="310" height="230" rx="8" strokeWidth="2"></rect>
      <text className="map__label" x="346" y="68" fontSize="14">Departure lounge</text>
      <rect className="map__gate" x="346" y="90" width="140" height="48" rx="4" strokeWidth="2"></rect>
      <text className="map__label" x="356" y="110" fontSize="13">Gates 1–10</text>
      <text className="map__label" x="356" y="128" fontSize="12">4 min walk</text>
      <rect className="map__gate" x="496" y="90" width="140" height="48" rx="4" strokeWidth="2"></rect>
      <text className="map__label" x="506" y="110" fontSize="13">Gates 11–19</text>
      <text className="map__label" x="506" y="128" fontSize="12">up to 10 min</text>
      <path className="map__link" d="M640 155 H700" strokeWidth="10"></path>
      <text className="map__label" x="740" y="186" fontSize="12" textAnchor="end">Walkway to T2</text>
      <rect className="map__zone map__zone--sand" x="330" y="310" width="310" height="120" rx="8" strokeWidth="2"></rect>
      <text className="map__label" x="346" y="338" fontSize="14">Arrivals hall</text>
      <g><rect className="map__chip" x="346" y="352" width="190" height="56" rx="5"></rect><text className="map__chip-title" x="356" y="374" fontSize="13">Lost property</text><text className="map__chip-sub" x="356" y="394" fontSize="12">Next to the taxi rank</text></g>
    </svg>
  );
}
