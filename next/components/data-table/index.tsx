import { escapeHtml } from '@/lib/escape-html';
import styles from './index.module.css';

interface DataTableProps {
    caption?: string;
    captionHidden?: boolean;
    body: string;
}

export default function DataTable({ caption, captionHidden = false, body }: DataTableProps) {
    const captionClass = captionHidden ? 'visually-hidden' : styles.caption;
    const captionHtml = caption ? `<caption class="${captionClass}">${escapeHtml(caption)}</caption>` : '';
    const scrollRegion = caption ? { role: 'region', tabIndex: 0, 'aria-label': caption } : {};

    return (
        <div className={styles.tableWrap} {...scrollRegion}>
            <table className={styles.table} dangerouslySetInnerHTML={{ __html: captionHtml + body }} />
        </div>
    );
}
