import styles from './index.module.css';

export default function Testimonial({ quote, name, meta }: { quote: string; name: string; meta?: string }) {
    return (
        <figure className={styles.root}>
            <blockquote className={styles.quote} dangerouslySetInnerHTML={{ __html: quote }} />
            <figcaption className={styles.source}>
                <span className={styles.name}>{name}</span>
                {meta && <span className={styles.meta}>{meta}</span>}
            </figcaption>
        </figure>
    );
}
