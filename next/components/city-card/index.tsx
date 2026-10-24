import Picture from '@/components/picture';
import './index.css';

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
        <a className={isGuide ? 'city-card city-card--guide' : 'city-card'} href={href}>
            <Picture
                src={imageSrc}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                sizes={isGuide ? '(max-width: 900px) calc(100vw - 32px), 357px' : '(max-width: 900px) 260px, 357px'}
                loading="lazy"
                widths={isGuide ? '960,1440' : ''}
                pictureClass="city-card__media"
                cssClass="city-card__img"
            />
            <div className="city-card__text">
                <h3 className="city-card__name">{city}</h3>
                <p className="city-card__meta">{meta}</p>
                {body && <p className="city-card__body">{body}</p>}
            </div>
        </a>
    );

    return isGuide ? card : <li className="city-rail__item">{card}</li>;
}
