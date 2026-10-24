type FlightStatus = 'on-time' | 'boarding' | 'gate-open' | 'delayed' | 'cancelled' | 'landed' | 'expected';

interface FlightRowProps {
  time: string;
  place: string;
  flight: string;
  terminal: string;
  gate: string;
  gateLabel?: string;
  status: FlightStatus;
  note?: string;
  tip?: string;
  tipId?: string;
}

const wordByStatus: Record<FlightStatus, string> = {
  'on-time': 'On time',
  boarding: 'Boarding',
  'gate-open': 'Gate open',
  delayed: 'Delayed',
  cancelled: 'Cancelled',
  landed: 'Landed',
  expected: 'Expected',
};

const toneByStatus: Record<FlightStatus, string> = {
  'on-time': 'ok',
  boarding: 'info',
  'gate-open': 'info',
  delayed: 'warn',
  cancelled: 'bad',
  landed: 'ok',
  expected: 'neutral',
};

export default function FlightRow({ time, place, flight, terminal, gate, gateLabel, status, note, tip, tipId }: FlightRowProps) {
  const tone = toneByStatus[status];
  const tipAttributes = tip ? { tabIndex: 0, 'data-tip': tip, 'aria-describedby': tipId ?? '' } : {};

  return (
    <tr className="board__row"><td className="board__time"><span className={`flap-lamp flap-lamp--${tone}`} aria-hidden="true"></span><span data-flap="5">{time}</span></td><td className="board__place" data-flap="9">{place}</td><td className="board__flight" data-flap="7">{flight}</td><td className="board__terminal" data-flap="2">{terminal}</td><td className="board__gate" data-flap="2" data-flap-label={gateLabel || undefined}>{gate}</td><td className="board__status"><span className={`board__state board__state--${tone}`} {...tipAttributes} data-flap="9">{wordByStatus[status]}</span></td><td className="board__info">{note}</td></tr>
  );
}
