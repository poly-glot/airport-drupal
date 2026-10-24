import waitPanel from '@/components/wait-panel/index.module.css';
import styles from './index.module.css';

interface WaitChipProps {
    label: string;
    minutes: number;
    tone?: 'ok' | 'warn';
}

export default function WaitChip({ label, minutes, tone = 'ok' }: WaitChipProps) {
    return (
        <div className={waitPanel.item}>
            <dt className={waitPanel.label}>{label}</dt>
            <dd className={`${styles.root} ${styles[tone]}`}>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                >
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M12 7v5l3 2"></path>
                </svg>
                {`${minutes} min`}
            </dd>
        </div>
    );
}
