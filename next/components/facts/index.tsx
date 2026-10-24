import type { ReactNode } from 'react';
import './index.css';

export default function Facts({ variant = 'default', items }: { variant?: 'default' | 'legend'; items?: ReactNode }) {
    const className = ['facts', variant === 'legend' && 'facts--legend'].filter(Boolean).join(' ');

    return <dl className={className}>{items}</dl>;
}
