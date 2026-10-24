import siteFooter from '@/components/site-footer/index.module.css';

interface FooterLinkProps {
    label: string;
    href: string;
}

export default function FooterLink({ label, href }: FooterLinkProps) {
    return (
        <li>
            <a className={siteFooter.link} href={href}>
                {label}
            </a>
        </li>
    );
}
