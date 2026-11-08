import {
  ClipboardCheck,
  Eye,
  IndianRupee,
  ListChecks,
  Package,
  Scale,
  Search,
  ShoppingBasket,
  ShoppingCart,
  SlidersHorizontal,
  Smartphone,
  Sun,
  type LucideIcon,
} from 'lucide-react';
import storyImage from '../../assets/our-story.webp';
import breakfastImage from '../../assets/our-story-breakfast.webp';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import FocusPullText from '../../components/FocusPullText/FocusPullText';
import ProgressTimeline, {
  type TimelineItem,
} from '../../components/ProgressTimeline/ProgressTimeline';
import Reveal from '../../components/Reveal/Reveal';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import './OurStoryPage.css';

// Paragraphs use a small letter spread so long text does not re-wrap while it settles
const PARAGRAPH_SPREAD = '0.03em';

// Plain facts about how the shop works. No health, nutrition or ingredient claims here.
const FACTS: { label: string; Icon: LucideIcon }[] = [
  { label: 'Pack size on every product', Icon: Package },
  { label: 'Net weight shown up front', Icon: Scale },
  { label: 'Prices in rupees', Icon: IndianRupee },
  { label: 'Simple product search', Icon: Search },
  { label: 'Quick add to cart', Icon: ShoppingCart },
  { label: 'Quantities you can change', Icon: SlidersHorizontal },
  { label: 'Made for phones too', Icon: Smartphone },
  { label: 'Only confirmed details', Icon: ListChecks },
];

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

type StoryBlockProps = {
  /** Unique name, used for the heading id and the text animations */
  id: string;
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  /** Which side the photo sits on from desktop width up */
  imageSide: 'left' | 'right';
  shape: 'landscape' | 'portrait';
};

function StoryBlock({
  id,
  title,
  paragraphs,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  imageSide,
  shape,
}: StoryBlockProps) {
  return (
    <section
      className={`story-block story-block--image-${imageSide} story-block--${shape}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="story-block__text">
        <h2 id={`${id}-heading`} className="our-story__section-title">
          <FocusPullText id={`${id}-title`} spread="0.08em">
            {title}
          </FocusPullText>
        </h2>
        {paragraphs.map((text, index) => (
          <p key={index}>
            <FocusPullText
              id={`${id}-p${index}`}
              block
              spread={PARAGRAPH_SPREAD}
              delay={index * 120}
            >
              {text}
            </FocusPullText>
          </p>
        ))}
      </div>

      <Reveal className="story-block__figure">
        <img
          src={image}
          width={imageWidth}
          height={imageHeight}
          alt={imageAlt}
          className="story-block__image"
        />
      </Reveal>
    </section>
  );
}

export default function OurStoryPage() {
  return (
    <div className="our-story">
      {/* ---------- Intro ---------- */}
      <section className="our-story__intro" aria-labelledby="our-story-heading">
        <div className="our-story__intro-inner">
          <h1 id="our-story-heading" className="our-story__title">
            <FocusPullText id="our-story-title">Our story</FocusPullText>
          </h1>
          <p className="our-story__lead">
            <FocusPullText id="our-story-lead" block spread={PARAGRAPH_SPREAD} delay={150}>
              Daylight Pantry is about the everyday shelf, made easy to find, compare and enjoy. We
              keep our range familiar, our words plain and our details honest, from the way we
              describe a product to the way you shop.
            </FocusPullText>
          </p>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ---------- The shop at a glance: eight icon tiles ---------- */}
      <section className="our-story__facts" aria-labelledby="our-story-facts-heading">
        <div className="our-story__facts-inner">
          <SectionHeading
            id="our-story-facts-heading"
            title="The shop at a glance"
            subtitle="A few simple things you can count on every time you shop."
          />

          <ul className="our-story__facts-grid">
            {FACTS.map(({ label, Icon }, index) => (
              <li key={label}>
                <Reveal delay={(index % 4) * 80}>
                  <div className="fact">
                    <span className="fact__icon">
                      <Icon size={28} aria-hidden="true" />
                    </span>
                    <p className="fact__label">{label}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ---------- Story: two blocks, the photo alternates sides ---------- */}
      <div className="our-story__stories">
        <StoryBlock
          id="our-story-shelf"
          title="The everyday shelf"
          paragraphs={[
            'Daylight Pantry is about the oats, nuts, seeds and spreads people reach for most often. Our range sticks to familiar things: granola, oat bars, nuts and seeds, and nut butters.',
            'Nothing complicated, just the kind of food that fits into an ordinary day, whether that is breakfast at the table or a bar in your bag.',
          ]}
          image={storyImage}
          imageAlt="Glass jars of oats, almonds and seeds beside a bowl of granola with a wooden scoop, on a light wooden shelf"
          imageWidth={1280}
          imageHeight={832}
          imageSide="left"
          shape="landscape"
        />

        <StoryBlock
          id="our-story-snacking"
          title="How we think about snacking"
          paragraphs={[
            'We keep the shop simple too. Every product shows its pack size, net weight and price up front, so you can compare at a glance and know what you are getting.',
            'Good snacking should fit around real routines: a quick breakfast, something for the afternoon, a spread for toast. We would rather make that easy than make it complicated.',
            'That is also why we keep our words plain. If we cannot confirm something about a product, we simply leave it out.',
          ]}
          image={breakfastImage}
          imageAlt="A bowl of granola, a jar of nut butter with a wooden spoon and a plate of almonds on a sunlit table beside a linen napkin"
          imageWidth={896}
          imageHeight={1152}
          imageSide="right"
          shape="portrait"
        />
      </div>

      <hr className="section-divider" />

      {/* ---------- What guides us: progress timeline ---------- */}
      <section className="our-story__values" aria-labelledby="our-story-values-heading">
        <div className="our-story__values-inner">
          <SectionHeading
            id="our-story-values-heading"
            title="What guides us"
            subtitle="The ideas behind how we run the shop."
          />
          <ProgressTimeline items={VALUES} />
        </div>
      </section>

      <hr className="section-divider" />

      <FeaturedProducts />
    </div>
  );
}
