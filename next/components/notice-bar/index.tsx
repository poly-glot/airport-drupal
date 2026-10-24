'use client';

import type { ReactNode } from 'react';
import { enhanceNotices } from '@/lib/behaviours';
import { useEnhance } from '@/lib/use-enhance';
import styles from './index.module.css';

export default function NoticeBar({ label = 'Travel notices', notices }: { label?: string; notices?: ReactNode }) {
    const ref = useEnhance<HTMLElement>(enhanceNotices);

    return (
        <section ref={ref} className={`${styles.root} on-dark`} aria-label={label}>
            <div className={`${styles.container} container`}>
                <ol className={styles.list} data-notice-bar-list="">
                    {notices}
                </ol>
            </div>
        </section>
    );
}
