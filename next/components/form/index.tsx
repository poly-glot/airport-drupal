import Alerts from './partials/alerts';
import Assistance from './partials/assistance';
import Feedback from './partials/feedback';
import FlightSearch from './partials/flight-search';
import LostProperty from './partials/lost-property';
import Parking from './partials/parking';

interface FormProps {
    kind: 'flight-search' | 'parking' | 'alerts' | 'assistance' | 'feedback' | 'lost-property';
    compact?: boolean;
}

export default function Form({ kind, compact }: FormProps) {
    switch (kind) {
        case 'flight-search':
            return <FlightSearch />;
        case 'parking':
            return <Parking compact={compact} />;
        case 'alerts':
            return <Alerts />;
        case 'assistance':
            return <Assistance />;
        case 'feedback':
            return <Feedback />;
        case 'lost-property':
            return <LostProperty />;
    }
}
