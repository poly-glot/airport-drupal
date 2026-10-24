import type { ReactNode } from 'react';
import SectionHead from '@/components/section-head';
import styles from './index.module.css';

interface TowerGridProps {
    title: string;
    intro?: string;
    linkLabel?: string;
    linkHref?: string;
    anchor?: string;
    titleId?: string;
    towers?: ReactNode;
}

export default function TowerGrid({
    title,
    intro,
    linkLabel,
    linkHref,
    anchor,
    titleId = 'tower-grid-title',
    towers,
}: TowerGridProps) {
    return (
        <section className="band" id={anchor || undefined} aria-labelledby={titleId}>
            <div className="container">
                <SectionHead title={title} intro={intro} titleId={titleId} linkLabel={linkLabel} linkHref={linkHref} />
                <div className={styles.root}>{towers}</div>
            </div>
        </section>
    );
}
