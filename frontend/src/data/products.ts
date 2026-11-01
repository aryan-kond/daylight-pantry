import goldenHourAlmondButter from '../assets/products/golden-hour-almond-butter.webp';
import smoothPeanutButter from '../assets/products/smooth-peanut-butter.webp';
import cocoaHazelnutSpread from '../assets/products/cocoa-hazelnut-spread.webp';
import honeyAlmondGranola from '../assets/products/honey-almond-granola.webp';
import berrySunriseGranola from '../assets/products/berry-sunrise-granola.webp';
import darkChocolateCrunchGranola from '../assets/products/dark-chocolate-crunch-granola.webp';
import peanutButterOatBar from '../assets/products/peanut-butter-oat-bar.webp';
import chocolateChipOatBar from '../assets/products/chocolate-chip-oat-bar.webp';
import cranberryAlmondOatBar from '../assets/products/cranberry-almond-oat-bar.webp';
import lightlySaltedRoastedAlmonds from '../assets/products/lightly-salted-roasted-almonds.webp';
import classicTrailMix from '../assets/products/classic-trail-mix.webp';
import pumpkinAndSunflowerSeedsMix from '../assets/products/pumpkin-and-sunflower-seeds-mix.webp';

export type ProductCategory = 'Nut Butters & Spreads' | 'Granola' | 'Oat Bars' | 'Nuts & Seeds';

// NOTE: descriptions, net weights and prices below are SAMPLE VALUES.
// Replace them with the real product information before launch.
export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  /** One short line shown on the card */
  description: string;
  /** Net weight shown next to the price, for example "250 g" */
  netWeight: string;
  /** Price in rupees */
  price: number;
  image: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 'golden-hour-almond-butter',
    name: 'Golden Hour Almond Butter',
    category: 'Nut Butters & Spreads',
    description: 'A smooth almond spread for toast and snacks.',
    netWeight: '250 g',
    price: 499,
    image: goldenHourAlmondButter,
  },
  {
    id: 'smooth-peanut-butter',
    name: 'Smooth Peanut Butter',
    category: 'Nut Butters & Spreads',
    description: 'Creamy peanut butter for sandwiches and snacks.',
    netWeight: '340 g',
    price: 349,
    image: smoothPeanutButter,
  },
  {
    id: 'cocoa-hazelnut-spread',
    name: 'Cocoa Hazelnut Spread',
    category: 'Nut Butters & Spreads',
    description: 'A chocolate hazelnut spread for bread and baking.',
    netWeight: '250 g',
    price: 449,
    image: cocoaHazelnutSpread,
  },
  {
    id: 'honey-almond-granola',
    name: 'Honey Almond Granola',
    category: 'Granola',
    description: 'Oat granola clusters with almonds and honey.',
    netWeight: '400 g',
    price: 399,
    image: honeyAlmondGranola,
  },
  {
    id: 'berry-sunrise-granola',
    name: 'Berry Sunrise Granola',
    category: 'Granola',
    description: 'Oat granola with almonds and berries.',
    netWeight: '400 g',
    price: 429,
    image: berrySunriseGranola,
  },
  {
    id: 'dark-chocolate-crunch-granola',
    name: 'Dark Chocolate Crunch Granola',
    category: 'Granola',
    description: 'Oat granola with chocolate pieces and sliced almonds.',
    netWeight: '400 g',
    price: 449,
    image: darkChocolateCrunchGranola,
  },
  {
    id: 'peanut-butter-oat-bar',
    name: 'Peanut Butter Oat Bar',
    category: 'Oat Bars',
    description: 'An oat bar with a peanut butter flavour.',
    netWeight: '6 × 35 g',
    price: 299,
    image: peanutButterOatBar,
  },
  {
    id: 'chocolate-chip-oat-bar',
    name: 'Chocolate Chip Oat Bar',
    category: 'Oat Bars',
    description: 'An oat bar with chocolate chips.',
    netWeight: '6 × 35 g',
    price: 299,
    image: chocolateChipOatBar,
  },
  {
    id: 'cranberry-almond-oat-bar',
    name: 'Cranberry Almond Oat Bar',
    category: 'Oat Bars',
    description: 'An oat bar with cranberries and almonds.',
    netWeight: '6 × 35 g',
    price: 329,
    image: cranberryAlmondOatBar,
  },
  {
    id: 'lightly-salted-roasted-almonds',
    name: 'Lightly Salted Roasted Almonds',
    category: 'Nuts & Seeds',
    description: 'Roasted almonds with a light sprinkle of salt.',
    netWeight: '200 g',
    price: 379,
    image: lightlySaltedRoastedAlmonds,
  },
  {
    id: 'classic-trail-mix',
    name: 'Classic Trail Mix',
    category: 'Nuts & Seeds',
    description: 'Nuts, seeds and dried fruit for snacking.',
    netWeight: '250 g',
    price: 349,
    image: classicTrailMix,
  },
  {
    id: 'pumpkin-and-sunflower-seeds-mix',
    name: 'Pumpkin & Sunflower Seed Mix',
    category: 'Nuts & Seeds',
    description: 'A seed mix of pumpkin and sunflower seeds.',
    netWeight: '200 g',
    price: 279,
    image: pumpkinAndSunflowerSeedsMix,
  },
];

/** Products shown in the homepage Featured products section, in display order */
const FEATURED_IDS = [
  'berry-sunrise-granola',
  'cranberry-almond-oat-bar',
  'golden-hour-almond-butter',
  'honey-almond-granola',
  'peanut-butter-oat-bar',
  'classic-trail-mix',
];

export const FEATURED_PRODUCTS: Product[] = FEATURED_IDS.flatMap((id) =>
  PRODUCTS.filter((product) => product.id === id),
);
