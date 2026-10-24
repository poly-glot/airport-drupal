import Picture from '@/components/picture';
import styles from './index.module.css';

const iconPaths = {
    security: (
        <>
            <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"></path>
            <path d="M9 12l2 2 4-4"></path>
        </>
    ),
    'eat-and-drink': (
        <>
            <path d="M4 10h13v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"></path>
            <path d="M17 11h2a2 2 0 0 1 0 4h-2"></path>
            <path d="M8 3v3M11 3v3M14 3v3"></path>
        </>
    ),
    baggage: (
        <>
            <rect x="3" y="8" width="18" height="12" rx="1"></rect>
            <path d="M8 8V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3"></path>
            <path d="M8 12v4M16 12v4"></path>
        </>
    ),
    maps: (
        <>
            <path d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3z"></path>
            <path d="M9 4v13M15 7v13"></path>
        </>
    ),
};

interface TowerProps {
    number: string;
    icon: keyof typeof iconPaths;
    title: string;
    body?: string;
    ctaLabel: string;
    href: string;
    imageSrc: string;
    imageAlt?: string;
    imageWidth?: number;
    imageHeight?: number;
}

export default function Tower({
    number,
    icon,
    title,
    body,
    ctaLabel,
    href,
    imageSrc,
    imageAlt,
    imageWidth,
    imageHeight,
}: TowerProps) {
    return (
        <a className={styles.root} href={href}>
            <Picture
                src={imageSrc}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                sizes="(max-width: 900px) calc(50vw - 22px), 265px"
                loading="lazy"
                widths="560,840"
                pictureClass={styles.media}
                cssClass={styles.img}
            />
            <div className={styles.top}>
                <svg
                    className={styles.icon}
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    {iconPaths[icon]}
                </svg>
                <span className={styles.number} aria-hidden="true">
                    {number}
                </span>
            </div>
            <div className={styles.bottom}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.body}>{body}</p>
                <span className={styles.cta}>
                    {ctaLabel}
                    <svg
                        className="text-link__icon"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M5 12h14M13 6l6 6-6 6"></path>
                    </svg>
                </span>
            </div>
        </a>
    );
}
