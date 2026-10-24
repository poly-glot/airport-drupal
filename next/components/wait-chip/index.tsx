interface WaitChipProps {
  label: string;
  minutes: number;
  tone?: 'ok' | 'warn';
}

export default function WaitChip({ label, minutes, tone = 'ok' }: WaitChipProps) {
  return (
    <div className="wait-panel__item"><dt className="wait-panel__label">{label}</dt><dd className={`wait-chip wait-chip--${tone}`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>{`${minutes} min`}</dd></div>
  );
}
