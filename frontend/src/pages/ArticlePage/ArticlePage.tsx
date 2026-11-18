import { Link, useParams } from 'react-router';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import { ARTICLES, getArticle } from '../../data/journal';
import JournalCard from '../../components/JournalCard/JournalCard';
import PageHeading from '../../components/PageHeading/PageHeading';
import SectionDivider from '../../components/SectionDivider/SectionDivider';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import './ArticlePage.css';

export default function ArticlePage() {
  const { slug } = useParams();
  const article = getArticle(slug);

  if (!article) {
    return (
      <div className="article-page">
        <PageHeading
          title="Article not found"
          subtitle="That article may have moved or never existed."
        />
        <div className="article-page__center">
          <Link to="/journal" className="button-primary">
            Back to the journal
          </Link>
        </div>
      </div>
    );
  }

  // Three more articles, starting with the one after this one
  const index = ARTICLES.indexOf(article);
  const more = [1, 2, 3].map((offset) => ARTICLES[(index + offset) % ARTICLES.length]);

  return (
    <>
      <article className="article-page">
        <Link to="/journal" className="article-page__back">
          <ArrowLeft size={16} aria-hidden="true" />
          Goodness Journal
        </Link>

        <PageHeading
          title={article.title}
          subtitle={`${article.topic} · ${article.minutes} min read`}
        />

        <figure className="article-page__figure">
          <img
            src={article.image}
            width={1248}
            height={832}
            alt={article.imageAlt}
            className="article-page__image"
          />
        </figure>

        <div className="article-page__body">
          {article.intro.map((text, paragraphIndex) => (
            <p key={paragraphIndex} className="article-page__text">
              {text}
            </p>
          ))}

          {article.lists.map((list) => {
            // "How to ..." lists are method steps and read "Step 1", "Step 2".
            // Other ordered lists get plain numbers, and unordered lists get dots.
            const isMethod = list.ordered && list.title.toLowerCase().startsWith('how to');
            const ListTag = list.ordered ? 'ol' : 'ul';
            const listClass = !list.ordered
              ? 'article-list'
              : isMethod
                ? 'article-list article-list--steps'
                : 'article-list article-list--numbered';

            return (
              <section key={list.title} className="article-page__section">
                <h2 className="article-page__subheading">{list.title}</h2>
                <ListTag className={listClass}>
                  {list.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ListTag>
              </section>
            );
          })}

          <aside className="article-tip" aria-label="Pantry tip">
            <span className="article-tip__icon">
              <Lightbulb size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="article-tip__title">Pantry tip</h2>
              <p className="article-tip__text">{article.tip}</p>
            </div>
          </aside>
        </div>
      </article>

      <SectionDivider />

      <section className="article-more" aria-labelledby="article-more-heading">
        <SectionHeading
          id="article-more-heading"
          title="Keep reading"
          subtitle="More recipes, ideas and tips from the journal."
        />

        <ul className="article-more__grid">
          {more.map((item) => (
            <li key={item.slug}>
              <JournalCard article={item} />
            </li>
          ))}
        </ul>

        <div className="article-page__center">
          <Link to="/products" className="button-primary">
            Shop the range
          </Link>
        </div>
      </section>
    </>
  );
}
