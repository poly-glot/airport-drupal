import type { ReactNode } from 'react';
import Picture from '@/components/picture';
import './index.css';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  variant?: 'sky' | 'art';
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  sizes?: string;
  widths?: string;
  breadcrumb?: ReactNode;
}

export default function PageHero({ eyebrow, title, intro, variant = 'sky', imageSrc, imageAlt, imageWidth, imageHeight, sizes = '720px', widths, breadcrumb }: PageHeroProps) {
  const className = ['page-hero', variant === 'art' && 'page-hero--with-art'].filter(Boolean).join(' ');

  return (
    <section className={className} aria-labelledby="page-title">
      {breadcrumb}
      <div className="page-hero__inner container">
        <div className="page-hero__content">
          {eyebrow && <p className="page-hero__eyebrow">{eyebrow}</p>}
          <h1 className="page-hero__title" id="page-title">{title}</h1>
          {intro && <p className="page-hero__intro">{intro}</p>}
        </div>
        {imageSrc && <Picture src={imageSrc} alt={imageAlt} width={imageWidth} height={imageHeight} widths={widths} sizes={`(max-width: 900px) calc(100vw - 32px), ${sizes}`} loading="eager" priority cssClass="media" />}
      </div>
    </section>
  );
}
