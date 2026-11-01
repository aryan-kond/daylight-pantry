import granolaImage from '../assets/categories/granola.webp';
import oatBarsImage from '../assets/categories/oat-bars.webp';
import nutsAndSeedsImage from '../assets/categories/nuts-and-seeds.webp';
import nutButtersImage from '../assets/categories/nut-butters.webp';

export type Category = {
  slug: string;
  /** Name shown on category cards */
  name: string;
  /** Name shown in the header Shop menu */
  menuLabel: string;
  /** Short line shown on category cards (sample copy, edit freely) */
  description: string;
  image: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: 'granola',
    name: 'Granola',
    menuLabel: 'Granola',
    description: 'Oat clusters for bowls and toppings.',
    image: granolaImage,
  },
  {
    slug: 'oat-bars',
    name: 'Oat bars',
    menuLabel: 'Oat Bars',
    description: 'Easy bars for snacking on the go.',
    image: oatBarsImage,
  },
  {
    slug: 'nuts-and-seeds',
    name: 'Nuts and seeds',
    menuLabel: 'Nuts & Seeds',
    description: 'Almonds, walnuts and seeds.',
    image: nutsAndSeedsImage,
  },
  {
    slug: 'nut-butters',
    name: 'Nut butters',
    menuLabel: 'Nut Butters',
    description: 'Spreads for toast and snacks.',
    image: nutButtersImage,
  },
];
