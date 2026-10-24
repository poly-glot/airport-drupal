interface NavLinkProps {
  label: string;
  href: string;
  current?: 'none' | 'page' | 'section';
}

const ariaCurrentByState = { none: undefined, page: 'page', section: 'true' } as const;

export default function NavLink({ label, href, current = 'none' }: NavLinkProps) {
  return (
    <li><a className="header__link" href={href} aria-current={ariaCurrentByState[current]}>{label}</a></li>
  );
}
