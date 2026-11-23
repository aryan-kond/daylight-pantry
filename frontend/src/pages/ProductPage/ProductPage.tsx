import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, CheckCircle2, ShoppingCart } from 'lucide-react';
import { PRODUCTS, type Product } from '../../data/products';
import { PRODUCT_FACTS, type ProductFacts } from '../../data/productDetails';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/formatPrice';
import PageHeading from '../../components/PageHeading/PageHeading';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import QuantityStepper from '../../components/QuantityStepper/QuantityStepper';
import SectionDivider from '../../components/SectionDivider/SectionDivider';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import './ProductPage.css';

/** Photo, buy panel and product details for one product */
function ProductDetail({ product }: { product: Product }) {
  const { id, name, category, description, netWeight, price, image } = product;
  const facts: ProductFacts | undefined = PRODUCT_FACTS[id];

  const addItem = useCartStore((state) => state.addItem);
  const [selected, setSelected] = useState(1);
  const [added, setAdded] = useState<number | null>(null);

  const handleAdd = () => {
    for (let count = 0; count < selected; count += 1) addItem(id);
    setAdded(selected);
  };

  // Only verified facts are shown. Nothing is guessed.
  const factRows = [
    { label: 'Ingredients', value: facts?.ingredients },
    { label: 'Allergens', value: facts?.allergens },
    { label: 'Nutrition', value: facts?.nutrition },
    { label: 'Storage', value: facts?.storage },
  ].filter((row) => row.value);

  return (
    <div className="product-detail">
      <figure className="product-detail__figure">
        <img src={image} alt={name} width={800} height={800} className="product-detail__image" />
      </figure>

      <div className="product-detail__info">
        <div className="product-buy">
          <p className="product-buy__price tabular">{formatPrice(price)}</p>
          <p className="product-buy__weight">Net wt. {netWeight}</p>
          <p className="product-buy__description">{description}</p>

          <div className="product-buy__actions">
            <div className="product-buy__quantity">
              <span className="product-buy__label">Quantity</span>
              <QuantityStepper
                name={name}
                quantity={selected}
                min={1}
                onDecrease={() => setSelected((quantity) => Math.max(1, quantity - 1))}
                onIncrease={() => setSelected((quantity) => quantity + 1)}
              />
            </div>

            <button type="button" className="button-primary product-buy__add" onClick={handleAdd}>
              <ShoppingCart size={18} aria-hidden="true" />
              Add to cart
            </button>
          </div>

          {/* Always on the page, so screen readers announce it when the text appears */}
          <p className="product-buy__status" role="status">
            {added !== null && (
              <>
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>
                  Added {added} to your cart. <Link to="/cart">View cart</Link>
                </span>
              </>
            )}
          </p>
        </div>

        <section className="product-facts" aria-labelledby="product-facts-title">
          <h2 id="product-facts-title" className="product-facts__title">
            Product details
          </h2>
          <dl className="product-facts__list">
            <div>
              <dt>Category</dt>
              <dd>{category}</dd>
            </div>
            <div>
              <dt>Net weight</dt>
              <dd>{netWeight}</dd>
            </div>
            {factRows.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>

          {factRows.length === 0 && (
            <p className="product-facts__note">
              Ingredients, allergen and nutrition information has not been added for this product
              yet. If you have allergies, please check the product label before eating.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const product = PRODUCTS.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="product-page">
        <PageHeading
          title="Product not found"
          subtitle="That product may have moved or never existed."
        />
        <div className="product-page__center">
          <Link to="/products" className="button-primary">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  // Four more products, starting with the ones in the same category
  const others = PRODUCTS.filter((item) => item.id !== product.id);
  const related = [
    ...others.filter((item) => item.category === product.category),
    ...others.filter((item) => item.category !== product.category),
  ].slice(0, 4);

  return (
    <>
      <div className="product-page">
        <Link to="/products" className="product-page__back">
          <ArrowLeft size={16} aria-hidden="true" />
          Products
        </Link>

        <PageHeading
          title={product.name}
          subtitle={`${product.category} · Net wt. ${product.netWeight}`}
        />

        {/* The key resets the quantity and the "added" message when you open another product */}
        <ProductDetail key={product.id} product={product} />
      </div>

      <SectionDivider />

      <section className="product-related" aria-labelledby="product-related-heading">
        <SectionHeading
          id="product-related-heading"
          title="You may also like"
          subtitle="More from the pantry."
        />
        <ProductGrid products={related} columns={4} />
      </section>
    </>
  );
}
