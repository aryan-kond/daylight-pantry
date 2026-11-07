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
    name: 'Arjun Malhotra',
  },
  {
    quote:
      'The oat bars are perfect for my bag, and the whole shop felt simple and easy to use from start to finish.',
    name: 'Ira Kapoor',
  },
];

// One curly quote mark: a round head with a tail that sweeps down to the left
const MARK_PATH =
  'M6.5 1C9.5 1 12 3.5 12 6.5C12 12.8 8.6 18.2 2.2 20.4C1.5 20.6 1.2 19.8 1.8 19.4C4.4 17.7 5.7 15.6 5.9 13.4C3.4 13.2 1 10.2 1 6.5C1 3.5 3.5 1 6.5 1Z';

/** Closing double quote, two curly marks filled with the current text color */
function CurlyQuote() {
  return (
    <svg
      width="26"
      height="21"
      viewBox="0 0 27 22"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={MARK_PATH} />
      <path d={MARK_PATH} transform="translate(14 0)" />
    </svg>
  );
}

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
                  <span className="testimonial-card__mark">
                    <CurlyQuote />
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
