import Hero from '../../components/Hero/Hero';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import Testimonials from '../../components/Testimonials/Testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <hr className="section-divider" />
      <FeaturedProducts />
      <Testimonials />
    </>
  );
}
