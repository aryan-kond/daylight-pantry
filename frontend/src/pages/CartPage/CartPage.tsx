import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { PRODUCTS, type Product } from '../../data/products';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/formatPrice';
import CartItem from '../../components/CartItem/CartItem';
import './CartPage.css';

export default function CartPage() {
  const quantities = useCartStore((state) => state.quantities);
  const removeItem = useCartStore((state) => state.removeItem);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const [message, setMessage] = useState('');

  // Products in the cart, in catalogue order
  const lines = PRODUCTS.filter((product) => (quantities[product.id] ?? 0) > 0).map((product) => ({
    product,
    quantity: quantities[product.id],
  }));
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  // After a removal the row disappears, so announce it and move focus to the page title
  const handleRemove = (product: Product) => {
    removeItem(product.id);
    setMessage(`${product.name} removed from cart`);
    headingRef.current?.focus();
  };

  return (
    <div className="cart-page">
      <header className="cart-page__header">
        <h1 ref={headingRef} tabIndex={-1} className="cart-page__title">
          Your cart
        </h1>
        {lines.length > 0 && (
          <p className="cart-page__count">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>
        )}
      </header>

      <p className="sr-only" role="status">
        {message}
      </p>

      {lines.length === 0 ? (
        <div className="cart-page__empty">
          <p className="cart-page__empty-text">
            Your cart is empty. Add a few products and they will appear here.
          </p>
          <Link to="/products" className="button-primary">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="cart-page__layout">
          <ul className="cart-page__list">
            {lines.map(({ product, quantity }) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={quantity}
                onRemove={handleRemove}
              />
            ))}
          </ul>

          <aside className="cart-summary" aria-labelledby="cart-summary-heading">
            <h2 id="cart-summary-heading" className="cart-summary__heading">
              Order summary
            </h2>
            <dl className="cart-summary__rows">
              <div className="cart-summary__row">
                <dt>Items</dt>
                <dd className="tabular">{itemCount}</dd>
              </div>
              <div className="cart-summary__row cart-summary__row--total">
                <dt>Subtotal</dt>
                <dd className="tabular">{formatPrice(subtotal)}</dd>
              </div>
            </dl>
            <Link to="/products" className="button-secondary cart-summary__continue">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
