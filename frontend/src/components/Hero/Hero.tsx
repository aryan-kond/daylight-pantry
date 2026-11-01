import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import heroDesktop from '../../assets/hero.webp';
import heroMobile from '../../assets/hero-mobile.webp';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__inner">
        <div className="hero__content">
          <h1 id="hero-heading" className="hero__heading">
            Everyday snacks, made simple.
          </h1>
          <p className="hero__intro">
            Granola, oat bars, nuts and seeds, and nut butters for your everyday routines. Browse
            the range, check sizes and prices, and order in a few steps.
          </p>
          <Link to="/products" className="button-primary">
            Shop now
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        {/* Tighter crop on phones keeps the products large; wide crop from desktop width up */}
        <picture className="hero__picture">
          <source media="(min-width: 960px)" srcSet={heroDesktop} width={1600} height={659} />
          <img
            src={heroMobile}
            width={1000}
            height={608}
            alt="A bowl of granola, mixed nuts, a jar of nut butter and bowls of seeds on a white surface"
            className="hero__image"
            fetchPriority="high"
          />
        </picture>
      </div>
    </section>
  );
}
