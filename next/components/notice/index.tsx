import noticeBar from '@/components/notice-bar/index.module.css';

interface NoticeProps {
    kind: string;
    text: string;
    action?: string;
    position: number;
    total: number;
    linkLabel?: string;
    linkHref?: string;
}

export default function Notice({
    kind,
    text,
    action,
    position,
    total,
    linkLabel = 'Check my flight',
    linkHref = '/flights',
}: NoticeProps) {
    const previous = position > 1 ? position - 1 : total;
    const next = position < total ? position + 1 : 1;

    return (
        <li className={noticeBar.item} data-notice-bar-item="" id={`notice-${position}`}>
            <div className={noticeBar.controls}>
                <a
                    className={`${noticeBar.step} ${noticeBar.stepPrev}`}
                    data-notice-bar-step="prev"
                    href={`#notice-${previous}`}
                    aria-label="Previous notice"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M15 6l-6 6 6 6"></path>
                    </svg>
                </a>
                <span className={noticeBar.count}>{`${position} of ${total}`}</span>
                <a
                    className={noticeBar.step}
                    data-notice-bar-step="next"
                    href={`#notice-${next}`}
                    aria-label="Next notice"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M9 6l6 6-6 6"></path>
                    </svg>
                </a>
            </div>
            <p className={noticeBar.text}>
                <strong className={noticeBar.kind}>{kind}</strong>
                <span className={noticeBar.separator}> · </span>
                {`${text} `}
                {action && <span className={noticeBar.action}>{action}</span>}
            </p>
            <a className={noticeBar.link} href={linkHref}>
                {linkLabel}
            </a>
        </li>
    );
}
