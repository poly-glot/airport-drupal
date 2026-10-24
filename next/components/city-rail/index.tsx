'use client';

import type { ReactNode } from 'react';
import { enhanceCityRail } from '@/lib/behaviours';
import { useEnhance } from '@/lib/use-enhance';
import sectionHead from '@/components/section-head/index.module.css';
import styles from './index.module.css';

interface CityRailProps {
    title: string;
    subtitle?: string;
    linkLabel?: string;
    linkHref?: string;
    anchor?: string;
    titleId?: string;
    cards?: ReactNode;
}

export default function CityRail({
    title,
    subtitle,
    linkLabel,
    linkHref,
    anchor,
    titleId = 'city-rail-title',
    cards,
}: CityRailProps) {
    const ref = useEnhance<HTMLElement>(enhanceCityRail);

    return (
        <section ref={ref} className={`band ${styles.root}`} id={anchor || undefined} aria-labelledby={titleId}>
            <div className={`${styles.head} container`}>
                <div className={styles.titles}>
                    <h2 className={`${sectionHead.sectionTitle} ${sectionHead.sectionTitleBrand}`} id={titleId}>
                        {title}
                        {subtitle && <span className={sectionHead.sectionTitleSub}>{subtitle}</span>}
                    </h2>
                    {linkLabel && linkHref && (
                        <a className="text-link text-link--underline" href={linkHref}>
                            {linkLabel}
                            <svg
                                className="text-link__icon"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M5 12h14M13 6l6 6-6 6"></path>
                            </svg>
                        </a>
                    )}
                </div>
                <div className={styles.nav}>
                    <p className={styles.count} data-city-rail-count="">
                        1 – 3 / 4
                    </p>
                    <button
                        className={styles.button}
                        data-city-rail-button="prev"
                        type="button"
                        aria-label="Previous destinations"
                        aria-controls="city-rail-track"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M15 6l-6 6 6 6"></path>
                        </svg>
                    </button>
                    <button
                        className={styles.button}
                        data-city-rail-button="next"
                        type="button"
                        aria-label="Next destinations"
                        aria-controls="city-rail-track"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M9 6l6 6-6 6"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <ul className={styles.track} id="city-rail-track" data-city-rail-track="">
                {cards}
            </ul>
            <div className={`${styles.progress} container`} aria-hidden="true">
                <span className={styles.bar}>
                    <span className={styles.fill}></span>
                </span>
            </div>
        </section>
    );
}
