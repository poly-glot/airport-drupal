import type { ReactNode } from 'react';
import styles from './index.module.css';

interface CardProps {
    tag?: 'div' | 'section';
    heading?: string;
    headingLevel?: 'h2' | 'h3';
    headingId?: string;
    padded?: boolean;
    parts?: ReactNode;
}

export default function Card({
    tag: Root = 'div',
    heading,
    headingLevel: Title = 'h3',
    headingId,
    padded,
    parts,
}: CardProps) {
    const className = [styles.root, padded !== false && styles.padded].filter(Boolean).join(' ');
    const labelledBy = heading && headingId ? headingId : undefined;

    return (
        <Root className={className} aria-labelledby={labelledBy}>
            {heading && (
                <Title className={styles.title} id={headingId}>
                    {heading}
                </Title>
            )}
            {parts}
        </Root>
    );
}
