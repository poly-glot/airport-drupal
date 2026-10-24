import packageStyles from '@/components/package/index.module.css';

export default function PackageFeature({ text }: { text: string }) {
    return (
        <li className={packageStyles.item}>
            <svg
                className={packageStyles.tick}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M4 12l5 5L20 7"></path>
            </svg>
            {text}
        </li>
    );
}
