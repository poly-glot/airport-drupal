import './index.css';

const iconPaths = {
  'assistance': <><circle cx="12" cy="4" r="2"></circle><path d="M10 8v6h6l3 6"></path><path d="M10 11h5"></path><path d="M6.5 13a5 5 0 1 0 7 6.5"></path></>,
  'children': <><circle cx="9" cy="6" r="2.5"></circle><circle cx="16" cy="8" r="2"></circle><path d="M5 21v-6a4 4 0 0 1 8 0v6"></path><path d="M13 21v-5a3 3 0 0 1 6 0v5"></path></>,
  'first-flight': <><path d="M4 6h16v12H4z"></path><path d="M8 10h8M8 14h5"></path><circle cx="18" cy="18" r="3"></circle><path d="M17 18l1 1 2-2"></path></>,
  'alerts': <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.7 21a2 2 0 0 1-3.4 0"></path></>,
  'lost-property': <><rect x="3" y="8" width="18" height="12" rx="2"></rect><path d="M8 8V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3"></path><path d="M12 12v3M12 17h.01"></path></>,
  'contact': <><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"></path></>,
  'security': <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"></path><path d="M9 12l2 2 4-4"></path></>,
  'eat-and-drink': <><path d="M4 10h13v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"></path><path d="M17 11h2a2 2 0 0 1 0 4h-2"></path><path d="M8 3v3M11 3v3M14 3v3"></path></>,
  'shopping': <><path d="M6 8h12l1 13H5z"></path><path d="M9 8V6a3 3 0 0 1 6 0v2"></path></>,
  'lounges': <><path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"></path><path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3z"></path></>,
};

interface HelpItemProps {
  icon: keyof typeof iconPaths;
  title: string;
  body?: string;
  href: string;
}

export default function HelpItem({ icon, title, body, href }: HelpItemProps) {
  return (
    <li className="help-list__item">
      <a className="help-item" href={href}>
        <div className="help-item__head"><svg className="help-item__icon" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[icon]}</svg><h3 className="help-item__title">{title}</h3></div>
        <p className="help-item__body">{body}</p>
      </a>
    </li>
  );
}
