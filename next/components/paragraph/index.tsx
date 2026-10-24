import card from '@/components/card/index.module.css';
import form from '@/components/form/index.module.css';
import packageStyles from '@/components/package/index.module.css';

type ParagraphVariant = 'plain' | 'package-note' | 'form-small' | 'card-text' | 'card-text-tabular';

const variantClassNames: Record<ParagraphVariant, string | undefined> = {
    plain: undefined,
    'package-note': packageStyles.note,
    'form-small': form.small,
    'card-text': card.text,
    'card-text-tabular': `${card.text} u-tabular`,
};

export default function Paragraph({ body, variant = 'plain' }: { body: string; variant?: ParagraphVariant }) {
    return <p className={variantClassNames[variant]} dangerouslySetInnerHTML={{ __html: body }} />;
}
