import type { ReactNode } from 'react';
import styles from './index.module.css';

export default function Facts({ variant = 'default', items }: { variant?: 'default' | 'legend'; items?: ReactNode }) {
    const className = [styles.root, variant === 'legend' && styles.legend].filter(Boolean).join(' ');

    return <dl className={className}>{items}</dl>;
}
