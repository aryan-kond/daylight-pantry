import { Link } from 'react-router';
import { ClipboardCheck, Eye, ShoppingBasket, Sun } from 'lucide-react';
import storyImage from '../../assets/our-story.webp';
import breakfastImage from '../../assets/our-story-breakfast.webp';
import FocusPullText from '../../components/FocusPullText/FocusPullText';
import ProgressTimeline, {
  type TimelineItem,
} from '../../components/ProgressTimeline/ProgressTimeline';
import Reveal from '../../components/Reveal/Reveal';
import './OurStoryPage.css';

const VALUES: TimelineItem[] = [
  {
    title: 'Clear at a glance',
    text: 'Names, pack sizes, net weights and prices are shown up front, so comparing is quick.',
    Icon: Eye,
  },
  {
    title: 'Made for every day',
    text: 'Granola for breakfast, bars for the bag, spreads for toast. Snacks for ordinary routines.',
    Icon: Sun,
  },
  {
    title: 'Easy to shop',
    text: 'Browse, search and add to your cart in a few taps, with quantities you can change any time.',
    Icon: ShoppingBasket,
  },
  {
    title: 'Honest details',
    text: 'We only show product information that is confirmed, and leave out what we cannot back up.',
    Icon: ClipboardCheck,
  },
];

// Paragraphs use a small letter spread so long text does not re-wrap while it settles
const PARAGRAPH_SPREAD = '0.03em';

export default function OurStoryPage() {
  return (
    <div className="our-story">
      <section className="our-story__intro" aria-labelledby="our-story-heading">
        <div className="our-story__intro-inner">
          <div>
            <h1 id="our-story-heading" className="our-story__title">
              <FocusPullText id="our-story-title">Our story</FocusPullText>
            </h1>
            <p className="our-story__lead">
              <FocusPullText id="our-story-lead" block spread={PARAGRAPH_SPREAD} delay={150}>
                Daylight Pantry is about the everyday shelf: the oats, nuts, seeds and spreads
                people reach for most often, made easy to find, compare and enjoy.
              </FocusPullText>
            </p>
          </div>

          <Reveal className="our-story__figure">
            <img
              src={storyImage}
              width={1280}
              height={832}
              alt="Glass jars of oats, almonds and seeds beside a bowl of granola with a wooden scoop, on a light wooden shelf"
              className="our-story__image"
            />
          </Reveal>
        </div>
      </section>

      <hr className="section-divider" />

      <section className="our-story__story" aria-labelledby="our-story-ideas-heading">
        <div className="our-story__story-inner">
          <div className="our-story__story-text">
            <h2 id="our-story-ideas-heading" className="our-story__section-title">
              <FocusPullText id="our-story-ideas" spread="0.08em">
                How we think about snacking
              </FocusPullText>
            </h2>

            <p>
              <FocusPullText id="our-story-p1" block spread={PARAGRAPH_SPREAD}>
                Our range sticks to familiar things: granola, oat bars, nuts and seeds, and nut
                butters. Nothing complicated, just the kind of food that fits into an ordinary day.
              </FocusPullText>
            </p>
            <p>
              <FocusPullText id="our-story-p2" block spread={PARAGRAPH_SPREAD} delay={120}>
                We keep the shop simple too. Every product shows its pack size, net weight and price
                up front, so you can compare at a glance and know what you are getting.
              </FocusPullText>
            </p>
            <p>
              <FocusPullText id="our-story-p3" block spread={PARAGRAPH_SPREAD} delay={240}>
                Good snacking should fit around real routines: a quick breakfast, something for the
                afternoon, a spread for toast. We would rather make that easy than make it
                complicated.
              </FocusPullText>
            </p>
          </div>

          <Reveal className="our-story__portrait">
            <img
              src={breakfastImage}
              width={896}
              height={1152}
              alt="A bowl of granola, a jar of nut butter with a wooden spoon and a plate of almonds on a sunlit table beside a linen napkin"
              className="our-story__portrait-image"
            />
          </Reveal>
        </div>
      </section>

      <section className="our-story__values" aria-labelledby="our-story-values-heading">
        <div className="our-story__values-inner">
          <h2 id="our-story-values-heading" className="our-story__section-title">
            What guides us
          </h2>
          <ProgressTimeline items={VALUES} />
        </div>
      </section>

      <section className="our-story__cta" aria-labelledby="our-story-cta-heading">
        <Reveal className="our-story__cta-card">
          <div>
            <h2 id="our-story-cta-heading" className="our-story__cta-title">
              <FocusPullText id="our-story-cta-title" spread="0.08em">
                Ready to look around?
              </FocusPullText>
            </h2>
            <p className="our-story__cta-text">
              <FocusPullText id="our-story-cta-text" block spread={PARAGRAPH_SPREAD} delay={120}>
                Browse the range and see the details for yourself.
              </FocusPullText>
            </p>
          </div>
          <Link to="/products" className="button-primary">
            Browse the range
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
