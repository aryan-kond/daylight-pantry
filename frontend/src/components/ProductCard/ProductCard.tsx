import { useEffect, useRef } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { MAX_QUANTITY, useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/formatPrice';
import type { Product } from '../../data/products';
import './ProductCard.css';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { id, name, category, description, netWeight, price, image } = product;

  const quantity = useCartStore((state) => state.quantities[id] ?? 0);
  const addItem = useCartStore((state) => state.addItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);

  const addButtonRef = useRef<HTMLButtonElement>(null);
  const plusButtonRef = useRef<HTMLButtonElement>(null);
  const pendingFocusRef = useRef<'add' | 'plus' | null>(null);

  // When the Add button and the stepper swap places, keyboard focus moves to the new control
  useEffect(() => {
    if (pendingFocusRef.current === 'plus') plusButtonRef.current?.focus();
    if (pendingFocusRef.current === 'add') addButtonRef.current?.focus();
    pendingFocusRef.current = null;
  }, [quantity]);

  const handleAdd = () => {
    if (quantity === 0) pendingFocusRef.current = 'plus';
    addItem(id);
  };

  const handleDecrease = () => {
    if (quantity === 1) pendingFocusRef.current = 'add';
    decreaseItem(id);
  };

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img
          src={image}
          alt={name}
          width={800}
          height={800}
          loading="lazy"
          className="product-card__image"
        />
      </div>

      <div className="product-card__body">
        <p className="product-card__category">{category}</p>
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__description">{description}</p>

        <div className="product-card__footer">
          <div className="product-card__buy">
            <p className="product-card__price tabular">{formatPrice(price)}</p>
            <p className="product-card__weight">Net wt. {netWeight}</p>
          </div>

          {quantity === 0 ? (
            <button
              ref={addButtonRef}
              type="button"
              className="button-primary product-card__add"
              aria-label={`Add ${name} to cart`}
              onClick={handleAdd}
            >
              <ShoppingCart size={18} aria-hidden="true" />
              Add to cart
            </button>
          ) : (
            <div className="product-card__stepper" role="group" aria-label={`Quantity of ${name}`}>
              <button
                type="button"
                className="product-card__step"
                aria-label={`Decrease quantity of ${name}`}
                onClick={handleDecrease}
              >
                <Minus size={16} aria-hidden="true" />
              </button>
              <span className="product-card__quantity tabular" aria-live="polite">
                {quantity}
              </span>
              <button
                ref={plusButtonRef}
                type="button"
                className="product-card__step"
                aria-label={`Increase quantity of ${name}`}
                disabled={quantity >= MAX_QUANTITY}
                onClick={handleAdd}
              >
                <Plus size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
