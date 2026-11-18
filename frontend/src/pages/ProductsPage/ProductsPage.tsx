import { Link, useSearchParams } from 'react-router';
import { PRODUCTS, type Product } from '../../data/products';
import PageHeading from '../../components/PageHeading/PageHeading';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import './ProductsPage.css';

// Every search word must appear in the product name, category, description or net weight
function matchesSearch(product: Product, query: string): boolean {
  const haystack =
    `${product.name} ${product.category} ${product.description} ${product.netWeight}`.toLowerCase();
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
      <PageHeading
        title={query ? 'Search results' : 'Products'}
        subtitle={query ? `${countLabel} for “${query}”` : countLabel}
      >
        {query && (
          <Link to="/products" className="products-page__clear">
            Clear search
          </Link>
        )}
      </PageHeading>

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
