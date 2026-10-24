import type { ReactNode } from 'react';
import styles from './index.module.css';

interface SiteFooterProps {
    enquiries: string;
    phone: string;
    phoneHref: string;
    enquiriesSuffix?: string;
    legalLine: string;
    colFlights?: ReactNode;
    colShop?: ReactNode;
    colPlan?: ReactNode;
    colCompany?: ReactNode;
    legal?: ReactNode;
}

export default function SiteFooter({
    enquiries,
    phone,
    phoneHref,
    enquiriesSuffix,
    legalLine,
    colFlights,
    colShop,
    colPlan,
    colCompany,
    legal,
}: SiteFooterProps) {
    return (
        <footer className={`${styles.root} on-dark`}>
            <div className={`${styles.main} container`}>
                <div className={styles.about}>
                    <p className={styles.brand}>
                        <svg
                            className={styles.logo}
                            width="28"
                            height="28"
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
                    </p>
                    <p className={styles.contact}>
                        {`${enquiries} `}
                        <a className={styles.phone} href={phoneHref}>
                            {phone}
                        </a>
                        {enquiriesSuffix}
                    </p>
                    <ul className={styles.social}>
                        <li>
                            <a
                                className={styles.socialLink}
                                href="https://www.instagram.com/"
                                aria-label="Instagram (external site)"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    aria-hidden="true"
                                >
                                    <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                                    <circle cx="12" cy="12" r="4"></circle>
                                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"></circle>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a className={styles.socialLink} href="https://x.com/" aria-label="X (external site)">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    aria-hidden="true"
                                >
                                    <path d="M4 4l16 16M20 4L4 20"></path>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a
                                className={styles.socialLink}
                                href="https://www.youtube.com/"
                                aria-label="YouTube (external site)"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <rect x="3" y="6" width="18" height="12" rx="3"></rect>
                                    <path d="M10 9.5v5l4.5-2.5z" fill="currentColor"></path>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a
                                className={styles.socialLink}
                                href="https://www.linkedin.com/"
                                aria-label="LinkedIn (external site)"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    aria-hidden="true"
                                >
                                    <path d="M6 10v8M6 6h.01M10 18v-5a2.5 2.5 0 0 1 5 0v5M15 13a2.5 2.5 0 0 1 3 2.5V18"></path>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
                <nav className={styles.col} aria-labelledby="footer-flights">
                    <h2 className={styles.heading} id="footer-flights">
                        Flights
                    </h2>
                    <ul className={styles.links}>{colFlights}</ul>
                </nav>
                <nav className={styles.col} aria-labelledby="footer-shop">
                    <h2 className={styles.heading} id="footer-shop">
                        Shop &amp; relax
                    </h2>
                    <ul className={styles.links}>{colShop}</ul>
                </nav>
                <nav className={styles.col} aria-labelledby="footer-plan">
                    <h2 className={styles.heading} id="footer-plan">
                        Plan
                    </h2>
                    <ul className={styles.links}>{colPlan}</ul>
                </nav>
                <nav className={styles.col} aria-labelledby="footer-company">
                    <h2 className={styles.heading} id="footer-company">
                        Company
                    </h2>
                    <ul className={styles.links}>{colCompany}</ul>
                </nav>
            </div>
            <div className={styles.legal}>
                <div className={`${styles.legalInner} container`}>
                    <p>{legalLine}</p>
                    <ul className={styles.legalLinks}>{legal}</ul>
                </div>
            </div>
        </footer>
    );
}
