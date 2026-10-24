import type { ReactNode } from 'react';
import styles from './index.module.css';

export default function Accordion({ items }: { items?: ReactNode }) {
    return <div className={styles.root}>{items}</div>;
}
