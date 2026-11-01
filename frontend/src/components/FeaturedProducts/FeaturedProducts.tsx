import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../../data/products';
import ProductGrid from '../ProductGrid/ProductGrid';
import './FeaturedProducts.css';

export default function FeaturedProducts() {
  return (
    <section className="featured-products" aria-labelledby="featured-products-heading">
      <div className="featured-products__inner">
        <div className="featured-products__header">
          <h2 id="featured-products-heading" className="featured-products__heading">
            Featured products
          </h2>
          <Link to="/products" className="featured-products__link">
            View all products
            <ArrowRight size={16} aria-hidden="true" className="featured-products__arrow" />
          </Link>
        </div>

        <ProductGrid products={FEATURED_PRODUCTS} columns={3} />

        <div className="featured-products__footer">
          <Link to="/products" className="button-secondary">
            View all products
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
