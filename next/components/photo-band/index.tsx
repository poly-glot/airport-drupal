import type { ReactNode } from 'react';
import Picture from '@/components/picture';
import sectionHead from '@/components/section-head/index.module.css';
import stat from '@/components/stat/index.module.css';
import styles from './index.module.css';

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

    return (
        <section className={`${styles.root} on-dark`} id={anchor || undefined} aria-labelledby={titleId}>
            <Picture
                src={imageSrc}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                sizes="100vw"
                loading={isHero ? 'eager' : 'lazy'}
                priority={isHero}
                pictureClass={styles.media}
                cssClass={styles.img}
            />
            <div className={`${styles.inner} container`}>
                <div className={styles.content}>
                    {breadcrumb}
                    <Heading
                        className={`${sectionHead.sectionTitle} ${sectionHead.sectionTitleMd} ${styles.title}`}
                        id={titleId}
                    >
                        {title}
                    </Heading>
                    <p className={styles.lede}>{intro}</p>
                    <dl className={stat.root}>{facts}</dl>
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
