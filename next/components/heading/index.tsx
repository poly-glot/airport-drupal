import card from '@/components/card/index.module.css';
import sectionHead from '@/components/section-head/index.module.css';

const classesBySize = {
    default: sectionHead.sectionTitle,
    sm: `${sectionHead.sectionTitle} ${sectionHead.sectionTitleSm}`,
    card: card.title,
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
