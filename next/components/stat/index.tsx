import styles from './index.module.css';

interface StatProps {
    label: string;
    value: string;
}

export default function Stat({ label, value }: StatProps) {
    return (
        <div className={styles.item}>
            <dt className={styles.label}>{label}</dt>
            <dd className={styles.value}>{value}</dd>
        </div>
    );
}
