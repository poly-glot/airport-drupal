interface HeroSignProps {
    icon: 'shop' | 'parking' | 'fast-track';
    title: string;
    meta?: string;
    href: string;
}

function SignIcon({ icon }: Pick<HeroSignProps, 'icon'>) {
    if (icon === 'parking') {
        return (
            <svg
                className="sign__icon"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                aria-hidden="true"
            >
                <rect x="3" y="3" width="18" height="18" rx="3"></rect>
                <path d="M9 17V7h4.5a3 3 0 0 1 0 6H9"></path>
            </svg>
        );
    }

    if (icon === 'fast-track') {
        return (
            <svg
                className="sign__icon"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M3 12h11M10 7l5 5-5 5"></path>
                <path d="M17 5v14M21 5v14"></path>
            </svg>
        );
    }

    return (
        <svg
            className="sign__icon"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M6 8h12l1 13H5z"></path>
            <path d="M9 8V6a3 3 0 0 1 6 0v2"></path>
        </svg>
    );
}

export default function HeroSign({ icon, title, meta, href }: HeroSignProps) {
    return (
        <li className="hero__signs-item">
            <a className="sign" href={href}>
                <SignIcon icon={icon} />
                <span className="sign__text">
                    <span className="sign__title">{title}</span>
                    <span className="sign__sub">{meta}</span>
                </span>
            </a>
        </li>
    );
}
