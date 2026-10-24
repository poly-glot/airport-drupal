import { escapeHtml } from '@/lib/escape-html';
import styles from './index.module.css';

export default function Callout({ title, body }: { title?: string; body: string }) {
    const heading = title ? `<p class="${styles.title}">${escapeHtml(title)}</p>` : '';

    return <div className={styles.root} dangerouslySetInnerHTML={{ __html: heading + body }} />;
}
