import type { ReactNode } from 'react';

interface WaitPanelProps {
  updated: string;
  roadStatus: string;
  chips?: ReactNode;
}

export default function WaitPanel({ updated, roadStatus, chips }: WaitPanelProps) {
  return (
    <section className="wait-panel on-light" aria-labelledby="wait-title">
      <div className="wait-panel__head"><span className="wait-panel__dot"></span><h2 className="wait-panel__title" id="wait-title">Security wait times</h2><span className="wait-panel__updated">{`· updated ${updated}`}</span></div>
      <dl className="wait-panel__list">
        {chips}
        <div className="wait-panel__item wait-panel__item--divided"><dt className="wait-panel__label">Roads and rail</dt><dd className="wait-panel__value">{roadStatus}</dd></div>
      </dl>
    </section>
  );
}
