import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import './ShopByCategory.css';

const CARD_HASH_PREFIX = '#category-';

export default function ShopByCategory() {
  const { hash, key } = useLocation();

  // Card picked from the header nav, for example "#category-granola"
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
          {CATEGORIES.map(({ slug, name, image }) => (
            <li key={slug}>
              <Link
                id={`category-${slug}`}
                to={`/shop?category=${slug}`}
                className={`category-card ${slug === activeSlug ? 'category-card--active' : ''}`}
                aria-current={slug === activeSlug ? 'true' : undefined}
              >
                {/* Decorative: the category name next to it already describes the card */}
                <img
                  src={image}
                  alt=""
                  width={800}
                  height={800}
                  loading="lazy"
                  className="category-card__image"
                />
                <span className="category-card__footer">
                  <span className="category-card__name">{name}</span>
                  <ArrowRight size={18} aria-hidden="true" className="category-card__arrow" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
