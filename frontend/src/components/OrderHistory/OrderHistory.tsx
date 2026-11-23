import { Link } from 'react-router';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import type { SavedOrder } from '../../store/orderStore';
import { formatPrice } from '../../utils/formatPrice';
import './OrderHistory.css';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

type OrderHistoryProps = {
  orders: SavedOrder[];
};

export default function OrderHistory({ orders }: OrderHistoryProps) {
  return (
    <section className="order-history" aria-labelledby="order-history-title">
      <h2 id="order-history-title" className="order-history__title">
        Order history
      </h2>

      {orders.length === 0 ? (
        <div className="order-history__empty">
          <p className="order-history__empty-text">
            You have not placed any orders yet. Your orders will appear here.
          </p>
          <Link to="/products" className="button-primary">
            Browse products
          </Link>
        </div>
      ) : (
        <ul className="order-history__list">
          {orders.map((order) => {
            const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
            return (
              <li key={order.orderNumber}>
                {/* A native details element: click or press Enter to open an order */}
                <details className="order">
                  <summary className="order__summary">
                    <span className="order__main">
                      <span className="order__number">Order {order.orderNumber}</span>
                      <span className="order__date">
                        {formatDate(order.placedAt)} · {itemCount}{' '}
                        {itemCount === 1 ? 'item' : 'items'}
                      </span>
                    </span>
                    <span className="order__status">
                      <CheckCircle2 size={16} aria-hidden="true" />
                      Confirmed
                    </span>
                    <span className="order__total tabular">{formatPrice(order.total)}</span>
                    <ChevronDown size={18} aria-hidden="true" className="order__chevron" />
                  </summary>

                  <div className="order__body">
                    <ul className="order__items">
                      {order.items.map((item) => (
                        <li key={item.name}>
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span className="tabular">{formatPrice(item.price * item.quantity)}</span>
                        </li>
                      ))}
                    </ul>

                    <dl className="order__meta">
                      <div>
                        <dt>Payment</dt>
                        <dd>{order.payment === 'online' ? 'Online' : 'Cash on delivery'}</dd>
                      </div>
                      <div>
                        <dt>Delivering to</dt>
                        <dd>
                          {order.addressLines.map((line) => (
                            <span key={line} className="order__line">
                              {line}
                            </span>
                          ))}
                        </dd>
                      </div>
                    </dl>

                    <p className="order__note">
                      Orders cannot be changed here yet. To change or cancel an order,{' '}
                      <Link to="/contact">contact us</Link>.
                    </p>
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
