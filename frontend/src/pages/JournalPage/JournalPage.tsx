import { Link } from 'react-router';
import { ARTICLES } from '../../data/journal';
import JournalCard from '../../components/JournalCard/JournalCard';
import PageHeading from '../../components/PageHeading/PageHeading';
import SectionDivider from '../../components/SectionDivider/SectionDivider';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import './JournalPage.css';

export default function JournalPage() {
  // The first article is featured; the rest go in the grid
  const [featured, ...others] = ARTICLES;

  return (
    <>
      <div className="journal-page">
        <PageHeading
          title="Goodness Journal"
          subtitle="Simple breakfast inspiration, snack ideas, easy recipes and little pantry tips."
        />

        <section className="journal-feature" aria-labelledby="journal-feature-title">
          <div className="journal-feature__figure">
            <img
              src={featured.image}
              width={1248}
              height={832}
              alt={featured.imageAlt}
              className="journal-feature__image"
            />
          </div>

          <div className="journal-feature__text">
            <p className="journal-feature__meta">
              {featured.topic} · {featured.minutes} min read
            </p>
            <h2 id="journal-feature-title" className="journal-feature__title">
              {featured.title}
            </h2>
            <p className="journal-feature__teaser">{featured.teaser}</p>
            <Link
              to={`/journal/${featured.slug}`}
              className="button-primary journal-feature__action"
            >
              Read article
            </Link>
          </div>
        </section>
      </div>

      <SectionDivider />

      <section className="journal-more" aria-labelledby="journal-more-heading">
        <SectionHeading
          id="journal-more-heading"
          title="More from the journal"
          subtitle="Recipes, ideas and tips for everyday pantry moments."
        />

        <ul className="journal-grid">
          {others.map((article) => (
            <li key={article.slug}>
              <JournalCard article={article} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
