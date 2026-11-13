import { Heart, Package, Search, ShoppingBasket, Smile, Sun, Utensils } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import card1 from '../../assets/our-story/card-1.webp';
import card2 from '../../assets/our-story/card-2.webp';
import card3 from '../../assets/our-story/card-3.webp';
import story1 from '../../assets/our-story/story-1.webp';
import story2 from '../../assets/our-story/story-2.webp';
import Reveal from '../../components/Reveal/Reveal';
import './OurStoryPage.css';

type StoryBlockProps = {
  /** Unique name, used for the heading id */
  id: string;
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  /** Which side the photo sits on from desktop width up */
  imageSide: 'left' | 'right';
};

// Both photos are 1184 x 864, shown in identical 3:2 frames
function StoryBlock({ id, title, paragraphs, image, imageAlt, imageSide }: StoryBlockProps) {
  return (
    <section
      className={`story-block story-block--image-${imageSide}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="story-block__text">
        <h2 id={`${id}-heading`} className="our-story__section-title">
          {title}
        </h2>
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>

      <Reveal className="story-block__figure">
        <img src={image} width={1184} height={864} alt={imageAlt} className="story-block__image" />
      </Reveal>
    </section>
  );
}

type Card = {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  Icon: LucideIcon;
};

const CARDS: Card[] = [
  {
    title: 'Everyday Goodness',
    text: 'Celebrating the simple food moments that make every day a little better.',
    image: card1,
    imageAlt: 'Seed and oat bars stacked on a plate on a wooden table beside a linen cloth',
    Icon: Sun,
  },
  {
    title: 'Thoughtful Choices',
    text: 'Making room for choices that feel right for everyday living.',
    image: card2,
    imageAlt:
      'A bowl of creamy nut butter with a wooden spoon beside a slice of toast spread with it',
    Icon: Heart,
  },
  {
    title: 'Shared Moments',
    text: 'Bringing a little more joy to the meals and moments we share.',
    image: card3,
    imageAlt: 'A textured bowl of granola clusters with sliced almonds on a wooden table',
    Icon: Smile,
  },
];

const STEPS: { title: string; text: string; Icon: LucideIcon }[] = [
  {
    title: 'Discover',
    text: 'Everyday food moments inspire the way we think about food.',
    Icon: Search,
  },
  {
    title: 'Choose',
    text: 'Thoughtful choices make everyday shopping feel more meaningful.',
    Icon: ShoppingBasket,
  },
  {
    title: 'Bring Home',
    text: 'The things we choose become part of our everyday routines.',
    Icon: Package,
  },
  {
    title: 'Share',
    text: 'Good food becomes even better when shared.',
    Icon: Utensils,
  },
];

// Alternating bands on the page gradient: plain story, tinted story, plain little things,
// then the tinted newsletter in the footer
export default function OurStoryPage() {
  return (
    <div className="our-story">
      {/* Page title for screen readers and search engines; not shown on screen */}
      <h1 className="sr-only">Our story</h1>

      {/* ---------- Story one: photo left, text right ---------- */}
      <div className="our-story__story">
        <StoryBlock
          id="our-story-shelf"
          title="The everyday shelf"
          paragraphs={[
            'Daylight Pantry is about the oats, nuts, seeds and spreads people reach for most often. Our range sticks to familiar things: granola, oat bars, nuts and seeds, and nut butters.',
            'Nothing complicated, just the kind of food that fits into an ordinary day, whether that is breakfast at the table or a bar in your bag.',
            'A good pantry is also a flexible one. A jar of granola can be breakfast on a slow morning, a handful of nuts can fill the gap before dinner, and a spoonful of nut butter turns plain toast into something worth sitting down for.',
          ]}
          image={story1}
          imageAlt="Glass jars of oats and grains on a wooden counter beside oranges, fresh bread and a canvas shopping bag in warm daylight"
          imageSide="left"
        />
      </div>

      {/* ---------- Story two (tinted band): text left, photo right ---------- */}
      <div className="section-cream">
        <div className="our-story__story">
          <StoryBlock
            id="our-story-snacking"
            title="How we think about snacking"
            paragraphs={[
              'We keep the shop simple too. Every product shows its pack size, net weight and price up front, so you can compare at a glance and know what you are getting.',
              'Good snacking should fit around real routines: a quick breakfast, something for the afternoon, a spread for toast. We would rather make that easy than make it complicated.',
              'That is also why we keep our words plain. If we cannot confirm something about a product, we simply leave it out.',
              'We would rather you came back because the shop was easy to use than because we shouted about it. So we keep the pages calm, the choices few and the details clear, and we leave the rest to the food.',
            ]}
            image={story2}
            imageAlt="Hands spreading nut butter on a slice of toast on a plate, with a bowl of berries and a glass of milk nearby"
            imageSide="right"
          />
        </div>
      </div>

      {/* ---------- The little things matter: three cards, then four steps ---------- */}
      <section className="little-things" aria-labelledby="little-things-heading">
        <h2 id="little-things-heading" className="little-things__title">
          The little things matter.
        </h2>

        <ul className="little-things__cards">
          {CARDS.map(({ title, text, image, imageAlt, Icon }, index) => (
            <li key={title}>
              <Reveal delay={index * 100}>
                <article className="little-card">
                  <img
                    src={image}
                    width={1000}
                    height={571}
                    alt={imageAlt}
                    loading="lazy"
                    className="little-card__image"
                  />
                  <div className="little-card__body">
                    <div className="little-card__heading">
                      <span className="little-card__icon">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <h3 className="little-card__title">{title}</h3>
                    </div>
                    <p className="little-card__text">{text}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="little-steps">
          <h2 className="little-steps__title">A little goodness, in every step.</h2>
          <ol className="steps">
            {STEPS.map(({ title, text, Icon }) => (
              <li key={title} className="step">
                <span className="step__icon">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="step__title">{title}</h3>
                <p className="step__text">{text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>
    </div>
  );
}
