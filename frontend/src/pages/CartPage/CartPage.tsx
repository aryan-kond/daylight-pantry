import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { Trash2 } from 'lucide-react';
import { PRODUCTS, type Product } from '../../data/products';
import { useCartStore } from '../../store/cartStore';
import CartItem from '../../components/CartItem/CartItem';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Pagination from '../../components/Pagination/Pagination';
import './CartPage.css';

/** Items shown per page. More than this and the pager appears. */
const PAGE_SIZE = 3;

export default function CartPage() {
  const quantities = useCartStore((state) => state.quantities);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const [page, setPage] = useState(1);
  const [confirmingClear, setConfirmingClear] = useState(false);
  const [message, setMessage] = useState('');

  // Products in the cart, in catalogue order
  const lines = PRODUCTS.filter((product) => (quantities[product.id] ?? 0) > 0).map((product) => ({
    product,
    quantity: quantities[product.id],
  }));
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  const pageCount = Math.max(1, Math.ceil(lines.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleLines = lines.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // After a removal the row disappears, so announce it and move focus to the page title
  const handleRemove = (product: Product) => {
    removeItem(product.id);
    setMessage(`${product.name} removed from cart`);
    headingRef.current?.focus();
  };

  const handleConfirmClear = () => {
    clearCart();
    setConfirmingClear(false);
    setPage(1);
    setMessage('Cart cleared');
    headingRef.current?.focus();
  };

  const handleCancelClear = () => {
    setConfirmingClear(false);
    // Focus returns on the next frame, once the Clear cart button is back on screen
    requestAnimationFrame(() => clearButtonRef.current?.focus());
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
          <section className="cart-list" aria-labelledby="cart-items-heading">
            <div className="cart-list__header">
              <h2 id="cart-items-heading" className="cart-list__title">
                Items
              </h2>

              {confirmingClear ? (
                <div className="cart-list__confirm" role="group" aria-label="Confirm clearing cart">
                  <span>Remove all items?</span>
                  <button type="button" className="cart-list__action" onClick={handleCancelClear}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="cart-list__action cart-list__action--danger"
                    onClick={handleConfirmClear}
                  >
                    Yes, clear cart
                  </button>
                </div>
              ) : (
                <button
                  ref={clearButtonRef}
                  type="button"
                  className="cart-list__action"
                  onClick={() => setConfirmingClear(true)}
                >
                  <Trash2 size={16} aria-hidden="true" />
                  Clear cart
                </button>
              )}
            </div>

            <ul className="cart-list__items">
              {visibleLines.map(({ product, quantity }) => (
                <CartItem
                  key={product.id}
                  product={product}
                  quantity={quantity}
                  onRemove={handleRemove}
                />
              ))}
            </ul>

            {pageCount > 1 && (
              <div className="cart-list__pager">
                <Pagination
                  page={currentPage}
                  pageCount={pageCount}
                  onChange={setPage}
                  label="Cart item pages"
                />
              </div>
            )}
          </section>

          <OrderSummary itemCount={itemCount} subtotal={subtotal} />
        </div>
      )}
    </div>
  );
}
