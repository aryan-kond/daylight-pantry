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

export type Product = {
  id: string;
  name: string;
  /** Used by search only, it is not shown in the interface */
  category: ProductCategory;
  /** Pack size shown next to the price. SAMPLE VALUE: replace with the real size. */
  size: string;
  /** Price in rupees. SAMPLE VALUE: replace with the real price. */
  price: number;
  image: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 'golden-hour-almond-butter',
    name: 'Golden Hour Almond Butter',
    category: 'Nut Butters & Spreads',
    size: '250 g jar',
    price: 499,
    image: goldenHourAlmondButter,
  },
  {
    id: 'smooth-peanut-butter',
    name: 'Smooth Peanut Butter',
    category: 'Nut Butters & Spreads',
    size: '340 g jar',
    price: 349,
    image: smoothPeanutButter,
  },
  {
    id: 'cocoa-hazelnut-spread',
    name: 'Cocoa Hazelnut Spread',
    category: 'Nut Butters & Spreads',
    size: '250 g jar',
    price: 449,
    image: cocoaHazelnutSpread,
  },
  {
    id: 'honey-almond-granola',
    name: 'Honey Almond Granola',
    category: 'Granola',
    size: '400 g pouch',
    price: 399,
    image: honeyAlmondGranola,
  },
  {
    id: 'berry-sunrise-granola',
    name: 'Berry Sunrise Granola',
    category: 'Granola',
    size: '400 g pouch',
    price: 429,
    image: berrySunriseGranola,
  },
  {
    id: 'dark-chocolate-crunch-granola',
    name: 'Dark Chocolate Crunch Granola',
    category: 'Granola',
    size: '400 g pouch',
    price: 449,
    image: darkChocolateCrunchGranola,
  },
  {
    id: 'peanut-butter-oat-bar',
    name: 'Peanut Butter Oat Bar',
    category: 'Oat Bars',
    size: 'Pack of 6 bars',
    price: 299,
    image: peanutButterOatBar,
  },
  {
    id: 'chocolate-chip-oat-bar',
    name: 'Chocolate Chip Oat Bar',
    category: 'Oat Bars',
    size: 'Pack of 6 bars',
    price: 299,
    image: chocolateChipOatBar,
  },
  {
    id: 'cranberry-almond-oat-bar',
    name: 'Cranberry Almond Oat Bar',
    category: 'Oat Bars',
    size: 'Pack of 6 bars',
    price: 329,
    image: cranberryAlmondOatBar,
  },
  {
    id: 'lightly-salted-roasted-almonds',
    name: 'Lightly Salted Roasted Almonds',
    category: 'Nuts & Seeds',
    size: '200 g box',
    price: 379,
    image: lightlySaltedRoastedAlmonds,
  },
  {
    id: 'classic-trail-mix',
    name: 'Classic Trail Mix',
    category: 'Nuts & Seeds',
    size: '250 g box',
    price: 349,
    image: classicTrailMix,
  },
  {
    id: 'pumpkin-and-sunflower-seeds-mix',
    name: 'Pumpkin & Sunflower Seed Mix',
    category: 'Nuts & Seeds',
    size: '200 g box',
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
