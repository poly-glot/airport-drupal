import type { ReactNode } from 'react';
import Picture from '@/components/picture';
import '@/components/section-head/index.css';
import '@/components/stat/index.css';
import './index.css';

interface PhotoBandProps {
    title: string;
    intro?: string;
    imageSrc: string;
    imageAlt?: string;
    imageWidth?: number;
    imageHeight?: number;
    variant?: 'band' | 'hero';
    headingLevel?: 'h1' | 'h2';
    anchor?: string;
    titleId?: string;
    linkLabel?: string;
    linkHref?: string;
    breadcrumb?: ReactNode;
    facts?: ReactNode;
    aside?: ReactNode;
}

export default function PhotoBand({
    title,
    intro,
    imageSrc,
    imageAlt,
    imageWidth,
    imageHeight,
    variant,
    headingLevel = 'h2',
    anchor,
    titleId = 'photo-band-title',
    linkLabel,
    linkHref,
    breadcrumb,
    facts,
    aside,
}: PhotoBandProps) {
    const isHero = variant === 'hero';
    const Heading = headingLevel;
    const className = ['photo-band', isHero && 'photo-band--hero', 'on-dark'].filter(Boolean).join(' ');

    return (
        <section className={className} id={anchor || undefined} aria-labelledby={titleId}>
            <Picture
                src={imageSrc}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                sizes="100vw"
                loading={isHero ? 'eager' : 'lazy'}
                priority={isHero}
                pictureClass="photo-band__media"
                cssClass="photo-band__img"
            />
            <div className="photo-band__inner container">
                <div className="photo-band__content">
                    {breadcrumb}
                    <Heading className="section-title section-title--md photo-band__title" id={titleId}>
                        {title}
                    </Heading>
                    <p className="photo-band__lede">{intro}</p>
                    <dl className="stats">{facts}</dl>
                    {linkLabel && linkHref && (
                        <a className="text-link text-link--underline text-link--on-dark" href={linkHref}>
                            {linkLabel}
                            <svg
                                className="text-link__icon"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                aria-hidden="true"
                            >
                                <path d="M9 6l6 6-6 6"></path>
                            </svg>
                        </a>
                    )}
                </div>
                {aside}
            </div>
        </section>
    );
}
