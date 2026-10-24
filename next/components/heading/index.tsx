import '@/components/card/index.css';
import '@/components/section-head/index.css';

const classesBySize = {
    default: 'section-title',
    sm: 'section-title section-title--sm',
    card: 'card__title',
};

interface HeadingProps {
    text: string;
    level?: 'h2' | 'h3' | 'h4';
    size?: keyof typeof classesBySize;
    id?: string;
}

export default function Heading({ text, level = 'h2', size = 'default', id }: HeadingProps) {
    const Tag = level;

    return (
        <Tag className={classesBySize[size]} id={id || undefined}>
            {text}
        </Tag>
    );
}
