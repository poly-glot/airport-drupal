import '@/components/card/index.css';
import '@/components/map-pane/index.css';
import TerminalOneMap from './maps/terminal-1';
import TerminalTwoMap from './maps/terminal-2';

const mapsByTerminal = {
    'terminal-1': <TerminalOneMap />,
    'terminal-2': <TerminalTwoMap />,
};

export default function TerminalMap({ terminal }: { terminal: keyof typeof mapsByTerminal }) {
    return <div className="card">{mapsByTerminal[terminal]}</div>;
}
