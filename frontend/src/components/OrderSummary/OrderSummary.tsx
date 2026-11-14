import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { FREE_DELIVERY_FROM, PROMO_CODES, getTotals } from '../../utils/cartPricing';
import { formatPrice } from '../../utils/formatPrice';
import './OrderSummary.css';

type OrderSummaryProps = {
  itemCount: number;
  subtotal: number;
};

export default function OrderSummary({ itemCount, subtotal }: OrderSummaryProps) {
  const [code, setCode] = useState('');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [error, setError] = useState('');

  const discountRate = appliedCode ? PROMO_CODES[appliedCode] : 0;
  const { discount, deliveryFee, total } = getTotals(subtotal, discountRate);

  const handleApply = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const entered = code.trim().toUpperCase();

    if (!entered) {
      setError('Enter a promo code first.');
    } else if (!(entered in PROMO_CODES)) {
      setError('That code is not valid. Check it and try again.');
    } else {
      setAppliedCode(entered);
      setCode('');
      setError('');
    }
  };

  const handleRemovePromo = () => {
    setAppliedCode(null);
    setError('');
  };

  return (
    <aside className="order-summary" aria-labelledby="order-summary-heading">
      <h2 id="order-summary-heading" className="order-summary__heading">
        Order summary
      </h2>

      <dl className="order-summary__rows">
        <div className="order-summary__row">
          <dt>
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </dt>
          <dd className="tabular">{formatPrice(subtotal)}</dd>
        </div>

        {discount > 0 && (
          <div className="order-summary__row order-summary__row--discount">
            <dt>Promo ({appliedCode})</dt>
            <dd className="tabular">− {formatPrice(discount)}</dd>
          </div>
        )}

        <div className="order-summary__row">
          <dt>Delivery charge</dt>
          <dd className="tabular">{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</dd>
        </div>
      </dl>

      <p className="order-summary__hint">
        {deliveryFee === 0
          ? 'This order qualifies for free delivery.'
          : `Free delivery on orders from ${formatPrice(FREE_DELIVERY_FROM)}.`}
      </p>

      {/* Promo code */}
      <form className="promo" onSubmit={handleApply} noValidate>
        <label htmlFor="promo-code" className="promo__label">
          Promo code
        </label>
        <div className="promo__row">
          <input
            id="promo-code"
            type="text"
            autoComplete="off"
            autoCapitalize="characters"
            placeholder="Enter your code"
            className="promo__input"
            value={code}
            aria-invalid={Boolean(error)}
            aria-describedby="promo-message"
            onChange={(event) => {
              setCode(event.target.value);
              if (error) setError('');
            }}
          />
          <button type="submit" className="button-secondary promo__apply">
            Apply
          </button>
        </div>

        <p
          id="promo-message"
          className={`promo__message ${error ? 'promo__message--error' : ''}`}
          aria-live="polite"
        >
          {error ||
            (appliedCode
              ? `${appliedCode} applied: ${Math.round(discountRate * 100)}% off your subtotal.`
              : '')}
          {appliedCode && !error && (
            <>
              {' '}
              <button type="button" className="promo__remove" onClick={handleRemovePromo}>
                Remove
              </button>
            </>
          )}
        </p>
      </form>

      <div className="order-summary__total">
        <span>Total</span>
        <span className="tabular">{formatPrice(total)}</span>
      </div>

      <Link to="/checkout" className="button-primary order-summary__action">
        Proceed to checkout
      </Link>
      <Link to="/products" className="button-secondary order-summary__action">
        Continue shopping
      </Link>
    </aside>
  );
}
