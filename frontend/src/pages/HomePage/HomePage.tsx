import Hero from '../../components/Hero/Hero';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import SectionDivider from '../../components/SectionDivider/SectionDivider';
import Testimonials from '../../components/Testimonials/Testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <FeaturedProducts />
      <SectionDivider />
      <Testimonials />
    </>
  );
}
