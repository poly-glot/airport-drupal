import './index.css';

export default function Testimonial({ quote, name, meta }: { quote: string; name: string; meta?: string }) {
  return (
    <figure className="testimonial">
      <blockquote className="testimonial__quote" dangerouslySetInnerHTML={{ __html: quote }} />
      <figcaption className="testimonial__source"><span className="testimonial__name">{name}</span>{meta && <span className="testimonial__meta">{meta}</span>}</figcaption>
    </figure>
  );
}
