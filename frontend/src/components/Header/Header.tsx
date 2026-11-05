import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router';
import { Menu, Search, ShoppingCart, UserRound, X } from 'lucide-react';
import logoFull from '../../assets/logo-full.svg';
import { selectCartCount, useCartStore } from '../../store/cartStore';
import './Header.css';

// Contact is not a page: it scrolls to the contact block in the footer
const NAV_ITEMS = [
  { label: 'Home', to: '/', end: true },
  { label: 'Products', to: '/products', end: false },
  { label: 'Our Story', to: '/our-story', end: false },
];

// Scroll distance after which the bar shrinks into a pill
const SHRINK_AFTER = 40;

export default function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cartCount = useCartStore(selectCartCount);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > SHRINK_AFTER);

  // The field shows the current search (?q=). Its key changes with it, so the text
  // resets when the search changes from outside, for example "Clear search".
  const urlQuery = searchParams.get('q') ?? '';

  // The header is a full-width bar at the top and a floating pill once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SHRINK_AFTER);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  // Manual search: runs on Enter or on the magnifier button
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get('q');
    const trimmed = typeof value === 'string' ? value.trim() : '';

    if (!trimmed) {
      // An empty search on the results page clears the results
      if (urlQuery) navigate('/products');
      else searchInputRef.current?.focus();
      return;
    }

    setMenuOpen(false);
    navigate(`/products?q=${encodeURIComponent(trimmed)}`);
  };

  // Scrolls smoothly to the footer contact block and moves focus there
  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('contact');
    if (!target) return;

    event.preventDefault();
    setMenuOpen(false);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    target.focus({ preventScroll: true });
  };

  const cartLabel = `Cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`;

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="site-header__row">
        <button
          ref={menuButtonRef}
          type="button"
          className="site-header__menu-button icon-fill"
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

        <nav
          id="primary-navigation"
          aria-label="Primary"
          className={`site-header__nav ${menuOpen ? 'site-header__nav--open' : ''}`}
        >
          <ul className="site-header__nav-list">
            {NAV_ITEMS.map(({ label, to, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className="site-header__nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="site-header__nav-text">{label}</span>
                </NavLink>
              </li>
            ))}
            <li>
              <a href="#contact" className="site-header__nav-link" onClick={handleContactClick}>
                <span className="site-header__nav-text">Contact</span>
              </a>
            </li>
          </ul>
        </nav>

        <form role="search" className="site-header__search" onSubmit={handleSearch}>
          <label htmlFor="header-search" className="sr-only">
            Search products
          </label>
          <input
            key={urlQuery}
            ref={searchInputRef}
            id="header-search"
            name="q"
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            placeholder="Search products"
            className="site-header__search-input"
            defaultValue={urlQuery}
          />
          <button type="submit" className="site-header__search-button" aria-label="Search">
            <Search size={18} aria-hidden="true" />
          </button>
        </form>

        <div className="site-header__actions">
          <Link to="/account" className="site-header__icon-link icon-fill" aria-label="Account">
            <UserRound size={20} aria-hidden="true" />
          </Link>
          <Link to="/cart" className="site-header__icon-link icon-fill" aria-label={cartLabel}>
            <ShoppingCart size={20} aria-hidden="true" />
            {cartCount > 0 && (
              <span className="site-header__cart-badge tabular" aria-hidden="true">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
