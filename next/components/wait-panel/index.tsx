import type { ReactNode } from 'react';
import styles from './index.module.css';

interface WaitPanelProps {
    updated: string;
    roadStatus: string;
    chips?: ReactNode;
}

export default function WaitPanel({ updated, roadStatus, chips }: WaitPanelProps) {
    return (
        <section className={`${styles.root} on-light`} aria-labelledby="wait-title">
            <div className={styles.head}>
                <span className={styles.dot}></span>
                <h2 className={styles.title} id="wait-title">
                    Security wait times
                </h2>
                <span className={styles.updated}>{`· updated ${updated}`}</span>
            </div>
            <dl className={styles.list}>
                {chips}
                <div className={`${styles.item} ${styles.itemDivided}`}>
                    <dt className={styles.label}>Roads and rail</dt>
                    <dd className={styles.value}>{roadStatus}</dd>
                </div>
            </dl>
        </section>
    );
}
