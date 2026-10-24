'use client';

import type { ReactNode } from 'react';
import { enhanceMenu } from '@/lib/behaviours';
import { useEnhance } from '@/lib/use-enhance';
import styles from './index.module.css';

interface SiteHeaderProps {
    ctaLabel: string;
    ctaHref: string;
    basketHref: string;
    basketLabel: string;
    brandCurrent?: boolean;
    nav?: ReactNode;
}

export default function SiteHeader({ ctaLabel, ctaHref, basketHref, basketLabel, brandCurrent, nav }: SiteHeaderProps) {
    const ref = useEnhance<HTMLElement>(enhanceMenu);

    return (
        <header ref={ref} className={styles.root}>
            <div className={`${styles.inner} container`}>
                <a className={styles.brand} href="/" aria-current={brandCurrent ? 'page' : undefined}>
                    <svg
                        className={styles.logo}
                        width="34"
                        height="34"
                        viewBox="0 0 36 36"
                        fill="none"
                        aria-hidden="true"
                    >
                        <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="2.5"></circle>
                        <path
                            d="M6 20c6-6 18-6 24 0"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        ></path>
                        <path d="M18 4v12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"></path>
                        <circle cx="18" cy="18" r="2.5" fill="currentColor"></circle>
                    </svg>
                    <span className={styles.name}>Meridian Airport</span>
                    <span className="visually-hidden">{' home'}</span>
                </a>
                <nav className={styles.nav} data-header-nav="" id="site-menu" aria-label="Main">
                    <ul className={styles.list}>{nav}</ul>
                </nav>
                <div className={styles.actions}>
                    <span className={styles.lang}>
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            aria-hidden="true"
                        >
                            <circle cx="12" cy="12" r="9"></circle>
                            <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"></path>
                        </svg>
                        <span aria-hidden="true">EN</span>
                        <span className="visually-hidden">Language: English</span>
                    </span>
                    <a className="icon-button" href="/sitemap" aria-label="Find a page on the site map">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            aria-hidden="true"
                        >
                            <circle cx="11" cy="11" r="7"></circle>
                            <path d="M20 20l-4-4"></path>
                        </svg>
                    </a>
                    <a className="icon-button" href={basketHref} aria-label={basketLabel}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M6 8h12l1 13H5z"></path>
                            <path d="M9 8V6a3 3 0 0 1 6 0v2"></path>
                        </svg>
                    </a>
                    <a className={`button ${styles.cta}`} href={ctaHref}>
                        {ctaLabel}
                    </a>
                    <a
                        className={`icon-button ${styles.menuToggle}`}
                        data-header-menu-toggle=""
                        href="#site-menu"
                        aria-label="Open menu"
                    >
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            aria-hidden="true"
                        >
                            <path d="M4 7h16M4 12h16M4 17h16"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </header>
    );
}
