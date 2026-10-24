import type { ReactNode } from 'react';
import styles from './index.module.css';

export default function Breadcrumb({ onDark = false, items }: { onDark?: boolean; items?: ReactNode }) {
    const className = `${styles.root} ${onDark ? styles.onDark : 'container'}`;

    return (
        <nav className={className} aria-label="Breadcrumb">
            <ol className={styles.list}>{items}</ol>
        </nav>
    );
}
