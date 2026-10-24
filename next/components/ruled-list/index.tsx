import type { ReactNode } from 'react';

export default function RuledList({ items }: { items?: ReactNode }) {
    return <ul className="row-links">{items}</ul>;
}
