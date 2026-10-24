import breadcrumb from '@/components/breadcrumb/index.module.css';

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
            <li className={breadcrumb.item} aria-current="page">
                {label}
            </li>
        );
    }

    return (
        <li className={breadcrumb.item}>
            <a className={breadcrumb.link} href={href ?? ''}>
                {label}
            </a>
        </li>
    );
}
