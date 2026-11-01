import { Link, useSearchParams } from 'react-router';
import { PRODUCTS, type Product } from '../../data/products';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import './ProductsPage.css';

// Every search word must appear in the product name, category or size
function matchesSearch(product: Product, query: string): boolean {
  const haystack = `${product.name} ${product.category} ${product.size}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('q') ?? '').trim();

  const results = query ? PRODUCTS.filter((product) => matchesSearch(product, query)) : PRODUCTS;
  const countLabel = `${results.length} ${results.length === 1 ? 'product' : 'products'}`;

  return (
    <div className="products-page">
      <header className="products-page__header">
        <h1 className="products-page__title">{query ? 'Search results' : 'Products'}</h1>
        <p className="products-page__summary" role="status">
          {query ? `${countLabel} for “${query}”` : countLabel}
        </p>
        {query && (
          <Link to="/products" className="products-page__clear">
            Clear search
          </Link>
        )}
      </header>

      {results.length > 0 ? (
        <ProductGrid products={results} columns={4} />
      ) : (
        <div className="products-page__empty">
          <p className="products-page__empty-text">
            No products match “{query}”. Try another word, such as oat, granola or almond.
          </p>
          <Link to="/products" className="button-primary">
            View all products
          </Link>
        </div>
      )}
    </div>
  );
}
