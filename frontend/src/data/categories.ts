import granolaImage from '../assets/categories/granola.webp';
import oatBarsImage from '../assets/categories/oat-bars.webp';
import nutsAndSeedsImage from '../assets/categories/nuts-and-seeds.webp';
import nutButtersImage from '../assets/categories/nut-butters.webp';

export type Category = {
  slug: string;
  name: string;
  image: string;
};

export const CATEGORIES: Category[] = [
  { slug: 'granola', name: 'Granola', image: granolaImage },
  { slug: 'oat-bars', name: 'Oat bars', image: oatBarsImage },
  { slug: 'nuts-and-seeds', name: 'Nuts and seeds', image: nutsAndSeedsImage },
  { slug: 'nut-butters', name: 'Nut butters', image: nutButtersImage },
];
