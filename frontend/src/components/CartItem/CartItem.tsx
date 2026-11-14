import { Trash2 } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/formatPrice';
import type { Product } from '../../data/products';
import QuantityStepper from '../QuantityStepper/QuantityStepper';
import './CartItem.css';

type CartItemProps = {
  product: Product;
  quantity: number;
  onRemove: (product: Product) => void;
};

export default function CartItem({ product, quantity, onRemove }: CartItemProps) {
  const { id, name, netWeight, price, image } = product;
  const addItem = useCartStore((state) => state.addItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);

  // Pressing minus at 1 removes the product, so it follows the same path as the trash button
  const handleDecrease = () => {
    if (quantity === 1) {
      onRemove(product);
    } else {
      decreaseItem(id);
    }
  };

  return (
    <li className="cart-item">
      <img
        src={image}
        alt={name}
        width={72}
        height={72}
        loading="lazy"
        className="cart-item__image"
      />

      <div className="cart-item__info">
        <h3 className="cart-item__name">{name}</h3>
        <p className="cart-item__meta">
          Net wt. {netWeight} · <span className="tabular">{formatPrice(price)}</span> each
        </p>
      </div>

      <div className="cart-item__stepper">
        <QuantityStepper
          name={name}
          quantity={quantity}
          onDecrease={handleDecrease}
          onIncrease={() => addItem(id)}
        />
      </div>

      <p className="cart-item__total tabular">{formatPrice(price * quantity)}</p>

      <button
        type="button"
        className="cart-item__remove"
        aria-label={`Remove ${name} from cart`}
        title="Remove"
        onClick={() => onRemove(product)}
      >
        <Trash2 size={18} aria-hidden="true" />
      </button>
    </li>
  );
}
