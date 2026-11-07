import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { Mail, MapPin, Phone, Play, Smartphone } from 'lucide-react';
import logoFullLight from '../../assets/logo-full-light.svg';
import './Footer.css';

const iconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

// Brand logos are drawn inline: the lucide-react version in this project has no brand icons
function InstagramIcon() {
  return (
    <svg {...iconProps}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg {...iconProps}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

// DEMO: the social links go nowhere. Replace each href with a real profile URL later.
const SOCIALS = [
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
  { label: 'Facebook', href: '#', Icon: FacebookIcon },
  { label: 'YouTube', href: '#', Icon: YouTubeIcon },
];

// DEMO: stand-in badges. Use the official App Store and Google Play badges when the apps exist.
const APPS = [
  { lead: 'Download on the', store: 'App Store', Icon: Smartphone },
  { lead: 'Get it on', store: 'Google Play', Icon: Play },
];

// DEMO: dummy contact details. Replace with the real ones.
const CONTACT = {
  email: 'hello@daylightpantry.example',
  phone: '+91 98765 43210',
  phoneLink: '+919876543210',
  hours: 'Mon to Sat, 9 am to 6 pm',
  address: ['42 Sample Street', 'Mumbai, Maharashtra 400001'],
};

type FooterLink = {
  label: string;
  /** Page inside the site */
  to?: string;
  /** Plain link or anchor. Links with neither `to` nor `href` do nothing when clicked. */
  href?: string;
};

type FooterColumn = {
  id: string;
  title: string;
  links: FooterLink[];
};

// DEMO: links without a destination are fake. Give them `to` or `href` when the page exists.
const COLUMNS: FooterColumn[] = [
  {
    id: 'shop',
    title: 'Shop',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Products', to: '/products' },
      { label: 'Cart', to: '/cart' },
      { label: 'New Arrivals' },
      { label: 'Gift Cards' },
      { label: 'Bulk Orders' },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      { label: 'Our Story', to: '/our-story' },
      { label: 'Careers' },
      { label: 'Press' },
      { label: 'Blog' },
      { label: 'Partnerships' },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    links: [
      { label: 'Help Center' },
      { label: 'Shipping & Delivery' },
      { label: 'Returns & Refunds' },
      { label: 'Track Your Order' },
      { label: 'Contact Us', href: '#contact' },
    ],
  },
  {
    id: 'legal',
    title: 'Legal',
    links: [
      { label: 'Terms & Conditions' },
      { label: 'Privacy Policy' },
      { label: 'Cookie Policy' },
      { label: 'Accessibility' },
    ],
  },
];

function FooterLinkItem({ label, to, href }: FooterLink) {
  if (to) {
    return (
      <Link to={to} className="site-footer__link">
        {label}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className="site-footer__link">
        {label}
      </a>
    );
  }

  return (
    <a href="#" className="site-footer__link" onClick={(event) => event.preventDefault()}>
      {label}
    </a>
  );
}

type NewsletterStatus = 'idle' | 'error' | 'success';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Footer() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<NewsletterStatus>('idle');

  // DEMO: nothing is sent anywhere. This only shows the form states.
  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus('error');
      emailRef.current?.focus();
      return;
    }

    setEmail('');
    setStatus('success');
  };

  const message =
    status === 'error'
      ? 'Enter a valid email address, for example name@example.com.'
      : status === 'success'
        ? "Thanks, you're on the list."
        : '';

  return (
    <footer className="site-footer">
      <hr className="section-divider" />
      {/* ---------- Newsletter (soft peach band) ---------- */}
      <section className="site-footer__newsletter" aria-labelledby="footer-newsletter-heading">
        <div className="site-footer__newsletter-inner">
          <div>
            <h2 id="footer-newsletter-heading" className="site-footer__newsletter-title">
              Get the latest from our pantry
            </h2>
            <p className="site-footer__newsletter-text">
              Product news and updates, straight to your inbox.
            </p>
          </div>

          <form className="site-footer__form" onSubmit={handleSubscribe} noValidate>
            <div className="site-footer__form-row">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                ref={emailRef}
                id="footer-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                className="site-footer__input"
                value={email}
                aria-invalid={status === 'error'}
                aria-describedby="footer-email-message"
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
              />
              <button type="submit" className="button-primary site-footer__subscribe">
                Subscribe
              </button>
            </div>
            <p
              id="footer-email-message"
              className={`site-footer__form-message site-footer__form-message--${status}`}
              aria-live="polite"
            >
              {message}
            </p>
          </form>
        </div>
      </section>

      {/* ---------- Main footer (charcoal) ---------- */}
      <div className="site-footer__main">
        <div className="site-footer__inner">
          <div className="site-footer__top">
            <div className="site-footer__brand">
              <Link to="/" className="site-footer__logo-link">
                <img src={logoFullLight} alt="Daylight Pantry" className="site-footer__logo" />
              </Link>
            </div>

            <div>
              <h2 className="site-footer__heading">Get the app</h2>
              <ul className="site-footer__apps">
                {APPS.map(({ lead, store, Icon }) => (
                  <li key={store}>
                    <a
                      href="#"
                      className="site-footer__app"
                      aria-label={`${lead} ${store}`}
                      onClick={(event) => event.preventDefault()}
                    >
                      <Icon size={22} aria-hidden="true" />
                      <span className="site-footer__app-text">
                        <span className="site-footer__app-lead">{lead}</span>
                        <span className="site-footer__app-store">{store}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="site-footer__columns">
            {COLUMNS.map(({ id, title, links }) => (
              <nav key={id} aria-labelledby={`footer-${id}-heading`}>
                <h2 id={`footer-${id}-heading`} className="site-footer__heading">
                  {title}
                </h2>
                <ul className="site-footer__list">
                  {links.map((link) => (
                    <li key={link.label}>
                      <FooterLinkItem {...link} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* The header Contact link scrolls here and moves focus to this block */}
            <section
              id="contact"
              tabIndex={-1}
              className="site-footer__contact"
              aria-labelledby="footer-contact-heading"
            >
              <h2 id="footer-contact-heading" className="site-footer__heading">
                Contact
              </h2>
              <ul className="site-footer__contact-list">
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="site-footer__contact-row site-footer__contact-link"
                  >
                    <span className="site-footer__contact-icon">
                      <Mail size={18} aria-hidden="true" />
                    </span>
                    <span className="site-footer__contact-text">
                      <span className="site-footer__contact-label">Email us</span>
                      <span className="site-footer__contact-value">{CONTACT.email}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT.phoneLink}`}
                    className="site-footer__contact-row site-footer__contact-link"
                  >
                    <span className="site-footer__contact-icon">
                      <Phone size={18} aria-hidden="true" />
                    </span>
                    <span className="site-footer__contact-text">
                      <span className="site-footer__contact-label">Call us, {CONTACT.hours}</span>
                      <span className="site-footer__contact-value tabular">{CONTACT.phone}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <div className="site-footer__contact-row">
                    <span className="site-footer__contact-icon">
                      <MapPin size={18} aria-hidden="true" />
                    </span>
                    <address className="site-footer__contact-text">
                      <span className="site-footer__contact-label">Visit us</span>
                      {CONTACT.address.map((line) => (
                        <span key={line} className="site-footer__contact-value">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                </li>
              </ul>
            </section>
          </div>

          <div className="site-footer__bottom">
            <ul className="site-footer__social" aria-label="Social media">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="site-footer__social-link icon-fill"
                    aria-label={label}
                    onClick={(event) => {
                      if (href === '#') event.preventDefault();
                    }}
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
            <p className="site-footer__copyright">
              © {new Date().getFullYear()} Daylight Pantry. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
