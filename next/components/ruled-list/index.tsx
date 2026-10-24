import type { ReactNode } from 'react';
import rowLink from '@/components/row-link/index.module.css';

export default function RuledList({ items }: { items?: ReactNode }) {
    return <ul className={rowLink.rowLinks}>{items}</ul>;
}
