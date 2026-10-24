import type { ReactNode } from 'react';
import sectionHead from '@/components/section-head/index.module.css';

interface SectionProps {
    heading?: string;
    headingLevel?: 'h2' | 'h3';
    anchor?: string;
    tone?: 'light' | 'panel';
    labelledBy?: string;
    tag?: 'section' | 'div';
    last?: boolean;
    parts?: ReactNode;
}

export default function Section({
    heading,
    headingLevel = 'h2',
    anchor,
    tone = 'light',
    labelledBy,
    tag = 'section',
    last = false,
    parts,
}: SectionProps) {
    const Root = tag;
    const Heading = headingLevel;
    const headingId = anchor ? `${anchor}-title` : undefined;
    const labelledId = labelledBy || (heading && headingId) || undefined;
    const className = ['section', last && 'section--last', tone === 'panel' && 'band--panel', 'container']
        .filter(Boolean)
        .join(' ');

    return (
        <Root className={className} id={anchor || undefined} aria-labelledby={labelledId}>
            {heading && (
                <Heading className={`${sectionHead.sectionTitle} ${sectionHead.sectionTitleSm}`} id={headingId}>
                    {heading}
                </Heading>
            )}
            {parts}
        </Root>
    );
}
