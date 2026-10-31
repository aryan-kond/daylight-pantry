import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import logoFull from '../../assets/logo-full.svg';
import { CATEGORIES } from '../../data/categories';
import './Header.css';

type HeaderProps = {
  /** Number of items in the cart. Will come from the cart store later. */
  cartCount?: number;
};

type NavItem = {
  label: string;
  to: string;
  isCurrent: (pathname: string, hash: string) => boolean;
};

// Until the Shop page exists, these links scroll to the matching spot on the homepage.
// Later they can point to /shop and /shop?category=<slug> again.
const NAV_ITEMS: NavItem[] = [
  {
    label: 'Shop all',
    to: '/#shop-by-category',
    isCurrent: (path, hash) => path === '/' && hash === '#shop-by-category',
  },
  ...CATEGORIES.map(({ slug, name }) => ({
    label: name,
    to: `/#category-${slug}`,
    isCurrent: (path: string, hash: string) => path === '/' && hash === `#category-${slug}`,
  })),
];

export default function Header({ cartCount = 0 }: HeaderProps) {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(() => window.scrollY > 0);
  const [categoriesInView, setCategoriesInView] = useState(false);

  // Header gets a light shadow once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The nav underline only shows while the Shop by category section is on screen.
  // The margins ignore the sticky header at the top and the bottom third of the screen,
  // so the section peeking in below the hero does not count.
  useEffect(() => {
    const section = document.getElementById('shop-by-category');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setCategoriesInView(entry.isIntersecting),
      { rootMargin: '-120px 0px -35% 0px' },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [pathname]);

  // Escape closes the mobile menu and returns focus to its button
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/shop?q=${encodeURIComponent(trimmed)}`);
  };

  const cartLabel = `Cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`;

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="site-header__row">
        <button
          ref={menuButtonRef}
          type="button"
          className="site-header__menu-button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>

        <Link to="/" className="site-header__brand">
          <img src={logoFull} alt="Daylight Pantry" className="site-header__logo" />
        </Link>

        <form role="search" className="site-header__search" onSubmit={handleSearch}>
          <label htmlFor="header-search" className="sr-only">
            Search products
          </label>
          <Search size={18} aria-hidden="true" className="site-header__search-icon" />
          <input
            id="header-search"
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            placeholder="Search oat bars, nut butters, granola"
            className="site-header__search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>

        <div className="site-header__actions">
          <Link to="/account" className="site-header__sign-in" aria-label="Sign in">
            <UserRound size={20} aria-hidden="true" />
            <span className="site-header__sign-in-label">Sign in</span>
          </Link>
          <Link to="/cart" className="site-header__cart" aria-label={cartLabel}>
            <ShoppingBag size={20} aria-hidden="true" />
            {cartCount > 0 && (
              <span className="site-header__cart-badge tabular" aria-hidden="true">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav
        id="primary-navigation"
        aria-label="Primary"
        className={`site-header__nav ${menuOpen ? 'site-header__nav--open' : ''}`}
      >
        <ul className="site-header__nav-list">
          {NAV_ITEMS.map(({ label, to, isCurrent }) => (
            <li key={to}>
              <Link
                to={to}
                className="site-header__nav-link"
                aria-current={categoriesInView && isCurrent(pathname, hash) ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <span className="site-header__nav-text" data-text={label}>
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
