import siteHeader from '@/components/site-header/index.module.css';

interface NavLinkProps {
    label: string;
    href: string;
    current?: 'none' | 'page' | 'section';
}

const ariaCurrentByState = { none: undefined, page: 'page', section: 'true' } as const;

export default function NavLink({ label, href, current = 'none' }: NavLinkProps) {
    return (
        <li>
            <a className={siteHeader.link} href={href} aria-current={ariaCurrentByState[current]}>
                {label}
            </a>
        </li>
    );
}
