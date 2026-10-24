export default function AccordionItem({ summary, body }: { summary: string; body: string }) {
  return (
    <details className="accordion__item">
      <summary className="accordion__summary">{summary}<svg className="accordion__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg></summary>
      <div className="accordion__body" dangerouslySetInnerHTML={{ __html: body }} />
    </details>
  );
}
