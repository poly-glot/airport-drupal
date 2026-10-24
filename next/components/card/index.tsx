import type { ReactNode } from 'react';
import './index.css';

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
    const className = padded === false ? 'card' : 'card card--padded';
    const labelledBy = heading && headingId ? headingId : undefined;

    return (
        <Root className={className} aria-labelledby={labelledBy}>
            {heading && (
                <Title className="card__title" id={headingId}>
                    {heading}
                </Title>
            )}
            {parts}
        </Root>
    );
}
