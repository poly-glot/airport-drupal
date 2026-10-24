import '@/components/button/index.css';
import './index.css';

interface MapPaneProps {
  name: string;
  address: string;
  directionsHref: string;
  largerHref: string;
}

export default function MapPane({ name, address, directionsHref, largerHref }: MapPaneProps) {
  return (
    <div className="map-pane">
      <svg className="map map--fill" viewBox="0 0 760 680" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Map of Meridian Airport: the terminals, rail station, car parks and approach roads">
        <rect className="map__ground" width="760" height="680"></rect>
        <path className="map__river" d="M0 0 H760 V120 C 640 150, 560 130, 470 160 C 390 185, 320 150, 240 170 C 160 190, 80 160, 0 190 Z"></path>
        <path className="map__green" d="M0 540 C 90 520, 150 560, 230 545 C 300 532, 330 575, 400 560 L 400 680 L 0 680 Z"></path>
        <rect className="map__green" x="560" y="420" width="200" height="140"></rect>
        <g className="map__block"><rect x="30" y="230" width="60" height="38"></rect><rect x="100" y="236" width="44" height="30"></rect><rect x="40" y="300" width="36" height="26"></rect><rect x="640" y="250" width="70" height="40"></rect><rect x="690" y="330" width="46" height="34"></rect><rect x="600" y="600" width="80" height="44"></rect><rect x="470" y="620" width="60" height="30"></rect></g>
        <path className="map__runway" d="M120 290 L 600 220" strokeWidth="26"></path>
        <path className="map__dash" d="M120 290 L 600 220" strokeWidth="3" strokeDasharray="14 12"></path>
        <path className="map__road" d="M-20 660 C 120 600, 160 480, 300 470 C 420 462, 470 520, 560 500 C 640 482, 700 420, 790 410" strokeWidth="22"></path>
        <path className="map__road-core" d="M-20 660 C 120 600, 160 480, 300 470 C 420 462, 470 520, 560 500 C 640 482, 700 420, 790 410" strokeWidth="14"></path>
        <path className="map__road" d="M300 470 C 330 430, 360 400, 380 380" strokeWidth="16"></path>
        <path className="map__lane" d="M300 470 C 330 430, 360 400, 380 380" strokeWidth="10"></path>
        <path className="map__road" d="M380 380 C 420 350, 470 350, 520 372 C 560 390, 540 440, 500 436 C 460 432, 440 400, 470 390" strokeWidth="16"></path>
        <path className="map__lane" d="M380 380 C 420 350, 470 350, 520 372 C 560 390, 540 440, 500 436 C 460 432, 440 400, 470 390" strokeWidth="10"></path>
        <path className="map__road" d="M80 560 L 80 680 M 650 300 L 760 290 M 200 340 L 90 360" strokeWidth="12"></path>
        <path className="map__lane" d="M80 560 L 80 680 M 650 300 L 760 290 M 200 340 L 90 360" strokeWidth="7"></path>
        <path className="map__rail" d="M-20 420 C 100 420, 200 400, 330 400" strokeWidth="4"></path>
        <path className="map__dash" d="M-20 420 C 100 420, 200 400, 330 400" strokeWidth="2" strokeDasharray="8 8"></path>
        <rect className="map__terminal" x="330" y="326" width="136" height="66" rx="6"></rect>
        <rect className="map__terminal map__terminal--alt" x="480" y="336" width="104" height="58" rx="6"></rect>
        <path className="map__link" d="M466 361 H480" strokeWidth="10"></path>
        <text className="map__block-title" x="342" y="352" fontSize="14">Terminal 1</text>
        <text className="map__block-sub" x="342" y="372" fontSize="12">Rail station below</text>
        <text className="map__block-title" x="490" y="360" fontSize="14">Terminal 2</text>
        <text className="map__block-sub" x="490" y="380" fontSize="12">Gates 20–38</text>
        <g><rect className="map__chip" x="226" y="450" width="74" height="42" rx="5"></rect><text className="map__chip-title" x="234" y="468" fontSize="13">P1</text><text className="map__chip-sub" x="234" y="484" fontSize="12">2 min walk</text></g>
        <g><rect className="map__chip" x="306" y="450" width="74" height="42" rx="5"></rect><text className="map__chip-title" x="314" y="468" fontSize="13">P2</text><text className="map__chip-sub" x="314" y="484" fontSize="12">5 min walk</text></g>
        <g><rect className="map__chip" x="556" y="514" width="96" height="42" rx="5"></rect><text className="map__chip-title" x="564" y="532" fontSize="13">Mid-Stay</text><text className="map__chip-sub" x="564" y="548" fontSize="12">8 min shuttle</text></g>
        <circle className="map__station" cx="330" cy="400" r="7" strokeWidth="3"></circle>
        <text className="map__station-label" x="342" y="416" fontSize="12">Meridian Airport station</text>
        <g><rect className="map__a45" x="174" y="592" width="48" height="22" rx="3"></rect><text className="map__a45-text" x="184" y="608" fontSize="12">A45</text></g>
        <g><rect className="map__a45" x="638" y="442" width="48" height="22" rx="3"></rect><text className="map__a45-text" x="648" y="458" fontSize="12">A45</text></g>
        <text className="map__label map__label--river" x="40" y="100" fontSize="14">River Meridian</text>
        <text className="map__label" x="586" y="586" fontSize="12">Meridian Country Park</text>
        <text className="map__label" x="126" y="258" fontSize="12">Marston End</text>
        <text className="map__label" x="636" y="270" fontSize="12">Hollin Rise</text>
        <text className="map__label map__label--caps" x="452" y="250" fontSize="12" letterSpacing="2">RUNWAY 09/27</text>
        <g transform="translate(395 300)"><path className="map__pin" d="M0 0 c-8 0 -14 -6 -14 -14 c0 -11 14 -24 14 -24 s14 13 14 24 c0 8 -6 14 -14 14z"></path><circle className="map__pin-dot" cx="0" cy="-14" r="5"></circle></g>
      </svg>
      <div className="map-pane__card">
        <p className="map-pane__place"><span className="map-pane__name">{name}</span><span className="map-pane__address">{address}</span></p>
        <p className="map-pane__actions"><a className="button" href={directionsHref}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2l9 9-9 9-9-9z"></path><path d="M9 12h6M13 10l2 2-2 2"></path></svg>Directions</a><a className="button button--secondary" href={largerHref}>Larger map</a></p>
      </div>
      <p className="map-pane__credit">Map data · <a className="map-pane__credit-link" href="/terms">Terms</a></p>
    </div>
  );
}
