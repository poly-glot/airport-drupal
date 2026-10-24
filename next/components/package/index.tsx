import type { ReactNode } from 'react';
import styles from './index.module.css';

interface PackageProps {
    tier: string;
    pricePrefix?: string;
    price: string;
    unit?: string;
    badge?: string;
    meta?: string;
    bestLabel?: string;
    note?: string;
    recommended?: boolean;
    ctaLabel: string;
    href: string;
    features?: ReactNode;
}

export default function Package({
    tier,
    pricePrefix,
    price,
    unit,
    badge,
    meta,
    bestLabel,
    note,
    recommended,
    ctaLabel,
    href,
    features,
}: PackageProps) {
    const buttonClassName = ['button', !recommended && 'button--secondary', 'button--block'].filter(Boolean).join(' ');

    return (
        <div className={styles.root}>
            {badge && <p className={styles.badge}>{badge}</p>}
            <h3 className={styles.tier}>{tier}</h3>
            <p className={styles.price}>
                <span className={styles.unit}>{pricePrefix}</span>
                <span className={styles.amount}>{price}</span>
                <span className={styles.unit}>{unit}</span>
            </p>
            <p className={styles.meta}>{meta}</p>
            <ul className={styles.list}>{features}</ul>
            <p className={styles.best}>
                <span className={styles.bestLabel}>{bestLabel}</span>
                {note}
            </p>
            <p className={styles.cta}>
                <a className={buttonClassName} href={href}>
                    {ctaLabel}
                </a>
            </p>
        </div>
    );
}
