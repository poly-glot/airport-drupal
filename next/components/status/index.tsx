import './index.css';

interface StatusProps {
  word: string;
  tone?: 'ok' | 'info' | 'neutral' | 'warn' | 'bad';
}

export default function Status({ word, tone = 'ok' }: StatusProps) {
  const className = tone === 'ok' ? 'status' : `status status--${tone}`;

  return (
    <span className={className}><span className="status__dot"></span>{word}</span>
  );
}
