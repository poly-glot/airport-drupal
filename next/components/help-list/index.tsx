import type { ReactNode } from 'react';
import SectionHead from '@/components/section-head';
import '@/components/section-head/index.css';
import './index.css';

interface HelpListProps {
    title?: string;
    linkLabel?: string;
    linkHref?: string;
    variant?: 'band' | 'plain';
    anchor?: string;
    titleId?: string;
    items?: ReactNode;
}

export default function HelpList({
    title,
    linkLabel,
    linkHref,
    variant,
    anchor,
    titleId = 'help-title',
    items,
}: HelpListProps) {
    const list = <ul className="help-list">{items}</ul>;

    if (variant === 'plain') {
        return list;
    }

    return (
        <section className="band band--panel" id={anchor || undefined} aria-labelledby={titleId}>
            <div className="container">
                <SectionHead title={title ?? ''} titleId={titleId} linkLabel={linkLabel} linkHref={linkHref} />
                {list}
            </div>
        </section>
    );
}
