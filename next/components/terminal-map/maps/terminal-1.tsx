import mapPane from '@/components/map-pane/index.module.css';

export default function TerminalOneMap() {
    return (
        <svg
            className={mapPane.map}
            viewBox="0 0 760 460"
            width="760"
            height="460"
            role="img"
            aria-label="Schematic map of Terminal 1: railway station below, check-in zones A to C, security, the departure lounge and gates 1 to 19, and the arrivals hall"
        >
            <rect className={mapPane.mapGround} width="760" height="460"></rect>
            <rect className={mapPane.mapZone} x="30" y="40" width="210" height="70" rx="8" strokeWidth="2"></rect>
            <text className={mapPane.mapLabel} x="46" y="68" fontSize="14">
                Check-in A
            </text>
            <text className={mapPane.mapLabel} x="46" y="90" fontSize="12">
                Lifts to the station
            </text>
            <rect className={mapPane.mapZone} x="30" y="120" width="210" height="70" rx="8" strokeWidth="2"></rect>
            <text className={mapPane.mapLabel} x="46" y="148" fontSize="14">
                Check-in B
            </text>
            <rect className={mapPane.mapZone} x="30" y="200" width="210" height="70" rx="8" strokeWidth="2"></rect>
            <text className={mapPane.mapLabel} x="46" y="228" fontSize="14">
                Check-in C
            </text>
            <text className={mapPane.mapLabel} x="46" y="250" fontSize="12">
                Special assistance
            </text>
            <rect
                className={`${mapPane.mapZone} ${mapPane.mapZoneSand}`}
                x="30"
                y="290"
                width="210"
                height="70"
                rx="8"
                strokeWidth="2"
            ></rect>
            <text className={mapPane.mapLabel} x="46" y="318" fontSize="14">
                Rail station (level −1)
            </text>
            <text className={mapPane.mapLabel} x="46" y="340" fontSize="12">
                Lifts next to zone A
            </text>
            <path className={mapPane.mapSecurity} d="M285 40 V270" strokeWidth="6"></path>
            <text className={mapPane.mapLabel} x="252" y="292" fontSize="14">
                Security
            </text>
            <rect className={mapPane.mapZone} x="330" y="40" width="310" height="230" rx="8" strokeWidth="2"></rect>
            <text className={mapPane.mapLabel} x="346" y="68" fontSize="14">
                Departure lounge
            </text>
            <rect className={mapPane.mapGate} x="346" y="90" width="140" height="48" rx="4" strokeWidth="2"></rect>
            <text className={mapPane.mapLabel} x="356" y="110" fontSize="13">
                Gates 1–10
            </text>
            <text className={mapPane.mapLabel} x="356" y="128" fontSize="12">
                4 min walk
            </text>
            <rect className={mapPane.mapGate} x="496" y="90" width="140" height="48" rx="4" strokeWidth="2"></rect>
            <text className={mapPane.mapLabel} x="506" y="110" fontSize="13">
                Gates 11–19
            </text>
            <text className={mapPane.mapLabel} x="506" y="128" fontSize="12">
                up to 10 min
            </text>
            <path className={mapPane.mapLink} d="M640 155 H700" strokeWidth="10"></path>
            <text className={mapPane.mapLabel} x="740" y="186" fontSize="12" textAnchor="end">
                Walkway to T2
            </text>
            <rect
                className={`${mapPane.mapZone} ${mapPane.mapZoneSand}`}
                x="330"
                y="310"
                width="310"
                height="120"
                rx="8"
                strokeWidth="2"
            ></rect>
            <text className={mapPane.mapLabel} x="346" y="338" fontSize="14">
                Arrivals hall
            </text>
            <g>
                <rect className={mapPane.mapChip} x="346" y="352" width="190" height="56" rx="5"></rect>
                <text className={mapPane.mapChipTitle} x="356" y="374" fontSize="13">
                    Lost property
                </text>
                <text className={mapPane.mapChipSub} x="356" y="394" fontSize="12">
                    Next to the taxi rank
                </text>
            </g>
        </svg>
    );
}
