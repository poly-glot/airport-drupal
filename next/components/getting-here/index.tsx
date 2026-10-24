import type { ReactNode } from 'react';
import rowLink from '@/components/row-link/index.module.css';
import sectionHead from '@/components/section-head/index.module.css';
import styles from './index.module.css';

const notePaths = {
    'step-free': (
        <>
            <circle cx="12" cy="4" r="2"></circle>
            <path d="M10 8v6h6l3 6"></path>
            <path d="M10 11h5"></path>
            <path d="M6.5 13a5 5 0 1 0 7 6.5"></path>
        </>
    ),
};

interface GettingHereProps {
    title: string;
    intro: string;
    noteLead?: string;
    note?: string;
    noteIcon?: keyof typeof notePaths;
    anchor?: string;
    titleId?: string;
    rows?: ReactNode;
    map?: ReactNode;
}

export default function GettingHere({
    title,
    intro,
    noteLead,
    note,
    noteIcon = 'step-free',
    anchor,
    titleId = 'getting-here-title',
    rows,
    map,
}: GettingHereProps) {
    return (
        <section className={styles.root} id={anchor || undefined} aria-labelledby={titleId}>
            <div className={`${styles.inner} container`}>
                <div className={styles.copy}>
                    <h2 className={`${sectionHead.sectionTitle} ${sectionHead.sectionTitleMd}`} id={titleId}>
                        {title}
                    </h2>
                    <p className={styles.intro}>{intro}</p>
                    <ul className={rowLink.rowLinks}>{rows}</ul>
                    {note && (
                        <p className={styles.note}>
                            <svg
                                className={styles.noteIcon}
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
                                {notePaths[noteIcon]}
                            </svg>
                            <span>
                                {noteLead && <strong className={styles.noteLead}>{noteLead}</strong>}
                                {noteLead ? ` ${note}` : note}
                            </span>
                        </p>
                    )}
                </div>
            </div>
            {map}
        </section>
    );
}
