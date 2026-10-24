import type { ReactNode } from 'react';
import './index.css';

export default function Breadcrumb({ onDark = false, items }: { onDark?: boolean; items?: ReactNode }) {
  const className = `breadcrumb ${onDark ? 'breadcrumb--on-dark' : 'container'}`;

  return (
    <nav className={className} aria-label="Breadcrumb">
      <ol className="breadcrumb__list">{items}</ol>
    </nav>
  );
}
