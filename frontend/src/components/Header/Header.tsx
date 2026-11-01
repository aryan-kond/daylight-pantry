import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { Menu, Search, ShoppingCart, UserRound, X } from 'lucide-react';
import logoFull from '../../assets/logo-full.svg';
import './Header.css';

type HeaderProps = {
  /** Number of items in the cart. Will come from the cart store later. */
  cartCount?: number;
};

const NAV_ITEMS = [
  { label: 'Home', to: '/', end: true },
  { label: 'Products', to: '/products', end: false },
  { label: 'Our Story', to: '/our-story', end: false },
  { label: 'Contact', to: '/contact', end: false },
];

export default function Header({ cartCount = 0 }: HeaderProps) {
  const navigate = useNavigate();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(() => window.scrollY > 0);

  // Header gets a line and a light shadow once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
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

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setMenuOpen(false);
    navigate(`/products?q=${encodeURIComponent(trimmed)}`);
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
                  <span className="site-header__nav-text" data-text={label}>
                    {label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

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
            placeholder="Search products"
            className="site-header__search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>

        <div className="site-header__actions">
          <Link to="/account" className="site-header__icon-link" aria-label="Account">
            <UserRound size={20} aria-hidden="true" />
          </Link>
          <Link to="/cart" className="site-header__icon-link" aria-label={cartLabel}>
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
