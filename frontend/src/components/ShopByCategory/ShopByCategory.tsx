import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import './ShopByCategory.css';

const CARD_HASH_PREFIX = '#category-';

export default function ShopByCategory() {
  const { hash, key } = useLocation();

  // Category picked from the header Shop menu, for example "#category-granola"
  const activeSlug = hash.startsWith(CARD_HASH_PREFIX) ? hash.slice(CARD_HASH_PREFIX.length) : null;

  // When the header links here, scroll to the target and move focus to the card.
  // `key` changes on every navigation, so clicking the same link twice scrolls again.
  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCard = target.tagName === 'A';

    target.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: isCard ? 'center' : 'start',
    });
    if (isCard) target.focus({ preventScroll: true });
  }, [hash, key]);

  return (
    <section
      id="shop-by-category"
      className="shop-by-category"
      aria-labelledby="shop-by-category-heading"
    >
      <div className="shop-by-category__inner">
        <h2 id="shop-by-category-heading" className="shop-by-category__heading">
          Shop by category
        </h2>

        <ul className="shop-by-category__grid">
          {CATEGORIES.map(({ slug, name, description, image }) => {
            const active = slug === activeSlug;

            return (
              <li key={slug}>
                <Link
                  id={`category-${slug}`}
                  to={`/shop?category=${slug}`}
                  className={`category-card ${active ? 'category-card--active' : ''}`}
                  aria-current={active ? 'true' : undefined}
                  aria-labelledby={`category-${slug}-name`}
                  aria-describedby={`category-${slug}-description`}
                >
                  <span className="category-card__body">
                    <span id={`category-${slug}-name`} className="category-card__name">
                      {name}
                    </span>
                    <span
                      id={`category-${slug}-description`}
                      className="category-card__description"
                    >
                      {description}
                    </span>
                    <span className="category-card__cta">
                      Shop now
                      <ArrowRight size={16} aria-hidden="true" className="category-card__arrow" />
                    </span>
                  </span>

                  <span className="category-card__media">
                    {/* Decorative: the name and description above already describe the card */}
                    <img
                      src={image}
                      alt=""
                      width={640}
                      height={640}
                      loading="lazy"
                      className="category-card__image"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
