import './index.css';

interface ButtonProps {
  label: string;
  href?: string;
  variant?: 'primary' | 'secondary';
  block?: boolean;
  large?: boolean;
}

export default function Button({ label, href, variant, block, large }: ButtonProps) {
  const className = ['button', variant === 'secondary' && 'button--secondary', large && 'button--lg', block && 'button--block'].filter(Boolean).join(' ');

  if (href) {
    return <a className={className} href={href}>{label}</a>;
  }

  return <button className={className} type="submit">{label}</button>;
}
