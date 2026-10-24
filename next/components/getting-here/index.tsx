import type { ReactNode } from 'react';
import '@/components/section-head/index.css';
import './index.css';

const notePaths = {
  'step-free': <><circle cx="12" cy="4" r="2"></circle><path d="M10 8v6h6l3 6"></path><path d="M10 11h5"></path><path d="M6.5 13a5 5 0 1 0 7 6.5"></path></>,
};

interface GettingHereProps {
  title: string;
  intro: string;
  noteLead?: string;
  note?: string;
  noteIcon?: keyof typeof notePaths;
  anchor?: string;
  titleId?: string;
  rows?: ReactNode;
  map?: ReactNode;
}

export default function GettingHere({ title, intro, noteLead, note, noteIcon = 'step-free', anchor, titleId = 'getting-here-title', rows, map }: GettingHereProps) {
  return (
    <section className="getting-here" id={anchor || undefined} aria-labelledby={titleId}>
      <div className="getting-here__inner container">
        <div className="getting-here__copy">
          <h2 className="section-title section-title--md" id={titleId}>{title}</h2>
          <p className="getting-here__intro">{intro}</p>
          <ul className="row-links">
            {rows}
          </ul>
          {note && (
            <p className="getting-here__note"><svg className="getting-here__note-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{notePaths[noteIcon]}</svg><span>{noteLead && <strong className="getting-here__note-lead">{noteLead}</strong>}{noteLead ? ` ${note}` : note}</span></p>
          )}
        </div>
      </div>
      {map}
    </section>
  );
}
