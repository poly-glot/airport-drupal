import Picture from '@/components/picture';
import cityRail from '@/components/city-rail/index.module.css';
import styles from './index.module.css';

interface CityCardProps {
    city: string;
    meta?: string;
    imageSrc: string;
    imageAlt?: string;
    imageWidth?: number;
    imageHeight?: number;
    href: string;
    variant?: 'rail' | 'guide';
    body?: string;
}

export default function CityCard({
    city,
    meta,
    imageSrc,
    imageAlt,
    imageWidth,
    imageHeight,
    href,
    variant,
    body,
}: CityCardProps) {
    const isGuide = variant === 'guide';
    const card = (
        <a className={isGuide ? `${styles.root} ${styles.guide}` : styles.root} href={href}>
            <Picture
                src={imageSrc}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                sizes={isGuide ? '(max-width: 900px) calc(100vw - 32px), 357px' : '(max-width: 900px) 260px, 357px'}
                loading="lazy"
                widths={isGuide ? '960,1440' : ''}
                pictureClass={styles.media}
                cssClass={styles.img}
            />
            <div className={styles.text}>
                <h3 className={styles.name}>{city}</h3>
                <p className={styles.meta}>{meta}</p>
                {body && <p className={styles.body}>{body}</p>}
            </div>
        </a>
    );

    return isGuide ? (
        card
    ) : (
        <li className={cityRail.item} data-city-rail-item="">
            {card}
        </li>
    );
}
