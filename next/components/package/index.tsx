import type { ReactNode } from 'react';
import '@/components/button/index.css';
import './index.css';

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
        <div className="package">
            {badge && <p className="package__badge">{badge}</p>}
            <h3 className="package__tier">{tier}</h3>
            <p className="package__price">
                <span className="package__unit">{pricePrefix}</span>
                <span className="package__amount">{price}</span>
                <span className="package__unit">{unit}</span>
            </p>
            <p className="package__meta">{meta}</p>
            <ul className="package__list">{features}</ul>
            <p className="package__best">
                <span className="package__best-label">{bestLabel}</span>
                {note}
            </p>
            <p className="package__cta">
                <a className={buttonClassName} href={href}>
                    {ctaLabel}
                </a>
            </p>
        </div>
    );
}
