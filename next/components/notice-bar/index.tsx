'use client';

import type { ReactNode } from 'react';
import { enhanceNotices } from '@/lib/behaviours';
import { useEnhance } from '@/lib/use-enhance';
import './index.css';

export default function NoticeBar({ label = 'Travel notices', notices }: { label?: string; notices?: ReactNode }) {
    const ref = useEnhance<HTMLElement>(enhanceNotices);

    return (
        <section ref={ref} className="notice-bar on-dark" aria-label={label}>
            <div className="notice-bar__container container">
                <ol className="notice-bar__list">{notices}</ol>
            </div>
        </section>
    );
}
