import styles from './index.module.css';

export default function Prose({ body }: { body: string }) {
    return <div className={styles.root} dangerouslySetInnerHTML={{ __html: body }} />;
}
