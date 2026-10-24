'use client';

import type { ReactNode } from 'react';
import { enhanceHeroSky } from '@/lib/behaviours';
import { useEnhance } from '@/lib/use-enhance';
import styles from './index.module.css';

type Weather = 'sunny' | 'cloudy' | 'rainy';

interface HeroProps {
    title: string;
    intro: string;
    defaultWeather?: Weather;
    signs?: ReactNode;
    aside?: ReactNode;
    wait?: ReactNode;
}

const temperatureByWeather: Record<Weather, string> = { cloudy: '14°C', rainy: '12°C', sunny: '18°C' };
const conditionByWeather: Record<Weather, string> = { cloudy: 'cloudy', rainy: 'light rain', sunny: 'sunny' };
const hiddenIcon = { hidden: true };

export default function Hero({ title, intro, defaultWeather: weather = 'rainy', signs, aside, wait }: HeroProps) {
    const ref = useEnhance<HTMLElement>(enhanceHeroSky);

    return (
        <section ref={ref} className={`${styles.root} on-dark`} aria-labelledby="hero-title" data-weather={weather}>
            <picture className={styles.media} data-hero-media="">
                <source type="image/avif" srcSet="/assets/img/home/hero/morning-rainy-1440.avif 1440w" sizes="100vw" />
                <source type="image/webp" srcSet="/assets/img/home/hero/morning-rainy-1440.webp 1440w" sizes="100vw" />
                <img
                    className={styles.img}
                    src="/assets/img/home/hero/morning-rainy-1440.jpg"
                    srcSet="/assets/img/home/hero/morning-rainy-1440.jpg 1440w"
                    sizes="100vw"
                    width="1440"
                    height="810"
                    alt=""
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                />
            </picture>
            <div className={`${styles.inner} container`}>
                <div className={styles.content}>
                    <p className={styles.weather} data-hero-weather="" data-dry={weather === 'rainy' ? undefined : ''}>
                        <svg
                            className={styles.weatherIcon}
                            data-hero-weather-icon="day"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <circle cx="8.5" cy="8" r="3.2"></circle>
                            <path d="M8.5 2v1.4M2.5 8h1.4M4.3 3.8l1 1M12.7 3.8l-1 1"></path>
                            <path d="M9 17.5h8.5a3 3 0 0 0 .4-6 4.5 4.5 0 0 0-8.6-1.3A3.6 3.6 0 0 0 9 17.5z"></path>
                            <path
                                className={styles.weatherDrops}
                                d="M11 20l-.7 1.6M14.5 20l-.7 1.6M18 20l-.7 1.6"
                            ></path>
                        </svg>
                        <svg
                            className={styles.weatherIcon}
                            data-hero-weather-icon="evening"
                            {...hiddenIcon}
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M4.5 9.5a4 4 0 0 1 8 0"></path>
                            <path d="M2 9.5h13M8.5 3v1.4M3.8 5.3l1 1M13.2 5.3l-1 1"></path>
                            <path d="M9 17.5h8.5a3 3 0 0 0 .4-6 4.5 4.5 0 0 0-8.6-1.3A3.6 3.6 0 0 0 9 17.5z"></path>
                            <path
                                className={styles.weatherDrops}
                                d="M11 20l-.7 1.6M14.5 20l-.7 1.6M18 20l-.7 1.6"
                            ></path>
                        </svg>
                        <svg
                            className={styles.weatherIcon}
                            data-hero-weather-icon="night"
                            {...hiddenIcon}
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M10.5 3.5a4.5 4.5 0 0 0 5.6 6 4.6 4.6 0 1 1-5.6-6z"></path>
                            <path d="M9 17.5h8.5a3 3 0 0 0 .4-6 4.5 4.5 0 0 0-8.6-1.3A3.6 3.6 0 0 0 9 17.5z"></path>
                            <path
                                className={styles.weatherDrops}
                                d="M11 20l-.7 1.6M14.5 20l-.7 1.6M18 20l-.7 1.6"
                            ></path>
                        </svg>
                        <span className={styles.weatherText}>
                            <span className={styles.temp}>
                                <span data-hero-temp-value="">{temperatureByWeather[weather]}</span>{' '}
                                <span className={styles.condition} data-hero-condition="">
                                    {conditionByWeather[weather]}
                                </span>
                            </span>
                            <span className={styles.date} data-hero-date="">
                                Saturday 3 October · 09:42 local
                            </span>
                        </span>
                    </p>
                    <h1 className={styles.title} id="hero-title">
                        {title}
                    </h1>
                    <p className={styles.lede}>{intro}</p>
                    <ul className={styles.signs}>{signs}</ul>
                </div>
                {aside}
            </div>
            <div className={`${styles.wait} container`}>{wait}</div>
        </section>
    );
}
