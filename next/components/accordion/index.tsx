import type { ReactNode } from 'react';
import './index.css';

export default function Accordion({ items }: { items?: ReactNode }) {
    return <div className="accordion">{items}</div>;
}
