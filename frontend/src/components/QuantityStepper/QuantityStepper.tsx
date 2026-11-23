import { Minus, Plus } from 'lucide-react';
import { MAX_QUANTITY } from '../../store/cartStore';
import './QuantityStepper.css';

type QuantityStepperProps = {
  /** Product name, used in the accessible labels */
  name: string;
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  /** Lowest allowed quantity. Minus is greyed out there. Leave it out in the cart,
   *  where minus at 1 removes the item. */
  min?: number;
};

export default function QuantityStepper({
  name,
  quantity,
  onDecrease,
  onIncrease,
  min = 0,
}: QuantityStepperProps) {
  return (
    <div className="quantity-stepper" role="group" aria-label={`Quantity of ${name}`}>
      <button
        type="button"
        className="quantity-stepper__button"
        aria-label={`Decrease quantity of ${name}`}
        disabled={min > 0 && quantity <= min}
        onClick={onDecrease}
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <span className="quantity-stepper__value tabular" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        className="quantity-stepper__button"
        aria-label={`Increase quantity of ${name}`}
        disabled={quantity >= MAX_QUANTITY}
        onClick={onIncrease}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
