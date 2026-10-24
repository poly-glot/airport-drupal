export default function BreadcrumbItem({
    label,
    href,
    current = false,
}: {
    label: string;
    href?: string;
    current?: boolean;
}) {
    if (current) {
        return (
            <li className="breadcrumb__item" aria-current="page">
                {label}
            </li>
        );
    }

    return (
        <li className="breadcrumb__item">
            <a className="breadcrumb__link" href={href ?? ''}>
                {label}
            </a>
        </li>
    );
}
