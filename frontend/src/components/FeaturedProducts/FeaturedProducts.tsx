import { Link } from 'react-router';
import { FEATURED_PRODUCTS } from '../../data/products';
import ProductGrid from '../ProductGrid/ProductGrid';
import SectionHeading from '../SectionHeading/SectionHeading';
import './FeaturedProducts.css';

export default function FeaturedProducts() {
  return (
    <section className="featured-products" aria-labelledby="featured-products-heading">
      <div className="featured-products__inner">
        <SectionHeading
          id="featured-products-heading"
          title="Featured products"
          subtitle="A few picks from the range to get you started."
        />

        <ProductGrid products={FEATURED_PRODUCTS} columns={3} />

        <div className="featured-products__footer">
          <Link to="/products" className="button-secondary">
            Browse Everything
          </Link>
        </div>
      </div>
    </section>
  );
}
