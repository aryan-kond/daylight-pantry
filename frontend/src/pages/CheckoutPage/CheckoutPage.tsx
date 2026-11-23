import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router';
import { AlertCircle, Banknote, Check, CreditCard, type LucideIcon } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCartStore } from '../../store/cartStore';
import { PROMO_CODES, getTotals } from '../../utils/cartPricing';
import {
  EMPTY_VALUES,
  FIELD_ORDER,
  INDIAN_STATES,
  validateAll,
  validateField,
  type FieldName,
  type FormErrors,
  type FormValues,
  type PaymentMethod,
} from '../../utils/checkoutValidation';
import { submitOrder } from '../../utils/mockOrder';
import { useOrderStore } from '../../store/orderStore';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import FormField from '../../components/FormField/FormField';
import OrderConfirmation, {
  type CompletedOrder,
} from '../../components/OrderConfirmation/OrderConfirmation';
import PageHeading from '../../components/PageHeading/PageHeading';
import Select from '../../components/Select/Select';
import './CheckoutPage.css';

const PAYMENT_OPTIONS: { value: PaymentMethod; title: string; text: string; Icon: LucideIcon }[] = [
  {
    value: 'online',
    title: 'Pay online',
    text: 'Pay by UPI, card or net banking.',
    Icon: CreditCard,
  },
  { value: 'cod', title: 'Cash on delivery', text: 'Pay when your order arrives.', Icon: Banknote },
];

export default function CheckoutPage() {
  const quantities = useCartStore((state) => state.quantities);
  const promoCode = useCartStore((state) => state.promoCode);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useOrderStore((state) => state.addOrder);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'placing' | 'failed'>('idle');
  const [completed, setCompleted] = useState<CompletedOrder | null>(null);

  // After the order is confirmed, move focus to the page title so it is announced
  useEffect(() => {
    if (completed) headingRef.current?.focus();
  }, [completed]);

  // Products in the cart and the same totals the cart page shows
  const lines = PRODUCTS.filter((product) => (quantities[product.id] ?? 0) > 0).map((product) => ({
    product,
    quantity: quantities[product.id],
  }));
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const discountRate = promoCode ? (PROMO_CODES[promoCode] ?? 0) : 0;
  const { discount, deliveryFee, total } = getTotals(subtotal, discountRate);

  const errorCount = FIELD_ORDER.filter((field) => errors[field]).length;

  const updateField = (field: FieldName, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    // Once a field shows an error, re-check it as the person types so the message clears when fixed
    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: validateField(field, next) }));
    }
  };

  const checkField = (field: FieldName) => () => {
    setErrors((previous) => ({ ...previous, [field]: validateField(field, values) }));
  };

  // Props shared by every text input
  const inputProps = (field: FieldName) => ({
    value: values[field],
    onChange: (event: ChangeEvent<HTMLInputElement>) => updateField(field, event.target.value),
    onBlur: checkField(field),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'placing') return;

    // Block the order until every required field is fine, and say where the problem is
    const found = validateAll(values);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((field) => found[field]);
    if (firstInvalid) {
      document.getElementById(`checkout-${firstInvalid}`)?.focus();
      return;
    }

    setStatus('placing');
    const result = await submitOrder();

    if (!result.ok) {
      setStatus('failed');
      return;
    }

    setCompleted({
      orderNumber: result.orderNumber,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      addressLines: [
        values.address.trim(),
        `${values.city.trim()}, ${values.state} ${values.pincode.trim()}`,
      ],
      itemCount,
      total,
      payment: values.payment,
    });
    addOrder({
      orderNumber: result.orderNumber,
      placedAt: new Date().toISOString(),
      items: lines.map(({ product, quantity }) => ({
        name: product.name,
        quantity,
        price: product.price,
      })),
      total,
      payment: values.payment,
      addressLines: [
        values.address.trim(),
        `${values.city.trim()}, ${values.state} ${values.pincode.trim()}`,
      ],
    });
    clearCart();
    setStatus('idle');
  };

  // ---------- Order confirmed ----------
  if (completed) {
    const firstName = completed.name.split(' ')[0];
    return (
      <div className="checkout-page">
        <PageHeading
          title="Thank you"
          subtitle={`Your order is confirmed, ${firstName}.`}
          headingRef={headingRef}
        />
        <OrderConfirmation order={completed} />
      </div>
    );
  }

  // ---------- Nothing to check out ----------
  if (lines.length === 0) {
    return (
      <div className="checkout-page">
        <PageHeading title="Checkout" />
        <div className="checkout-page__empty">
          <p className="checkout-page__empty-text">
            Your cart is empty, so there is nothing to check out yet. Add a few products first.
          </p>
          <Link to="/products" className="button-primary">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  // ---------- Checkout form and order preview ----------
  return (
    <div className="checkout-page">
      <PageHeading title="Checkout" subtitle="Check your details and place your order." />

      <div className="checkout-page__layout">
        <form id="checkout-form" className="checkout-form" onSubmit={handleSubmit} noValidate>
          {errorCount > 0 && (
            <p className="checkout-alert" role="alert">
              <AlertCircle size={18} aria-hidden="true" />
              <span>
                {errorCount === 1
                  ? 'One detail needs your attention. It is marked below.'
                  : `${errorCount} details need your attention. They are marked below.`}
              </span>
            </p>
          )}

          {/* Contact details */}
          <section className="checkout-card" aria-labelledby="checkout-contact-title">
            <h2 id="checkout-contact-title" className="checkout-card__title">
              Contact details
            </h2>
            <p className="checkout-card__intro">
              We use these to reach you about your order. All fields are required.
            </p>
            <div className="checkout-card__grid">
              <FormField
                id="checkout-name"
                label="Full name"
                error={errors.name}
                className="form-field--wide"
              >
                {(control) => (
                  <input
                    {...control}
                    {...inputProps('name')}
                    type="text"
                    autoComplete="name"
                    className="form-control"
                  />
                )}
              </FormField>

              <FormField id="checkout-email" label="Email address" error={errors.email}>
                {(control) => (
                  <input
                    {...control}
                    {...inputProps('email')}
                    type="email"
                    autoComplete="email"
                    className="form-control"
                  />
                )}
              </FormField>

              <FormField
                id="checkout-phone"
                label="Mobile number"
                hint="10 digits, for example 98765 43210"
                error={errors.phone}
              >
                {(control) => (
                  <input
                    {...control}
                    {...inputProps('phone')}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    className="form-control"
                  />
                )}
              </FormField>
            </div>
          </section>

          {/* Delivery address */}
          <section className="checkout-card" aria-labelledby="checkout-address-title">
            <h2 id="checkout-address-title" className="checkout-card__title">
              Delivery address
            </h2>
            <p className="checkout-card__intro">Where should we deliver your order?</p>
            <div className="checkout-card__grid">
              <FormField
                id="checkout-address"
                label="House number and street"
                error={errors.address}
                className="form-field--wide"
              >
                {(control) => (
                  <input
                    {...control}
                    {...inputProps('address')}
                    type="text"
                    autoComplete="street-address"
                    className="form-control"
                  />
                )}
              </FormField>

              <FormField id="checkout-city" label="City or town" error={errors.city}>
                {(control) => (
                  <input
                    {...control}
                    {...inputProps('city')}
                    type="text"
                    autoComplete="address-level2"
                    className="form-control"
                  />
                )}
              </FormField>

              <FormField id="checkout-state" label="State" error={errors.state}>
                {(control) => (
                  <Select
                    {...control}
                    value={values.state}
                    options={INDIAN_STATES}
                    placeholder="Choose your state"
                    onChange={(value) => updateField('state', value)}
                    onBlur={checkField('state')}
                  />
                )}
              </FormField>

              <FormField
                id="checkout-pincode"
                label="PIN code"
                hint="6 digits, for example 400001"
                error={errors.pincode}
              >
                {(control) => (
                  <input
                    {...control}
                    {...inputProps('pincode')}
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={6}
                    className="form-control"
                  />
                )}
              </FormField>
            </div>
          </section>

          {/* Payment method: the last card, so it lines up with the bottom of the order summary */}
          <section
            className="checkout-card checkout-card--payment"
            aria-labelledby="checkout-payment-title"
          >
            <h2 id="checkout-payment-title" className="checkout-card__title">
              Payment method
            </h2>
            <div
              className="checkout-pay"
              role="radiogroup"
              aria-labelledby="checkout-payment-title"
            >
              {PAYMENT_OPTIONS.map(({ value, title, text, Icon }) => {
                const selected = values.payment === value;
                return (
                  <label
                    key={value}
                    className={`pay-option ${selected ? 'pay-option--selected' : ''}`}
                  >
                    {/* A real radio input, visually hidden, so keyboard and screen readers work */}
                    <input
                      type="radio"
                      name="payment"
                      value={value}
                      checked={selected}
                      onChange={() => setValues({ ...values, payment: value })}
                      className="pay-option__input"
                    />
                    <span className="pay-option__icon">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <span className="pay-option__body">
                      <span className="pay-option__title">{title}</span>
                      <span className="pay-option__text">{text}</span>
                    </span>
                    <span className="pay-option__check" aria-hidden="true">
                      <Check size={14} strokeWidth={3} />
                    </span>
                  </label>
                );
              })}
            </div>
          </section>
        </form>

        <CheckoutSummary
          lines={lines}
          subtotal={subtotal}
          discount={discount}
          promoCode={promoCode}
          deliveryFee={deliveryFee}
          total={total}
          payment={values.payment}
          status={status}
        />
      </div>
    </div>
  );
}
