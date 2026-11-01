import ProductCard from '../ProductCard/ProductCard';
import type { Product } from '../../data/products';
import './ProductGrid.css';

type ProductGridProps = {
  products: Product[];
  /** Columns on desktop. Mobile always shows 2, tablet 3. */
  columns?: 3 | 4;
};

export default function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  return (
    <ul className={`product-grid product-grid--${columns}`}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
