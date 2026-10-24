import type { ReactNode } from 'react';
import styles from './index.module.css';

type RowLinkIcon = 'train' | 'car' | 'bus';

const icons: Record<RowLinkIcon, ReactNode> = {
    train: (
        <>
            <rect x="5" y="3" width="14" height="14" rx="3"></rect>
            <path d="M5 11h14M9 17l-2 4M15 17l2 4"></path>
            <circle cx="9" cy="14" r="1"></circle>
            <circle cx="15" cy="14" r="1"></circle>
        </>
    ),
    car: (
        <>
            <path d="M3 16l2-6h11l3 3h2v3h-2"></path>
            <circle cx="7" cy="17" r="2"></circle>
            <circle cx="17" cy="17" r="2"></circle>
            <path d="M9 17h6"></path>
        </>
    ),
    bus: (
        <>
            <rect x="4" y="4" width="16" height="14" rx="3"></rect>
            <path d="M4 10h16M8 18l-1 3M16 18l1 3"></path>
        </>
    ),
};

export default function RowLink({
    icon,
    title,
    meta,
    href,
}: {
    icon?: RowLinkIcon;
    title: string;
    meta?: string;
    href: string;
}) {
    return (
        <li>
            <a className={styles.root} href={href}>
                <svg
                    className={styles.icon}
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    {icon && icons[icon]}
                </svg>
                <span className={styles.text}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.meta}>{meta}</span>
                </span>
                <svg
                    className={styles.chevron}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                >
                    <path d="M9 6l6 6-6 6"></path>
                </svg>
            </a>
        </li>
    );
}
