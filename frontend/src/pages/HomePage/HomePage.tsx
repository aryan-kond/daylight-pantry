import Hero from '../../components/Hero/Hero';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';

export default function HomePage() {
  return (
    <>
      <Hero />
      <hr className="section-divider" />
      <FeaturedProducts />
    </>
  );
}
