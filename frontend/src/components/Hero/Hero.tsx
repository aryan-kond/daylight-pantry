import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import heroImage from '../../assets/hero.webp';
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
          <Link to="/shop" className="hero__cta">
            Shop now
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <img
          src={heroImage}
          width={1600}
          height={888}
          alt="A bowl of granola, wrapped oat bars, almonds, two bowls of seeds and a jar of nut butter on a white surface"
          className="hero__image"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
