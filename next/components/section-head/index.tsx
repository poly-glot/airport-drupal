import './index.css';

interface SectionHeadProps {
    title: string;
    intro?: string;
    headingLevel?: 'h2' | 'h3';
    titleId: string;
    linkLabel?: string;
    linkHref?: string;
}

export default function SectionHead({
    title,
    intro,
    headingLevel = 'h2',
    titleId,
    linkLabel,
    linkHref,
}: SectionHeadProps) {
    const Heading = headingLevel;
    const heading = (
        <Heading className="section-title" id={titleId}>
            {title}
        </Heading>
    );

    return (
        <div className="section-head">
            {intro ? (
                <div className="section-head__titles">
                    {heading}
                    <p className="section-head__intro">{intro}</p>
                </div>
            ) : (
                heading
            )}
            {linkLabel && linkHref && (
                <a className="text-link" href={linkHref}>
                    {linkLabel}
                    <svg
                        className="text-link__icon"
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
                        <path d="M5 12h14M13 6l6 6-6 6"></path>
                    </svg>
                </a>
            )}
        </div>
    );
}
