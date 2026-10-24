interface FooterLinkProps {
  label: string;
  href: string;
}

export default function FooterLink({ label, href }: FooterLinkProps) {
  return (
    <li><a className="footer__link" href={href}>{label}</a></li>
  );
}
