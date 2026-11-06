import { Quote } from 'lucide-react';
import Reveal from '../Reveal/Reveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import './Testimonials.css';

// DEMO: these quotes and names are made up. Replace them, or remove the section, before launch.
const TESTIMONIALS = [
  {
    quote:
      'The Berry Sunrise Granola has become part of my weekday mornings. Everything was clearly listed, so ordering took just a couple of minutes.',
    name: 'Priya Nair',
  },
  {
    quote:
      'I like knowing the net weight and the price before I add anything to my cart. It makes comparing products so much easier.',
    name: 'Daniel Foster',
  },
  {
    quote:
      'The oat bars are perfect for my bag, and the whole shop felt simple and easy to use from start to finish.',
    name: 'Rohan Kapoor',
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials" aria-labelledby="testimonials-heading">
      <div className="testimonials__inner">
        <SectionHeading
          id="testimonials-heading"
          title="What our customers say"
          subtitle="A few kind words from the people who shop with us."
        />

        <ul className="testimonials__grid">
          {TESTIMONIALS.map(({ quote, name }, index) => (
            <li key={name} className="testimonials__item">
              <Reveal delay={index * 100}>
                <figure className="testimonial-card">
                  <blockquote className="testimonial-card__quote">
                    <p>“{quote}”</p>
                  </blockquote>
                  <figcaption className="testimonial-card__name">— {name}</figcaption>
                  <span className="testimonial-card__mark" aria-hidden="true">
                    <Quote size={22} />
                  </span>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
