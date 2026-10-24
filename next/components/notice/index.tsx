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
        <li className="notice-bar__item" id={`notice-${position}`}>
            <div className="notice-bar__controls">
                <a
                    className="notice-bar__step notice-bar__step--prev"
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
                <span className="notice-bar__count">{`${position} of ${total}`}</span>
                <a
                    className="notice-bar__step notice-bar__step--next"
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
            <p className="notice-bar__text">
                <strong className="notice-bar__kind">{kind}</strong>
                <span className="notice-bar__separator"> · </span>
                {`${text} `}
                {action && <span className="notice-bar__action">{action}</span>}
            </p>
            <a className="notice-bar__link" href={linkHref}>
                {linkLabel}
            </a>
        </li>
    );
}
