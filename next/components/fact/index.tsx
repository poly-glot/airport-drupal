import facts from '@/components/facts/index.module.css';

export default function Fact({ term, value, id }: { term: string; value: string; id?: string }) {
    return (
        <div className={facts.item}>
            <dt className={facts.term} dangerouslySetInnerHTML={{ __html: term }} />
            <dd className={facts.value} id={id || undefined} dangerouslySetInnerHTML={{ __html: value }} />
        </div>
    );
}
