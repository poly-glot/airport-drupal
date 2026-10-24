import '@/components/status/index.css';
import './index.css';

export default function Fact({ term, value, id }: { term: string; value: string; id?: string }) {
    return (
        <div className="facts__item">
            <dt className="facts__term" dangerouslySetInnerHTML={{ __html: term }} />
            <dd className="facts__value" id={id || undefined} dangerouslySetInnerHTML={{ __html: value }} />
        </div>
    );
}
