import { Link } from 'react-router';
import type { Article } from '../../data/journal';
import './JournalCard.css';

type JournalCardProps = {
  article: Article;
};

/** Short article card: photo on top, then topic and reading time, title and teaser */
export default function JournalCard({ article }: JournalCardProps) {
  const { slug, title, topic, minutes, teaser, image, imageAlt } = article;

  return (
    <Link to={`/journal/${slug}`} className="journal-card">
      <img
        src={image}
        width={1248}
        height={832}
        alt={imageAlt}
        loading="lazy"
        className="journal-card__image"
      />
      <div className="journal-card__body">
        <p className="journal-card__meta">
          {topic} · {minutes} min read
        </p>
        <h3 className="journal-card__title">{title}</h3>
        <p className="journal-card__teaser">{teaser}</p>
      </div>
    </Link>
  );
}
