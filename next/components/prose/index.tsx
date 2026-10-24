import './index.css';

export default function Prose({ body }: { body: string }) {
  return <div className="prose" dangerouslySetInnerHTML={{ __html: body }} />;
}
