import Hero from '../../components/Hero/Hero';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import Testimonials from '../../components/Testimonials/Testimonials';

// Backgrounds alternate: white hero, cream featured products, white testimonials,
// then the cream newsletter in the footer
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Testimonials />
    </>
  );
}
