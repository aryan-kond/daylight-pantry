import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router';
import { Menu, Search, ShoppingCart, UserRound, X } from 'lucide-react';
import logoFull from '../../assets/logo-full.svg';
import { selectCartCount, useCartStore } from '../../store/cartStore';
import './Header.css';

const NAV_ITEMS = [
  { label: 'Home', to: '/', end: true },
  { label: 'Products', to: '/products', end: false },
  { label: 'Our Story', to: '/our-story', end: false },
  { label: 'Contact', to: '/contact', end: false },
];

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const cartCount = useCartStore(selectCartCount);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [scrolled, setScrolled] = useState(() => window.scrollY > 0);

  // On the Products page the field mirrors the address (?q=) so results update as you type.
  // On other pages it keeps its own text until you press Enter or the search button.
  const onProductsPage = pathname === '/products';
  const searchValue = onProductsPage ? (searchParams.get('q') ?? '') : draft;

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

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    if (onProductsPage) {
      setSearchParams(next ? { q: next } : {}, { replace: true });
    } else {
      setDraft(next);
    }
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = searchValue.trim();
    if (!trimmed) {
      searchInputRef.current?.focus();
      return;
    }
    setMenuOpen(false);
    setDraft('');
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
          <button type="submit" className="site-header__search-button" aria-label="Search">
            <Search size={18} aria-hidden="true" />
          </button>
          <input
            ref={searchInputRef}
            id="header-search"
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            placeholder="Search products"
            className="site-header__search-input"
            value={searchValue}
            onChange={handleSearchChange}
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
