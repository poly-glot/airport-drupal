import '@/components/card/index.css';
import '@/components/form/index.css';
import '@/components/package/index.css';

type ParagraphVariant = 'plain' | 'package-note' | 'form-small' | 'card-text' | 'card-text-tabular';

const variantClassNames: Record<ParagraphVariant, string | undefined> = {
  plain: undefined,
  'package-note': 'package__note',
  'form-small': 'form__small',
  'card-text': 'card__text',
  'card-text-tabular': 'card__text u-tabular',
};

export default function Paragraph({ body, variant = 'plain' }: { body: string; variant?: ParagraphVariant }) {
  return <p className={variantClassNames[variant]} dangerouslySetInnerHTML={{ __html: body }} />;
}
