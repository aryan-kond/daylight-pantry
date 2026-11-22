import { Link } from 'react-router';
import { AlertCircle } from 'lucide-react';
import type { Product } from '../../data/products';
import type { PaymentMethod } from '../../utils/checkoutValidation';
import { formatPrice } from '../../utils/formatPrice';
import './CheckoutSummary.css';

type CheckoutSummaryProps = {
  lines: { product: Product; quantity: number }[];
  subtotal: number;
  discount: number;
  promoCode: string | null;
  deliveryFee: number;
  total: number;
  payment: PaymentMethod;
  status: 'idle' | 'placing' | 'failed';
};

/** Final order preview with the Place order button. The button submits the checkout form. */
export default function CheckoutSummary({
  lines,
  subtotal,
  discount,
  promoCode,
  deliveryFee,
  total,
  payment,
  status,
}: CheckoutSummaryProps) {
  const isPlacing = status === 'placing';

  return (
    <aside className="checkout-summary" aria-labelledby="checkout-summary-heading">
      <div className="checkout-summary__head">
        <h2 id="checkout-summary-heading" className="checkout-summary__title">
          Order summary
        </h2>
        <Link to="/cart" className="checkout-summary__edit">
          Edit cart
        </Link>
      </div>

      <ul className="checkout-summary__items">
        {lines.map(({ product, quantity }) => (
          <li key={product.id} className="checkout-summary__item">
            <img
              src={product.image}
              alt={product.name}
              width={48}
              height={48}
              className="checkout-summary__image"
            />
            <div>
              <p className="checkout-summary__name">{product.name}</p>
              <p className="checkout-summary__meta">
                Qty {quantity} · <span className="tabular">{formatPrice(product.price)}</span> each
              </p>
            </div>
            <p className="checkout-summary__line-total tabular">
              {formatPrice(product.price * quantity)}
            </p>
          </li>
        ))}
      </ul>

      {/* On desktop this block is pushed to the bottom of the card, level with the payment method */}
      <div className="checkout-summary__bottom">
        <dl className="checkout-summary__rows">
          <div className="checkout-summary__row">
            <dt>Subtotal</dt>
            <dd className="tabular">{formatPrice(subtotal)}</dd>
          </div>
          {discount > 0 && (
            <div className="checkout-summary__row checkout-summary__row--discount">
              <dt>Promo ({promoCode})</dt>
              <dd className="tabular">− {formatPrice(discount)}</dd>
            </div>
          )}
          <div className="checkout-summary__row">
            <dt>Delivery charge</dt>
            <dd className="tabular">{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</dd>
          </div>
        </dl>

        <div className="checkout-summary__total">
          <span>Total</span>
          <span className="tabular">{formatPrice(total)}</span>
        </div>

        {status === 'failed' && (
          <p className="checkout-summary__alert" role="alert">
            <AlertCircle size={18} aria-hidden="true" />
            <span>
              {payment === 'online'
                ? 'Your payment did not complete and your order has not been placed. Your details are saved, so you can try again.'
                : 'We could not place your order. Your details are saved, so you can try again.'}
            </span>
          </p>
        )}

        <p className="checkout-summary__note">
          Please check your details before placing your order.
        </p>

        <button
          type="submit"
          form="checkout-form"
          className="button-primary checkout-summary__submit"
          disabled={isPlacing}
          aria-busy={isPlacing}
        >
          {isPlacing ? 'Placing your order…' : status === 'failed' ? 'Try again' : 'Place order'}
        </button>
      </div>
    </aside>
  );
}
