import './index.css';

interface StatProps {
    label: string;
    value: string;
}

export default function Stat({ label, value }: StatProps) {
    return (
        <div className="stats__item">
            <dt className="stats__label">{label}</dt>
            <dd className="stats__value">{value}</dd>
        </div>
    );
}
