import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import heroDesktop from '../../assets/hero.webp';
import heroMobile from '../../assets/hero-mobile.webp';
import BlurCascadeText from '../BlurCascadeText/BlurCascadeText';
import './Hero.css';

// The intro animation plays once per page load or refresh.
// Going to another page and coming back shows the plain text.
let introPlayed = false;

export default function Hero() {
  const [playIntro] = useState(() => !introPlayed);

  useEffect(() => {
    introPlayed = true;
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__inner">
        <div className="hero__content">
          <h1 id="hero-heading" className="hero__heading">
            <BlurCascadeText text="Everyday snacks, made simple." animate={playIntro} />
          </h1>
          <p className="hero__intro">
            <BlurCascadeText
              text="Granola, oat bars, nuts and seeds, and nut butters for your everyday routines. From quick weekday breakfasts to afternoon snacks and spreads for toast, our pantry is stocked for ordinary days that deserve a little something good. Every product shows its pack size, net weight and price up front, so browsing, comparing and ordering stay simple."
              step={6}
              delay={500}
              animate={playIntro}
            />
          </p>
          <div className="hero__actions">
            <Link to="/products" className="button-primary">
              Shop Now
            </Link>
            {/* The Goodness Journal page does not exist yet */}
            <Link to="/journal" className="button-secondary">
              Get Inspired
            </Link>
          </div>
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
