import { escapeHtml } from '@/lib/escape-html';
import './index.css';

export default function Callout({ title, body }: { title?: string; body: string }) {
  const heading = title ? `<p class="callout__title">${escapeHtml(title)}</p>` : '';

  return <div className="callout" dangerouslySetInnerHTML={{ __html: heading + body }} />;
}
