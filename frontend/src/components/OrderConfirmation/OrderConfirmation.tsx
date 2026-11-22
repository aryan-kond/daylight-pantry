import { Link } from 'react-router';
import { CheckCircle2 } from 'lucide-react';
import type { PaymentMethod } from '../../utils/checkoutValidation';
import { formatPrice } from '../../utils/formatPrice';
import './OrderConfirmation.css';

export type CompletedOrder = {
  orderNumber: string;
  name: string;
  email: string;
  phone: string;
  addressLines: string[];
  itemCount: number;
  total: number;
  payment: PaymentMethod;
};

type OrderConfirmationProps = {
  order: CompletedOrder;
};

/** Shown only after the order has been confirmed */
export default function OrderConfirmation({ order }: OrderConfirmationProps) {
  const { orderNumber, name, email, phone, addressLines, itemCount, total, payment } = order;

  return (
    <section className="order-confirmation" aria-labelledby="order-confirmation-status">
      <span className="order-confirmation__badge">
        <CheckCircle2 size={30} aria-hidden="true" />
      </span>
      <h2 id="order-confirmation-status" className="order-confirmation__status">
        Order confirmed
      </h2>
      <p className="order-confirmation__number">
        Order number <strong>{orderNumber}</strong>
      </p>

      <dl className="order-confirmation__details">
        <div>
          <dt>Items</dt>
          <dd>{itemCount}</dd>
        </div>
        <div>
          <dt>Total</dt>
          <dd className="tabular">{formatPrice(total)}</dd>
        </div>
        <div>
          <dt>Payment</dt>
          <dd>{payment === 'online' ? 'Online' : 'Cash on delivery'}</dd>
        </div>
        <div>
          <dt>Delivering to</dt>
          <dd>
            {name}
            {addressLines.map((line) => (
              <span key={line} className="order-confirmation__line">
                {line}
              </span>
            ))}
            <span className="order-confirmation__line">{phone}</span>
          </dd>
        </div>
      </dl>

      {/* DEMO: no email is sent yet. Keep this line only once order emails exist. */}
      <p className="order-confirmation__note">Order updates will be sent to {email}.</p>

      <div className="order-confirmation__actions">
        <Link to="/products" className="button-primary">
          Continue shopping
        </Link>
        <Link to="/" className="button-secondary">
          Back to home
        </Link>
      </div>
    </section>
  );
}
