'use client';

import type { ReactNode } from 'react';
import { enhanceCityRail } from '@/lib/behaviours';
import { useEnhance } from '@/lib/use-enhance';
import '@/components/section-head/index.css';
import './index.css';

interface CityRailProps {
  title: string;
  subtitle?: string;
  linkLabel?: string;
  linkHref?: string;
  anchor?: string;
  titleId?: string;
  cards?: ReactNode;
}

export default function CityRail({ title, subtitle, linkLabel, linkHref, anchor, titleId = 'city-rail-title', cards }: CityRailProps) {
  const ref = useEnhance<HTMLElement>(enhanceCityRail);

  return (
    <section ref={ref} className="band city-rail" id={anchor || undefined} aria-labelledby={titleId}>
      <div className="city-rail__head container">
        <div className="city-rail__titles">
          <h2 className="section-title section-title--brand" id={titleId}>{title}{subtitle && <span className="section-title__sub">{subtitle}</span>}</h2>
          {linkLabel && linkHref && (
            <a className="text-link text-link--underline" href={linkHref}>{linkLabel}<svg className="text-link__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a>
          )}
        </div>
        <div className="city-rail__nav">
          <p className="city-rail__count">1 – 3 / 4</p>
          <button className="city-rail__button city-rail__button--prev" type="button" aria-label="Previous destinations" aria-controls="city-rail-track"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"></path></svg></button>
          <button className="city-rail__button city-rail__button--next" type="button" aria-label="Next destinations" aria-controls="city-rail-track"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"></path></svg></button>
        </div>
      </div>
      <ul className="city-rail__track" id="city-rail-track">
        {cards}
      </ul>
      <div className="city-rail__progress container" aria-hidden="true"><span className="city-rail__bar"><span className="city-rail__fill"></span></span></div>
    </section>
  );
}
